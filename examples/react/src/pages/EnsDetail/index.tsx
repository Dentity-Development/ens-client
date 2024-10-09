import { Link, useNavigate, useParams } from 'react-router-dom';
import Typography from '../../components/Typography';
import Share from '../../components/Icon/Share';
import VerfifiedUser from '../../components/Icon/VerfifiedUser';
import {
  DentityEnsClient,
  VerifiableCredentialPresentation,
  CredentialTemplate,
} from '@dentity/ens-client';
import { useLayoutEffect, useMemo, useState } from 'react';
import Discord from '../../components/Icon/Discord';
import Email from '../../components/Icon/Email';
import Telegram from '../../components/Icon/Telegram';
import X from '../../components/Icon/X';

import Eth from '../../components/Icon/Eth';
import SearchInput from '../../components/SearchInput';
import Back from '../../components/Icon/Back';
import MiniLoading from '../../components/Icon/MiniLoading';
import NotFound from '../../components/Icon/NotFound';
import Dentity from '../../components/Icon/Dentity';
import CopyText from '../../components/Copy';
import Avatar from '../../components/Avatar';
import Container from '../../components/Container';
import CredentialDetailModal from '../../components/Modal/CredentialDetailModal';
import client from '../../common/client';
import ArrowRedirect from '../../components/Icon/ArrowRedirect';

const TAG_METADATA: Record<
  string,
  {
    icon: React.ReactNode;
    label: (item: VerifiableCredentialPresentation) => string;
    link: (item: VerifiableCredentialPresentation) => string;
  }
> = {
  [CredentialTemplate.Discord]: {
    icon: <Discord className="size-[20px]" />,
    label: (item: VerifiableCredentialPresentation) =>
      item.credentialSubject.name,
    link: (item: VerifiableCredentialPresentation) =>
      `copy&&${item.credentialSubject.name}`,
  },
  [CredentialTemplate.Email]: {
    icon: <Email className="size-[20px]" />,
    label: (item: VerifiableCredentialPresentation) =>
      item.credentialSubject.verifiedEmail,
    link: (item: VerifiableCredentialPresentation) =>
      `link&&mailto:${item.credentialSubject.verifiedEmail}`,
  },
  [CredentialTemplate.Telegram]: {
    icon: <Telegram className="size-[20px]" />,
    label: (item: VerifiableCredentialPresentation) =>
      item.credentialSubject.name,
    link: (item: VerifiableCredentialPresentation) =>
      `link&&https://t.me/${item.credentialSubject.name}`,
  },
  [CredentialTemplate.X]: {
    icon: <X className="size-[20px]" />,
    label: (item: VerifiableCredentialPresentation) =>
      item.credentialSubject.username,
    link: (item: VerifiableCredentialPresentation) =>
      `link&&https://x.com/${item.credentialSubject.username}`,
  },
};

interface UserMetadata {
  avatar?: string;
  description?: string;
}

const EnsDetail = () => {
  const { ensName } = useParams();
  const navigate = useNavigate();

  const [vpTokenDetail, setVpTokenDetail] = useState<any>(null);

  const [isLoadingInitialize, setIsLoadingInitialize] = useState(true);
  const [vpTokens, setVpTokens] = useState<
    Array<VerifiableCredentialPresentation>
  >([]);
  const [userMetadata, setUserMetadata] = useState<UserMetadata | null>(null);
  const [error, setError] = useState<string | null>(null);

  const ensCredential = useMemo(() => {
    return vpTokens.find((token) => token.type[0] === CredentialTemplate.ENS);
  }, [vpTokens]);

  const personHoodCredential = useMemo(() => {
    return vpTokens.find(
      (token) => token.type[0] === CredentialTemplate.Personhood,
    );
  }, [vpTokens]);

  useLayoutEffect(() => {
    const inner = async () => {
      try {
        const ensClient = await DentityEnsClient.initialize(client, ensName);

        const tokens = await ensClient.getVerifications();
        setVpTokens(tokens);

        document.title = `Dentity - ${ensName}`;

        const { texts } = await client.getRecords({
          name: ensName,
          texts: ['avatar', 'description'],
        });
        setUserMetadata(
          texts.length
            ? texts.reduce((prev, { key, value }) => {
                return { ...prev, [key]: value };
              }, {})
            : null,
        );
      } catch (e: any) {
        setError(e.message as string);
      } finally {
        setIsLoadingInitialize(false);
      }
    };
    inner();
  }, []);

  if (isLoadingInitialize)
    return (
      <Container>
        <section className="relative h-[100dvh] flex flex-col justify-center items-center">
          <MiniLoading className="size-[64px] animate-spin" />
        </section>
      </Container>
    );

  if (error) {
    return (
      <>
        <Container>
          <header className="flex items-center my-8 p">
            <Link to={'/'} className="mr-6">
              <Dentity
                className="size-[40px]"
                textIconProps={{
                  className: 'ml-2 h-[39px] w-[123px] mt-1',
                }}
              />
            </Link>
            <SearchInput />
          </header>
          <section className="relative h-[100dvh] flex flex-col justify-center items-center">
            <Back
              className="absolute top-[6%] left-0 w-[48px] h-[32px] cursor-pointer hover:opacity-[0.6]"
              onClick={() => {
                navigate(-1);
              }}
            />
            <NotFound className="size-[220px]" />

            <Typography component="h1" className="font-bold text-[2.5rem]">
              {error}
            </Typography>
          </section>
        </Container>
      </>
    );
  }

  return (
    <>
      <Container>
        <header className="flex items-center my-8">
          <Link to={'/'} className="mr-6">
            <Dentity
              className="size-[40px]"
              textIconProps={{
                className: 'ml-2 h-[39px] w-[123px] mt-1',
              }}
            />
          </Link>
          <SearchInput />
        </header>

        <section className="flex items-center justify-between">
          <div className="flex items-center">
            <Typography className="text-[30px] mr-4 font-bold">
              {ensName}
            </Typography>
            <CopyText content={ensName} />
          </div>

          <Link
            to={`https://etherscan.io/address/${ensCredential?.credentialSubject?.ethAddress}`}
          >
            <div className="flex items-center cursor-pointer">
              <Share className="size-[14px]" color="rgb(56, 136, 255,0.5)" />
              <Typography className="ml-1 text-blue-primary font-bold">
                Etherscan
              </Typography>
            </div>
          </Link>
        </section>
        <main className="mt-2 relative flex flex-col gap-2 rounded-2xl overflow-hidden">
          <section className="overflow-hidden rounded-2xl bg-white border border-border-gray p-[3rem_1.5rem_1.5rem]">
            <div className="rounded-2xl rounded-b-none absolute left-0 h-[7em] top-0 w-full bg-wave"></div>

            <div
              className="bg-wave left-[50%] top-[-100px] size-[300px] rounded-full absolute"
              style={{
                transform: 'translate(-50%, 0px)',
              }}
            ></div>

            <Avatar
              className="size-[128px] m-auto relative z-20 border-4 border-white"
              src={userMetadata && userMetadata.avatar}
            />

            <div className="flex items-center flex-col mt-4">
              <div className="flex items-center pt-4">
                <Typography className="text-[30px] font-bold mr-2">
                  {ensName}
                </Typography>
                {personHoodCredential && (
                  <div className="relative group cursor-pointer">
                    <VerfifiedUser
                      className="size-6 "
                      style={{
                        color: 'rgb(29, 175, 131)',
                      }}
                    />

                    <div className="absolute left-[-85px] pb-4 w-max top-[-46px] hidden group-hover:block">
                      <Link
                        to={`https://oidc.dentity.com/oidc/ens/${ensName}?cid=TWUfWhM_hs5osk9cR4adK`}
                      >
                        <div className="border border-border-gray p-1 px-2 rounded-lg flex items-center bg-white cursor-pointer">
                          <Dentity className="size-[16px]" />
                          <Typography className="ml-1 font-medium text-blue-primary">
                            Personhood verified
                          </Typography>
                          <div
                            className="absolute left-[50%] bottom-[0.5rem] w-0 h-0 "
                            style={{
                              transform: 'translate(-50%,0px)',
                              borderLeft: '8px solid transparent',
                              borderRight: '8px solid transparent',
                              borderTop: '8px solid rgb(206, 225, 232)  ',
                            }}
                          ></div>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {ensCredential && (
                <div className="flex items-center mt-2">
                  <Eth className="size-[16px]" />
                  <Typography className="mx-2 font-medium">
                    {ensCredential.credentialSubject.ethAddress.slice(0, 5) +
                      '...' +
                      ensCredential.credentialSubject.ethAddress.slice(-5)}
                  </Typography>
                  <CopyText
                    size={16}
                    content={ensCredential.credentialSubject.ethAddress}
                  />
                </div>
              )}

              <div className="flex items-center gap-4 mt-4">
                {vpTokens.map((token, index) => {
                  const type = token.type[0];
                  const tagMetadata = TAG_METADATA[type];
                  if (!tagMetadata) return null;
                  const link = tagMetadata.link(token);
                  const isCopy = link.startsWith('copy&&');
                  const content = link.split('&&')[1];
                  return (
                    <div
                      key={`${token.id} ${index}`}
                      onClick={() => {
                        setVpTokenDetail(token);
                      }}
                    >
                      <>
                        <div className="relative flex items-center justify-center group cursor-pointer">
                          {tagMetadata.icon}

                          <div className="absolute pb-4 w-max top-[-46px] hidden group-hover:block">
                            {isCopy ? (
                              <div
                                className="border border-border-gray p-1 px-2 rounded-lg flex items-center bg-white cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                              >
                                <Dentity className="size-[16px]" />
                                <Typography className="mx-2 font-medium text-blue-primary">
                                  {content}
                                </Typography>
                                <CopyText content={content} size={14} />
                                <div
                                  className="absolute left-[50%] bottom-[0.5rem] w-0 h-0 "
                                  style={{
                                    transform: 'translate(-50%,0px)',
                                    borderLeft: '8px solid transparent',
                                    borderRight: '8px solid transparent',
                                    borderTop: '8px solid rgb(206, 225, 232)  ',
                                  }}
                                ></div>
                              </div>
                            ) : (
                              <Link
                                to={content}
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                              >
                                <div className="border border-border-gray p-1 px-2 rounded-lg flex items-center bg-white cursor-pointer">
                                  <Dentity className="size-[16px]" />
                                  <Typography className="mx-2 font-medium text-blue-primary">
                                    Verified by Dentity
                                  </Typography>
                                  <ArrowRedirect className="text-gray-bold size-[14px]" />
                                  <div
                                    className="absolute left-[50%] bottom-[0.5rem] w-0 h-0 "
                                    style={{
                                      transform: 'translate(-50%,0px)',
                                      borderLeft: '8px solid transparent',
                                      borderRight: '8px solid transparent',
                                      borderTop:
                                        '8px solid rgb(206, 225, 232)  ',
                                    }}
                                  ></div>
                                </div>
                              </Link>
                            )}
                          </div>
                        </div>
                      </>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </main>
      </Container>

      <CredentialDetailModal
        jsonDetail={vpTokenDetail}
        open={!!vpTokenDetail}
        setOpen={() => {
          setVpTokenDetail(null);
        }}
      />
    </>
  );
};

export default EnsDetail;
