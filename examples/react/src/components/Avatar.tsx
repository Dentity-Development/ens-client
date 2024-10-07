import React, { useLayoutEffect, useState } from 'react';
import { DEFAULT_AVATAR } from '../common/constant';
import { twMerge } from 'tailwind-merge';

const Avatar = ({
  src,
  className /*  */,
}: {
  src: string;
  className?: string;
}) => {
  const [aSrc, setASrc] = useState(() => DEFAULT_AVATAR);

  useLayoutEffect(() => {
    setASrc(src || DEFAULT_AVATAR);
  }, [src]);

  return (
    <img
      className={twMerge('rounded-full', className)}
      src={aSrc}
      onError={() => {
        setASrc(DEFAULT_AVATAR);
      }}
    />
  );
};

export default Avatar;
