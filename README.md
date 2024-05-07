# design-tokens

[Tokens Studio for Figma](https://tokens.studio/) is a Figma plugin that enables us to integrate tokens into our Figma designs.

Since tokens are most useful in a team environment, it is essential to have version control in place to ensure that token values remain updated while team members are working on different files.
The recommended approach to hosting our code and design decisions in the same location is by syncing it with GitHub.

## Supported Tokens by Tokens Studio for Figma

- Colours (Fill, Border Color — hex, rgba, hsla) incl. colour modifiers such as lighten, darken, mix or alpha
- Spacing (Horizontal, Vertical, Gap)
- Sizing (Width/Height)
- Dimension (spacing, sizing, border radius,border width, background blur)
- Opacity
- Typography (Font family, font weight, font size, line height, letter spacing, paragraph spacing)
- Shadow tokens (both dropShadow and innerShadow)
- Border tokens (color, width, strokeStyle)
- Border Radius (individually or each corner)
- Border Width
- Asset tokens (image fill)
- [Pro]: Composition tokens (think css classes for Figma) - paid option

## How to use tokens stored in GitHub in development?

[Style Dictionary](https://amzn.github.io/style-dictionary/#/) is a powerful tool for converting design tokens into functional code for various platforms, including the web using CSS variables.

Once Style Dictionary is installed, we can begin the process of transforming our design tokens. Here is an overview of the steps involved:

1. Define your design tokens in a JSON file.
2. Configure Style Dictionary to convert your design tokens into functional code.
3. Generate the code for your desired platform.

[Transforming design tokens using Style Dictionary](https://docs.tokens.studio/transforming/style-dictionary)

## Figma example
[Figma example used for this repo](https://www.figma.com/file/6vTgVlm4anJykhhWZK882S/Ewelina's-team-library?type=design&mode=design&t=Htpjk10udp2W5OO5-0)
