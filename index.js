const sro = require('self-referenced-object');

const buildTokens = (options) => {
  const tokens = {};

  const concatKeys = (pre, object) => {
    Object.entries(object).forEach(([key, value]) => {
      const tokenKey = pre + key;
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

  const tokenObject = sro(options.tokens);
  concatKeys('', tokenObject);
  return tokens;
};

module.exports = buildTokens;
