import {
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  Stack,
} from "@mui/material";
import React from "react";
import styles from "./styles.module.scss";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import InputBox from "../../../../components/inputbox/InputBox";

export default function AssignHeader() {
  return (
    <>
      <Stack sx={{ width: "100%" }}>
        <div className="pageTitle">Assign Header</div>

        <div className={styles.assignHeaderWrap}>
          <Stack>
            <p>Small</p>
            <div className={styles.listWrap}>
              <FormControl
                sx={{ flexDirection: "row", gap: "10px", height: "24px" }}
              >
                <FormControlLabel
                  value="BCK_VIKT"
                  control={<Checkbox />}
                  label="BCK_VIKT"
                />
                <InputBox.Info tooltipText="tooltip sample" />
              </FormControl>
              <FormControl
                sx={{ flexDirection: "row", gap: "10px", height: "24px" }}
              >
                <FormControlLabel
                  value="BCK_VIKT"
                  control={<Checkbox />}
                  label="BCK_VIKT"
                />
                <InputBox.Info tooltipText="tooltip sample" />
              </FormControl>
              <FormControl
                sx={{ flexDirection: "row", gap: "10px", height: "24px" }}
              >
                <FormControlLabel
                  value="BCK_VIKT"
                  control={<Checkbox />}
                  label="BCK_VIKT"
                />
                <InputBox.Info tooltipText="tooltip sample" />
              </FormControl>
              <FormControl
                sx={{ flexDirection: "row", gap: "10px", height: "24px" }}
              >
                <FormControlLabel
                  value="BCK_VIKT"
                  control={<Checkbox />}
                  label="BCK_VIKT"
                />
                <InputBox.Info tooltipText="tooltip sample" />
              </FormControl>
            </div>
          </Stack>
          <Stack>
            <p>Medium</p>
            <div className={styles.listWrap}>
              <FormControl
                sx={{ flexDirection: "row", gap: "10px", height: "24px" }}
              >
                <FormControlLabel
                  value="BCK_VIKT"
                  control={<Checkbox />}
                  label="BCK_VIKT"
                />
                <InputBox.Info tooltipText="tooltip sample" />
              </FormControl>
            </div>
          </Stack>

          <Stack>
            <p>Large</p>
            <div className={styles.listWrap}>
              <FormControl
                sx={{ flexDirection: "row", gap: "10px", height: "24px" }}
              >
                <FormControlLabel
                  value="BCK_VIKT"
                  control={<Checkbox />}
                  label="BCK_VIKT"
                />
                <InputBox.Info tooltipText="tooltip sample" />
              </FormControl>
            </div>
          </Stack>
          <ArrowForwardIosOutlinedIcon sx={{ color: "var(--grey5)" }} />
          <Stack gap="32px">
            <Stack sx={{ width: "100%", height: 206 ,minHeight: 206 ,maxHeight: 206  }}>
              <p>Small Data (2Byte)</p>

              <div className={styles.listWrap}>
                <Stack
                  sx={{
                    flexDirection: "row",
                    gap: "10px",
                    height: "24px",
                    alignItems: "center",
                  }}
                >
                  <span>01 BCK_VIKT</span>
                  <IconButton sx={{ width: 24, height: 24 }}>
                    <CancelOutlinedIcon sx={{ width: 22, height: 22 }} />
                  </IconButton>
                </Stack>
                <Stack
                  sx={{
                    flexDirection: "row",
                    gap: "10px",
                    height: "24px",
                    alignItems: "center",
                  }}
                >
                  <span>01 BCK_VIKT</span>
                  <IconButton sx={{ width: 24, height: 24 }}>
                    <CancelOutlinedIcon sx={{ width: 22, height: 22 }} />
                  </IconButton>
                </Stack>
              </div>
            </Stack>
            <Stack sx={{ width: "100%", height: 206 ,minHeight: 206 ,maxHeight: 206  }}>
              <p>Medium Data (4Byte)</p>

              <div className={styles.listWrap}>
                <Stack
                  sx={{
                    flexDirection: "row",
                    gap: "10px",
                    height: "24px",
                    alignItems: "center",
                  }}
                >
                  <span>01 BCK_VIKT</span>
                  <IconButton sx={{ width: 24, height: 24 }}>
                    <CancelOutlinedIcon sx={{ width: 22, height: 22 }} />
                  </IconButton>
                </Stack>
              </div>
            </Stack>
            <Stack sx={{ width: "100%", height: 206 ,minHeight: 206 ,maxHeight: 206  }}>
              <p>Large Data (8Byte)</p>
              <div className={styles.listWrap}>
                <Stack
                  sx={{
                    flexDirection: "row",
                    gap: "10px",
                    height: "24px",
                    alignItems: "center",
                  }}
                >
                  <span>01 BCK_VIKT</span>
                  <IconButton sx={{ width: 24, height: 24 }}>
                    <CancelOutlinedIcon sx={{ width: 22, height: 22 }} />
                  </IconButton>
                </Stack>
                <Stack
                  sx={{
                    flexDirection: "row",
                    gap: "10px",
                    height: "24px",
                    alignItems: "center",
                  }}
                >
                  <span>01 BCK_VIKT</span>
                  <IconButton sx={{ width: 24, height: 24 }}>
                    <CancelOutlinedIcon sx={{ width: 22, height: 22 }} />
                  </IconButton>
                </Stack>
                <Stack
                  sx={{
                    flexDirection: "row",
                    gap: "10px",
                    height: "24px",
                    alignItems: "center",
                  }}
                >
                  <span>01 BCK_VIKT</span>
                  <IconButton sx={{ width: 24, height: 24 }}>
                    <CancelOutlinedIcon sx={{ width: 22, height: 22 }} />
                  </IconButton>
                </Stack>
                
              </div>
            </Stack>
          </Stack>
        </div>
      </Stack>
    </>
  );
}
