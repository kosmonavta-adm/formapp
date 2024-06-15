import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            screens: {
                ['tn']: '365px',
                ['3xl']: '1680px',
                ['4xl']: '1920px',
                ['ultra']: '2560px',
            },
        },
        fontFamily: {
            main: 'var(--main-font)',
        },
        colors: {
            white: '#fff',
            black: '#000',
            blue: {
                '50': '#eff9ff',
                '100': '#dcf0fd',
                '200': '#c1e5fc',
                '300': '#96d6fa',
                '400': '#64bef6',
                '500': '#40a1f1',
                '600': '#378ce7',
                '700': '#226ed3',
                '800': '#2259ab',
                '900': '#214c87',
                '950': '#193052',
            },
            red: {
                '50': '#fff0f2',
                '100': '#ffe2e6',
                '200': '#ffcad3',
                '300': '#ff9fae',
                '400': '#ff6984',
                '500': '#ff204e',
                '600': '#ed1149',
                '700': '#c8083e',
                '800': '#a8093b',
                '900': '#8f0c39',
                '950': '#50011a',
            },
            neutral: {
                '50': '#f6f6f6',
                '100': '#e7e7e7',
                '200': '#d1d1d1',
                '300': '#b0b0b0',
                '400': '#8f8f8f',
                '500': '#6d6d6d',
                '600': '#5d5d5d',
                '700': '#4f4f4f',
                '800': '#454545',
                '900': '#3d3d3d',
                '950': '#262626',
            },
        },
    },
    plugins: [],
};
export default config;
