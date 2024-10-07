/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        input: 'rgb(206, 225, 232)',
        'alice-blue': 'aliceblue',
        'gray-hover': 'rgb(245, 245, 245)',
        wave: '#353941',
        backdrop: 'rgba(0,0,0,0.5)',
      },
      colors: {
        'blue-primary': 'rgb(56, 136, 255)',
        'border-gray': 'rgb(232, 232, 232)',
        'gray-bold': 'rgb(155, 155, 166)',
        'black-primary': '#262626',
      },
      fontFamily: {
        inter: '"Inter", sans-serif;',
      },
      backgroundImage: {
        'blue-gradient':
          'linear-gradient(330.4deg, rgb(68, 188, 240) 4.54%, rgb(114, 152, 248) 59.2%, rgb(160, 153, 255) 148.85%)',
        'body-gray':
          'radial-gradient(50% 50% at 50% 50%,rgba(82, 152, 255, 0.063) 0%,rgba(255, 255, 255, 0) 100%),rgb(247, 247, 247)',
      },
    },
  },
  plugins: [],
};
