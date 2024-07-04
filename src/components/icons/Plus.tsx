import type { SVGProps } from 'react';
const SvgPlus = (props: SVGProps<SVGSVGElement>) => (
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
        <path d="M12 5v14M5 12h14" />
    </svg>
);
export default SvgPlus;
