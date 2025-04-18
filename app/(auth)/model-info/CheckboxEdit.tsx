import React, { useState } from "react";
import InputBox from "@/components/inputbox/InputBox";
import { Stack, Checkbox, TextField } from "@mui/material";

interface CheckboxEditProps {
  title: string;
  info?: string;
  jsonId: string;
}

const CheckboxEdit = ({ title, info, jsonId }: CheckboxEditProps) => {
  const [value, setValue] = useState(true);
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
        <Checkbox
          checked={value}
          onChange={(e) => setValue(e.target.checked)}
        />
        <TextField sx={{ width: 60 }} defaultValue="00" />
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
