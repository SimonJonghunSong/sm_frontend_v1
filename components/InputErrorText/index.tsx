import styled from "@emotion/styled";
import React from "react";

interface InputErrorTextProps {
  text?: string;
}

const InputErrorText = ({ text }: InputErrorTextProps) => {
  return <Text>{text}</Text>;
};

export default InputErrorText;

const Text = styled.span`
  display: inline-block;
  padding-top: 8px;
  color: var(--error);
`;
