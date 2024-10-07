import { twMerge } from 'tailwind-merge';
import Copy from '../Icon/Copy';
import MiniLink from '../Icon/MiniLink';
import ThreeDots from '../Icon/ThreeDots';
import { useEffect, useMemo, useRef, useState } from 'react';
import useClickOutside from '../../hooks/useClickOutside';

interface VpTagProps {
  icon: React.ReactNode;
  content: React.ReactNode;
  popoverItems?: Array<React.ReactNode>;
  link?: string;
  copyValue?: string;
  rightComponent?: React.ReactNode;
  className?: string;
}

const VpTag = ({
  content,
  icon,
  className,
  copyValue,
  link,
  popoverItems,
  rightComponent,
}: VpTagProps) => {
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const [popoverTop, setPopoverTop] = useState<number | null>(null);

  const isPopover = useMemo(
    () => Array.isArray(popoverItems) && popoverItems.length > 0,
    [popoverItems],
  );
  useClickOutside(popoverRef, () => {
    setIsOpenPopover(false);
  });

  useEffect(() => {
    if (
      isOpenPopover &&
      popoverRef.current &&
      popoverRef.current?.clientHeight
    ) {
      setPopoverTop((popoverRef.current?.clientHeight + 8) * -1);
    } else {
      setPopoverTop(null);
    }
  }, [isOpenPopover]);
  // const []

  return (
    <div
      className={twMerge(
        'w-max relative flex bg-alice-blue rounded-lg',
        className,
      )}
      onClick={() => {
        if (!isOpenPopover && isPopover) {
          setIsOpenPopover(true);
        }
      }}
    >
      <div className="flex items-center p-[10px_12px] rounded-lg border border-border-gray h-[40px] box-border w-max">
        {icon}
        <div className="text-black-primary ml-2 font-medium">{content}</div>

        <div className="ml-2">
          {copyValue && <Copy />}
          {link && <MiniLink />}
          {popoverItems && <ThreeDots className="size-[12px]" />}
        </div>
      </div>
      {rightComponent}

      {isPopover && (
        <div
          className="p-[6px] absolute flex flex-col bg-white rounded-lg w-max left-[50%] border border-border-gray"
          style={{
            transform: 'translate(-50%,0)',
            top: `${popoverTop || 0}px`,
            ...(!isOpenPopover && { display: 'none' }),
          }}
          ref={popoverRef}
        >
          {popoverItems.map((component) => (
            <div
              className="p-[8px] hover:bg-gray-hover rounded-lg"
              onClick={() => {
                setIsOpenPopover(false);
              }}
            >
              {component}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VpTag;
