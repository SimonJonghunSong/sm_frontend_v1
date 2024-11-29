import styled from "@emotion/styled";
import React, { CSSProperties } from "react";

interface InputErrorTextProps {
  text?: string;
  className?: string;
  style?: CSSProperties;
}

const InputErrorText = ({ text, className, style }: InputErrorTextProps) => {
  return (
    <Text className={className} style={style}>
      {text}
    </Text>
  );
};

export default InputErrorText;

const Text = styled.span`
  display: inline-block;
  padding-top: 8px;
  color: var(--error);
`;
