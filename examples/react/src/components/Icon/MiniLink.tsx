const MiniLink = (props?: React.SVGProps<SVGSVGElement>) => {
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
        d="m43.757 7.757-34 34a6 6 0 0 0 8.486 8.486L42 26.485V84a6 6 0 0 0 12 0V26.485l23.757 23.758a6 6 0 0 0 8.486-8.486L52.257 7.772l-.014-.015a6 6 0 0 0-8.486 0Z"
      ></path>
    </svg>
  );
};

export default MiniLink;
