// components/Login.tsx

import { signInWithEthereum } from "../helpers/siweHelper";
import { useWeb3React } from "@web3-react/core";

export default function Login() {
    const { library } = useWeb3React<any>();

    const handleLogin = async () => {
        if (library) {
            const result = await signInWithEthereum(library);
            console.log(result);
        } else {
            console.error("No web3 provider found");
        }
    };

    return (
        <div>
            <button onClick={handleLogin}>Sign-In with Ethereum</button>
        </div>
    );
}
