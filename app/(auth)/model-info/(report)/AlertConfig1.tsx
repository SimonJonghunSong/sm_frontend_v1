import React from "react";
import styled from "styled-components";
import { Stack, TextField, Checkbox } from "@mui/material";
import InputBox from "../../../../components/inputbox/InputBox";
import { FormField } from "../page";
import { FIELD_VALIDATIONS } from "constants/field";
import useLangStore from "@/utils/useLangStore";
import { filterFormDataFields } from "../(utils)/@index";
import { INCLUDE_FIELDS, SECTIONS } from "constants/searchField";
import EditDot from "../(components)/EditDot";
import { getFieldDefinition } from "@/src/constants/getFieldDefinition";
import useModelInfoStore from "@/src/stores/useModelInfo";

interface Props {
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string, alertId?: string) => void;
  isDirtyFields: string[];
  alertFields?: string[];
}

export default function AlertConfig1({
  formData,
  onChange,
  isDirtyFields,
  alertFields,
}: Props) {
  const { lang } = useLangStore();
  const { getModelName } = useModelInfoStore();
  const modelName = getModelName();

  const existingFields = filterFormDataFields(
    formData,
    alertFields || []
  );
  
  console.log("=== AlertConfig1 component ===");
  console.log("alertFields:", alertFields);
  console.log("existingFields:", existingFields);

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
                {getFieldDefinition(field, modelName)?.title?.[lang] || FIELD_VALIDATIONS[field]?.title?.[lang] || field}
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
