export interface VerifiableCredentialPresentation {
  '@context': Array<string | { '@vocab': string }>;
  id: string;
  type: Array<string>;
  credentialSchema: {
    id: string;
    type: string;
  };
  credentialStatus: {
    id: string;
    type: string;
    revocationListCredential: string;
    revocationListIndex: string;
  };
  credentialSubject: Record<string, any>;
  issuanceDate: string;
  issuer: string;
  proof: {
    type: string;
    created: string;
    nonce: string;
    proofPurpose: string;
    proofValue: string;
    verificationMethod: string;
  };
}

export interface VerifiableCredentialPresentationResponse {
  isValid: boolean;
  validationResults: {
    SignatureVerification?: {
      isValid: true;
      messages: Array<string>;
    };
    CredentialStatus?: {
      isValid: true;
      messages: Array<string>;
    };
    SchemaConformance?: {
      isValid: true;
      messages: Array<string>;
    };
    IssuerIsSigner?: {
      isValid: true;
      messages: Array<string>;
    };
    TrustRegistryMembership?: {
      isValid: true;
      messages: Array<string>;
    };
  };
}
