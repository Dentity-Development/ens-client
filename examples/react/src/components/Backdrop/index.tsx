 
import { twMerge } from 'tailwind-merge';
// import useClickOutside from '../../hooks/useClickOutside';
// import { useRef } from 'react';

export interface SearchBackdropProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
}

const Backdrop = ({ open, children }: SearchBackdropProps) => {
  // const containerRef = useRef<HTMLElement | null>(null);

  // useClickOutside(containerRef!, () => {
  //   setOpen(false);
  // });

  return (
    <>
      <section
        className={twMerge(
          'bg-backdrop justify-center fixed inset-0 z-[1000] hidden',
          open && 'flex',
        )}
      >
        <div
          className="w-max h-max"
          // ref={containerRef as any}
        >
          {children}
        </div>
      </section>
    </>
  );
};

export default Backdrop;
