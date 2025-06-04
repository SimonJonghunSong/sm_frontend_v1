import { Stack } from "@mui/material";
import useLangStore from "@/utils/useLangStore";
import { FormField } from "../page";
import InputBox from "@/components/inputbox/InputBox";
import { FIELD_VALIDATIONS } from "constants/field";
import { SwitchPrimary } from "@/components/switches";
import EditDot from "./EditDot";
import { hiddenParameterId } from "app/(auth)/device-info/(tabs)/CommandTab";
import useParameterStore from "@/utils/useParameterStore";

interface SwitchFieldProps {
  id: string;
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string) => void;
  style?: React.CSSProperties;
  customChecked?: boolean;
  isDirty?: boolean;
  isUnderbarId?: boolean; // 1974 같은 중복으로 인해서 추가된 속성
  isForceRender?: boolean;
}

const SwitchField = ({
  id,
  formData,
  onChange,
  style,
  customChecked,
  isDirty = false,
  isUnderbarId = false,
  isForceRender = false,
}: SwitchFieldProps) => {
  const lang = useLangStore((state) => state.lang);

  const realId = isUnderbarId ? `${id}_${1}` : id;

  const { hiddenParameter } = useParameterStore();

  const isHiddenParameter = hiddenParameterId.includes(id);

  if (
    isForceRender
      ? isHiddenParameter && hiddenParameter
      : !formData[id] || (isHiddenParameter && hiddenParameter)
  )
    return null;

  return (
    <Stack
      width={"calc(50% - 8px)"}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      style={style}
    >
      <Stack direction="row" gap="4px" alignItems="center">
        <InputBox.Title
          style={isHiddenParameter ? { color: "#FF0000" } : undefined}
        >
          {FIELD_VALIDATIONS[realId].title[lang]}
        </InputBox.Title>
        <InputBox.Info
          tooltipText={
            <span style={{ whiteSpace: "pre-wrap" }}>
              {FIELD_VALIDATIONS[realId].tooltip[lang]}
            </span>
          }
        />
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
