import { useEffect, useState } from 'react';
import Backdrop, { SearchBackdropProps } from '../Backdrop';
import ReactJson from 'react-json-view';
import './style.css';
import Typography from '../Typography';
import MiniLoading from '../Icon/MiniLoading';
import {
  DentityEnsClient,
  VerifiableCredentialPresentationResponse,
} from 'dentity-ens-client';
import { toast } from 'react-toastify';
import Tick from '../Icon/Tick';

const FieldKeyMap = {
  CredentialStatus: 'Credential Status',
  IssuerIsSigner: 'Issuer',
  SchemaConformance: 'Schema Conformance',
  SignatureVerification: 'Signature Verification',
};

interface CredentialDetailModalProps
  extends Omit<SearchBackdropProps, 'children'> {
  jsonDetail: any;
}

const CredentialDetailModal = ({
  jsonDetail,
  ...backdropProps
}: CredentialDetailModalProps) => {
  const open = backdropProps.open;

  const [isLoadingVerify, setIsLoadingVerify] = useState(false);
  const [verificationResult, setVerificationResult] = useState<Omit<
    VerifiableCredentialPresentationResponse,
    'isValid'
  > | null>(null);

  useEffect(() => {
    const searchContainer = document.getElementById('container');
    if (open) {
      document.body.classList.add('scroll-lock');
    } else {
      document.body.classList.remove('scroll-lock');
      searchContainer?.classList.remove('!top-[20%]', '!visible');
    }
  }, [open]);

  const handleVerify = async () => {
    try {
      setIsLoadingVerify(true);
      const result = await DentityEnsClient.verifyVerification(jsonDetail);
      console.log(result);
      if (result.isValid) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { isValid, ...rest } = result;
        toast.success(`Validate ${result.isValid ? 'succeed' : 'failed'}`);
        setVerificationResult(rest);
      } else {
        toast.error(JSON.stringify(result.validationResults));
      }
    } catch (e: any) {
      toast.error(e);
    } finally {
      setIsLoadingVerify(false);
    }
  };

  if (!jsonDetail) return;

  return (
    <Backdrop {...backdropProps}>
      <section
        className="flex flex-col rounded-lg p-4 max-h-[100dvh] absolute z-30 top-0 left-0 md:top-[50%] md:left-[50%] w-[100dvw] md:w-[800px] md:h-[480px] overflow-auto bg-white md:translate-x-[-50%] md:translate-y-[-50%]"
        id="container"
      >
        <svg
          className="absolute top-4 right-4 size-4 cursor-pointer"
          focusable="false"
          aria-hidden={true}
          viewBox="0 0 24 24"
          onClick={() => {
            backdropProps.setOpen(false);
          }}
        >
          <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
        </svg>

        <Typography className="text-[2rem] font-bold mb-4">
          Credential Detail
        </Typography>

        <ReactJson src={jsonDetail} theme={'monokai'} />

        <div className="flex justify-between mt-4">
          <button
            className="bg-black-primary px-4 py-2 rounded-lg text-white w-full flex justify-center disabled:opacity-[0.9]"
            disabled={isLoadingVerify}
            onClick={handleVerify}
          >
            {isLoadingVerify ? (
              <>
                <MiniLoading className="animate-spin" color="#fff" />
              </>
            ) : (
              <>Verify Credential</>
            )}
          </button>
        </div>

        {verificationResult && (
          <div className="mt-4">
            - Verification Result
            <ul className="pl-4">
              {Object.entries(verificationResult.validationResults).map(
                ([key, value]) => (
                  <li className="flex items-center">
                    + {FieldKeyMap[key] || key}:{' '}
                    <div className="ml-2">
                      {!(value as any).isValid ? (
                        <Tick color="green" />
                      ) : (
                        <svg
                          focusable="false"
                          aria-hidden={true}
                          viewBox="0 0 24 24"
                          color="red"
                          className="size-[16px]"
                          onClick={() => {
                            backdropProps.setOpen(false);
                          }}
                        >
                          <path
                            d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      )}
                    </div>
                  </li>
                ),
              )}
            </ul>
          </div>
        )}
      </section>
    </Backdrop>
  );
};

export default CredentialDetailModal;
