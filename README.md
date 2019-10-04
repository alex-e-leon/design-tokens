# Design tokens

Simple configuration for defining, maintaining and building design tokens.

## Why you might want to use design-tokens

Design tokens are a great way to manage basic design rules for digital projects, but defining and maintaining them can be tedious and error prone, and using them across multiple languages (js + css for example) can be difficult.

design-tokens makes all of this easy, as it allows you to define your tokens in a simple and powerful format, and then allows you to build your design tokens for multiple target languages based off a single configuration.

## So what does it look like?

```
const tokenConfig = {
  color: {
    primary: {
      500: '#xxx',
      600: '#xxx',
    },
    neutral: {
      500: '#xxx',
      600: '#xxx',
    }
  },
  text: {
    ...
  }
};

const tokens = buildTokens({
  namespace: 'myFirst',
  tokens: tokenConfig,
  jsDelimiter: 'camelCase',
  scssDelimiter: 'dashCase',
  cssDelimiter: 'dashCase',
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

## API

```
const tokens = buildTokens({
  namespace: 'myFirst',
  tokens: tokenConfig,
  jsDelimiter: 'camelCase',
  scssDelimiter: 'dashCase',
  cssDelimiter: 'dashCase',
});
```

- namespace: applies a custom namespace to the beginning of all your tokens
- tokens: the token config file. See token config for more information
- jsDelimiter, scssDelimiter, cssDelimiter: one of `camelCase`, `snake_case`, `camel-case`, or `PascalCase` - transforms the output to the casing of your choice for various output methods. Default is camelCase.

```
tokens.buildJs();
tokens.buildCss();
tokens.buildScss();
```

Outputs your tokens to any of the above previous formats.

### Token config

design-tokens allows you to define your tokens in a flat or nested format to help categorise your tokens. In the future, the design-tokens library will also provide components to help document common types of design tokens, such as color, spacing, typography, and organising your design tokens in a nested format will make it easy to automatically document different types of design tokens.

design-tokens also transforms camelCased object key names, so if you'd like to define your tokens in a flat format, `myColorToken` will be transformed to `my-color-token` if you choose to export your tokens with camel-case.

design-tokens also allows you to use the values of tokens that you've already defined in the config file. It uses the [self-referenced-object](https://github.com/alex-e-leon/self-referenced-object) under the hood. This allows you to define tokens that reference each other for example:

```
const tokenConfig = {
  color: {
    primary: {
      500: '#xxx',
      600: '#xxx',
    },
    secondary: {
      500: '${this.color.primary.500}',
      600: '${this.color.primary.600}',
    }
  },
};
```
