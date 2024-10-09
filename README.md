# @dentity/ens-client

A combination of [Dentity](https://dentity.com)  and [ENS domains](https://ens.domains) to verify basic information for ENS domain owners.

---

## Install

``` sh
npm i @dentity/ens-client
```

## Getting started

The simplest example is to get all verifcations shared by Dentity users with their ENS domain. You can easily get all those verifications by initially add to their ENS domain.
``` ts
import { EnsPublicClient, createEnsPublicClient } from '@ensdomains/ensjs';
import { CredentialTemplate, EnsDentityClient } from '@dentity/ens-client';
import { http } from 'viem';
import { mainnet } from 'viem/chains';

const client = createEnsPublicClient({
  chain: mainnet,
  // Configure your faucet url here
  transport: http(''),
}) as EnsPublicClient;

EnsDentityClient.initialize(client as any, 'alice.eth').then((ensClient) => {
  
  // Get ethereum address of this ENS domain 
  const address = ensClient.getEthAddress();
  console.log('ENS Address:', address);

  // Get all Dentity verifications of this ENS domain
  const verifications = ensClient.getVerifications();
  console.log('verifications:', verifications);
  
});
```
Currently Dentity is supporting sharing a number of verification types for ENS domain. You can specifically get any verification by passing in a specific credential template. You can then verify the correctness of that verification.
``` ts
import { EnsPublicClient, createEnsPublicClient } from '@ensdomains/ensjs';
import { CredentialTemplate, DentityEnsClient } from '@dentity/ens-client';
import { http } from 'viem';
import { mainnet } from 'viem/chains';

const client = createEnsPublicClient({
  chain: mainnet,
  // Provider url here
  transport: http(''),
}) as EnsPublicClient;

DentityEnsClient.initialize(client as any, 'alice.eth').then((ensClient) => {
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

  DentityEnsClient.verifyVerification(discordVerification).then(
    (verifyVerificationResult) => {
      console.log('verifyVerificationResult', verifyVerificationResult);
    },
  );
});
```
We currently support some of the following `CredentialTemplates`:
| Template         | Description                                      |
| :--------------- | :----------------------------------------------- |
| `Discord`        | The information is shared from Discord.          |
| `X`              | The information is shared from X.                |
| `Email`          | Email of this ENS domain.                        |
| `Telegram`       | The information is shared from Telegram.         |
| `Personhood`     | The state or fact of ENS domain owner of being an individual or having human characteristics.  |

## Run the Sample
We have 2 examples for both ReactJS and NodeJS applications. You can go to [examples](/examples/) folder to see and know the basic concept and how to use it.


## Contribution
We welcome issue reports if any and pull requests for further improvement.

## License
[MIT License](/LICENSE)


