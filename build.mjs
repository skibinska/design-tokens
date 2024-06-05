import StyleDictionary from 'style-dictionary';
import {registerTransforms} from '@tokens-studio/sd-transforms';

import {transformRem} from "./transforms/transformRem.mjs";

// will register them on StyleDictionary object
// that is installed as a dependency of this package.
registerTransforms(StyleDictionary);

const sd = new StyleDictionary('config.json', {
    expand: {
        composition: false,
        typography: true,
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

await sd.buildAllPlatforms();