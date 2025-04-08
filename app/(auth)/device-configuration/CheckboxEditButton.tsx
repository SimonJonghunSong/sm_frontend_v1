import { Button, Stack, TextField } from "@mui/material";
import CheckboxComp from "app/(auth)/model-info/CheckboxComp";
import { PasswordTextField } from "app/(auth)/model-info/EditHiddenInput";
import { useTranslations } from "next-intl";

interface Props {
  isEditHidden?: boolean;
  VALUE_MIN?: string;
  VALUE_MAX?: string;
  inputValue: string;
  checkedValue: string;
  optionsString: string;
  lang: string;
  labelsString: {
    TEXT_EN_ITEM_CONTENT: string;
    TEXT_ES_ITEM_CONTENT: string;
    TEXT_PT_ITEM_CONTENT: string;
  };
  onChange: (newValue: string[]) => void;
}

export default function CheckboxEditButton({
  isEditHidden = false,
  VALUE_MIN,
  VALUE_MAX,
  inputValue,
  checkedValue,
  optionsString,
  labelsString,
  lang,
  onChange,
}: Props) {
  const t = useTranslations();

  return (
    <Stack width={"100%"} direction={"column"} gap={"8px"}>
      <CheckboxComp
        value={checkedValue}
        optionsString={optionsString}
        labelsString={labelsString}
        lang={lang}
        onChange={(newValue) => {
          onChange([newValue, inputValue]);
        }}
        hasAllCheckbox={false}
      />
      {isEditHidden ? (
        <PasswordTextField
          value={""}
          onChange={(newValue) => {
            onChange([checkedValue, newValue]);
          }}
        />
      ) : (
        <>
          <Stack direction="row" gap="8px">
            <TextField
              fullWidth
              type={
                !!VALUE_MIN && !!VALUE_MIN
                  ? "number"
                  : isEditHidden
                  ? "password"
                  : "text"
              }
              inputProps={
                !!VALUE_MIN && !!VALUE_MIN
                  ? {
                      min: VALUE_MIN || undefined,
                      max: VALUE_MAX || undefined,
                    }
                  : undefined
              }
              value={inputValue}
              onChange={(e) => {
                let newValue = e.target.value;

                // 숫자 타입일 경우 범위 검증
                if (VALUE_MIN !== undefined && VALUE_MAX !== undefined) {
                  const numValue = Number(newValue);
                  if (numValue > Number(VALUE_MAX)) {
                    newValue = String(VALUE_MAX);
                  } else if (numValue < Number(VALUE_MIN)) {
                    newValue = String(VALUE_MIN);
                  }
                }

                onChange([checkedValue, newValue]);
              }}
            />

            <Button color="secondary" variant="contained" onClick={() => {}}>
              {t("configuration.ble.save")}
            </Button>
          </Stack>
        </>
      )}
    </Stack>
  );
}
