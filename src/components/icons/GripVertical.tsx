import type { SVGProps } from 'react';
const SvgGripVertical = (props: SVGProps<SVGSVGElement>) => (
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
        <path d="M8 5a1 1 0 1 0 2 0 1 1 0 1 0-2 0M8 12a1 1 0 1 0 2 0 1 1 0 1 0-2 0M8 19a1 1 0 1 0 2 0 1 1 0 1 0-2 0M14 5a1 1 0 1 0 2 0 1 1 0 1 0-2 0M14 12a1 1 0 1 0 2 0 1 1 0 1 0-2 0M14 19a1 1 0 1 0 2 0 1 1 0 1 0-2 0" />
    </svg>
);
export default SvgGripVertical;
