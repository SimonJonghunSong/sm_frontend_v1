import InputBox from "@/components/inputbox/InputBox";
import useLangStore from "@/utils/useLangStore";
import { Stack } from "@mui/material";
import CheckboxComp from "./CheckboxComp";
import { FormField } from "../page";
import { FIELD_VALIDATIONS } from "constants/field";

interface Props {
  id: string;
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string) => void;
  isSwitch?: boolean;
  style?: React.CSSProperties;
  optionString: string;
  labelString: {
    TEXT_EN_ITEM_CONTENT: string;
    TEXT_ES_ITEM_CONTENT: string;
    TEXT_PT_ITEM_CONTENT: string;
  };
  hasAllCheckbox?: boolean;
}

export default function CheckboxField({
  id,
  formData,
  onChange,
  optionString,
  labelString,
  isSwitch,
  style,
  hasAllCheckbox = false,
}: Props) {
  const lang = useLangStore((state) => state.lang);

  return (
    <Stack gap="8px">
      <Stack direction="row" gap="4px" alignItems="center">
        <InputBox.Title>
          {FIELD_VALIDATIONS[id].title[lang]}

          <span style={{ color: "#FF0000", paddingLeft: "4px" }}>*</span>
        </InputBox.Title>
        {FIELD_VALIDATIONS[id].tooltip?.[lang] && (
          <InputBox.Info
            tooltipText={
              <span style={{ whiteSpace: "pre-wrap" }}>
                {FIELD_VALIDATIONS[id].tooltip[lang]}
              </span>
            }
          />
        )}
        <InputBox.Number>{id}</InputBox.Number>
      </Stack>
      <CheckboxComp
        value={formData[id]?.realValue}
        optionsString={optionString}
        labelsString={labelString}
        hasAllCheckbox={hasAllCheckbox}
        lang={lang}
        onChange={(newValue) => {
          onChange(id, newValue);
        }}
      />
    </Stack>
  );
}
