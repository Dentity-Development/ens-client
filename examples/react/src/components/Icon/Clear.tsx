const Clear = (props?: React.SVGProps<SVGSVGElement>) => {
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
      <g clipPath="url(#a)">
        <path
          fill="currentColor"
          d="M66.243 29.757a6 6 0 0 1 0 8.486L56.485 48l9.758 9.757a6 6 0 1 1-8.486 8.486L48 56.485l-9.757 9.758a6 6 0 1 1-8.486-8.486L39.515 48l-9.758-9.757a6 6 0 1 1 8.486-8.486L48 39.515l9.757-9.758a6 6 0 0 1 8.486 0Z"
        ></path>
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M48 96c26.51 0 48-21.49 48-48S74.51 0 48 0 0 21.49 0 48s21.49 48 48 48Zm0-12c19.882 0 36-16.118 36-36S67.882 12 48 12 12 28.118 12 48s16.118 36 36 36Z"
          clipRule="evenodd"
        ></path>
      </g>
      <defs>
        <clipPath id="a">
          <rect width="96" height="96" fill="#fff"></rect>
        </clipPath>
      </defs>
    </svg>
  );
};

export default Clear;
