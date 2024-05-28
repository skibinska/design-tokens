const template = (variables, { tpl }) => {

    // Function to find the viewBox attribute in the JSX tree
    const findViewBox = (jsxElement) => {
        if (
            jsxElement.openingElement &&
            jsxElement.openingElement.attributes
        ) {
            const viewBoxAttribute = jsxElement.openingElement.attributes.find(
                (attr) => attr.name && attr.name.name === 'viewBox'
            );
            return viewBoxAttribute ? viewBoxAttribute.value.value : '0 0 24 24';
        }
        return '0 0 24 24';
    };

    const viewBoxValue = findViewBox(variables.jsx);

    // Function to replace the viewBox attribute in the JSX tree with a prop
    const replaceViewBoxWithProp = (jsxElement) => {
        if (
            jsxElement.openingElement &&
            jsxElement.openingElement.attributes
        ) {
            jsxElement.openingElement.attributes = jsxElement.openingElement.attributes.map(
                (attr) => {
                    if (attr.name && attr.name.name === 'viewBox') {
                        return {
                            ...attr,
                            value: {
                                type: 'JSXExpressionContainer',
                                expression: {
                                    type: 'Identifier',
                                    name: 'viewBox'
                                }
                            }
                        };
                    }
                    return attr;
                }
            );
        }
        return jsxElement;
    };

    const updatedJsx = replaceViewBoxWithProp(variables.jsx);

    return tpl`
${variables.imports};

${variables.interfaces};

const ${variables.componentName} = ({
  viewBox = '${viewBoxValue}',
  ...props
}) => (
  ${updatedJsx}
);

${variables.exports};
`
}

module.exports = template;