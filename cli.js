#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const buildTokens = require('./index');
const program = require('commander');

let entryFile;

program
  .description('Build design tokens for multiple languages from a taft config file')
  .arguments('<entryFile>')
  .action(function (input) {
    // allows us to require paths without leading `./`
    if (path.isAbsolute(input)) {
      entryFile = input;
    } else {
      entryFile = path.normalize(path.join(process.cwd(), input));
    }
  })
  .option('--js <outputFile>', 'Build js tokens')
  .option('--css <outputFile>', 'Build css tokens')
  .option('--scss <outputFile>', 'Build scss tokens')
  .parse(process.argv);

if (!entryFile || !(program.js || program.css || program.scss)) {
  console.log('an entry file and an output file are required');
  program.outputHelp();
  process.exit(0);
}


const tokens = require(entryFile);
const parsedTokens = buildTokens(tokens);

const writeTokens = (filename, tokenFunc) => {
  if (filename) {
    fs.writeFile(filename, tokenFunc(), (err) => {
      if (err) throw err;
    });
  }
}

const prettyPrintObject = (object) => (
  Object.entries(object).reduce((acc, [key, value]) => (acc + key + ': ' + value + ';\n'), '')
);

writeTokens(program.js, () => ('export default = ' + JSON.stringify(parsedTokens.toJs()) + ';'));
writeTokens(program.css, () => (':root {\n' + prettyPrintObject(parsedTokens.toCss()) + '}'));
writeTokens(program.scss, () => prettyPrintObject(parsedTokens.toScss()));
