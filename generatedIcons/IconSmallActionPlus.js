import * as React from "react";
const SvgIconSmallActionPlus = ({ viewBox = "0 0 16 16", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox} {...props}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8 2a1 1 0 0 1 1 1v4h4a1 1 0 0 1 0 2H9v4a1 1 0 0 1-2 0V9H3a1 1 0 0 1 0-2h4V3a1 1 0 0 1 1-1"
    />
  </svg>
);
export default SvgIconSmallActionPlus;
