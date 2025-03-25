import { ModelConfig } from "@/src/api/services/model/type";
import { FormControlLabel, Checkbox } from "@mui/material";

interface Props {
  lang: string;
  value?: string;
  optionsString: string;
  labelsString: {
    TEXT_EN_ITEM_CONTENT: string;
    TEXT_ES_ITEM_CONTENT: string;
    TEXT_PT_ITEM_CONTENT: string;
  };
  onChange: (newValue: string) => void;
}

export default function CheckboxComp({
  value = "",
  optionsString,
  labelsString,
  lang,
  onChange,
}: Props) {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        gap: "8px",
      }}
    >
      {optionsString.split(", ").map((key, index) => {
        const label = (
          lang === "en"
            ? labelsString.TEXT_EN_ITEM_CONTENT
            : lang === "es"
            ? labelsString.TEXT_ES_ITEM_CONTENT
            : labelsString.TEXT_PT_ITEM_CONTENT
        )
          ?.replace(/[\r\n]+/g, " ")
          .split(", ")[index];
        const values = value.replaceAll(" ", "").split("");

        return (
          <FormControlLabel
            key={key}
            label={label}
            control={
              <Checkbox
                key={key}
                checked={values?.[index] === "1"}
                onChange={(e) => {
                  const totalBits = optionsString.split(", ").length;

                  // 기존 값을 파싱하고 길이 부족한 경우 0으로 채움
                  const currentBits = value.replaceAll(" ", "").split("") ?? [];
                  while (currentBits.length < totalBits) {
                    currentBits.push("0");
                  }

                  // toggle
                  currentBits[index] = currentBits[index] === "1" ? "0" : "1";

                  // 8비트 단위로 공백 포함하여 재조합
                  const newValue = currentBits
                    .map((bit, i) => (i % 8 === 0 ? " " + bit : bit))
                    .join("")
                    .trim();

                  onChange(newValue);
                }}
              />
            }
          />
        );
      })}
    </div>
  );
}
