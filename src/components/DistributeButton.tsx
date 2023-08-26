import React from 'react';
import { Button } from '@ensdomains/thorin';
import styled from 'styled-components';

const FixedDistributeButton = styled(Button)`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 120px;
  text-align: center;
`;

type DistributeButtonProps = {
  onClick: () => void;
  disabled: boolean;
};

const DistributeButton: React.FC<DistributeButtonProps> = ({ onClick, disabled }) => (
  <FixedDistributeButton disabled={disabled} onClick={onClick}>
    Distribute
  </FixedDistributeButton>
);

export default DistributeButton;
