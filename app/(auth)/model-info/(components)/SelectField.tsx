import { MenuItem, Select, Stack } from "@mui/material";
import useLangStore from "@/utils/useLangStore";
import { FIELD_VALIDATIONS } from "constants/field";
import InputBox from "@/components/inputbox/InputBox";
import { FormField } from "../page";
import { SwitchPrimary } from "@/components/switches";
import { useState } from "react";
import EditDot from "./EditDot";
import { getFieldDefinition } from "@/src/constants/getFieldDefinition";
import useModelInfoStore from "@/src/stores/useModelInfo";

interface SelectFieldProps {
  id: string;
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string, selectValue?: string) => void;
  isRequired?: boolean;
  isSwitch?: boolean;
  style?: React.CSSProperties;
  isDirty?: boolean;
  isUnderbarId?: boolean;
}

const SelectField = ({
  id,
  formData,
  onChange,
  isRequired,
  isSwitch,
  style,
  isDirty = false,
  isUnderbarId = false,
}: SelectFieldProps) => {
  const lang = useLangStore((state) => state.lang);
  
  // 현재 선택된 모델명 가져오기
  const { getModelName } = useModelInfoStore();
  const modelName = getModelName();

  const [isChecked, setIsChecked] = useState(
    formData[id]?.realValue !== "00" && formData[id]?.realValue !== "0"
  );

  if (!formData[id]) return null;

  const realId = isUnderbarId ? `${id}_${1}` : id;

  const hardwareList = formData[id]?.list || [];

  const [beforeValue, setBeforeValue] = useState(
    FIELD_VALIDATIONS[realId].list.filter((listItem) =>
      hardwareList.includes(listItem.value)
    )[0].value
  );

  return (
    <Stack
      width={"calc(50% - 8px)"}
      gap={"8px"}
      style={{ ...(isSwitch && { position: "relative" }), ...style }}
    >
      <Stack direction="row" gap="4px" alignItems="center">
        <InputBox.Title>
          {/* groupFieldPatch에서 정의 가져오기 */}
          {getFieldDefinition(id, modelName)?.title?.[lang] || FIELD_VALIDATIONS[realId]?.title?.[lang]}
          {isRequired && (
            <span style={{ color: "#FF0000", paddingLeft: "4px" }}>*</span>
          )}
        </InputBox.Title>
        {(getFieldDefinition(id, modelName)?.tooltip?.[lang] || FIELD_VALIDATIONS[realId]?.tooltip?.[lang]) && (
          <InputBox.Info
            tooltipText={
              <span style={{ whiteSpace: "pre-wrap" }}>
                {getFieldDefinition(id, modelName)?.tooltip?.[lang] || FIELD_VALIDATIONS[realId]?.tooltip?.[lang]}
              </span>
            }
          />
        )}
        <InputBox.Number>{id}</InputBox.Number>
        {isDirty && <EditDot />}
      </Stack>

      {isSwitch && (
        <Stack sx={{ position: "absolute", right: 0, top: 0 }}>
          <SwitchPrimary
            checked={isChecked}
            onChange={(e) => {
              setIsChecked(e.target.checked);

              if (!e.target.checked) {
                setBeforeValue(formData[id]?.realValue);
              }

              onChange(id, e.target.checked ? beforeValue : "00");
            }}
          />
        </Stack>
      )}

      {(!isSwitch || (isSwitch && isChecked)) && (
        <Stack>
          <Select
            value={formData[id].realValue}
            style={{ width: "100%" }}
            onChange={(e) =>
              onChange(
                id,
                e.target.value,
                formData?.[id]?.labelList?.[e.target.value]
              )
            }
          >
            {FIELD_VALIDATIONS[realId].list
              .filter((listItem) => hardwareList.includes(listItem.value))
              .map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label[lang]}
                </MenuItem>
              ))}
          </Select>
        </Stack>
      )}
    </Stack>
  );
};

export default SelectField;
