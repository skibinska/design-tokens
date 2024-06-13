import StyleDictionary from 'style-dictionary';
import {registerTransforms} from '@tokens-studio/sd-transforms';

import {transformRem} from "./transforms/transformRem.mjs";

registerTransforms(StyleDictionary);

const sd = new StyleDictionary('config.json');

// Define the array of excluded token paths
const excludedPaths = [
    'tokenSetOrder',
    'asset'
];

sd.registerFilter({
    name: 'custom/excludeTokens',
    filter: (prop) => {
        return !prop.path.some(part => excludedPaths.includes(part));
    }
});

sd.registerTransform({
    name: 'custom/rem',
    type: 'value',
    transitive: true,
    filter: token =>
        ['sizing', 'spacing', 'borderRadius', 'fontSizes'].includes(
            token.type,
        ),
    transform: token => transformRem(token.value),
});

sd.registerTransform({
    name: 'custom/font',
    type: 'attribute',
    filter: token => token.path[0] === 'asset' && token.path[1] === 'font',
    transform: token => ({
        category: token.path[0],
        type: token.path[1],
        family: token.path[2],
        weight: token.path[3],
        style: token.path[4]
    })
});

sd.registerFormat({
    name: 'custom/font-face',
    format: ({ dictionary: { allTokens }, options }) => {
        const fontPathPrefix = options.fontPathPrefix || '../';

        // https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/src
        const formatsMap = {
            'woff2': 'woff2',
            'woff': 'woff',
            'ttf': 'truetype',
            'otf': 'opentype',
            'svg': 'svg',
            'eot': 'embedded-opentype'
        };

        return allTokens.reduce((fontList, prop) => {
            const {
                attributes: { family, weight, style },
                formats,
                value: path
            } = prop;

            const urls = formats
                .map(extension => `url("${fontPathPrefix}${path}.${extension}") format("${formatsMap[extension]}")`);

            const fontCss = [
                '@font-face {',
                '\n\tfont-display: swap;',
                `\n\tfont-family: "${family}";`,
                `\n\tfont-style: ${style};`,
                `\n\tfont-weight: ${weight};`,
                `\n\tsrc: ${urls.join(',\n\t\t\t ')};`,
                '\n}\n'
            ].join('');

            fontList.push(fontCss);

            return fontList;

        }, []).join('\n');
    }
});

sd.registerFormat({
    name: 'custom/css/responsive',
    format: ({ dictionary }) => {
        const deviceTokenName = "artboard";

        let output = '';

        // Helper function to create CSS variables from tokens
        const createVariables = (tokens) => {
            return tokens.map(token => {
                const name = token.name.replace(/-mobile|-tablet|-desktop/, '');
                return `--${name}: ${token.value};\n`;
            }).join('');
        };

        const findDevice = (name) => {
            return dictionary.allTokens.find(token => token.path.includes(deviceTokenName) && token.name.includes(name))
        }

        // Add mobile first tokens
        const mobileTokens = dictionary.allTokens.filter(token => token.path.includes('mobile'));
        if (mobileTokens.length > 0) {
            output += `:root {\n`;
            output += createVariables(mobileTokens);
            output += `}\n\n`;
        }

        // Find artboard values
        const tablet = findDevice('tablet');
        const desktop = findDevice('desktop');

        if (tablet && desktop) {
            // Add tablet tokens inside media query
            const tabletTokens = dictionary.allTokens.filter(token => token.path.includes('tablet'));

            output += `@media (min-width: ${tablet.value}) {\n`;
            output += `  :root {\n`;
            output += createVariables(tabletTokens);
            output += `  }\n`;
            output += `}\n\n`;

            // Add desktop tokens inside media query
            const desktopTokens = dictionary.allTokens.filter(token => token.path.includes('desktop'));

            output += `@media (min-width: ${desktop.value}) {\n`;
            output += `  :root {\n`;
            output += createVariables(desktopTokens);
            output += `  }\n`;
            output += `}\n`;
        } else {
            throw new Error('Artboard tokens for tablet or desktop not found.');
        }

        return output;

    }

});

sd.buildAllPlatforms();