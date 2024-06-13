import StyleDictionary from 'style-dictionary';
import { registerTransforms } from '@tokens-studio/sd-transforms';

import { transformFont } from "./src/transforms/transformFont.mjs";
import { transformRem } from "./src/transforms/transformRem.mjs";

import { formatCssResponsive } from "./src/formats/formatCssResponsive.mjs";
import { formatFontFace } from "./src/formats/formatFontFace.mjs";

registerTransforms(StyleDictionary);

const sd = new StyleDictionary('config.json');

// Define the array of excluded token paths
const excludedPaths = [
    'tokenSetOrder',
    'asset',
    'annotations'
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
        ['sizing', 'spacing', 'borderRadius', 'fontSizes', 'lineHeights', 'letterSpacing'].includes(
            token.type,
        ),
    transform: token => transformRem(token.value),
});

sd.registerTransform({
    name: 'custom/font',
    type: 'attribute',
    filter: token => token.path[0] === 'asset' && token.path[1] === 'font',
    transform: token => transformFont(token.path)
});

sd.registerFormat({
    name: 'custom/font-face',
    format: ({ dictionary: { allTokens }, options }) => formatFontFace(allTokens, options)
});

sd.registerFormat({
    name: 'custom/css/responsive',
    format: ({ dictionary }) => formatCssResponsive(dictionary)
});

sd.buildAllPlatforms();