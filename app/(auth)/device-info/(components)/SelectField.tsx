import { MenuItem, Select, Stack } from "@mui/material";
import useLangStore from "@/utils/useLangStore";
import { FIELD_VALIDATIONS } from "constants/field";
import InputBox from "@/components/inputbox/InputBox";
import { FormField } from "../page";
import { SwitchPrimary } from "@/components/switches";
import { useState } from "react";
import EditDot from "./EditDot";
import { getFieldDefinition } from "@/src/constants/getFieldDefinition";
import useSerial from "@/src/hooks/useSerial";
import useSerialConfigurationStore from "@/src/stores/useSerialConfigurationStore";

interface SelectFieldProps {
  id: string;
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string) => void;
  isRequired?: boolean;
  isSwitch?: boolean;
  style?: React.CSSProperties;
  isDirty?: boolean;
  isUnderbarId?: boolean;
  hideTitle?: boolean;
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
  hideTitle = false,
}: SelectFieldProps) => {
  const lang = useLangStore((state) => state.lang);
  
  // 현재 연결된 기기의 모델명 가져오기
  const { state: { portList } } = useSerial ? useSerial() : { state: { portList: [] } };
  const { getCurrentImei } = useSerialConfigurationStore ? useSerialConfigurationStore() : { getCurrentImei: () => undefined };
  const imei = getCurrentImei ? getCurrentImei() : undefined;
  const currentPort = portList.find(({ port }) => port.imei === imei);
  const modelName = currentPort?.port?.modelinfo?.split('_')[0] ?? "";

  // 2611에 대한 디버깅 로그
  // if (id === "2611") {
  //   console.log("=== SelectField 2611 ===");
  //   console.log("formData[2611]:", formData[id]);
  //   console.log("isSwitch:", isSwitch);
  //   console.log("hideTitle:", hideTitle);
  //   console.log("modelName:", modelName);
  // }

  const [isChecked, setIsChecked] = useState(() => {
    if (id === "2611") {
      // 2611의 경우 realValue가 "0"이면 OFF, "1"~"7"이면 ON
      return formData[id]?.realValue !== "0";
    }
    return formData[id]?.realValue !== "00" && formData[id]?.realValue !== "0";
  });

  if (!formData[id]) return null;

  const realId = isUnderbarId ? `${id}_${1}` : id;

  const hardwareList = formData[id]?.list || [];

  // 2611에 대한 디버깅 로그
  // if (id === "2611") {
  //   console.log("2611 hardwareList:", hardwareList);
  //   console.log("2611 FIELD_VALIDATIONS:", FIELD_VALIDATIONS[realId]);
  // }

  // 2611의 경우 groupFieldPatch에서 정의 가져오기 (실제 모델명 사용)
  const fieldDef = id === "2611" ? getFieldDefinition("2611", modelName) : null;
  const title = fieldDef?.title?.[lang] || FIELD_VALIDATIONS[realId]?.title?.[lang];
  const tooltip = fieldDef?.tooltip?.[lang] || FIELD_VALIDATIONS[realId]?.tooltip?.[lang];

  const [beforeValue, setBeforeValue] = useState(() => {
    const fieldValidations = FIELD_VALIDATIONS[realId];
    if (!fieldValidations?.list) return "00";
    
    const filteredList = fieldValidations.list.filter((listItem) =>
      hardwareList.includes(listItem.value)
    );
    
    return filteredList.length > 0 ? filteredList[0].value : "00";
  });

  return (
    <Stack
      width={"calc(50% - 8px)"}
      gap={"8px"}
      style={{ ...(isSwitch && { position: "relative" }), ...style }}
    >
      {!hideTitle && (
        <Stack direction="row" gap="4px" alignItems="center">
          <InputBox.Title>
            {title}
            {isRequired && (
              <span style={{ color: "#FF0000", paddingLeft: "4px" }}>*</span>
            )}
          </InputBox.Title>
          {tooltip && (
            <InputBox.Info
              tooltipText={
                <span style={{ whiteSpace: "pre-wrap" }}>
                  {tooltip}
                </span>
              }
            />
          )}
          <InputBox.Number>{id}</InputBox.Number>
          {isDirty && <EditDot />}
        </Stack>
      )}

      {isSwitch && (
        <Stack sx={{ position: "absolute", right: 0, top: 0 }}>
          <SwitchPrimary
            checked={isChecked}
            onChange={(e) => {
              setIsChecked(e.target.checked);

              if (!e.target.checked) {
                setBeforeValue(formData[id]?.realValue);
              }

              // 2611의 경우 "0"을 "00"으로 변환하여 전송
              const sendValue = id === "2611" && !e.target.checked ? "00" : 
                               id === "2611" && e.target.checked ? beforeValue : 
                               e.target.checked ? beforeValue : "00";
              
              onChange(id, sendValue);
            }}
          />
        </Stack>
      )}

      {(!isSwitch || (isSwitch && isChecked)) && (
        <Stack>
          {/* 빨간색 디버깅 라인  표출 */}
          {/* {id === "2611" && (
            <div style={{ fontSize: '12px', color: 'red' }}>
              Debug: realValue={formData[id].realValue}, 
              list={JSON.stringify(formData[id].list)}, 
              labelList={JSON.stringify(formData[id].labelList)}
            </div>
          )} */}
          <Select
            value={formData[id].realValue}
            style={{ width: "100%" }}
            onChange={(e) => onChange(id, e.target.value)}
          >
            {formData[id].list && formData[id].labelList ? (
              // formData의 list와 labelList를 직접 사용
              formData[id].list.map((value, index) => {
                // 2611의 경우 "0" (Disable) 항목은 제외하고 1~7만 표시
                if (id === "2611" && value === "0") {
                  return null;
                }
                
                // 2611의 경우 groupFieldPatch의 다국어 정의 사용
                let label;
                if (id === "2611" && fieldDef?.list) {
                  const fieldDefItem = fieldDef.list.find(item => item.value === value);
                  label = fieldDefItem?.label?.[lang] || formData[id].labelList[index];
                } else {
                  label = typeof formData[id].labelList[index] === 'string' 
                    ? formData[id].labelList[index] 
                    : formData[id].labelList[index]?.[lang] || value;
                }
                
                return (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                );
              }).filter(Boolean) // null 항목 제거
            ) : (
              // fallback: FIELD_VALIDATIONS 사용
              FIELD_VALIDATIONS[realId].list
                ?.filter((listItem) => hardwareList.includes(listItem.value))
                .map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label[lang]}
                  </MenuItem>
                ))
            )}
          </Select>
        </Stack>
      )}
    </Stack>
  );
};

export default SelectField;
