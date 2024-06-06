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

sd.buildAllPlatforms();