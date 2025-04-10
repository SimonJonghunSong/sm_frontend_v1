import React, { useState } from "react";
import InputBox from "@/components/inputbox/InputBox";
import { Stack, Checkbox, TextField } from "@mui/material";

interface CheckboxEditProps {
  title: string;
  info?: string;
  jsonId: string;
  value: string;
  onChange: (newValue: string) => void;
}

const CheckboxEdit = ({
  title,
  info,
  jsonId,
  value,
  onChange,
}: CheckboxEditProps) => {
  const checked = value.startsWith("01");
  const inputValue = value.slice(2);
  /**
   * 체크박스 값 형식 설명 (예: "0164")
   *
   * 구조:
   * - 앞 2자리: 체크박스 상태 (01 또는 00)
   *   - 01: 체크됨
   *   - 00: 체크 해제됨
   * - 뒤 2자리: 16진수로 변환된 값 (예: "64")
   *
   * 예시: "0164"
   * - "01": 체크박스가 체크된 상태
   * - "64": 16진수 값
   */
  const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked ? "01" : "00";
    onChange(`${newValue}${inputValue}`);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(`${checked ? "01" : "00"}${newValue}`);
  };
  return (
    <Stack
      direction="row"
      alignItems="center"
      gap="8px"
      width={"calc(50% - 20px)"}
    >
      <Stack
        direction="row"
        alignItems="center"
        gap="8px"
        sx={{ marginBottom: "12px" }}
      >
        <Checkbox checked={checked} onChange={handleCheckChange} />
        <TextField
          sx={{ width: 50 }}
          defaultValue="00"
          value={inputValue}
          onChange={handleInputChange}
        />
      </Stack>
      <InputBox.Head>
        <InputBox.Title>{title}</InputBox.Title>
        {info && (
          <InputBox.Info
            tooltipText={<span style={{ whiteSpace: "pre-wrap" }}>{info}</span>}
          />
        )}
        <InputBox.Number>{jsonId}</InputBox.Number>
        {/* <span className="notification"/> */}
      </InputBox.Head>
    </Stack>
  );
};

export default CheckboxEdit;
