import React, { useState } from 'react';
import { Button, Input } from '@ensdomains/thorin';
import { isAddress } from 'viem';
import { useEnsAddress, useEnsName } from 'wagmi';
import { useDebounce } from 'usehooks-ts';

type AddressInputProps = {
  onAddAddress: (address: string, name?: string) => void;
};

const AddressInput: React.FC<AddressInputProps> = ({ onAddAddress }) => {
    
  const [input, setInput] = useState('');
  const debouncedInput = useDebounce(input, 500);
  const isPotentialEnsName = debouncedInput.includes('.');

  const { data: ensAddress } = useEnsAddress({
    name: isPotentialEnsName ? debouncedInput : undefined,
    chainId: 1,
  });

  const address = isAddress(debouncedInput) ? debouncedInput : (ensAddress || undefined);
  const { data: ensName } = useEnsName({ address });

  const handleAddAddress = () => {
    if (address) {
        const nameToSend = ensName === null ? undefined : ensName;
      onAddAddress(address, nameToSend);
    }
  };  

  return (
    <div>
      <Input
        label="Address or ENS name"
        placeholder="xrahul.eth"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInput(e.target.value)
        }
        description={ensAddress && address}
      />
      <Button disabled={!address} onClick={handleAddAddress}>
        Add Address
      </Button>
    </div>
  );
};

export default AddressInput;
