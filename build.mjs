import StyleDictionary from 'style-dictionary';
import {registerTransforms} from '@tokens-studio/sd-transforms';

import {transformRem} from "./transforms/transformRem.mjs";

registerTransforms(StyleDictionary);

const sd = new StyleDictionary('config.json');

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

sd.buildAllPlatforms();