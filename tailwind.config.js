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
      strongBlack: '#000',
      black: '#0d0526',
      white: '#fff',
      blue: '#1A5AFF',
      red: '#D84B4B',
      yellow: '#F9A826',
      violet: '#9733EE',
      green: '#4E8B43',
      gray: {
        50: '#FAFAFA',
        100: '#F2F2F2',
        200: '#F5F5F5',
        300: 'rgba(160, 160, 160, 0.2)',
        400: '#6A6A6A',
        500: '#6E6E6E',
        600: '#6E6E6E',
        700: '#3A3A3A',
        800: '#3A3A3A',
        900: '#1A1A1A'
      }
    },
    fontSize: {
      12: '12px',
      14: '14px',
      16: '16px',
      18: '18px',
      22: '22px',
      26: '26px',
      28: '28px',
      32: '32px',
      34: '34px',
      38: '38px'
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
        normal: '120%'
      }
    }
  },
  variants: {
    extend: {}
  }
}
