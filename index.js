const sro = require('self-referenced-object');
const changeCase = require('change-case');

const camelCaseFix = (string) => {
  return changeCase.camelCase(string).replace('_', '');
}

const cases = {
  'snake_case': changeCase.snakeCase,
  'camelCase': camelCaseFix,
  'PascalCase': changeCase.pascalCase,
  'dash-case': changeCase.paramCase,
}

const tokenizeKey = (key) => {
  return changeCase.snakeCase(key);
};

const concatTokenObject = (object, namespace) => {
  const tokens = {};

  const concatKeys = (pre, object) => {
    Object.entries(object).forEach(([key, value]) => {
      const tokenKey = pre ? pre + '_' + tokenizeKey(key) : tokenizeKey(key);
      if (typeof value === 'object') {
        concatKeys(tokenKey, value);
      } else {
        if (tokens[tokenKey]) {
          console.log('duplicate token defined');
        }
        tokens[tokenKey] = value;
      }
    });
  };

  concatKeys(namespace ? namespace : '', object);
  return tokens;
};

const changeObjectCase = (object, caseName = 'camelCase', prefix = '') => {
  return Object.entries(object).reduce((acc, [key, value]) => {
    acc[prefix + cases[caseName](key)] = value;
    return acc;
  }, {});
};

const buildTokenVariation = (tokenObject, namespace, casing, prefix) => {
  return changeObjectCase(
    concatTokenObject(tokenObject, namespace),
    casing,
    prefix,
  );
}


const buildTokens = (options) => {
  const tokenObject = sro(options.tokens);

  const tokens = {};

  tokens.toJs = () => {
    return buildTokenVariation(tokenObject, options.namespace, options.jsCasing, '');
  }

  tokens.toScss = () => {
    return buildTokenVariation(tokenObject, options.namespace, options.scssCasing, '$');
  }

  tokens.toCss = () => {
    return buildTokenVariation(tokenObject, options.namespace, options.cssCasing, '--');
  }

  return tokens;
};

module.exports = buildTokens;
