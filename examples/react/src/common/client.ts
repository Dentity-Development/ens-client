import { EnsPublicClient, createEnsPublicClient } from '@ensdomains/ensjs';
import { http } from 'viem';
import { mainnet } from 'viem/chains';

const client = createEnsPublicClient({
  chain: mainnet,
  transport: http((import.meta as any).env.VITE_WEB3_PROVIDER),
} as any) as EnsPublicClient;

export default client;
