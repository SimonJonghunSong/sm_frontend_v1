import { Button, MenuItem, Select } from "@mui/material";
import dayjs from "dayjs";
import TimeHMA from "./TimeHMA";

interface Props {
  style?: React.CSSProperties;
  values?: string[];
  onChange: (value: string[]) => void;
  onClick?: () => void;
  unit?: 1 | 10 | 30;
}

export default function TimeSeHMAButton({
  style,
  values,
  onChange,
  onClick,
  unit = 1,
}: Props) {
  const renderComponent = (type?: "start" | "end") => {
    const [start, end] = values || [];
    const value = type === "start" ? start : end;

    return (
      <TimeHMA
        value={value}
        style={{ flex: 1 }}
        onChange={(newValue) => {
          if (type === "start") {
            onChange([newValue, end]);
          } else {
            onChange([start, newValue]);
          }
        }}
        unit={unit}
        hourType={24}
      />
    );
  };

  return (
    <div
      style={{
        width: "100%",
        alignItems: "center",
        display: "flex",
        gap: "8px",
        ...style,
      }}
    >
      {renderComponent("start")}
      <div>~</div>
      {renderComponent("end")}
      <Button
        style={{ width: "fit-content", flexShrink: 0 }}
        variant="contained"
        color="secondary"
        onClick={onClick}
      >
        Send
      </Button>
    </div>
  );
}
