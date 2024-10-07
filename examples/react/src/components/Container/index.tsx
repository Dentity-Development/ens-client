import { PropsWithChildren } from 'react';

const Container = ({ children }: PropsWithChildren) => {
  return <section className="max-w-[768px] m-auto">{children}</section>;
};

export default Container;
