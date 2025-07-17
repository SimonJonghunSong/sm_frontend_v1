"use client";

import { IconButton, MenuItem, Select, Stack } from "@mui/material";
import styles from "./styles.module.scss";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { useState } from "react";
import InputBox from "@/components/inputbox/InputBox";

export interface AssignMenuItem {
  id: string;
  name: string;
  description: string;
  value: string;
}

interface Props {
  smallItems: AssignMenuItem[];
  mediumItems: AssignMenuItem[];
  largeItems: AssignMenuItem[];
  seletedSmallItems: AssignMenuItem[];
  seletedMediumItems: AssignMenuItem[];
  seletedLargeItems: AssignMenuItem[];
  onChange: (
    type: "small" | "medium" | "large",
    item: AssignMenuItem,
    value: boolean
  ) => void;
}

const renderNumber = (index: number) => {
  return index < 10 ? `0${index}` : index;
};

export default function AssignMenusWithDevice({
  smallItems = [],
  mediumItems = [],
  largeItems = [],
  seletedSmallItems = [],
  seletedMediumItems = [],
  seletedLargeItems = [],
  onChange,
}: Props) {
  const [dataType, setDataType] = useState<"small" | "medium" | "large" | "">("");

  const renderDataTable = () => {
    let data = [];
    let dataIndexes = [];
    let type: "small" | "medium" | "large" = "small";

    switch (dataType) {
      case "small":
        data = smallItems;
        dataIndexes = seletedSmallItems.map((item) => Number(item.id));
        type = "small";
        break;
      case "medium":
        data = mediumItems;
        dataIndexes = seletedMediumItems.map((item) => Number(item.id));
        type = "medium";
        break;
      case "large":
        data = largeItems;
        dataIndexes = seletedLargeItems.map((item) => Number(item.id));
        type = "large";
        break;
      default:
        break;
    }

    return (
      <Stack width={"100%"} flex={1} overflow={"auto"}>
        <div className={styles.listWrap}>
          {data.map((item, index) => (
            <FormControl
              key={index.toString()}
              sx={{ flexDirection: "row", gap: "10px", height: "24px" }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={dataIndexes.includes(Number(item.id))}
                    disabled={
                      !dataIndexes.includes(Number(item.id)) &&
                      (type === "small"
                        ? dataIndexes.length >= 15
                        : dataIndexes.length >= 8)
                    }
                    onChange={(e) => onChange(type, item, e.target.checked)}
                  />
                }
                label={item.name}
              />
              <InputBox.Info tooltipText={item.description} />
            </FormControl>
          ))}
        </div>
      </Stack>
    );
  };

  return (
    <Stack width={"100%"}>
      <div className={styles.assignHeaderWrap}>
        <Stack width={"100%"} direction={"column"} gap={"12px"} flex={1}>
          <Select
            style={{ width: "100%" }}
            value={dataType}
            displayEmpty
            renderValue={(v) => {
              let label = "";

              switch (v) {
                case "small":
                  label = "Small Data";
                  break;
                case "medium":
                  label = "Medium Data";
                  break;
                case "large":
                  label = "Large Data";
                  break;
              }
              return v?.length ? (
                label
              ) : (
                <span className="text-grey-5">Select</span>
              );
            }}
            onChange={(e) =>
              setDataType(e.target.value as "small" | "medium" | "large" | "")
            }
          >
            <MenuItem value={"small"}>Small Data</MenuItem>
            <MenuItem value={"medium"}>Medium Data</MenuItem>
            <MenuItem value={"large"}>Large Data</MenuItem>
          </Select>
          {renderDataTable()}
        </Stack>
        <ArrowForwardIosOutlinedIcon sx={{ color: "var(--grey5)" }} />
        <Stack flex={1} gap="32px">
          <Stack
            sx={{ width: "100%", height: 205, minHeight: 205, maxHeight: 205 }}
          >
            <p>Small Data (2Byte)</p>

            <div
              style={{
                overflow: "hidden",
                overflowY: "auto",
              }}
              className={styles.listWrap}
            >
              {seletedSmallItems.map((item) => {
                const target = item;

                if (!target) return null;

                const name = target.name;

                return (
                  <Stack
                    key={item.id}
                    sx={{
                      flexDirection: "row",
                      gap: "10px",
                      height: "24px",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span
                      style={{
                        flex: 1,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {renderNumber(
                        isNaN(Number(target?.id || 0))
                          ? 0
                          : Number(target?.id || 0)
                      )}{" "}
                      {name}
                    </span>
                    <IconButton
                      sx={{ width: 24, height: 24, flexShrink: 0 }}
                      onClick={() => {
                        onChange("small", item, false);
                      }}
                    >
                      <CancelOutlinedIcon sx={{ width: 22, height: 22 }} />
                    </IconButton>
                  </Stack>
                );
              })}
            </div>
          </Stack>
          <Stack
            sx={{ width: "100%", height: 205, minHeight: 205, maxHeight: 205 }}
          >
            <p>Medium Data (4Byte)</p>

            <div className={styles.listWrap}>
              {seletedMediumItems.map((item) => {
                const target = item;

                if (!target) return null;

                const name = target.name;

                return (
                  <Stack
                    key={item.id}
                    sx={{
                      flexDirection: "row",
                      gap: "10px",
                      height: "24px",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span
                      style={{
                        flex: 1,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {renderNumber(
                        isNaN(Number(target?.id || 0))
                          ? 0
                          : Number(target?.id || 0)
                      )}{" "}
                      {name}
                    </span>
                    <IconButton
                      sx={{ width: 24, height: 24, flexShrink: 0 }}
                      onClick={() => {
                        onChange("medium", item, false);
                      }}
                    >
                      <CancelOutlinedIcon sx={{ width: 22, height: 22 }} />
                    </IconButton>
                  </Stack>
                );
              })}
            </div>
          </Stack>
          <Stack
            sx={{ width: "100%", height: 205, minHeight: 205, maxHeight: 205 }}
          >
            <p>Large Data (8Byte)</p>
            <div className={styles.listWrap}>
              {seletedLargeItems.map((item) => {
                const target = item;

                if (!target) return null;

                const name = target.name;

                return (
                  <Stack
                    key={item.id}
                    sx={{
                      flexDirection: "row",
                      gap: "10px",
                      height: "24px",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span
                      style={{
                        flex: 1,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {renderNumber(
                        isNaN(Number(target?.id || 0))
                          ? 0
                          : Number(target?.id || 0)
                      )}{" "}
                      {name}
                    </span>
                    <IconButton
                      sx={{ width: 24, height: 24, flexShrink: 0 }}
                      onClick={() => {
                        onChange("large", item, false);
                      }}
                    >
                      <CancelOutlinedIcon sx={{ width: 22, height: 22 }} />
                    </IconButton>
                  </Stack>
                );
              })}
            </div>
          </Stack>
        </Stack>
      </div>
    </Stack>
  );
}
