// siweHelper.ts

import { ethers } from "ethers";

const BACKEND_ADDR = "http://localhost:3000";

export async function createSiweMessage(provider: any, address: string, statement: string) {
    const domain = window.location.host;
    const origin = window.location.origin;

    const res = await fetch(`${BACKEND_ADDR}/nonce`, {
        credentials: 'include',
    });
    const nonce = await res.text();

    const message = {
        domain,
        address,
        statement,
        uri: origin,
        version: '1',
        chainId: '1',
        nonce
    };

    return JSON.stringify(message);
}

export async function signInWithEthereum(provider: any) {
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const message = await createSiweMessage(provider, address, 'Sign in with Ethereum to the app.');

    const signature = await signer.signMessage(message);

    const res = await fetch(`${BACKEND_ADDR}/verify`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, signature }),
        credentials: 'include'
    });

    return await res.text();
}
