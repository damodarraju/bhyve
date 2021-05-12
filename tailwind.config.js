module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    fontFamily: {
     'sans': ['Helvetica', 'Arial', 'sans-serif'],
    },
    height: {
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '48px',
    }
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
  
}
