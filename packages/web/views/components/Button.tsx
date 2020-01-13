import * as React from 'react';
import styled from 'styled-components';

interface IButtonProps {
  children?: React.ReactNode;
  type: 'button' | 'submit';
  onClick: () => void;
}

const StyledButton = styled.button``;

export const Button = ({
  children,
  onClick,
  type = 'button'
}: IButtonProps) => (
  <button type={type} onClick={onClick}>
    {children}
  </button>
);
