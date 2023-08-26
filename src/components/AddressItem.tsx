import { useEnsAvatar } from 'wagmi';
import { Avatar } from '@ensdomains/thorin';
import styled from 'styled-components';

const sizeMultiplier = 3;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: red;
  margin-left: ${16 * sizeMultiplier}px; 
  cursor: pointer;
  font-size: 24px;
  font-weight: bold;
`;

type AddressItemProps = {
    addr: string;
    name?: string | null;
    removeAddress: (address: string) => void;
};

const truncateAddress = (address: string): string => {
    const start = address.substring(0, 6);
    const end = address.substring(address.length - 4);
    return `${start}...${end}`;
};

const AddressItem: React.FC<AddressItemProps> = ({ addr, name, removeAddress }) => {
    const { data: avatarImage, isError: avatarIsError, isLoading: avatarLoading } = useEnsAvatar({ name: name });
    console.log("Address:", addr, "Name:", name);  

    return (
        <div className="address-item flex items-center justify-between">
            <div className="flex items-center">
                <div className='w-12 h-12'>
                    <Avatar label="Avatar Image" src={avatarImage || undefined} />
                </div>
                <div className="ml-2">
                    {name && <div>{name}</div>}
                    <div>{truncateAddress(addr)}</div>
                </div>
            </div>
            <CloseButton onClick={() => removeAddress(addr)}>X</CloseButton>
        </div>
    );
};

export default AddressItem;
