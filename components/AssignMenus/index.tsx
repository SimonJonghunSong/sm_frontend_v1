"use client";

import { IconButton, MenuItem, Select, Stack } from "@mui/material";
import styles from "./styles.module.scss";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import useLangStore from "@/utils/useLangStore";
import { useEffect, useState, useRef } from "react";
import InputBox from "@/components/inputbox/InputBox";

export interface AssignMenuItem {
  id: string;
  name: string;
  description: string;
  value: "0" | "1";
}

interface Props {
  smallItems?: AssignMenuItem[];
  mediumItems?: AssignMenuItem[];
  largeItems?: AssignMenuItem[];
  defaultSmallIndexes?: number[];
  defaultMediumIndexes?: number[];
  defaultLargeIndexes?: number[];
  onChange?: (
    smallDataIndexes: AssignMenuItem[],
    mediumDataIndexes: AssignMenuItem[],
    largeDataIndexes: AssignMenuItem[]
  ) => void;
}

const renderNumber = (index: number) => {
  return index < 10 ? `0${index}` : index;
};

export default function AssignMenus({
  smallItems = [],
  mediumItems = [],
  largeItems = [],
  defaultSmallIndexes = [],
  defaultMediumIndexes = [],
  defaultLargeIndexes = [],
  onChange,
}: Props) {
  const { lang } = useLangStore();
  const [dataType, setDataType] = useState<"small" | "medium" | "large" | "">("");
  const [smallDataIndexes, setSmallDataIndexes] =
    useState<number[]>(defaultSmallIndexes);
  const [mediumDataIndexes, setMediumDataIndexes] =
    useState<number[]>(defaultMediumIndexes);
  const [largeDataIndexes, setLargeDataIndexes] =
    useState<number[]>(defaultLargeIndexes);

  // 드래그 앤 드롭 관련 상태
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [dragOverItem, setDragOverItem] = useState<number | null>(null);
  const dragItemRef = useRef<HTMLDivElement>(null);

  const handleAddIndex = (type: "small" | "medium" | "large", id: number) => {
    switch (type) {
      case "small":
        setSmallDataIndexes((prev) => {
          const newValues = [...prev, id];
          return newValues;
        });
        break;
      case "medium":
        setMediumDataIndexes((prev) => {
          const newValues = [...prev, id];
          return newValues;
        });
        break;
      case "large":
        setLargeDataIndexes((prev) => {
          const newValues = [...prev, id];
          return newValues;
        });
        break;
      default:
        break;
    }
  };

  const handleDeleteIndex = (
    type: "small" | "medium" | "large",
    index: number
  ) => {
    switch (type) {
      case "small":
        setSmallDataIndexes((prev) => {
          return prev.filter((item) => item !== index);
        });
        break;
      case "medium":
        setMediumDataIndexes((prev) => {
          return prev.filter((item) => item !== index);
        });
        break;
      case "large":
        setLargeDataIndexes((prev) => {
          return prev.filter((item) => item !== index);
        });
        break;
      default:
        break;
    }
  };

  const handleChecked = (
    type: "small" | "medium" | "large",
    id: number,
    value: boolean
  ) => {
    if (value) {
      handleAddIndex(type, id);
    } else {
      handleDeleteIndex(type, id);
    }
  };

  // 드래그 앤 드롭 핸들러들
  const handleDragStart = (e: React.DragEvent, itemId: number) => {
    setDraggedItem(itemId);
    e.dataTransfer.effectAllowed = "move";
    if (dragItemRef.current) {
      dragItemRef.current.style.opacity = "0.5";
    }
  };

  const handleDragOver = (e: React.DragEvent, itemId: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverItem(itemId);
  };

  const handleDragLeave = () => {
    setDragOverItem(null);
  };

  const handleDrop = (e: React.DragEvent, dropItemId: number) => {
    e.preventDefault();
    if (draggedItem === null || draggedItem === dropItemId) {
      setDraggedItem(null);
      setDragOverItem(null);
      return;
    }

    // Small Data 순서 변경
    if (smallDataIndexes.includes(draggedItem) && smallDataIndexes.includes(dropItemId)) {
      const newSmallDataIndexes = [...smallDataIndexes];
      const draggedIndex = newSmallDataIndexes.indexOf(draggedItem);
      const dropIndex = newSmallDataIndexes.indexOf(dropItemId);

      if (draggedIndex !== -1 && dropIndex !== -1) {
        // 항목을 제거하고 새로운 위치에 삽입
        newSmallDataIndexes.splice(draggedIndex, 1);
        newSmallDataIndexes.splice(dropIndex, 0, draggedItem);
        setSmallDataIndexes(newSmallDataIndexes);
      }
    }

    // Medium Data 순서 변경
    if (mediumDataIndexes.includes(draggedItem) && mediumDataIndexes.includes(dropItemId)) {
      const newMediumDataIndexes = [...mediumDataIndexes];
      const draggedIndex = newMediumDataIndexes.indexOf(draggedItem);
      const dropIndex = newMediumDataIndexes.indexOf(dropItemId);

      if (draggedIndex !== -1 && dropIndex !== -1) {
        // 항목을 제거하고 새로운 위치에 삽입
        newMediumDataIndexes.splice(draggedIndex, 1);
        newMediumDataIndexes.splice(dropIndex, 0, draggedItem);
        setMediumDataIndexes(newMediumDataIndexes);
      }
    }

    setDraggedItem(null);
    setDragOverItem(null);
    if (dragItemRef.current) {
      dragItemRef.current.style.opacity = "1";
    }
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverItem(null);
    if (dragItemRef.current) {
      dragItemRef.current.style.opacity = "1";
    }
  };

  const renderDataTable = () => {
    let data = [];
    let dataIndexes = [];
    let type: "small" | "medium" | "large" = "small";

    switch (dataType) {
      case "small":
        data = smallItems;
        dataIndexes = smallDataIndexes;
        type = "small";
        break;
      case "medium":
        data = mediumItems;
        dataIndexes = mediumDataIndexes;
        type = "medium";
        break;
      case "large":
        data = largeItems;
        dataIndexes = largeDataIndexes;
        type = "large";
        break;
      default:
        break;
    }

    console.log("mediumItems222 :::", mediumItems);
    console.log("data :::", data);

    return (
      <Stack width={"100%"} flex={1} overflow={"auto"}>
        <div className={styles.listWrap}>
          {data.map((item, index) => (
            <FormControl
              key={index.toString()}
              sx={{ flexDirection: "row", gap: "10px", height: "24px" }}
            >
              <FormControlLabel
                value={item.value}
                control={
                  <Checkbox
                    checked={dataIndexes.includes(Number(item.id))}
                    disabled={
                      !dataIndexes.includes(Number(item.id)) &&
                      (type === "small"
                        ? dataIndexes.length >= 15
                        : dataIndexes.length >= 8)
                    }
                    onChange={(e) =>
                      handleChecked(type, Number(item.id), e.target.checked)
                    }
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

  useEffect(() => {
    onChange?.(
      smallDataIndexes.map((item) =>
        smallItems.find((innerItem) => Number(innerItem.id) === item)
      ),
      mediumDataIndexes.map((item) =>
        mediumItems.find((innerItem) => Number(innerItem.id) === item)
      ),
      largeDataIndexes.map((item) =>
        largeItems.find((innerItem) => Number(innerItem.id) === item)
      )
    );
  }, [smallDataIndexes, mediumDataIndexes, largeDataIndexes]);

  console.log("smallDataIndexes :::", smallDataIndexes);
  console.log("mediumDataIndexes :::", mediumDataIndexes);
  console.log("largeDataIndexes :::", largeDataIndexes);

  console.log("smallItems :::", smallItems);
  console.log("mediumItems :::", mediumItems);
  console.log("largeItems :::", largeItems);

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
              {smallDataIndexes.map((item) => {
                const target = smallItems.find(
                  (innerItem) => Number(innerItem.id) === Number(item)
                );

                console.log("target :::", target);

                if (!target) return null;

                const name = target.name;
                const isDragging = draggedItem === item;
                const isDragOver = dragOverItem === item;

                return (
                  <Stack
                    key={item}
                    ref={isDragging ? dragItemRef : null}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                    onDragOver={(e) => handleDragOver(e, item)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, item)}
                    onDragEnd={handleDragEnd}
                    sx={{
                      flexDirection: "row",
                      gap: "10px",
                      height: "24px",
                      alignItems: "center",
                      justifyContent: "space-between",
                      backgroundColor: isDragOver ? "rgba(0, 0, 0, 0.04)" : "transparent",
                      borderTop: isDragOver ? "2px solid #1976d2" : "none",
                      cursor: "grab",
                      opacity: isDragging ? 0.5 : 1,
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.04)",
                      },
                    }}
                  >
                    <DragIndicatorIcon 
                      sx={{ 
                        width: 16, 
                        height: 16, 
                        color: "var(--grey5)",
                        cursor: "grab",
                        flexShrink: 0
                      }} 
                    />
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
                      onClick={() => handleDeleteIndex("small", item)}
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
              {mediumDataIndexes.map((item) => {
                const target = mediumItems.find(
                  (innerItem) => Number(innerItem.id) === item
                );

                if (!target) return null;

                const name = target.name;
                const isDragging = draggedItem === item;
                const isDragOver = dragOverItem === item;

                return (
                  <Stack
                    key={item}
                    ref={isDragging ? dragItemRef : null}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                    onDragOver={(e) => handleDragOver(e, item)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, item)}
                    onDragEnd={handleDragEnd}
                    sx={{
                      flexDirection: "row",
                      gap: "10px",
                      height: "24px",
                      alignItems: "center",
                      justifyContent: "space-between",
                      backgroundColor: isDragOver ? "rgba(0, 0, 0, 0.04)" : "transparent",
                      borderTop: isDragOver ? "2px solid #1976d2" : "none",
                      cursor: "grab",
                      opacity: isDragging ? 0.5 : 1,
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.04)",
                      },
                    }}
                  >
                    <DragIndicatorIcon 
                      sx={{ 
                        width: 16, 
                        height: 16, 
                        color: "var(--grey5)",
                        cursor: "grab",
                        flexShrink: 0
                      }} 
                    />
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
                      onClick={() => handleDeleteIndex("medium", item)}
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
              {largeDataIndexes.map((item) => {
                const target = largeItems.find(
                  (innerItem) => Number(innerItem.id) === Number(item)
                );

                if (!target) return null;

                const name = target.name;

                return (
                  <Stack
                    key={item}
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
                      onClick={() => handleDeleteIndex("large", item)}
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
