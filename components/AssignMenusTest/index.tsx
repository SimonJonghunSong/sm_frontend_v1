"use client";

import { IconButton, MenuItem, Select, Stack } from "@mui/material";
import styles from "./styles.module.scss";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { useState, useRef } from "react";
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
  onReorder?: (
    type: "small" | "medium" | "large",
    newOrder: AssignMenuItem[]
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
  onReorder,
}: Props) {
  const [dataType, setDataType] = useState<"small" | "medium" | "large" | "">("");

  // 드래그 앤 드롭 관련 상태
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragOverItem, setDragOverItem] = useState<string | null>(null);
  const dragItemRef = useRef<HTMLDivElement>(null);

  // 드래그 앤 드롭 핸들러들
  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    setDraggedItem(itemId);
    e.dataTransfer.effectAllowed = "move";
    if (dragItemRef.current) {
      dragItemRef.current.style.opacity = "0.5";
    }
  };

  const handleDragOver = (e: React.DragEvent, itemId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverItem(itemId);
  };

  const handleDragLeave = () => {
    setDragOverItem(null);
  };

  const handleDrop = (e: React.DragEvent, dropItemId: string) => {
    e.preventDefault();
    if (draggedItem === null || draggedItem === dropItemId) {
      setDraggedItem(null);
      setDragOverItem(null);
      return;
    }

    // Small Data 순서 변경
    if (seletedSmallItems.find(item => item.id === draggedItem) && seletedSmallItems.find(item => item.id === dropItemId)) {
      const newSmallItems = [...seletedSmallItems];
      const draggedIndex = newSmallItems.findIndex(item => item.id === draggedItem);
      const dropIndex = newSmallItems.findIndex(item => item.id === dropItemId);

      if (draggedIndex !== -1 && dropIndex !== -1) {
        // 항목을 제거하고 새로운 위치에 삽입
        const [draggedItemData] = newSmallItems.splice(draggedIndex, 1);
        newSmallItems.splice(dropIndex, 0, draggedItemData);
        
        // onReorder 콜백이 있으면 사용, 없으면 기존 방식 사용
        if (onReorder) {
          onReorder("small", newSmallItems);
        } else {
          // 기존 방식: 모든 항목을 제거하고 새로운 순서로 다시 추가
          seletedSmallItems.forEach(item => {
            onChange("small", item, false);
          });
          newSmallItems.forEach(item => {
            onChange("small", item, true);
          });
        }
      }
    }

    // Medium Data 순서 변경
    if (seletedMediumItems.find(item => item.id === draggedItem) && seletedMediumItems.find(item => item.id === dropItemId)) {
      const newMediumItems = [...seletedMediumItems];
      const draggedIndex = newMediumItems.findIndex(item => item.id === draggedItem);
      const dropIndex = newMediumItems.findIndex(item => item.id === dropItemId);

      if (draggedIndex !== -1 && dropIndex !== -1) {
        // 항목을 제거하고 새로운 위치에 삽입
        const [draggedItemData] = newMediumItems.splice(draggedIndex, 1);
        newMediumItems.splice(dropIndex, 0, draggedItemData);
        
        // onReorder 콜백이 있으면 사용, 없으면 기존 방식 사용
        if (onReorder) {
          onReorder("medium", newMediumItems);
        } else {
          // 기존 방식: 모든 항목을 제거하고 새로운 순서로 다시 추가
          seletedMediumItems.forEach(item => {
            onChange("medium", item, false);
          });
          newMediumItems.forEach(item => {
            onChange("medium", item, true);
          });
        }
      }
    }

    // Large Data 순서 변경
    if (seletedLargeItems.find(item => item.id === draggedItem) && seletedLargeItems.find(item => item.id === dropItemId)) {
      const newLargeItems = [...seletedLargeItems];
      const draggedIndex = newLargeItems.findIndex(item => item.id === draggedItem);
      const dropIndex = newLargeItems.findIndex(item => item.id === dropItemId);

      if (draggedIndex !== -1 && dropIndex !== -1) {
        // 항목을 제거하고 새로운 위치에 삽입
        const [draggedItemData] = newLargeItems.splice(draggedIndex, 1);
        newLargeItems.splice(dropIndex, 0, draggedItemData);
        
        // onReorder 콜백이 있으면 사용, 없으면 기존 방식 사용
        if (onReorder) {
          onReorder("large", newLargeItems);
        } else {
          // 기존 방식: 모든 항목을 제거하고 새로운 순서로 다시 추가
          seletedLargeItems.forEach(item => {
            onChange("large", item, false);
          });
          newLargeItems.forEach(item => {
            onChange("large", item, true);
          });
        }
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
                const isDragging = draggedItem === item.id;
                const isDragOver = dragOverItem === item.id;

                return (
                  <Stack
                    key={item.id}
                    ref={isDragging ? dragItemRef : null}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item.id)}
                    onDragOver={(e) => handleDragOver(e, item.id)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, item.id)}
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
                const isDragging = draggedItem === item.id;
                const isDragOver = dragOverItem === item.id;

                return (
                  <Stack
                    key={item.id}
                    ref={isDragging ? dragItemRef : null}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item.id)}
                    onDragOver={(e) => handleDragOver(e, item.id)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, item.id)}
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
                const isDragging = draggedItem === item.id;
                const isDragOver = dragOverItem === item.id;

                return (
                  <Stack
                    key={item.id}
                    ref={isDragging ? dragItemRef : null}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item.id)}
                    onDragOver={(e) => handleDragOver(e, item.id)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, item.id)}
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
