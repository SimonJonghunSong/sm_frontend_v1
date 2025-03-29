import { IconButton, Stack } from "@mui/material";
import styles from "./styles.module.scss";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputBox from "components/inputbox/InputBox";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { ModelConfigWithData } from "@/src/api/services/model/type";
import useLangStore from "@/utils/useLangStore";
import { useState } from "react";

interface Props {
  smallItems?: ModelConfigWithData[];
  mediumItems?: ModelConfigWithData[];
  largeItems?: ModelConfigWithData[];
}

const renderNumber = (index: number) => {
  return index < 10 ? `0${index}` : index;
};

export default function AssignMenus({
  smallItems = [],
  mediumItems = [],
  largeItems = [],
}: Props) {
  const { lang } = useLangStore();
  const [smallDataIndexes, setSmallDataIndexes] = useState<number[]>([]);
  const [mediumDataIndexes, setMediumDataIndexes] = useState<number[]>([]);
  const [largeDataIndexes, setLargeDataIndexes] = useState<number[]>([]);

  const handleAddIndex = (
    type: "small" | "medium" | "large",
    index: number
  ) => {
    switch (type) {
      case "small":
        setSmallDataIndexes((prev) => {
          const newValues = [...prev, index];
          newValues.sort((a, b) => Number(a) - Number(b));

          return newValues;
        });
        break;
      case "medium":
        setMediumDataIndexes((prev) => {
          const newValues = [...prev, index];
          newValues.sort();

          return newValues;
        });
        break;
      case "large":
        setLargeDataIndexes((prev) => {
          const newValues = [...prev, index];
          newValues.sort();

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
    index: number,
    value: boolean
  ) => {
    if (value) {
      handleAddIndex(type, index);
    } else {
      handleDeleteIndex(type, index);
    }
  };

  return (
    <Stack width={"100%"}>
      <div className={styles.assignHeaderWrap}>
        <Stack flex={1}>
          <p>Small</p>
          <div className={styles.listWrap}>
            {smallItems.map((item, index) => (
              <FormControl
                sx={{ flexDirection: "row", gap: "10px", height: "24px" }}
              >
                <FormControlLabel
                  value={item.DEFAULT_VALUE}
                  control={
                    <Checkbox
                      checked={smallDataIndexes.includes(index)}
                      onChange={(e) =>
                        handleChecked("small", index, e.target.checked)
                      }
                    />
                  }
                  label={
                    lang === "en"
                      ? item.TEXT_EN
                      : lang === "es"
                      ? item.TEXT_ES
                      : item.TEXT_PT
                  }
                />
                <InputBox.Info
                  tooltipText={
                    lang === "en"
                      ? item.TEXT_EN_INFO
                      : lang === "es"
                      ? item.TEXT_ES_INFO
                      : item.TEXT_PT_INFO
                  }
                />
              </FormControl>
            ))}
          </div>
        </Stack>
        <Stack flex={1}>
          <p>Medium</p>
          <div className={styles.listWrap}>
            {mediumItems.map((item, index) => (
              <FormControl
                sx={{ flexDirection: "row", gap: "10px", height: "24px" }}
              >
                <FormControlLabel
                  value={item.DEFAULT_VALUE}
                  control={
                    <Checkbox
                      checked={mediumDataIndexes.includes(index)}
                      onChange={(e) =>
                        handleChecked("medium", index, e.target.checked)
                      }
                    />
                  }
                  label={
                    lang === "en"
                      ? item.TEXT_EN
                      : lang === "es"
                      ? item.TEXT_ES
                      : item.TEXT_PT
                  }
                />
                <InputBox.Info
                  tooltipText={
                    lang === "en"
                      ? item.TEXT_EN_INFO
                      : lang === "es"
                      ? item.TEXT_ES_INFO
                      : item.TEXT_PT_INFO
                  }
                />
              </FormControl>
            ))}
          </div>
        </Stack>

        <Stack flex={1}>
          <p>Large</p>
          <div className={styles.listWrap}>
            {largeItems.map((item, index) => (
              <FormControl
                sx={{ flexDirection: "row", gap: "10px", height: "24px" }}
              >
                <FormControlLabel
                  value={item.DEFAULT_VALUE}
                  control={
                    <Checkbox
                      checked={largeDataIndexes.includes(index)}
                      onChange={(e) =>
                        handleChecked("large", index, e.target.checked)
                      }
                    />
                  }
                  label={
                    lang === "en"
                      ? item.TEXT_EN
                      : lang === "es"
                      ? item.TEXT_ES
                      : item.TEXT_PT
                  }
                />
                <InputBox.Info
                  tooltipText={
                    lang === "en"
                      ? item.TEXT_EN_INFO
                      : lang === "es"
                      ? item.TEXT_ES_INFO
                      : item.TEXT_PT_INFO
                  }
                />
              </FormControl>
            ))}
          </div>
        </Stack>
        <ArrowForwardIosOutlinedIcon sx={{ color: "var(--grey5)" }} />
        <Stack flex={1} gap="32px">
          <Stack
            sx={{ width: "100%", height: 205, minHeight: 205, maxHeight: 205 }}
          >
            <p>Small Data (2Byte)</p>

            <div
              style={{
                maxWidth: "240px",
                overflow: "hidden",
                overflowY: "auto",
              }}
              className={styles.listWrap}
            >
              {smallDataIndexes.map((item) => {
                const target = smallItems[item];

                if (!target) return null;

                const num = Number(target.JSON_ID);
                const name =
                  lang === "en"
                    ? target.TEXT_EN
                    : lang === "es"
                    ? target.TEXT_ES
                    : target.TEXT_PT;

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
                      {renderNumber(num)} {name}
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
                const target = mediumItems[item];

                if (!target) return null;

                const num = Number(target.JSON_ID);
                const name =
                  lang === "en"
                    ? target.TEXT_EN
                    : lang === "es"
                    ? target.TEXT_ES
                    : target.TEXT_PT;

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
                      {renderNumber(num)} {name}
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
                const target = largeItems[item];

                if (!target) return null;

                const num = Number(target.JSON_ID);
                const name =
                  lang === "en"
                    ? target.TEXT_EN
                    : lang === "es"
                    ? target.TEXT_ES
                    : target.TEXT_PT;

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
                      {renderNumber(num)} {name}
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
