import type { SVGProps } from 'react';
const SvgEyeOff = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        viewBox="0 0 24 24"
        {...props}
    >
        <path
            stroke="none"
            d="M0 0h24v24H0z"
        />
        <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
        <path d="M16.681 16.673A8.7 8.7 0 0 1 12 18q-5.4 0-9-6 1.908-3.18 4.32-4.674m2.86-1.146A9 9 0 0 1 12 6q5.4 0 9 6-1 1.665-2.138 2.87M3 3l18 18" />
    </svg>
);
export default SvgEyeOff;
