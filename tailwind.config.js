/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                gray: {
                    0: '#18212f',
                },
                primary: {
                    100: '#FCF4ED',
                    200: '#F7DFCA',
                    300: '#EFBF95',
                    400: '#E9A86E',
                    500: '#CC915C',
                    600: '#99693F',
                    700: '#664120',
                    800: '#33200E',
                },
                accent: {
                    white: '#FAFAFA',
                    black: '#201916',
                    gray: '#BBBBBB',
                    lightGray: '#F1F1F1',
                    background: '#FCF4ED',
                },
            },
            aspectRatio: {
                '1x1': '1 / 1',
                '1x2': '1 / 2',
                '1x3': '1 / 3',
                '2x1': '2 / 1',
                '2x3': '2 / 3',
                '3x1': '3 / 1',
                '3x2': '3 / 2',
                '3x4': '3 / 4',
                '4x1': '4 / 1',
                '4x3': '4 / 3',
                '4x5': '4 / 5',
                '5x1': '5 / 1',
                '5x2': '5 / 2',
                '5x3': '5 / 3',
                '9x10': '9 / 10',
                '16x9': '16 / 9',
                '20x9': '20 / 9',
                'golden-v': '1.618',
                'golden-h': '0.6180469715698392',
                card: '0.666666',
                'card-sm': '37 / 45',
            },
        },
    },
    plugins: [],
}
