import { EnsPublicClient, createEnsPublicClient } from '@ensdomains/ensjs';
import { CredentialTemplate, DentityEnsClient } from '@dentity/ens-client';
import { http } from 'viem';
import { mainnet } from 'viem/chains';

const client = createEnsPublicClient({
  chain: mainnet,
  // Configure your faucet url here
  transport: http(''),
}) as EnsPublicClient;

DentityEnsClient.initialize(client as any, 'moisesj.eth').then((ensClient) => {
  // Get ethereum address
  const address = ensClient.getEthAddress();
  console.log('ENS Address:', address);

  const verifications = ensClient.getVerifications();
  console.log('verifications:', verifications);

  // Get credential based on credential template type
  const discordVerification = ensClient.getSpecificVerification(
    CredentialTemplate.Discord,
  );
  console.log('discordVerification', discordVerification);

  // Verify a verification
  DentityEnsClient.verifyVerification(discordVerification[0]).then(
    (verifyVerificationResult) => {
      console.log('verifyVerificationResult', verifyVerificationResult);
    },
  );
});
