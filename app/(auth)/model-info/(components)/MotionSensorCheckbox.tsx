import { FormControlLabel } from "@mui/material";

import { Checkbox } from "@mui/material";
import { useMemo } from "react";

const labelsString = {
  TEXT_EN_ITEM_CONTENT: "Motion, Shock, Collision",
  TEXT_ES_ITEM_CONTENT: "Movimiento, Choque, Colisión",
  TEXT_PT_ITEM_CONTENT: "Movimento, Choque, Colisão",
};

interface Props {
  lang: string;
  value?: string;
  onChange: (newValue: string) => void;
}

export default function MotionSensorCheckbox({ lang, value, onChange }: Props) {
  const checkedValues = useMemo(() => {
    switch (value) {
      case "00":
        return [];
      case "01":
        return ["motion"];
      case "02":
        return ["shock"];
      case "03":
        return ["motion", "shock"];
      case "04":
        return ["collision"];
      case "05":
        return ["motion", "collision"];
      case "06":
        return ["shock", "collision"];
      case "07":
        return ["motion", "shock", "collision"];
      default:
        return [];
    }
  }, [value]);

  const labels = useMemo(() => {
    const labelObject = (
      lang === "en"
        ? labelsString.TEXT_EN_ITEM_CONTENT
        : lang === "es"
        ? labelsString.TEXT_ES_ITEM_CONTENT
        : labelsString.TEXT_PT_ITEM_CONTENT
    ).split(", ");

    return {
      motion: labelObject[0],
      shock: labelObject[1],
      collision: labelObject[2],
    };
  }, []);

  /**
   * value
   * 00: None
   * 01: Motion
   * 02: Shock
   * 03: Motion & Shock
   * 04: Collision
   * 05: Motion & Collision
   * 06: Shock & Collision
   * 07: Motion & Shock & Collision
   */
  const handleCheckboxChange = (checked: boolean, key: string) => {
    let prevChecked = [...checkedValues];

    if (checked) {
      prevChecked.push(key);
    } else {
      prevChecked = prevChecked.filter((item) => item !== key);
    }

    console.log("prevChecked :::", prevChecked);

    if (prevChecked.length === 0) {
      onChange("00");
      return;
    }
    if (prevChecked.length === 1) {
      const target = prevChecked[0];
      if (target === "motion") {
        onChange("01");
        return;
      }
      if (target === "shock") {
        onChange("02");
        return;
      }
      if (target === "collision") {
        onChange("04");
        return;
      }
    }
    if (prevChecked.length === 2) {
      if (prevChecked.includes("motion") && prevChecked.includes("shock")) {
        onChange("03");
        return;
      }
      if (prevChecked.includes("motion") && prevChecked.includes("collision")) {
        onChange("05");
        return;
      }
      if (prevChecked.includes("shock") && prevChecked.includes("collision")) {
        onChange("06");
        return;
      }
    }
    if (prevChecked.length === 3) {
      onChange("07");
      return;
    }
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        gap: "8px",
      }}
    >
      <FormControlLabel
        key="motion"
        label={labels.motion}
        control={
          <Checkbox
            checked={checkedValues.includes("motion")}
            onChange={(e) => handleCheckboxChange(e.target.checked, "motion")}
          />
        }
      />
      <FormControlLabel
        key="shock"
        label={labels.shock}
        control={
          <Checkbox
            checked={checkedValues.includes("shock")}
            onChange={(e) => handleCheckboxChange(e.target.checked, "shock")}
          />
        }
      />
      <FormControlLabel
        key="collision"
        label={labels.collision}
        control={
          <Checkbox
            checked={checkedValues.includes("collision")}
            onChange={(e) =>
              handleCheckboxChange(e.target.checked, "collision")
            }
          />
        }
      />
    </div>
  );
}
