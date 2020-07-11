import React, { FC } from "react";
import styled from "styled-components";

interface Props {
  title: string;
  onClick?(): void;
}

export const Button: FC<Props> = ({ title, onClick }) => (
  <ButtonContainer onClick={onClick}>
    <ButtonTitle>{title}</ButtonTitle>
  </ButtonContainer>
);

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    180deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(255, 103, 41, 1) 0%,
    rgba(221, 91, 18, 1) 100%,
    rgba(135, 55, 12, 1) 100%
  );
  border-radius: 5px;
  border: 1.4px solid #dd5b12;
  margin-left: auto;
  padding: 4px 11px 5px 11px;
  min-width: 85px;
  cursor: pointer;
`;
const ButtonTitle = styled.div`
  color: #fff;
  font-weight: 500;
  font-size: 15px;
  text-shadow: 0.5px 0px #888888;
`;