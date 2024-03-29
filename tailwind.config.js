module.exports = {
  // mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
      '3xl': '1536px'
    },
    colors: {
      current: 'currentColor',
      transparent: 'transparent',
      strongBlack: '#000',
      black: '#081623',
      white: '#fff',
      blue: '#1A5AFF',
      lightBlue: 'rgba(26, 90, 255, 0.1)',
      offBlue: '#F2F1FF',
      red: '#D84B4B',
      yellow: '#F9A826',
      lightYellow: 'rgba(255, 211, 66, 0.2)',
      lightRed: 'rgba(216, 75, 75, 0.1)',
      violet: '#9733EE',
      lightViolet: 'rgba(151, 51, 238, 0.1)',
      green: '#4E8B43',
      gray: {
        50: '#FAFAFA',
        100: '#F2F2F2',
        200: '#F5F5F5',
        300: 'rgba(160, 160, 160, 0.2)',
        400: '#DCDCDC',
        500: '#B7B7B7',
        600: '#999999',
        700: '#7C7C7C',
        800: '#3A3A3A',
        900: '#1A1A1A'
      }
    },
    fontSize: {
      11: '11px',
      12: '12px',
      14: '14px',
      15: '15px',
      16: '16px',
      18: '18px',
      22: '22px',
      26: '26px',
      28: '28px',
      30: '30px',
      32: '32px',
      34: '34px',
      38: '38px',
      42: '42px',
      48: '48px',
      56: '56px',
      64: '64px',
      80: '80px',
      120: '120px'
    },
    boxShadow: {
      sm: '1px 1px 20px rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      none: 'none'
    },
    extend: {
      lineHeight: {
        smooth: '110%',
        normal: '120%',
        tight: '0.9'
      },
      maxHeight: {
        720: '720px',
        820: '820px'
      },
      maxWidth: {
        1440: '1440px'
      },
      minWidth: {
        370: '370px'
      }
    }
  },
  variants: {
    extend: {
      translate: ['active', 'group-hover']
    }
  }
}
