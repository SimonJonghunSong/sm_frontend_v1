import { Stack, Select, MenuItem, TextField, IconButton, FormControl, FormControlLabel, Checkbox, SelectChangeEvent } from '@mui/material'
import React, { useState } from 'react'
import InputBox from '../../../../components/inputbox/InputBox'
import { SwitchPrimary } from '../../../../components/switches'
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";


export default function Network1() {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      event.preventDefault();
    };
    
  return (
    <>
      <div className="pageTitle">Network1</div>
      <Stack direction="row" gap="40px" mb="40px">
        <Stack gap="20px" sx={{ width: "50%" }}>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                keep Alive Interval (minutes)<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1600</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <Select
                value={"select-1"}
                sx={{ width: "100%" }}
              >
                <MenuItem value={"select-1"}>Automatic</MenuItem>
              </Select>
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                GNSS<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1600</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth />
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                User ID<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1600</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <Select
                value={"select-1"}
                sx={{ width: "100%" }}
              >
                <MenuItem value={"select-1"}>Profile 4</MenuItem>
              </Select>
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                User Password<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1600</InputBox.Number>
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

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                PIN Number<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1600</InputBox.Number>
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

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Server IP<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1600</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth />
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Server Port<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1600</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth />
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Server Type<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1600</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <Select
                value={"select-1"}
                sx={{ width: "100%" }}
              >
                <MenuItem value={"select-1"}>TCP</MenuItem>
              </Select>
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Backup Server IP<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1600</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth />
            </InputBox.Body>
          </InputBox>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Backup Server Port<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1600</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth />
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Backup Server Type<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1600</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <Select
                value={"select-1"}
                sx={{ width: "100%" }}
              >
                <MenuItem value={"select-1"}>TCP</MenuItem>
              </Select>
            </InputBox.Body>
          </InputBox>
        </Stack>

        <Stack gap="20px" sx={{ width: "50%" }}>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                UDP ACK<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1011</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <FormControl
                sx={{ flexDirection: "row", gap: "10px", flexWrap: "wrap" }}
              >
                <FormControlLabel
                  value="ASTT"
                  control={<Checkbox />}
                  label="ASTT"
                />
                <FormControlLabel
                  value="AOTR"
                  control={<Checkbox />}
                  label="AOTR"
                />
                <FormControlLabel
                  value="AOVD"
                  control={<Checkbox />}
                  label="AOVD"
                />
                <FormControlLabel
                  value="ATIC"
                  control={<Checkbox />}
                  label="ATIC"
                />
                <FormControlLabel
                  value="ASNB"
                  control={<Checkbox />}
                  label="ASNB"
                />
                <FormControlLabel
                  value="ACID"
                  control={<Checkbox />}
                  label="ACID"
                />
                <FormControlLabel
                  value="AALT"
                  control={<Checkbox />}
                  label="AALT"
                />
                <FormControlLabel
                  value="AOBD"
                  control={<Checkbox />}
                  label="AOBD"
                />
                <FormControlLabel
                  value="ACAM"
                  control={<Checkbox />}
                  label="ACAM"
                />
                <FormControlLabel
                  value="ATIS"
                  control={<Checkbox />}
                  label="ATIS"
                />
                <FormControlLabel
                  value="ASNE"
                  control={<Checkbox />}
                  label="ASNE"
                />
                <FormControlLabel
                  value="AJID"
                  control={<Checkbox />}
                  label="AJID"
                />
                <FormControlLabel
                  value="ATRV"
                  control={<Checkbox />}
                  label="ATRV"
                />
                <FormControlLabel
                  value="ARFA"
                  control={<Checkbox />}
                  label="ARFA"
                />
                <FormControlLabel
                  value="ABLE"
                  control={<Checkbox />}
                  label="ABLE"
                />
                <FormControlLabel
                  value="ATRQ"
                  control={<Checkbox />}
                  label="ATRQ"
                />
                <FormControlLabel
                  value="ABSA"
                  control={<Checkbox />}
                  label="ABSA"
                />
                <FormControlLabel
                  value="AUEX"
                  control={<Checkbox />}
                  label="AUEX"
                />
                <FormControlLabel
                  value="APID"
                  control={<Checkbox />}
                  label="APID"
                />
                <FormControlLabel
                  value="ATWS"
                  control={<Checkbox />}
                  label="ATWS"
                />
                <FormControlLabel
                  value="ATPR"
                  control={<Checkbox />}
                  label="ATPR"
                />
                <FormControlLabel
                  value="AEMD"
                  control={<Checkbox />}
                  label="AEMD"
                />
              </FormControl>
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Device Port<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1012</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth />
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Connection Type<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1013</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <Select
                value={"select-1"}
                sx={{ width: "100%" }}
              >
                <MenuItem value={"select-1"}>Keep Connected</MenuItem>
              </Select>
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <InputBox.Head>
                <InputBox.Title>
                  AGPS Mode<i>*</i>
                </InputBox.Title>
                <InputBox.Info tooltipText="tooptip example" />
                <InputBox.Number>1014</InputBox.Number>
                {/* <span className="notification"/> */}
              </InputBox.Head>
              <InputBox.Body>
                <SwitchPrimary />
              </InputBox.Body>
            </Stack>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                AGPS Server URL<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1012</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField
                fullWidth
                defaultValue="http://xtrapath3.izatcloud.net"
              />
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Sacnning Band Mode<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1013</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <Select
                value={"select-1"}
                sx={{ width: "100%" }}
              >
                <MenuItem value={"select-1"}>Galobal (Roaming)</MenuItem>
              </Select>
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                UDP ACK Waiting Time (seconds)<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1012</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue="60" />
            </InputBox.Body>
          </InputBox>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                UDP ACK Reopen Time (times)<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1012</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue="2" />
            </InputBox.Body>
          </InputBox>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                UDP ACK Reboot Time (times)<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1012</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue="4" />
            </InputBox.Body>
          </InputBox>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Server Connection Keeping Time (seconds)<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1012</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue="10" />
            </InputBox.Body>
          </InputBox>
        </Stack>
      </Stack>
    </>
  );
}
