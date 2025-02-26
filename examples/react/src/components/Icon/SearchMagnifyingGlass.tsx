const SearchMagnifyingGlass = (props?: React.SVGProps<SVGSVGElement>) => {
  return (
    <>
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
          d="M48 42c0-5.523-4.477-10-10-10a6 6 0 0 1 0-12c12.15 0 22 9.85 22 22a6 6 0 0 1-12 0Z"
        ></path>
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M72.209 63.724A39.82 39.82 0 0 0 80 40C80 17.909 62.091 0 40 0S0 17.909 0 40s17.909 40 40 40a39.82 39.82 0 0 0 23.724-7.791l18.033 18.034a6 6 0 1 0 8.486-8.486L72.209 63.723ZM40 68c15.464 0 28-12.536 28-28S55.464 12 40 12 12 24.536 12 40s12.536 28 28 28Z"
          clipRule="evenodd"
        ></path>
      </svg>
    </>
  );
};

export default SearchMagnifyingGlass;
