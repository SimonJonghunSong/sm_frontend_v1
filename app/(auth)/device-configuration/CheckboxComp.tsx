import { ModelConfig } from "@/src/api/services/model/type";
import { FormControlLabel, Checkbox } from "@mui/material";
import {
  binaryStringGroupedToHex,
  hexToBinaryStringGrouped,
} from "app/(auth)/device-configuration/utils/functions";
import { useEffect, useState } from "react";

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

  console.log("value :::", value);

  /**
   * 체크박스 규칙
   *
   * value : 앞에서 부터 체크여부에 따라 1 또는 0 으로 구성
   * 8bit 단위로 value를 작성하는데, 부족한 부분은 0으로 채움
   * 8bit 단위로 공백 포함하여 재조합
   *
   * 예시)
   *
   * optionsString 길이가 3인 경우
   *
   * 체크박스 1, 2, 3 번 체크 시
   * value = "11100000"
   *
   * optionsString 길이가 10인 경우
   *
   * 체크박스 1, 2, 5, 6, 7 번 체크 시
   * value = "11001110 00000000"
   *
   * optionsString 길이가 10인 경우
   *
   * 체크박스 3, 4, 6, 8, 10 번 체크 시
   * value = "00110101 01000000"
   *
   */

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

  const handleAllClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = [];
    setAllChecked(e.target.checked);

    for (let i = 0; i < optionsString.split(", ").length; i++) {
      newValue.push(e.target.checked ? "1" : "0");
    }

    if (newValue.length % 8 !== 0) {
      while (newValue.length % 8 !== 0) {
        newValue.push("0");
      }
    }

    const newValueString = newValue
      .map((bit, i) => (i !== 0 && i % 8 === 0 ? ` ${bit}` : bit))
      .join("")
      .trim();

    console.log("newValueString :::", newValueString);

    onChange(binaryStringGroupedToHex(newValueString));
  };

  const handleCheckboxChange = (index: number) => {
    const totalBits = optionsString.split(", ").length;

    console.log("totalBits :::", totalBits);

    // 기존 값을 파싱하고 길이 부족한 경우 0으로 채움
    const currentBits =
      hexToBinaryStringGrouped(value).replaceAll(" ", "").split("") ?? [];
    while (currentBits.length < totalBits) {
      currentBits.push("0");
    }

    console.log("currentBits :::", currentBits);

    // toggle
    currentBits[index] = currentBits[index] === "1" ? "0" : "1";

    // 8비트 단위로 공백 포함하여 재조합
    const newValue = currentBits
      .map((bit, i) => (i % 8 === 0 ? " " + bit : bit))
      .join("")
      .trim();

    console.log("newValue :::", newValue);
    console.log(
      "binaryStringGroupedToHex(newValue) :::",
      binaryStringGroupedToHex(newValue)
    );

    onChange(binaryStringGroupedToHex(newValue));
  };

  useEffect(() => {
    let allChecked = true;

    for (let i = 0; i < optionsString.split(", ").length; i++) {
      if (
        hexToBinaryStringGrouped(value).replaceAll(" ", "").split("")[i] !== "1"
      ) {
        allChecked = false;
        break;
      }
    }

    setAllChecked(allChecked);
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
        {optionsString
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
          })
          .map((key, index) => {
            const label = (
              lang === "en"
                ? labelsString.TEXT_EN_ITEM_CONTENT
                : lang === "es"
                ? labelsString.TEXT_ES_ITEM_CONTENT
                : labelsString.TEXT_PT_ITEM_CONTENT
            )
              ?.replace(/[\r\n]+/g, " ")
              .split(",")[index];
            const values = hexToBinaryStringGrouped(value)
              .replaceAll(" ", "")
              .split("");

            return (
              <FormControlLabel
                key={key}
                label={label}
                control={
                  <Checkbox
                    key={key}
                    checked={values?.[index] === "1"}
                    onChange={() => handleCheckboxChange(index)}
                  />
                }
              />
            );
          })}
      </div>
    </div>
  );
}
