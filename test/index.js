const buildTokens = require('../index.js');
const border = require ('./border.js');
const breakpoint= require ('./breakpoint.js');
const color = require ('./color.js');
const page = require ('./page.js');
const shadow = require ('./shadow.js');
const space = require ('./space.js');
const text = require ('./text.js');
const zIndex = require ('./zIndex.js');

const tokens = {
  border,
  breakpoint,
  color,
  page,
  shadow,
  space,
  text,
  zIndex,
};

const output = buildTokens({
  namespace: 'ace',
  cssDelimiter: 'dash-case',
  jsDelimiter: 'camelCase',
  scssDelmiter: 'snake_case',
  tokens,
});

console.log(output);

// tokens.toSCSS();
// tokens.toCSS();
// tokens.toJS();

// // better to use HOC style api?
// tokens.buildColors(ColorComponent);
// tokens.buildType(TypeComponent);

// Make sure that there is an api for "default"
//
//
// Support Theming tokens as well
