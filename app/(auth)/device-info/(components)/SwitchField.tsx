import { Stack } from "@mui/material";
import useLangStore from "@/utils/useLangStore";
import { FormField } from "../page";
import InputBox from "@/components/inputbox/InputBox";
import { FIELD_VALIDATIONS } from "constants/field";
import { SwitchPrimary } from "@/components/switches";
import EditDot from "./EditDot";
import { hiddenParameterId } from "app/(auth)/device-info/(tabs)/CommandTab";
import useParameterStore from "@/utils/useParameterStore";
import { getFieldDefinition } from "@/src/constants/getFieldDefinition";
import useSerial from "@/src/hooks/useSerial";
import useSerialConfigurationStore from "@/src/stores/useSerialConfigurationStore";

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
  label?: string;
  tooltip?: string;
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
  label,
  tooltip,
}: SwitchFieldProps) => {
  const lang = useLangStore((state) => state.lang);

  // 현재 연결된 기기의 모델명 가져오기
  const { state: { portList } } = useSerial ? useSerial() : { state: { portList: [] } };
  const { getCurrentImei } = useSerialConfigurationStore ? useSerialConfigurationStore() : { getCurrentImei: () => undefined };
  const imei = getCurrentImei ? getCurrentImei() : undefined;
  const currentPort = portList.find(({ port }) => port.imei === imei);
  const modelName = currentPort?.port?.modelinfo?.split('_')[0] ?? "";

  const realId = isUnderbarId ? `${id}_${1}` : id;

  // groupFieldPatch에서 정의 가져오기
  const fieldDef = getFieldDefinition(id, modelName);
  const title = fieldDef?.title?.[lang] || FIELD_VALIDATIONS[realId]?.title?.[lang];
  const fieldTooltip = fieldDef?.tooltip?.[lang] || FIELD_VALIDATIONS[realId]?.tooltip?.[lang];

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
          {label || title}
        </InputBox.Title>
        {(tooltip || fieldTooltip) && (
          <InputBox.Info
            tooltipText={
              <span style={{ whiteSpace: "pre-wrap" }}>
                {tooltip || fieldTooltip}
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
