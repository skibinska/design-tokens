import StyleDictionary from 'style-dictionary';
import { registerTransforms } from '@tokens-studio/sd-transforms';

import { transformRem } from "./transforms/transformRem.mjs";

registerTransforms(StyleDictionary);

const sd = new StyleDictionary('config.json');

sd.registerFileHeader({
    name: `customFileHeader`,
    fileHeader: () => {
        return [
            `Wellcome Design System`,
            `Do not edit directly`
        ]
    }
});

sd.registerTransform({
    name: 'custom/rem',
    type: 'value',
    transitive: true,
    matcher: token =>
        ['sizing', 'spacing', 'borderRadius', 'fontSizes'].includes(
            token.type,
        ),
    transformer: token => transformRem(token.value),
});

await sd.buildAllPlatforms();