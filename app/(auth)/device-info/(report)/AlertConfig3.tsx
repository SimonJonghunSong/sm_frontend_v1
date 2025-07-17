import { Stack, TextField, Checkbox, styled } from "@mui/material";
import React from "react";
import InputBox from "../../../../components/inputbox/InputBox";
import { FormField } from "../page";
import useLangStore from "@/utils/useLangStore";
import { FIELD_VALIDATIONS } from "constants/field";
import { filterFormDataFields } from "../(utils)/hasFormDataFields";
import { INCLUDE_FIELDS, SECTIONS } from "constants/searchField";
import EditDot from "../(components)/EditDot";

interface Props {
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string, alertId?: string) => void;
  isDirtyFields: string[];
}

export const ALERT_CONFIG_3 = INCLUDE_FIELDS[SECTIONS.AlertConfig3.en];

export default function AlertConfig3({
  formData,
  onChange,
  isDirtyFields,
}: Props) {
  const { lang } = useLangStore();

  const existingFields = filterFormDataFields(
    formData,
    ALERT_CONFIG_3.map(String)
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
              {isDirtyFields.includes(field) && <EditDot />}
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
