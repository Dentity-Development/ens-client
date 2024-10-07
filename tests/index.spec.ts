import { EnsPublicClient, createEnsPublicClient } from '@ensdomains/ensjs';
import { DentityEnsClient, CredentialTemplate } from '../src';
import { http } from 'viem';
import { mainnet } from 'viem/chains';
import { jest } from '@jest/globals';

const CORRECT_ENS_NAME = 'moisesj.eth';
const CORRECT_ADDRESS = '0x222267cdD2d2B10F05999223E5D4b51A6828Ac96';
const CORRECT_VP_TOKEN_LINK =
  '["https://oidc.dentity.com/oidc/vp-token?federated_token=77ee07626d8c74a8296f958f77eb97c1c3fc0f63732823740ebf8367f3019701&ens_name=moisesj.eth"]';

const VALID_PROOF = {
  '@context': [
    'https://www.w3.org/2018/credentials/v1',
    'https://w3id.org/bbs/v1',
    {
      '@vocab': 'https://trinsic.cloud/dentity/',
    },
  ],
  id: 'urn:vc',
  type: ['VerifiedPersonhood', 'VerifiableCredential'],
  credentialSchema: {
    id: 'https://schema.trinsic.cloud/dentity/verified-personhood',
    type: 'JsonSchemaValidator2018',
  },
  credentialStatus: {
    id: 'https://dentity.connect.trinsic.cloud/credential-status/EpfdJrR3CqGnfhaSw2wh5Y#33',
    type: 'RevocationList2020Status',
    revocationListCredential:
      'https://dentity.connect.trinsic.cloud/credential-status/EpfdJrR3CqGnfhaSw2wh5Y',
    revocationListIndex: '33',
  },
  credentialSubject: {
    id: 'urn:vc:subject:0',
    isPerson: true,
    verificationMethod: 'Identity Verification Flow',
  },
  issuanceDate: '2024-08-21T13:58:44Z',
  issuer: 'did:ion:EiB-Dh7bQQ2C4CfzzBBoTVT2N1nAVKh2CdYvW9Jln3r37Q',
  proof: {
    type: 'BbsBlsSignatureProof2020',
    created: '2024-08-21T13:58:45Z',
    nonce: 'MnOev9DH4WVuD98i2SzZmZ624h/f3FcW0sufIz+29Tk=',
    proofPurpose: 'assertionMethod',
    proofValue:
      'ABMH/P+CxcOqmyKTWOvByPOpm41opLGOsWOq59Ns6KAfNGW6q1gYteTek+K7QhRTqOPLS7qRuldepl52LFacxOPMOFIW3/T7LuWUScje+LqcMP3clp5E1oAXNGAzP8WjErrsxuWNm6BAaLYgti2letCHvqku0+/5K1tUjJIT9N22Fft+EIOko80PAgWTbfPK1NQgAd4AAAB0sDtsbkZDs3k8G6b+h1akHbbjnwq+UQm/8Go9NeovKPxf1HsteDmQEk1KP1IA/VJCAAAAAjQwr035CPDrszsjgW2BS39+9IrIIrlTzFmtBZ3m1Ts+UVIW4AW5xlaoz09W6nerPMP8XeZNHTSF2otkjuFuHFW2hm0rm3lvDXEoSnAZnL3ThQAUfsr5GMmYUSVWXW8sYJmGeaJIn6a0t9LzZed7rcEAAAAEFupQqL+CqW16AKSA9cqq+4Vl7xlwk5yHf/DO85+f6dppnJdMs6Uq7e2k1ZsHkauqIbWHGJ6tHAEMk9SmXAdulGpAMmw1wj0ClESCaER0hS6+XBFfCavhDYLXCzyIxkbgayzqxal/v2+PzAYxzXNhhpWd2dWhkUyZzsW3TdZyM1U=',
    verificationMethod:
      'did:ion:EiB-Dh7bQQ2C4CfzzBBoTVT2N1nAVKh2CdYvW9Jln3r37Q#uGQKvmQxtCgB26BEmeReGAwvF9081caFpbApdXqM4tk',
  },
};

describe('Ens Dentity Client', () => {
  let client: EnsPublicClient;

  beforeEach(() => {
    client = createEnsPublicClient({
      chain: mainnet,
      transport: http(''),
    }) as EnsPublicClient;

    jest
      .spyOn(client, 'getOwner')
      .mockImplementation(async ({ name }: { name: string }) => {
        return (
          name === CORRECT_ENS_NAME
            ? {
                registrant: CORRECT_ADDRESS,
                owner: CORRECT_ADDRESS,
              }
            : null
        ) as any;
      });

    jest
      .spyOn(client, 'ensBatch')
      .mockImplementation(async (...params: any) => {
        if (params[0].args[0].name === 'moisesj.eth') {
          return [CORRECT_VP_TOKEN_LINK] as any;
        }
        return null;
      });
  });

  it('Exist ENS name and have record in Dentity system', async () => {
    const ensClient = await DentityEnsClient.initialize(
      client,
      CORRECT_ENS_NAME,
    );
    const ethAddress = await ensClient.getEthAddress();
    const credentials = await ensClient.getVerifications();

    expect(credentials.length).toBeGreaterThan(0);
    expect(ethAddress).toBe(CORRECT_ADDRESS);
  }, 30000);

  it('Exist ENS name and have record with specific template type', async () => {
    const ensClient = await DentityEnsClient.initialize(
      client,
      CORRECT_ENS_NAME,
    );

    const discordTemplates = ensClient.getSpecificVerification(
      CredentialTemplate.Discord,
    );

    const ensTemplates = ensClient.getSpecificVerification(
      CredentialTemplate.ENS,
    );

    const emailTemplates = ensClient.getSpecificVerification(
      CredentialTemplate.Email,
    );

    const personhoodTemplates = ensClient.getSpecificVerification(
      CredentialTemplate.Personhood,
    );

    const telegramTemplates = ensClient.getSpecificVerification(
      CredentialTemplate.Telegram,
    );

    const xTemplates = ensClient.getSpecificVerification(CredentialTemplate.X);

    expect(discordTemplates.length).toBeGreaterThan(0);
    expect(ensTemplates.length).toBeGreaterThan(0);
    expect(emailTemplates.length).toBeGreaterThan(0);
    expect(personhoodTemplates.length).toBeGreaterThan(0);
    expect(telegramTemplates.length).toBeGreaterThan(0);
    expect(xTemplates.length).toBeGreaterThan(0);
  }, 30000);

  it('Not exist ENS name', async () => {
    expect.assertions(1);
    try {
      await DentityEnsClient.initialize(client, 'moisesj111.eth');
    } catch (e) {
      expect(e).not.toBe(null);
    }
  });

  it('Get client', async () => {
    const ensClient = await DentityEnsClient.initialize(
      client,
      CORRECT_ENS_NAME,
    );
    expect(ensClient.getClient()).not.toBe(undefined);
    expect(ensClient.getClient()).not.toBe(null);
  });

  // eslint-disable-next-line quotes
  it(`Get ENS's name`, async () => {
    const ensClient = await DentityEnsClient.initialize(
      client,
      CORRECT_ENS_NAME,
    );
    expect(ensClient.getEnsName()).toBe(CORRECT_ENS_NAME);
  });

  // eslint-disable-next-line quotes
  it(`Get ETH's address`, async () => {
    const ensClient = await DentityEnsClient.initialize(
      client,
      CORRECT_ENS_NAME,
    );
    expect(ensClient.getEthAddress()).toBe(CORRECT_ADDRESS);
  });

  it('Exist ENS name but not verify with Dentity system', async () => {
    expect.assertions(1);
    try {
      await DentityEnsClient.initialize(client, 'fanhsu.eth');
    } catch (e) {
      expect(e).not.toBe(null);
    }
  });

  it('Verify valid proof', async () => {
    const result = await DentityEnsClient.verifyVerification(VALID_PROOF);
    expect(result?.isValid).toBe(true);
  }, 30000);

  it('Verify invalid proof', async () => {
    try {
      const result = await DentityEnsClient.verifyVerification({
        '@context': [
          'https://www.w3.org/2018/credentials/v1',
          'https://w3id.org/bbs/v1',
          {
            '@vocab': 'https://trinsic.cloud/dentity/',
          },
        ],
        id: 'urn:vc',
        type: ['VerifiedPersonhood', 'VerifiableCredential'],
        credentialSchema: {
          id: 'https://schema.trinsic.cloud/dentity/verified-personhood',
          type: 'JsonSchemaValidator2018',
        },
        credentialStatus: {
          id: 'https://dentity.connect.trinsic.cloud/credential-status/EpfdJrR3CqGnfhaSw2wh5Y#33',
          type: 'RevocationList2020Status',
          revocationListCredential:
            'https://dentity.connect.trinsic.cloud/credential-status/EpfdJrR3CqGnfhaSw2wh5Y',
          revocationListIndex: '33',
        },
        credentialSubject: {
          id: 'urn:vc:subject:0',
          isPerson: true,
          verificationMethod: 'Identity Verification Flow',
        },
        issuanceDate: '2024-08-21T13:58:44Z',
        issuer: 'did:ion:EiB-Dh7bQQ2C4CfzzBBoTVT2N1nAVKh2CdYvW9Jln3r37Q',
        proof: {
          type: 'BbsBlsSignatureProof2020',
          created: '2024-08-21T13:58:45Z',
          nonce: 'MnOev9DH4WVuD98i2SzZmZ624h/f3FcW0sufIz+29Tk=',
          proofPurpose: 'assertionMethod',
          proofValue:
            'ABMH/P+CxcOqmyKTWOdadadaPOpm41opLGOsWOq59Ns6KAfNGW6q1gYteTek+K7QhRTqOPLS7qRuldepl52LFacxOPMOFIW3/T7LuWUScje+LqcMP3clp5E1oAXNGAzP8WjErrsxuWNm6BAaLYgti2letCHvqku0+/5K1tUjJIT9N22Fft+EIOko80PAgWTbfPK1NQgAd4AAAB0sDtsbkZDs3k8G6b+h1akHbbjnwq+UQm/8Go9NeovKPxf1HsteDmQEk1KP1IA/VJCAAAAAjQwr035CPDrszsjgW2BS39+9IrIIrlTzFmtBZ3m1Ts+UVIW4AW5xlaoz09W6nerPMP8XeZNHTSF2otkjuFuHFW2hm0rm3lvDXEoSnAZnL3ThQAUfsr5GMmYUSVWXW8sYJmGeaJIn6a0t9LzZed7rcEAAAAEFupQqL+CqW16AKSA9cqq+4Vl7xlwk5yHf/DO85+f6dppnJdMs6Uq7e2k1ZsHkauqIbWHGJ6tHAEMk9SmXAdulGpAMmw1wj0ClESCaER0hS6+XBFfCavhDYLXCzyIxkbgayzqxal/v2+PzAYxzXNhhpWd2dWhkUyZzsW3TdZyM1U=',
          verificationMethod:
            'did:ion:EiB-Dh7bQQ2C4CfzzBBoTVT2N1nAVKh2CdYvW9Jln3r37Q#uGQKvmQxtCgB26BEmeReGAwvF9081caFpbApdXqM4tk',
        },
      });
      expect(result?.isValid).toBe(false);
    } catch (e) {
      expect(e).not.toBe(null);
    }
  }, 30000);

  it('Verify input wrong data', async () => {
    try {
      const result = await DentityEnsClient.verifyVerification({} as any);
      expect(result?.isValid).toBe(false);
    } catch (e) {
      expect(e).not.toBe(null);
    }
  }, 30000);
});
