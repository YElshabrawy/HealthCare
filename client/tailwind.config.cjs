/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#1678F2',
                grad1: '#3A8EF6',
                grad2: '#6F3AFA',
                transparent: 'transparent',
                current: 'currentColor',
            },
            screens: {
                sm: '695px',
            },
        },
    },
    variants: {
        fill: ['hover', 'focus'], // this line does the trick
    },
    plugins: [],
};
