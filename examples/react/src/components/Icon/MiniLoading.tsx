const MiniLoading = (props?: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      id="loading"
      color="#000"
      {...props}
    >
      <circle cx="17.8" cy="6.2" r="2" fill="currentColor" fillOpacity=".9" />
      <circle cx="12" cy="4" r="2" fill="currentColor" fillOpacity=".8" />
      <circle cx="6.2" cy="6.2" r="2" fill="currentColor" fillOpacity=".7" />
      <circle cx="4" cy="12" r="2" fill="currentColor" fillOpacity=".6" />
      <circle cx="6.2" cy="17.6" r="2" fill="currentColor" fillOpacity=".5" />
      <circle cx="12" cy="20" r="2" fill="currentColor" fillOpacity=".4" />
      <circle cx="17.8" cy="17.6" r="2" fill="currentColor" fillOpacity=".3" />
      <circle cx="20" cy="12" r="2" fill="currentColor" fillOpacity=".2" />
    </svg>
  );
};

export default MiniLoading;
