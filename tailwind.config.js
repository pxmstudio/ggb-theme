/** @type {import('tailwindcss').Config} */

import forms from '@tailwindcss/forms';

const primitives = {
  brand: {
    turquoise: '#54BFC7',
    yellow: '#FCCA1A',
    purple: '#9343F8',
    orange: '#EA8050',
    'dark-blue': 'rgba(31,35,91,0.2)',
  },
  neutral: {
    black: '#000000',
    white: '#FFFFFF',
    lightest: '#F7F7F7',
    light: '#DCDCDC',
    neutral: '#6E6E6e',
    darker: '#383838',
  },
  success: {
    green: '#027A48',
    light: '#ECFDF3',
  },
  error: {
    red: '#F43636',
    light: '#FEF3F2',
  },
};

export default {
  content: ['./src/**/*.{html,js}', './sections/**/*.{html,liquid}', './snippets/**/*.{html,liquid}'],
  theme: {
    extend: {
      colors: {
        ...primitives,
        bg: {
          primary: primitives.neutral['white'],
          secondary: primitives.neutral['lightest'],
          alternate: primitives.brand['orange'],
          success: primitives.success['light'],
          error: primitives.error['light'],
        },
        border: {
          primary: primitives.neutral['light'],
          secondary: primitives.brand['orange'],
          success: primitives.success['green'],
          error: primitives.error['red'],
        },
        text: {
          primary: primitives.neutral['darker'],
          secondary: primitives.neutral['neutral'],
          alternate: primitives.brand['orange'],
          success: primitives.success['green'],
          error: primitives.error['red'],
        },
        link: {
          primary: primitives.neutral['darker'],
          secondary: primitives.neutral['neutral'],
          alternate: primitives.brand['orange'],
        },
      },
    },
  },
  plugins: [forms],
};
