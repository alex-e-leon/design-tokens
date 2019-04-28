const neutral = {
  900: '#0b0b0d',
  800: '#2c2c2e',
  700: '#3a3a3c',
  600: '#57575a',
  500: '#777778',
  400: '#a7a7aa',
  300: '#d4d4d7',
  200: '#ebebed',
  100: '#fafafc',
};


const primary = {
  600: '#1e8c0d',
  500: '#32a31a',
  400: '#71cc52',
  ['600Text']: '${this.color.white}',
  ['500Text']: '${this.color.white}',
  ['400Text']: '#2c2c2e',
};

const functional = {
  green: {
    500: '#168208',
    400: '#e5f7e1',
  },
  red: {
    600: '#bc0b0e',
    500: '#db353d',
    400: '#e9afad',
  },
};

module.exports = {
  white: '#fff',
  black: '#0b0b0d',
  neutral,
  primary,
  functional,
};
