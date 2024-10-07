import { useEffect, useState } from 'react';
import SearchMagnifyingGlass from '../Icon/SearchMagnifyingGlass';
import Clear from '../Icon/Clear';

import { getTextRecord } from '@ensdomains/ensjs/public';
import { debounce } from '../../utils/debounce';
import Typography from '../Typography';
import { twMerge } from 'tailwind-merge';
import MiniLoading from '../Icon/MiniLoading';
import Avatar from '../Avatar';
import client from '../../common/client';

interface SearchResult {
  avatar?: string | null;
  ensName: string;
}

const SearchInput = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [isOpenSearch, setIsOpenSeach] = useState(false);
  const [searchResult, setSearchResults] = useState<Array<SearchResult>>([]);
  // const [error]

  useEffect(() => {
    const searchInner = debounce(async () => {
      try {
        setIsLoadingSearch(true);
        setSearchResults([]);
        const ensName = searchValue.trim().replace(/.eth$/, '') + '.eth';

        const ethAddress = await client.getOwner({ name: ensName });
        if (ethAddress) {
          // const { texts } = await client.getRecords({
          //   name: ensName,
          //   texts: ['avatar', 'description'],
          // });

          const batchData = await client.ensBatch(
            getTextRecord.batch({ name: ensName, key: 'avatar' }),
          );
          setSearchResults([
            {
              avatar: batchData[0],
              ensName: ensName,
            },
          ]);
          console.log(batchData);
        }
      } catch {
        //
      } finally {
        setIsLoadingSearch(false);
      }
    }, 500);
    if (searchValue.trim()) searchInner();

    return () => {
      searchInner.clear();
    };
  }, [searchValue]);

  return (
    <section>
      <div className="relative">
        <SearchMagnifyingGlass
          className="absolute top-[50%] left-3"
          style={{
            transform: 'translate(0px,-50%)',
          }}
          color="rgb(155, 155, 166)"
        />
        <input
          className="h-[46px] px-[48px] rounded-full leading-5 font-medium w-[320px] placeholder:font-medium"
          value={searchValue}
          style={{
            color: 'rgb(38, 38, 38)',
          }}
          placeholder="Search for a name"
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          onFocus={() => {
            setIsOpenSeach(true);
          }}
        />
        {searchValue.trim() && (
          <>
            {isLoadingSearch ? (
              <div
                className="absolute top-[50%] right-3 size-[1em]"
                style={{
                  transform: 'translate(0px,-50%)',
                }}
              >
                <MiniLoading className="animate-spin size-full" />
              </div>
            ) : (
              <Clear
                className="absolute top-[50%] right-3 cursor-pointer"
                style={{
                  transform: 'translate(0px,-50%)',
                }}
                onClick={() => {
                  setSearchValue('');
                  setSearchResults([]);
                }}
                color="rgb(155, 155, 166)"
              />
            )}
          </>
        )}

        <div
          className={twMerge(
            'absolute mt-1 w-full flex flex-col rounded-2xl bg-white',
            (!isOpenSearch || !searchValue.trim()) && 'hidden',
          )}
        >
          {searchResult.length > 0 ? (
            <>
              {searchResult.map((result) => (
                <div
                  className="flex justify-between p-4 items-center cursor-pointer hover:opacity-[0.6]"
                  key={result.ensName}
                  onClick={() => {
                    window.location.href = `/ens/${result.ensName}`;
                  }}
                >
                  <div className="flex items-center">
                    <Avatar src={result.avatar} className="size-[32px] mr-2" />
                    <Typography
                      className="font-bold"
                      style={{
                        color: 'rgb(38, 38, 38)',
                      }}
                    >
                      {result.ensName}
                    </Typography>
                  </div>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="13"
                    viewBox="0 0 16 13"
                    fill="none"
                    className="size-[10px]"
                    style={{
                      transform: 'rotate(-90deg)',
                    }}
                  >
                    <path id="Vector 1" d="M8 13L0 0H16L8 13Z" fill="#011A25" />
                  </svg>
                </div>
              ))}
            </>
          ) : (
            <div className="p-4">
              <Typography className="font-bold text-gray-bold">
                No results
              </Typography>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchInput;
