import { FormControlLabel, Checkbox } from "@mui/material";
import { useEffect, useMemo, useState } from "react";

interface Props {
  lang: string;
  value?: string;
  optionsString?: string;
  labelsString: {
    TEXT_EN_ITEM_CONTENT: string;
    TEXT_ES_ITEM_CONTENT: string;
    TEXT_PT_ITEM_CONTENT: string;
  };
  onChange: (newValue: string) => void;
  hasAllCheckbox?: boolean;
}

export default function CheckboxComp({
  value = "",
  optionsString: optionsStringProp,
  labelsString,
  lang,
  onChange,
  hasAllCheckbox = true,
}: Props) {
  const [allChecked, setAllChecked] = useState(false);

  const optionsString =
    optionsStringProp ||
    new Array(
      labelsString.TEXT_EN_ITEM_CONTENT.replace(/[\r\n]+/g, "").split(
        ","
      ).length
    )
      .fill(0)
      .map((_, index) => {
        if (index < 10) {
          return `0${index}`;
        }
        return `${index}`;
      })
      .join(", ");

  const filteredOptionsString = optionsString
    .replace(/[\r\n]+/g, "")
    .split(",")
    // 라벨이 없는 경우 제외
    .filter((key, index) => {
      const label = (
        lang === "en"
          ? labelsString.TEXT_EN_ITEM_CONTENT
          : lang === "es"
          ? labelsString.TEXT_ES_ITEM_CONTENT
          : labelsString.TEXT_PT_ITEM_CONTENT
      )
        ?.replace(/[\r\n]+/g, " ")
        .split(",")[index];

      return !!label;
    });

  const values = useMemo(() => {
    // value가 없거나 잘못된 값일 때 0으로 처리
    const valueNumberDecimal = parseInt(value || "0", 16);
    const binaryString = valueNumberDecimal
      .toString(2)
      .padStart(filteredOptionsString.length, "0");
    return binaryString.split("");
  }, [value, filteredOptionsString.length]);

  console.log("values :::", values);

  const handleAllClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const changeValues = new Array(filteredOptionsString.length).fill(
      e.target.checked ? "1" : "0"
    );
    const changeValue = parseInt(changeValues.join(""), 2)
      .toString(16)
      .padStart(Math.ceil(filteredOptionsString.length / 4), "0");
    onChange(changeValue);
  };

  const handleCheckboxChange = (checked: boolean, index: number) => {
    const changeValues = values.map((item, valueIndex) =>
      valueIndex === index ? (checked ? "1" : "0") : item
    );
    const changeValue = parseInt(changeValues.join(""), 2)
      .toString(16)
      .padStart(Math.ceil(filteredOptionsString.length / 4), "0");
    onChange(changeValue);
  };

  useEffect(() => {
    if (values.every((item) => item === "1")) {
      setAllChecked(true);
    } else {
      setAllChecked(false);
    }
  }, [value]);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      {hasAllCheckbox && (
        <div>
          <FormControlLabel
            control={
              <Checkbox checked={allChecked} onChange={handleAllClick} />
            }
            label="All"
          />
        </div>
      )}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        {filteredOptionsString.map((key, index) => {
          const label = (
            lang === "en"
              ? labelsString.TEXT_EN_ITEM_CONTENT
              : lang === "es"
              ? labelsString.TEXT_ES_ITEM_CONTENT
              : labelsString.TEXT_PT_ITEM_CONTENT
          )
            ?.replace(/[\r\n]+/g, " ")
            .split(",")[index];

          return (
            <FormControlLabel
              key={key}
              label={label}
              control={
                <Checkbox
                  key={key}
                  checked={values?.[index] === "1"}
                  onChange={(e) =>
                    handleCheckboxChange(e.target.checked, index)
                  }
                />
              }
            />
          );
        })}
      </div>
    </div>
  );
}
