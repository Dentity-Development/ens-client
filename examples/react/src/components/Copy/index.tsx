import { useState } from 'react';
import copy from 'copy-to-clipboard';
import Copy from '../Icon/Copy';
import Tick from '../Icon/Tick';
import { twMerge } from 'tailwind-merge';

interface CopyProps {
  size?: number;
  content: string | number;
}

const CopyText = ({ content, size }: CopyProps) => {
  const [isCopied, setIsCopied] = useState(false);
  return (
    <>
      <Copy
        color="rgb(155, 155, 166)"
        className={twMerge('cursor-pointer', isCopied && 'hidden')}
        style={{
          ...(size && {
            width: `${size}px`,
            height: `${size}px`,
          }),
        }}
        onClick={() => {
          copy(String(content));
          setIsCopied(true);
          setTimeout(() => {
            setIsCopied(false);
          }, 1000);
        }}
      />
      <Tick
        color="rgb(155, 155, 166)"
        style={{
          ...(size && {
            width: `${size}px`,
            height: `${size}px`,
          }),
        }}
        className={twMerge(
          'hidden',
          isCopied && 'block',
          size && `size-[${size}px]`,
        )}
      />
    </>
  );
};

export default CopyText;
