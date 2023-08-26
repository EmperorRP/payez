import { useState } from 'react';
import { Card} from '@ensdomains/thorin';
import styled from 'styled-components';

import { useContractWrite, useEnsAddress, useEnsAvatar, useEnsName } from 'wagmi';
import AddressInput from '../components/AddressInput';
import AddressList from '../components/AddressList';
import DistributeButton from '../components/DistributeButton';

const sizeMultiplier = 3;

const CenteredCard = styled(Card)`
  margin: 0 auto;
  max-width: ${800 * sizeMultiplier}px; // e.g., 1600px now
`;

const contractAddress = '0x9C13C19b29ed75C267aa6edb4FE454deeE467c72';
const PayrollContractABI = 
    [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"FundsDeposited","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"PaymentSent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[]","name":"recipients","type":"address[]"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"PaymentsDistributed","type":"event"},{"inputs":[],"name":"depositFunds","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address[]","name":"recipients","type":"address[]"}],"name":"distributePayments","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"recipients","type":"address[]"}],"name":"getPendingRecipients","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"hasWithdrawn","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDeposited","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawFunds","outputs":[],"stateMutability":"nonpayable","type":"function"}]
  ;

  const PaymentPage = () => {
    
    const { data, isLoading, isSuccess, error, write } = useContractWrite({
      address: contractAddress,
      abi: PayrollContractABI,
      functionName: 'distributePayments',
    });

  
    const [addressList, setAddressList] = useState<Array<{ addr: string; name?: string | null }>>([]);
    const [addressToNameMapping, setAddressToNameMapping] = useState<{ [address: string]: string }>({});
  
    const distributeToAddresses = async () => {
      if (addressList.length > 0) {
        const addressArray = addressList.map(addressObj => addressObj.addr);
        try {
          await write({ args: [addressArray] });
        } catch (err: any) {
          console.error("Error distributing payments:", err.message);
        }
      } else {
        console.log("No addresses to distribute payments to.");
      }
    }
    
  
    const handleAddAddress = (addr: string, name?: string) => {
      if (addr && !addressList.some(a => a.addr === addr)) {
          setAddressList((prev) => [...prev, { addr, name }]);
      }
    };
  
    const removeAddress = (addr: string) => {
      setAddressList((prev) => prev.filter((addressObj) => addressObj.addr !== addr));
    };

    
  
    return (
      <div className="flex flex-col justify-center items-center h-screen p-16">
        <CenteredCard title="Name/Address Input">
          <AddressInput onAddAddress={handleAddAddress} />
        </CenteredCard>
  
        <div className="mt-6 flex flex-col items-center justify-center h-screen p-16">
        <AddressList addresses={addressList.map(addressObj => ({ addr: addressObj.addr, name: addressObj.name }))} onRemoveAddress={removeAddress} />
          <DistributeButton onClick={distributeToAddresses} disabled={addressList.length === 0} />
  
          {isLoading && <div>Check wallet, distributing payments...</div>}
          {isSuccess && <div>Payments distributed!</div>}
          {error && <div>Error: {error.message}</div>}
        </div>
      </div>
    );
  };
  
  export default PaymentPage;

