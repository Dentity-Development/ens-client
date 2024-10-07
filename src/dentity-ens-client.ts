import { EnsPublicClient } from '@ensdomains/ensjs';
import { getTextRecord } from '@ensdomains/ensjs/public';
import { getVerificationPresentations, verifyVerification } from './dentity';
import {
  VerifiableCredentialPresentation,
  VerifiableCredentialPresentationResponse,
} from './common/interfaces';
import { CredentialTemplate } from './common/enums';

export class DentityEnsClient {
  private constructor(
    private client: EnsPublicClient,
    private ensAddress: string,
    private ensName: string,
    private verifiableCredentials: VerifiableCredentialPresentation[],
  ) {}

  /**
   * Create EnsDentityClient's instance base on input's configs
   * Firstly check if ENS's name existed
   * Secondly check if ENS's name have already associated with Dentity's system
   * Finally update info to ENS's client
   * @param {EnsPublicClient} client - The ENS's public client used to resolve ENS's info based on ENS's name
   * @param {string} ensName - The ENS's name
   * @returns {Promise<VerifiableCredentialPresentationResponse| undefined | null>} A promise that resolves to an verification VerifiableCredentialPresentation .
   */
  public static async initialize(client: EnsPublicClient, ensName: string) {
    const ethAddress = await client.getOwner({ name: ensName });

    if (!ethAddress) throw new Error('ENS Name not exist');

    const batchData = await client.ensBatch(
      getTextRecord.batch({ name: ensName, key: 'verifications' }),
    );

    let vpTokenUrl = '';
    try {
      vpTokenUrl = JSON.parse(batchData[0] as string)[0] as string;
    } catch {
      // eslint-disable-next-line quotes
      throw new Error(`ENS name haven't verified with Dentity`);
    }

    const res = await getVerificationPresentations(vpTokenUrl);

    return new DentityEnsClient(
      client,
      ethAddress.registrant ?? ethAddress.owner,
      ensName,
      res?.data.vp_token || [],
    );
  }

  /**
   * Return a list of verifiable credentials presentation that it fetched through Federated token
   * @returns {Promise<VerifiableCredentialPresentation[]>} A promise that resolves to an VerifiableCredentialPresentation instance.
   */
  public async getVerifications(): Promise<VerifiableCredentialPresentation[]> {
    return this.verifiableCredentials;
  }

  /**
   * Return data of verifiable credential presentation as proof
   * @param {VerifiableCredentialPresentation} verifiableCredentialPresentation - The verifiable credential presentation that have been shared to ENS before
   * @returns {Promise<VerifiableCredentialPresentationResponse| undefined | null>} A promise that resolves to an verification VerifiableCredentialPresentation .
   */
  public static async verifyVerification(
    verifiableCredentialPresentation: VerifiableCredentialPresentation,
  ): Promise<VerifiableCredentialPresentationResponse | undefined | null> {
    return await verifyVerification(verifiableCredentialPresentation);
  }

  /**
   * Return a specific credential by template
   * @param {CredentialTemplate} template - The template of verifiable credential
   * @returns {Promise<VerifiableCredentialPresentation>} A promise that resolves to an VerifiableCredentialPresentation instance.
   */
  public getSpecificVerification(
    type: CredentialTemplate,
  ): VerifiableCredentialPresentation[] {
    return this.verifiableCredentials.filter(
      (credential) =>
        Array.isArray(credential.type) && credential.type[0] === type,
    );
  }

  /**
   * Return public ENS's client
   * @returns {EnsPublicClient} The input ENS's client
   */
  getClient() {
    return this.client;
  }

  /**
   * Return ETH's address corresponding with ENS's name
   * @returns {string} The ETH's address
   */
  getEthAddress(): string {
    return this.ensAddress;
  }

  /**
   * Return ENS's name
   * @returns {string} The input ENS's name
   */
  getEnsName(): string {
    return this.ensName;
  }
}
