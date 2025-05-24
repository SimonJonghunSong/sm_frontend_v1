import { MenuItem, Select, Stack } from "@mui/material";
import { FormField } from "../page";
import InputBox from "@/components/inputbox/InputBox";
import { FIELD_VALIDATIONS } from "constants/field";
import useLangStore from "@/utils/useLangStore";
import { SwitchPrimary } from "@/components/switches";
import { useState } from "react";
import EditDot from "./EditDot";
import useParameterStore from "@/utils/useParameterStore";
import { hiddenParameterId } from "../(tabs)/CommandTab";
// Constants
const DEFAULT_HOUR_VALUE = "01";
const DEFAULT_MIN_VALUE = "00";
const HOURS_12 = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];
const HOURS_24 = [
  ...HOURS_12,
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
];
const MINUTES_1 = Array.from({ length: 60 }, (_, i) =>
  i.toString().padStart(2, "0")
);
const MINUTES_10 = ["00", "10", "20", "30", "40", "50"];
const MINUTES_30 = ["00", "30"];

// Types
interface TimeHMAProps {
  id: string;
  formData: {
    [key: string]: FormField;
  };
  isRequired?: boolean;
  style?: React.CSSProperties;
  value?: string; // hhmm
  onChange: (id: string, value: string) => void;
  unit?: 1 | 10 | 30;
  hourType?: 12 | 24;
  isSwitch?: boolean;
  isDirty?: boolean;
}

// Utility functions
const formatHour = (hour: number, hourType: number): string => {
  if (hourType === 12) {
    const displayHour = hour > 12 ? hour - 12 : hour;
    return displayHour.toString().padStart(2, "0");
  }
  return hour.toString().padStart(2, "0");
};

const getMinutesByUnit = (unit: 1 | 10 | 30): string[] => {
  switch (unit) {
    case 1:
      return MINUTES_1;
    case 10:
      return MINUTES_10;
    case 30:
      return MINUTES_30;
  }
};

// Sub-components
const TimeSelect = ({
  value,
  options,
  onChange,
  placeholder,
  style,
}: {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  placeholder: string;
  style?: React.CSSProperties;
}) => (
  <Select
    style={style}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    displayEmpty
    renderValue={(v) =>
      v?.length ? v : <span className="text-grey-5">{placeholder}</span>
    }
  >
    {options.map((item) => (
      <MenuItem key={item} value={item}>
        {item}
      </MenuItem>
    ))}
  </Select>
);

export default function TimeHMA({
  id,
  formData,
  isRequired,
  style,
  value,
  onChange,
  unit = 1,
  hourType = 12,
  isSwitch = false,
  isDirty = false,
}: TimeHMAProps) {
  const lang = useLangStore((state) => state.lang);
  const [isChecked, setIsChecked] = useState(!!formData[id]?.realValue);

  const { hiddenParameter } = useParameterStore();
  const isHiddenParameter = hiddenParameterId.includes(id);
  if (!formData[id] || (isHiddenParameter && hiddenParameter)) return null;

  const hour = value?.slice(0, 2) || DEFAULT_HOUR_VALUE;
  const min = value?.slice(2, 4) || DEFAULT_MIN_VALUE;
  const isAm = Number(hour) < 12;

  const handleHourChange = (newHour: string) => {
    let hourNum = Number(newHour);
    if (hourType === 12 && !isAm) {
      hourNum += 12;
    }
    const timeString = `${hourNum.toString().padStart(2, "0")}${min}`;
    onChange(id, timeString);
  };

  const handleMinuteChange = (newMin: string) => {
    const timeString = `${hour}${newMin}`;
    onChange(id, timeString);
  };

  const handleAmPmChange = (newAmPm: string) => {
    const isAM = newAmPm === "AM";
    const hourNum = Number(hour);
    const newHour = isAM ? hourNum - 12 : hourNum + 12;
    const timeString = `${newHour.toString().padStart(2, "0")}${min}`;
    onChange(id, timeString);
  };

  return (
    <Stack
      gap={"8px"}
      style={{
        width: "100%",
        ...(isSwitch && { position: "relative" }),
        ...style,
      }}
    >
      <Stack direction="row" gap="4px" alignItems="center">
        <InputBox.Title
          style={isHiddenParameter ? { color: "#FF0000" } : undefined}
        >
          {FIELD_VALIDATIONS[id].title[lang]}
          {isRequired && (
            <span style={{ color: "#FF0000", paddingLeft: "4px" }}>*</span>
          )}
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
        {isDirty && <EditDot />}
      </Stack>

      {isSwitch && (
        <Stack sx={{ position: "absolute", right: 0, top: 0 }}>
          <SwitchPrimary
            checked={isChecked}
            onChange={(e) => {
              setIsChecked(e.target.checked);
              onChange(id, e.target.checked ? "0100" : "");
            }}
          />
        </Stack>
      )}

      {(!isSwitch || (isSwitch && isChecked)) && (
        <Stack direction="row" gap="4px" alignItems="center">
          <TimeSelect
            value={value ? formatHour(Number(hour), hourType) : ""}
            options={hourType === 12 ? HOURS_12 : HOURS_24}
            onChange={handleHourChange}
            placeholder="HH"
            style={{ flex: 1.7 }}
          />
          <div>:</div>
          <TimeSelect
            value={value ? min : ""}
            options={getMinutesByUnit(unit)}
            onChange={handleMinuteChange}
            placeholder="MM"
            style={{ flex: 1.7 }}
          />
          {hourType === 12 && (
            <TimeSelect
              value={value ? (isAm ? "AM" : "PM") : ""}
              options={["AM", "PM"]}
              onChange={handleAmPmChange}
              placeholder="AM / PM"
              style={{ flex: 1, marginLeft: "8px" }}
            />
          )}
        </Stack>
      )}
    </Stack>
  );
}
