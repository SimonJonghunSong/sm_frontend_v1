import { MenuItem, Select } from "@mui/material";
import dayjs from "dayjs";

const DEFAULT_HOUR_VALUE = "01";
const DEFAULT_MIN_VALUE = "00";

interface Props {
  style?: React.CSSProperties;
  value?: string; // hh:mm
  onChange: (value: string) => void;
  unit?: 1 | 10 | 30;
  hourType?: 12 | 24;
  isAm?: boolean;
}

export default function TimeHMA({
  style,
  value,
  onChange,
  unit = 1,
  hourType = 12,
  isAm,
}: Props) {
  const renderHour = () => {
    if (hourType === 12) {
      return [
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
    } else {
      return [
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
    }
  };

  const renderMin = () => {
    switch (unit) {
      case 1:
        return [
          "00",
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
          "25",
          "26",
          "27",
          "28",
          "29",
          "30",
          "31",
          "32",
          "33",
          "34",
          "35",
          "36",
          "37",
          "38",
          "39",
          "40",
          "41",
          "42",
          "43",
          "44",
          "45",
          "46",
          "47",
          "48",
          "49",
          "50",
          "51",
          "52",
          "53",
          "54",
          "55",
          "56",
          "57",
          "58",
          "59",
        ];
      case 10:
        return ["00", "10", "20", "30", "40", "50"];
      case 30:
        return ["00", "30"];
    }
  };

  return (
    <div
      style={{
        width: "100%",
        alignItems: "center",
        display: "flex",
        gap: "4px",
        ...style,
      }}
    >
      <Select
        style={{ flex: 1.7 }}
        value={
          value
            ? isAm
              ? value.split(":")[0]
              : Number(value.split(":")[0]) - 12 < 10
              ? "0" + (Number(value.split(":")[0]) - 12).toString()
              : (Number(value.split(":")[0]) - 12).toString()
            : ""
        }
        onChange={(e) => {
          const min = value?.split(":")[1] || DEFAULT_MIN_VALUE;
          let hour = Number(e.target.value);

          if (hourType === 12) {
            if (!isAm) {
              hour = hour + 12;
            }
          }

          if (!value) {
            hour = Number(DEFAULT_HOUR_VALUE);
          }

          const timeString = `${hour}:${min}`;
          onChange(timeString);
        }}
        displayEmpty
        renderValue={(v) =>
          v?.length ? (
            // 선택된 값이 있을 때 표시할 내용
            v
          ) : (
            // placeholder 텍스트
            <span className="text-grey-5">hh</span>
          )
        }
      >
        {renderHour().map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
      <div>:</div>
      <Select
        style={{ flex: 1.7 }}
        value={value ? value.split(":")[1] : ""}
        onChange={(e) => {
          const min = e.target.value;
          const hour = value?.split(":")[0] || DEFAULT_HOUR_VALUE;

          const timeString = `${hour}:${min}`;
          onChange(timeString);
        }}
        displayEmpty
        renderValue={(v) =>
          v?.length ? (
            // 선택된 값이 있을 때 표시할 내용
            v
          ) : (
            // placeholder 텍스트
            <span className="text-grey-5">mm</span>
          )
        }
      >
        {renderMin().map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
      {hourType === 12 && (
        <Select
          style={{ flex: 1, marginLeft: "8px" }}
          value={value ? (isAm ? "AM" : "PM") : ""}
          onChange={(e) => {
            const min = value?.split(":")[1] || DEFAULT_MIN_VALUE;
            const hour =
              e.target.value === "AM"
                ? Number(value?.split(":")[0]) - 12 < 10
                  ? "0" + (Number(value?.split(":")[0]) - 12).toString()
                  : (Number(value?.split(":")[0]) - 12).toString()
                : Number(value?.split(":")[0]) + 12 < 10
                ? "0" + (Number(value?.split(":")[0]) + 12).toString()
                : (Number(value?.split(":")[0]) + 12).toString();

            const timeString = `${hour}:${min}`;
            onChange(timeString);
          }}
          displayEmpty
          renderValue={(v) =>
            v?.length ? (
              // 선택된 값이 있을 때 표시할 내용
              v
            ) : (
              // placeholder 텍스트
              <span className="text-grey-5">AM/PM</span>
            )
          }
        >
          <MenuItem value="AM">AM</MenuItem>
          <MenuItem value="PM">PM</MenuItem>
        </Select>
      )}
    </div>
  );
}
