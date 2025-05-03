import { Stack, TextField, Checkbox, styled } from "@mui/material";
import React from "react";
import InputBox from "../../../../components/inputbox/InputBox";
import { FormField } from "../page";
import useLangStore from "@/utils/useLangStore";
import { FIELD_VALIDATIONS } from "constants/field";
import { filterFormDataFields } from "../(utils)/hasFormDataFields";

interface Props {
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string, alertId?: string) => void;
}

export const ALERT_CONFIG_2 = [
  1400, 1401, 1402, 1403, 1404, 1405, 1406, 1407, 1413, 1414, 1415, 1416, 1417,
  1418, 1419, 1420, 1421, 1422, 1423, 1424, 1425, 1426, 1427, 1428, 1429, 1430,
  1431, 1432, 1433, 1434, 1435, 1437, 1438, 1355, 1443, 1444, 1445, 1446, 1447,
  1453, 1454, 1455, 1456, 1457, 1458, 1459, 1460, 1461, 1462, 1463, 1464, 1465,
  1466, 1467, 1468, 1469, 1459, 1471, 1472, 1473, 1472, 1473, 1474, 1475, 1476,
  1477, 1478, 1481,
];

export default function AlertConfig2({ formData, onChange }: Props) {
  const { lang } = useLangStore();

  const existingFields = filterFormDataFields(
    formData,
    ALERT_CONFIG_2.map(String)
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
