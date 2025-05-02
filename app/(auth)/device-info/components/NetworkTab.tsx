import { Stack } from "@mui/material";
import InputBox from "@/components/inputbox/InputBox";
import { TextField } from "@mui/material";
import useLangStore from "@/utils/useLangStore";
import { FIELD_VALIDATIONS } from "constants/field";
import { Dispatch, SetStateAction } from "react";

interface Props {
  formData: {
    [key: string]: {
      value: string;
      realValue: string;
    };
  };
  setFormData: Dispatch<
    SetStateAction<{
      [key: string]: {
        value: string;
        realValue: string;
      };
    }>
  >;
}

export default function NetworkTab({ formData, setFormData }: Props) {
  console.log("formData ::::", formData);
  const lang = useLangStore((state) => state.lang);

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: { value, realValue: value },
    }));
  };

  return (
    <div className="contentWrap">
      <section>
        <h1>APN</h1>
        {typeof formData?.["1013"] !== "undefined" && (
          <InputBox style={{ width: "calc(50% - 20px)" }}>
            <InputBox.Head>
              <InputBox.Title>
                {FIELD_VALIDATIONS["1013"].title[lang]}
              </InputBox.Title>
              <InputBox.Info
                tooltipText={
                  <span style={{ whiteSpace: "pre-wrap" }}>
                    {FIELD_VALIDATIONS["1013"].tooltip[lang]}
                  </span>
                }
              />
              <InputBox.Number>1013</InputBox.Number>
            </InputBox.Head>
            <InputBox.Body>
              <Stack direction="row" gap="8px">
                <TextField
                  fullWidth
                  name="1013"
                  type="number"
                  value={formData["1013"].realValue}
                  onChange={handleValueChange}
                />
              </Stack>
            </InputBox.Body>
          </InputBox>
        )}
      </section>
    </div>
  );
}
