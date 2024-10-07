const ThreeDots = (props?: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 96 96"
      width="1em"
      height="1em"
      focusable="false"
      shapeRendering="geometricPrecision"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M37 15c0-6.075 4.925-11 11-11s11 4.925 11 11-4.925 11-11 11-11-4.925-11-11Zm0 66c0-6.075 4.925-11 11-11s11 4.925 11 11-4.925 11-11 11-11-4.925-11-11Zm11-44c-6.075 0-11 4.925-11 11s4.925 11 11 11 11-4.925 11-11-4.925-11-11-11Z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default ThreeDots;
