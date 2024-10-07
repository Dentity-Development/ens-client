import { MAIN_APP_API_ENDPOINT } from './common/constants';
import { makeRequest } from './common/utils';
import {
  VerifiableCredentialPresentation,
  VerifiableCredentialPresentationResponse,
} from './common/interfaces';

/**
 * Verify verification presentation by calling Dentity's API
 * @param {VerifiableCredentialPresentation} verifiableCredentialPresentation - The verification's presentation
 * @returns {Promise<VerifiableCredentialPresentationResponse| undefined | null>} A promise that resolves to an verification VerifiableCredentialPresentation .
 */
export const verifyVerification = async (
  verifiableCredentialPresentation: VerifiableCredentialPresentation,
) => {
  const [res, err] = await makeRequest<
    { data: VerifiableCredentialPresentationResponse },
    any
  >({
    url: MAIN_APP_API_ENDPOINT + '/credential/proof/verify',
    method: 'POST',
    configs: {
      data: verifiableCredentialPresentation,
    },
  });
  if (err) {
    throw err.response?.data;
  } else {
    return res?.data?.data;
  }
};

/**
 * Get user verification's presentation based on Dentity's federated token endpoint
 * @returns {Promise<{
 *     vp_token: Array<VerifiableCredentialPresentation>;
 *     total: number;
 *   }>} A promise that return VerifiableCredentialPresentation and total
 */
export const getVerificationPresentations = async (endPoint: string) => {
  const [res, err] = await makeRequest<
    {
      vp_token: Array<VerifiableCredentialPresentation>;
      total: number;
    },
    {
      message: string;
    }
  >({
    url: endPoint,
  });

  if (err) {
    throw new Error('Get VP Token failed');
  }
  return res;
};
