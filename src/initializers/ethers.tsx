import { BrowserProvider } from 'ethers';
import { SiweMessage } from 'siwe';
// @ts-ignore
export const provider = new BrowserProvider(window.ethereum);
export const signer = provider.getSigner();
