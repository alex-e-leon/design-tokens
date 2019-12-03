# design-tokens

Simple configuration for defining, maintaining and building design tokens.

## Why you might want to use design-tokens

Design tokens are a great way to manage basic design rules for digital projects, but defining and maintaining them can be tedious and error prone, and using them across multiple languages (js + css for example) can be difficult.

design-tokens makes all of this easy, as it allows you to define your tokens in a simple and powerful format, and then allows you to build your design tokens for multiple target languages based off a single configuration.

## So what does it look like?

`npm i -D design-tokens`

```js
// design-token-config.js

export default {
  namespace: 'dt',
  jsCasing: 'camelCase',
  scssCasing: 'dashCase',
  cssCasing: 'dashCase',

  tokens: {
    colorPrimary500: '#xxx',
    colorPrimary600: '#xxx',
    colorNeutral500: '#xxx',
    colorNeutral600: '#xxx',
    text500FontSize: 'xxpx',
    text600FontSize: 'xxpx',
    ...
  },
};

```
### CLI

The cli gives you an easy way to build out design tokens in different output formats from the same base values such as in CI/CD pipelines.

```
Usage: generate-tokens [options] <entryFile>

Build design tokens for multiple languages from a design-token config file

Options:
  --js <outputFile>    Build js tokens
  --css <outputFile>   Build css tokens
  --scss <outputFile>  Build scss tokens
  -h, --help           output usage information
```

Example usage: `generate-tokens design-token-config.js --js design-tokens.js --scss design-tokens.scss --css design-tokens.css`

### JS

```js
import buildTokens from 'design-tokens';
import tokenConfig from './design-token-config';

const tokens = buildTokens(tokenConfig);

const jsTokens = tokens.buildJs();
const cssTokens = tokens.buildCss();
const scssTokens = tokens.buildScss();
```

## API

Token config options

- `namespace`: applies a custom namespace to the beginning of all your tokens
- `jsCasing`, `scssCasing`, `cssCasing`: one of `camelCase`, `snake_case`, `camel-case`, or `PascalCase` - transforms the output to the casing of your choice for various output methods. Default is camelCase.
- `tokens`: the token config file. See token config for more information


### Token config

The token config has a few features to support managing your design tokens.

#### Nesting

design-tokens allows you to define your tokens in a flat or nested format to help categorise your tokens. In the future, the design-tokens library will also provide components to help document common types of design tokens, such as color, spacing, typography, and organising your design tokens in a nested format will make it easy to automatically document different types of design tokens.

design-tokens will generate token names by concatenating all the nested categories together. For example:

```
tokens: {
  color: {
    primary: {
      500: '#xxx',
      600: '#xxx',
    },
    neutral: {
      500: '${this.color.primary.500}',
      600: '${this.color.primary.600}',
    }
  },
},
```

Would generate

```
colorPrimary500: '#xxx',
colorPrimary600: '#xxx',
colorNeutral500: '#xxx',
colorNeutral600: '#xxx',

```

#### Casing

design-tokens supports different casing outputs. As you've just seen if you nest objects design-tokens will treat the different 
transforms camelCased object key names, so if you'd like to define your tokens in a flat format, `myColorToken` will be transformed to `my-color-token` if you choose to export your tokens with dash-case.


design-tokens also allows you to use the values of tokens that you've already defined in the config file. It uses the [self-referenced-object](https://github.com/alex-e-leon/self-referenced-object) under the hood. This allows you to define tokens that reference each other for example:

```
const tokens = buildTokens({
  namespace: 'myFirst',
  jsCasing: 'camelCase',
  scssCasing: 'snakeCase',
  cssCasing: 'snakeCase',
  tokens: {
    color: {
      primary: {
        500: '#xxx',
        600: '#xxx',
      },
      neutral: {
        500: '${this.color.primary.500}',
        600: '${this.color.primary.600}',
      }
    },
  },
});

console.log(tokens.toJs());

//{
//  myFirstColorPrimary500: '#xxx',
//  myFirstColorPrimary600: '#xxx',
//  myFirstColorNeutral500: '#xxx',
//  myFirstColorNeutral600: '#xxx',
//  ...
//}

console.log(tokens.toScss());

//{
//  ['$my-first-color-primary-500']: '#xxx',
//  ['$my-first-color-primary-600']: '#xxx',
//  ['$my-first-color-neutral-500']: '#xxx',
//  ['$my-first-color-neutral-600']: '#xxx',
//  ...
//}

console.log(tokens.toCss());

//{
//  ['--my-first-color-primary-500']: '#xxx',
//  ['--my-first-color-primary-600']: '#xxx',
//  ['--my-first-color-neutral-500']: '#xxx',
//  ['--my-first-color-neutral-600']: '#xxx',
//  ...
//}
```

## Contributions

If you'd like design-tokens to support any other output formats - or any other features, please create an issue. Pull requests also welcome :)
