const test = require('ava');

const buildTokens = require('../index.js');

const simpleTokens = {
  a: {
    b: 'a',
  }
};

test(
  'supports unnested tokens',
  t => {
    t.deepEqual(buildTokens({ tokens: {
      a: 'a',
    }}).toJs(), {
      a: 'a',
    });
  }
);

test(
  'supports deeply nested tokens',
  t => {
    t.deepEqual(buildTokens({ tokens: {
      a: { b: { c: { d: { e: 'a' } } } }
    }}).toJs(), {
      aBCDE: 'a',
    });
  }
);

test(
  'supports self referencing objects',
  t => {
    t.deepEqual(buildTokens({ tokens: {
      a: 'a',
      b: 'b',
      c: {
        d: 'd',  
      },
      ab: '${this.a}${this.b}',
      d: '${this.c.d}',
    }}).toJs(), {
      a: 'a',
      b: 'b',
      cD: 'd',
      ab: 'ab',
      d: 'd',
    });
  }
);

test(
  'exports js tokens',
  t => {
    t.deepEqual(buildTokens({ tokens: {
      a: 'a',
    }}).toJs(), {
      a: 'a',
    });
  }
);

test(
  'exports scss tokens',
  t => {
    t.deepEqual(buildTokens({ tokens: {
      a: 'a',
    }}).toScss(), {
      ['$a']: 'a',
    });
  }
);

test(
  'exports css tokens',
  t => {
    t.deepEqual(buildTokens({ tokens: {
      a: 'a',
    }}).toCss(), {
      ['--a']: 'a',
    });
  }
);

test(
  'supports camelCase',
  t => {
    t.deepEqual(buildTokens({
      jsCasing: 'camelCase',
      tokens: simpleTokens,
    }).toJs(), {
      aB: 'a',
    });
  }
);

test(
  'supports snake_case',
  t => {
    t.deepEqual(buildTokens({
      jsCasing: 'snake_case',
      tokens: simpleTokens,
    }).toJs(), {
      ['a_b']: 'a',
    });
  }
);

test(
  'supports dash-case',
  t => {
    t.deepEqual(buildTokens({
      jsCasing: 'dash-case',
      tokens: simpleTokens,
    }).toJs(), {
      ['a-b']: 'a',
    });
  }
);

test(
  'supports PascalCase',
  t => {
    t.deepEqual(buildTokens({
      jsCasing: 'PascalCase',
      tokens: simpleTokens,
    }).toJs(), {
      ['AB']: 'a',
    });
  }
);

test(
  'supports converting camelCased tokens',
  t => {
    t.deepEqual(buildTokens({
      jsCasing: 'snake_case',
      tokens: {
        camelCased: {
          myToken: 'a',
        },
      },
    }).toJs(), {
      ['camel_cased_my_token']: 'a',
    });
  }
);

test(
  'supports converting camelCased tokens with numbers',
  t => {
    t.deepEqual(buildTokens({
      jsCasing: 'snake_case',
      tokens: {
        camelCase: {
          400: 'a',
        },
      },
    }).toJs(), {
      ['camel_case_400']: 'a',
    });

    t.deepEqual(buildTokens({
      jsCasing: 'camelCase',
      tokens: {
        camelCase: {
          400: 'a',
        },
      },
    }).toJs(), {
      ['camelCase400']: 'a',
    });
  }
);

test(
  'supports namespace',
  t => {
    t.deepEqual(buildTokens({
      namespace: 'space',
      jsCasing: 'snake_case',
      tokens: simpleTokens,
    }).toJs(), {
      space_a_b: 'a',
    });
  }
);
