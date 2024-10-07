const Share = (props?: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M0 8.152c0-2.63 2.12-4.76 4.735-4.76h6.033c.895 0 1.621.73 1.621 1.63s-.726 1.63-1.621 1.63H4.735c-.824 0-1.492.672-1.492 1.5V19.24c0 .829.668 1.5 1.492 1.5h11.027c.824 0 1.492-.671 1.492-1.5v-5.674c0-.9.726-1.63 1.622-1.63.895 0 1.621.73 1.621 1.63v5.674c0 2.63-2.12 4.761-4.735 4.761H4.735C2.12 24 0 21.869 0 19.24z"
        clipRule="evenodd"
      ></path>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M13.232 1.63c0-.9.727-1.63 1.622-1.63h7.524C23.274 0 24 .73 24 1.63v7.305c0 .9-.726 1.63-1.622 1.63-.895 0-1.621-.73-1.621-1.63V5.567l-8.908 8.956a1.616 1.616 0 0 1-2.293 0 1.637 1.637 0 0 1 0-2.306l8.907-8.956h-3.609c-.895 0-1.622-.73-1.622-1.63"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default Share;
