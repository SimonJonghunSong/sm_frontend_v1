import { Stack, Select, MenuItem, TextField, IconButton } from "@mui/material";
import React, { useState } from "react";
import InputBox from "../../../../components/inputbox/InputBox";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

export default function PowerPassword() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <>
    <Stack direction="row" gap="8px" alignItems={"flex-start"}>
      <div className="pageTitle">Power Password</div>
      <InputBox.Info tooltipText="tooptip example" />
      <InputBox.Number>3000</InputBox.Number>
    </Stack>
      <Stack direction="row" gap="40px" mb="40px">
        <Stack gap="20px" sx={{ width: "50%" }}>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Current Password<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>3001</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField
                id="input1"
                variant="outlined"
                size="small"
                fullWidth
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOutlinedIcon
                          sx={{ color: "var(--grey5)" }}
                        />
                      ) : (
                        <VisibilityOffOutlinedIcon
                          sx={{ color: "var(--grey5)" }}
                        />
                      )}
                    </IconButton>
                  ),
                }}
              />
            </InputBox.Body>
          </InputBox>
        </Stack>
        <Stack gap="20px" sx={{ width: "50%" }}>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                New Password<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>3002</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField
                id="input1"
                variant="outlined"
                size="small"
                fullWidth
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOutlinedIcon
                          sx={{ color: "var(--grey5)" }}
                        />
                      ) : (
                        <VisibilityOffOutlinedIcon
                          sx={{ color: "var(--grey5)" }}
                        />
                      )}
                    </IconButton>
                  ),
                }}
              />
            </InputBox.Body>
          </InputBox>
        </Stack>
      </Stack>
    </>
  );
}
