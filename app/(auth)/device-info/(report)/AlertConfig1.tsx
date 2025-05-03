import React from "react";
import styled from "styled-components";
import { Stack, TextField, Checkbox } from "@mui/material";
import InputBox from "../../../../components/inputbox/InputBox";
import { FormField } from "../page";
import { FIELD_VALIDATIONS } from "constants/field";
import useLangStore from "@/utils/useLangStore";
import { filterFormDataFields } from "../(utils)/@index";

interface Props {
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string, alertId?: string) => void;
}

export const ALERT_CONFIG_1 = [
  1300, 1301, 1302, 1304, 1306, 1308, 1311, 1313, 1314, 1321, 1325, 1326, 1328,
  1329, 1330, 1331, 1332, 1333, 1334, 1335, 1336, 1337, 1338, 1339, 1340, 1340,
  1341, 1342, 1350, 1351, 1352, 1354, 1355, 1356, 1357, 1360, 1365, 1366, 1367,
  1368, 1371, 1372, 1373, 1377,
];

export default function AlertConfig1({ formData, onChange }: Props) {
  const { lang } = useLangStore();

  const existingFields = filterFormDataFields(
    formData,
    ALERT_CONFIG_1.map(String)
  );

  const allFieldsChecked = existingFields.every(
    (field) => formData[field].realValue === "1"
  );

  const handleCheckAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked ? "1" : "0";

    existingFields.forEach((field) => {
      onChange(field, newValue, formData[field].alert_id);
    });
  };

  return (
    <>
      <Stack direction="row" alignItems="center" gap="8px">
        <Stack
          direction="row"
          alignItems="center"
          gap="8px"
          sx={{ marginBottom: "12px" }}
        >
          <Checkbox
            checked={allFieldsChecked}
            onChange={handleCheckAllChange}
          />
          <span>All</span>
        </Stack>
      </Stack>

      <Stack direction="row" flexWrap="wrap" gap="16px" alignItems="center">
        {existingFields.map((field) => (
          <Stack
            key={field}
            direction="row"
            alignItems="center"
            gap="8px"
            width={"calc(50% - 8px)"}
          >
            <Stack direction="row" alignItems="center" gap="8px">
              <Checkbox
                checked={formData[field].realValue === "1"}
                onChange={(e) =>
                  onChange(
                    field,
                    e.target.checked ? "1" : "0",
                    formData[field].alert_id
                  )
                }
              />
              <StyledInput
                type="number"
                inputProps={{
                  max: 999,
                }}
                error={
                  !!formData[field].alert_id &&
                  Number(formData[field].alert_id) > 999
                }
                value={formData[field].alert_id || ""}
                onChange={(e) =>
                  onChange(field, formData[field].realValue, e.target.value)
                }
              />
            </Stack>
            <Stack direction="row" alignItems="center" gap="8px">
              <InputBox.Title>
                {FIELD_VALIDATIONS[field].title[lang]}
              </InputBox.Title>

              <InputBox.Number>{field}</InputBox.Number>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </>
  );
}

const StyledInput = styled(TextField)`
  width: 80px;
`;
