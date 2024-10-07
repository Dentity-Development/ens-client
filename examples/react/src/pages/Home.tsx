import Typography from '../components/Typography';
import MagnifyingGlass from '../components/Icon/MagnifyingGlass';
import { useLayoutEffect, useRef, useState } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import Dentity from '../components/Icon/Dentity';

function displayTextWidth(text, font) {
  const canvas =
    (displayTextWidth as any).canvas ||
    ((displayTextWidth as any).canvas = document.createElement('canvas'));
  const context = canvas.getContext('2d');
  context.font = font;
  const metrics = context.measureText(text);
  return metrics.width;
}

const Home = () => {
  const navigate = useNavigate();
  const [ensName, setEnsName] = useState('');
  const [inputWidth, setInputWidth] = useState(0);
  const isMd = useMediaQuery('(min-width: 768px)');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleGo = () => {
    if (ensName.trim()) navigate(`/ens/${ensName.trim()}.eth`);
  };

  useLayoutEffect(() => {
    document.title = 'Dentity';
  }, []);

  return (
    <main className="w-[90dvw] m-auto">
      <div className="flex flex-col justify-center items-center min-h-[100dvh]">
        <Dentity
          className="size-[180px] mb-12"
          textIconProps={{
            className: 'w-[650px] h-[180px]',
          }}
        />

        <section
          className="flex items-center justify-center w-full cursor-pointer mt-12"
          onClick={() => {
            inputRef.current.focus();
          }}
        >
          <div className="relative w-full h-[64px] md:h-[161px] p-[16px] md:p-[20px] box-border bg-white flex items-center justify-between rounded-l-[60px]">
            <div className="flex items-center h-full w-[calc(100%_-_28px)] md:w-[calc(100%_-_56px)]">
              <div className="w-max md:max-w-[calc(100%_-_218px)] overflow-hidden">
                <input
                  className="font-bold w-max bg-transparent text-[24px] md:text-[76px] outline-none h-[56px] md:h-[144px] placeholder:font-bold placeholder:text-[24px] md:placeholder:text-[76px]"
                  value={ensName}
                  onChange={(e) => {
                    setEnsName(e.target.value);
                    setInputWidth(
                      displayTextWidth(
                        e.target.value,
                        `bold ${isMd ? 76 : 24}px "Inter", sans-serif`,
                      ),
                    );
                  }}
                  onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                      handleGo();
                    }
                  }}
                  ref={inputRef}
                  placeholder="Find your   .eth"
                  style={{
                    width: inputWidth ? `${inputWidth}px` : '100%',
                  }}
                />
              </div>
              {ensName.trim() && (
                <Typography className="font-bold text-[24px] md:text-[76px]">
                  .eth
                </Typography>
              )}
            </div>

            <div
              className="absolute size-[161px] flex items-center justify-center right-[-28px] bg-gray-900 rounded-full hover:opacity-[0.9]"
              onClick={() => {
                handleGo();
              }}
            >
              <MagnifyingGlass
                className=" size-[20px] min-w-[20px] md:min-w-[56px] md:size-[56px] cursor-pointer text-white absolute left-[50%] top-[50%]"
                style={{
                  transform: 'translate(-50%,-50%)',
                }}
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;
