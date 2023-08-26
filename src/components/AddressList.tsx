import React from 'react';
import AddressItem from './AddressItem';
import styled from 'styled-components';

const sizeMultiplier = 3;

const AddressBox = styled.div`
  border: 4px solid #9F53FF; // e.g., 6px now
  padding: ${8 * sizeMultiplier}px ${16 * sizeMultiplier}px; // e.g., 16px 32px now
  display: flex;
  align-items: center;
  margin-bottom: ${8 * sizeMultiplier}px; // e.g., 16px now
  border-radius: ${4 * sizeMultiplier}px; // e.g., 8px now
`;

type AddressListProps = {
    addresses: Array<{ addr: string; name?: string | null }>;
    onRemoveAddress: (address: string) => void;
};

const AddressList: React.FC<AddressListProps> = ({ addresses, onRemoveAddress }) => (
    <div>
        {addresses.map((addressObj, index) => (
            <AddressBox key={index}>
                <AddressItem {...addressObj} removeAddress={onRemoveAddress} />
            </AddressBox>
        ))}
    </div>
);


export default AddressList;
