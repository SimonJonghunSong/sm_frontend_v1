import { Stack } from "@mui/material";
import useLangStore from "@/utils/useLangStore";
import { FormField } from "../page";
import InputBox from "@/components/inputbox/InputBox";
import { FIELD_VALIDATIONS } from "constants/field";
import { SwitchPrimary } from "@/components/switches";
import EditDot from "app/(auth)/model-info/(components)/EditDot";
import { getFieldDefinition } from "@/src/constants/getFieldDefinition";
import useModelInfoStore from "@/src/stores/useModelInfo";

interface SwitchFieldProps {
  id: string;
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string) => void;
  style?: React.CSSProperties;
  customChecked?: boolean;
  isRequired?: boolean;
  isDirty?: boolean;
  isUnderbarId?: boolean;
  isForceRender?: boolean;
}

const SwitchField = ({
  id,
  formData,
  onChange,
  style,
  customChecked,
  isRequired,
  isDirty = false,
  isUnderbarId = false,
  isForceRender = false,
}: SwitchFieldProps) => {
  const lang = useLangStore((state) => state.lang);
  
  // 현재 선택된 모델명 가져오기
  const { getModelName } = useModelInfoStore();
  const modelName = getModelName();

  const realId = isUnderbarId ? `${id}_${1}` : id;
  if (!isForceRender && !formData?.[id]) return null;

  // groupFieldPatch에서 정의 가져오기
  const fieldDef = getFieldDefinition(id, modelName);
  const title = fieldDef?.title?.[lang] || FIELD_VALIDATIONS[realId]?.title?.[lang];
  const fieldTooltip = fieldDef?.tooltip?.[lang] || FIELD_VALIDATIONS[realId]?.tooltip?.[lang];

  // 1973 필드 디버깅 로그
  if (id === "1973") {
    console.log("=== SwitchField 1973 ===");
    console.log("modelName:", modelName);
    console.log("fieldDef:", fieldDef);
    console.log("title:", title);
    console.log("FIELD_VALIDATIONS[realId].title[lang]:", FIELD_VALIDATIONS[realId]?.title?.[lang]);
  }

  return (
    <Stack
      width={"100%"}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      style={style}
    >
      <Stack direction="row" gap="4px" alignItems="center">
        <InputBox.Title>
          {title}
          {isRequired && (
            <span style={{ color: "#FF0000", paddingLeft: "4px" }}>*</span>
          )}
        </InputBox.Title>
        {fieldTooltip && (
          <InputBox.Info
            tooltipText={
              <span style={{ whiteSpace: "pre-wrap" }}>
                {fieldTooltip}
              </span>
            }
          />
        )}
        <InputBox.Number>{id}</InputBox.Number>
        {isDirty && <EditDot />}
      </Stack>
      <SwitchPrimary
        onChange={(e) => onChange(id, e.target.checked ? "01" : "00")}
        checked={
          typeof customChecked === "boolean"
            ? customChecked
            : formData?.[id]?.realValue === "01"
        }
      />
    </Stack>
  );
};

export default SwitchField;
