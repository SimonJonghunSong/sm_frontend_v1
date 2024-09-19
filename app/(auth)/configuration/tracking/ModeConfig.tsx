import {
  Stack,
  Select,
  MenuItem,
  TextField,
  Checkbox,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import React from "react";
import InputBox from "../../../../components/inputbox/InputBox";
import { SwitchPrimary } from "../../../../components/switches";

export default function ModeConfig() {
  return (
    <>
      <div className="pageTitle">Mode Config</div>
      <Stack direction="row" gap="40px" mb="40px">
        <Stack gap="20px" sx={{ width: "50%" }}>
          <InputBox>
            <InputBox.Head>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ width: "100%" }}
              >
                <Stack direction="row" alignItems="center" gap="8px">
                  <InputBox.Title>
                    Drive Mode Profile<i>*</i>
                  </InputBox.Title>
                  <InputBox.Info tooltipText="tooptip example" />
                  <InputBox.Number>1600</InputBox.Number>
                  {/* <span className="notification"/> */}
                </Stack>
                <SwitchPrimary />
              </Stack>
            </InputBox.Head>
            <InputBox.Body>
              <Select value={"select-1"} sx={{ width: "100%" }}>
                <MenuItem value={"select-1"}>Profile 4</MenuItem>
              </Select>
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ width: "100%" }}
              >
                <Stack direction="row" alignItems="center" gap="8px">
                  <InputBox.Title>
                    Drive Mode Entry Delay (seconds)<i>*</i>
                  </InputBox.Title>
                  <InputBox.Info tooltipText="tooptip example" />
                  <InputBox.Number>1601</InputBox.Number>
                  {/* <span className="notification"/> */}
                </Stack>
                <SwitchPrimary />
              </Stack>
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue={"0"} />
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ width: "100%" }}
              >
                <Stack direction="row" alignItems="center" gap="8px">
                  <InputBox.Title>
                    Park Mode Profile<i>*</i>
                  </InputBox.Title>
                  <InputBox.Info tooltipText="tooptip example" />
                  <InputBox.Number>1605</InputBox.Number>
                  {/* <span className="notification"/> */}
                </Stack>
                <SwitchPrimary />
              </Stack>
            </InputBox.Head>
            <InputBox.Body>
              <Select value={"select-1"} sx={{ width: "100%" }}>
                <MenuItem value={"select-1"}>Profile 1</MenuItem>
              </Select>
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Park Mode Entry Delay (seconds)<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1606</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue="0" />
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ width: "100%" }}
              >
                <Stack direction="row" alignItems="center" gap="8px">
                  <InputBox.Title>
                    Park Mode Profile<i>*</i>
                  </InputBox.Title>
                  <InputBox.Info tooltipText="tooptip example" />
                  <InputBox.Number>1606</InputBox.Number>
                  {/* <span className="notification"/> */}
                </Stack>
                <SwitchPrimary />
              </Stack>
            </InputBox.Head>
            <InputBox.Body>
              <Select value={"select-1"} sx={{ width: "100%" }}>
                <MenuItem value={"select-1"}>Profile 2</MenuItem>
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
                  Park Mode Profile<i>*</i>
                </InputBox.Title>
                <InputBox.Info tooltipText="tooptip example" />
                <InputBox.Number>1610</InputBox.Number>
                {/* <span className="notification"/> */}
              </InputBox.Head>
              <InputBox.Body>
                <SwitchPrimary />
              </InputBox.Body>
            </Stack>
          </InputBox>

          <InputBox>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <InputBox.Head>
                <InputBox.Title>
                  GPS No Move Delay (seconds)<i>*</i>
                </InputBox.Title>
                <InputBox.Info tooltipText="tooptip example" />
                <InputBox.Number>1611</InputBox.Number>
                {/* <span className="notification"/> */}
              </InputBox.Head>
              <InputBox.Body>
                <TextField defaultValue={"0"} />
              </InputBox.Body>
            </Stack>
          </InputBox>

          <InputBox>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <InputBox.Head>
                <InputBox.Title>
                  Acc. No Move Delay (seconds)<i>*</i>
                </InputBox.Title>
                <InputBox.Info tooltipText="tooptip example" />
                <InputBox.Number>1612</InputBox.Number>
                {/* <span className="notification"/> */}
              </InputBox.Head>
              <InputBox.Body>
                <TextField defaultValue={"0"} />
              </InputBox.Body>
            </Stack>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ width: "100%" }}
              >
                <Stack direction="row" alignItems="center" gap="8px">
                  <InputBox.Title>
                    Idle Exit - GPS Move Delay (seconds)<i>*</i>
                  </InputBox.Title>
                  <InputBox.Info tooltipText="tooptip example" />
                  <InputBox.Number>1613</InputBox.Number>
                  {/* <span className="notification"/> */}
                </Stack>
                <SwitchPrimary />
              </Stack>
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue={"30"} />
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ width: "100%" }}
              >
                <Stack direction="row" alignItems="center" gap="8px">
                  <InputBox.Title>
                    Idle Exit - Acc. Move Delay (seconds)<i>*</i>
                  </InputBox.Title>
                  <InputBox.Info tooltipText="tooptip example" />
                  <InputBox.Number>1614</InputBox.Number>
                  {/* <span className="notification"/> */}
                </Stack>
                <SwitchPrimary />
              </Stack>
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue={"30"} />
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Excess Idle Threshold 1 (seconds)<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1615</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue="0" />
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Excess Idle Threshold 2 (seconds)<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1616</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue="0" />
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Excess Idle Threshold 3 (seconds)<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1617</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue="0" />
            </InputBox.Body>
          </InputBox>
        </Stack>

        <Stack gap="20px" sx={{ width: "50%" }}>
          <InputBox>
            <InputBox.Head>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ width: "100%" }}
              >
                <Stack direction="row" alignItems="center" gap="8px">
                  <InputBox.Title>
                    Speeding Mode Profile<i>*</i>
                  </InputBox.Title>
                  <InputBox.Info tooltipText="tooptip example" />
                  <InputBox.Number>1620</InputBox.Number>
                  {/* <span className="notification"/> */}
                </Stack>
                <SwitchPrimary />
              </Stack>
            </InputBox.Head>
            <InputBox.Body>
              <Select value={"select-1"} sx={{ width: "100%" }}>
                <MenuItem value={"select-1"}>Profile 5</MenuItem>
              </Select>
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ width: "100%" }}
              >
                <Stack direction="row" alignItems="center" gap="8px">
                  <InputBox.Title>
                    Speed Threshold (km/h)<i>*</i>
                  </InputBox.Title>
                  <InputBox.Info tooltipText="tooptip example" />
                  <InputBox.Number>1621</InputBox.Number>
                  {/* <span className="notification"/> */}
                </Stack>
                <SwitchPrimary />
              </Stack>
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue={"100"} />
            </InputBox.Body>
          </InputBox>
          <InputBox>
            <InputBox.Head>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ width: "100%" }}
              >
                <Stack direction="row" alignItems="center" gap="8px">
                  <InputBox.Title>
                    Speed Mode Entry Delay (seconds)<i>*</i>
                  </InputBox.Title>
                  <InputBox.Info tooltipText="tooptip example" />
                  <InputBox.Number>1622</InputBox.Number>
                  {/* <span className="notification"/> */}
                </Stack>
                <SwitchPrimary />
              </Stack>
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue={"10"} />
            </InputBox.Body>
          </InputBox>
          <InputBox>
            <InputBox.Head>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ width: "100%" }}
              >
                <Stack direction="row" alignItems="center" gap="8px">
                  <InputBox.Title>
                    Speed Mode Exit Delay (seconds)<i>*</i>
                  </InputBox.Title>
                  <InputBox.Info tooltipText="tooptip example" />
                  <InputBox.Number>1623</InputBox.Number>
                  {/* <span className="notification"/> */}
                </Stack>
                <SwitchPrimary />
              </Stack>
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue={"10"} />
            </InputBox.Body>
          </InputBox>
          <InputBox>
            <InputBox.Head>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ width: "100%" }}
              >
                <Stack direction="row" alignItems="center" gap="8px">
                  <InputBox.Title>
                    Speed Above Alert Delay (seconds)<i>*</i>
                  </InputBox.Title>
                  <InputBox.Info tooltipText="tooptip example" />
                  <InputBox.Number>1624</InputBox.Number>
                  {/* <span className="notification"/> */}
                </Stack>
                <SwitchPrimary />
              </Stack>
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue={"5"} />
            </InputBox.Body>
          </InputBox>
          <InputBox>
            <InputBox.Head>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ width: "100%" }}
              >
                <Stack direction="row" alignItems="center" gap="8px">
                  <InputBox.Title>
                    Speed Below Alert Delay (seconds)<i>*</i>
                  </InputBox.Title>
                  <InputBox.Info tooltipText="tooptip example" />
                  <InputBox.Number>1625</InputBox.Number>
                  {/* <span className="notification"/> */}
                </Stack>
                <SwitchPrimary />
              </Stack>
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue={"10"} />
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
                  Towing Mode Profile<i>*</i>
                </InputBox.Title>
                <InputBox.Info tooltipText="tooptip example" />
                <InputBox.Number>1636</InputBox.Number>
                {/* <span className="notification"/> */}
              </InputBox.Head>
              <InputBox.Body>
                <SwitchPrimary />
              </InputBox.Body>
            </Stack>
          </InputBox>

          <InputBox>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <InputBox.Head>
                <InputBox.Title>
                  Report Schedule<i>*</i>
                </InputBox.Title>
                <InputBox.Info tooltipText="tooptip example" />
                <InputBox.Number>1637</InputBox.Number>
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
                Start Hour for Working (hours)<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1638</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue="0" />
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                End Hour for Working (hours)<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1639</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue="24" />
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Drive Mode Profile<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1640</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <FormControl
                sx={{ flexDirection: "row", gap: "10px", flexWrap: "wrap" }}
              >
                <FormControlLabel
                  value="Mon"
                  control={<Checkbox />}
                  label="Mon"
                />
                <FormControlLabel
                  value="Tue"
                  control={<Checkbox />}
                  label="Tue"
                />
                <FormControlLabel
                  value="Wed"
                  control={<Checkbox />}
                  label="Wed"
                />
                <FormControlLabel
                  value="Thu"
                  control={<Checkbox />}
                  label="Thu"
                />
                <FormControlLabel
                  value="Fri"
                  control={<Checkbox />}
                  label="Fri"
                />
                <FormControlLabel
                  value="Sat"
                  control={<Checkbox />}
                  label="Sat"
                />
                <FormControlLabel
                  value="Sun"
                  control={<Checkbox />}
                  label="Sun"
                />
              </FormControl>
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
                  Disconnect Mode Profile<i>*</i>
                </InputBox.Title>
                <InputBox.Info tooltipText="tooptip example" />
                <InputBox.Number>1641</InputBox.Number>
                {/* <span className="notification"/> */}
              </InputBox.Head>
              <InputBox.Body>
                <SwitchPrimary />
              </InputBox.Body>
            </Stack>
          </InputBox>

          <InputBox>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <InputBox.Head>
                <InputBox.Title>
                  Presence Mode Profile<i>*</i>
                </InputBox.Title>
                <InputBox.Info tooltipText="tooptip example" />
                <InputBox.Number>1642</InputBox.Number>
                {/* <span className="notification"/> */}
              </InputBox.Head>
              <InputBox.Body>
                <SwitchPrimary />
              </InputBox.Body>
            </Stack>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ width: "100%" }}
              >
                <Stack direction="row" alignItems="center" gap="8px">
                  <InputBox.Title>
                    Heart Beat 1 UTC time<i>*</i>
                  </InputBox.Title>
                  <InputBox.Info tooltipText="tooptip example" />
                  <InputBox.Number>1049</InputBox.Number>
                  {/* <span className="notification"/> */}
                </Stack>
                <SwitchPrimary />
              </Stack>
            </InputBox.Head>
            <InputBox.Body>
              <Stack direction="row" gap="4px" alignItems="center">
                <Select value={"select-1"} sx={{ width: "100%" }}>
                  <MenuItem value={"select-1"}>09</MenuItem>
                </Select>
                <span>:</span>
                <Select value={"select-1"} sx={{ width: "100%" }}>
                  <MenuItem value={"select-1"}>00</MenuItem>
                </Select>
                <Select value={"select-1"} sx={{ width: "50%" }}>
                  <MenuItem value={"select-1"}>AM</MenuItem>
                </Select>
              </Stack>
            </InputBox.Body>
          </InputBox>
          <InputBox>
            <InputBox.Head>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ width: "100%" }}
              >
                <Stack direction="row" alignItems="center" gap="8px">
                  <InputBox.Title>
                    Heart Beat 2 UTC time<i>*</i>
                  </InputBox.Title>
                  <InputBox.Info tooltipText="tooptip example" />
                  <InputBox.Number>1050</InputBox.Number>
                  {/* <span className="notification"/> */}
                </Stack>
                <SwitchPrimary />
              </Stack>
            </InputBox.Head>
            <InputBox.Body>
              <Stack direction="row" gap="4px" alignItems="center">
                <Select value={"select-1"} sx={{ width: "100%" }}>
                  <MenuItem value={"select-1"}>09</MenuItem>
                </Select>
                <span>:</span>
                <Select value={"select-1"} sx={{ width: "100%" }}>
                  <MenuItem value={"select-1"}>00</MenuItem>
                </Select>
                <Select value={"select-1"} sx={{ width: "50%" }}>
                  <MenuItem value={"select-1"}>AM</MenuItem>
                </Select>
              </Stack>
            </InputBox.Body>
          </InputBox>
          <InputBox>
            <InputBox.Head>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ width: "100%" }}
              >
                <Stack direction="row" alignItems="center" gap="8px">
                  <InputBox.Title>
                    Heart Beat 2 UTC time<i>*</i>
                  </InputBox.Title>
                  <InputBox.Info tooltipText="tooptip example" />
                  <InputBox.Number>1051</InputBox.Number>
                  {/* <span className="notification"/> */}
                </Stack>
                <SwitchPrimary />
              </Stack>
            </InputBox.Head>
            <InputBox.Body>
              <Stack direction="row" gap="4px" alignItems="center">
                <Select value={"select-1"} sx={{ width: "100%" }}>
                  <MenuItem value={"select-1"}>09</MenuItem>
                </Select>
                <span>:</span>
                <Select value={"select-1"} sx={{ width: "100%" }}>
                  <MenuItem value={"select-1"}>00</MenuItem>
                </Select>
                <Select value={"select-1"} sx={{ width: "50%" }}>
                  <MenuItem value={"select-1"}>AM</MenuItem>
                </Select>
              </Stack>
            </InputBox.Body>
          </InputBox>
          <InputBox>
            <InputBox.Head>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ width: "100%" }}
              >
                <Stack direction="row" alignItems="center" gap="8px">
                  <InputBox.Title>
                    Heart Beat 2 UTC time<i>*</i>
                  </InputBox.Title>
                  <InputBox.Info tooltipText="tooptip example" />
                  <InputBox.Number>1052</InputBox.Number>
                  {/* <span className="notification"/> */}
                </Stack>
                <SwitchPrimary />
              </Stack>
            </InputBox.Head>
            <InputBox.Body>
              <Stack direction="row" gap="4px" alignItems="center">
                <Select value={"select-1"} sx={{ width: "100%" }}>
                  <MenuItem value={"select-1"}>09</MenuItem>
                </Select>
                <span>:</span>
                <Select value={"select-1"} sx={{ width: "100%" }}>
                  <MenuItem value={"select-1"}>00</MenuItem>
                </Select>
                <Select value={"select-1"} sx={{ width: "50%" }}>
                  <MenuItem value={"select-1"}>AM</MenuItem>
                </Select>
              </Stack>
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ width: "100%" }}
              >
                <Stack direction="row" alignItems="center" gap="8px">
                  <InputBox.Title>
                    PID report time (seconds)<i>*</i>
                  </InputBox.Title>
                  <InputBox.Info tooltipText="tooptip example" />
                  <InputBox.Number>1653</InputBox.Number>
                  {/* <span className="notification"/> */}
                </Stack>
                <SwitchPrimary />
              </Stack>
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth />
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
                  Siren Mode<i>*</i>
                </InputBox.Title>
                <InputBox.Info tooltipText="tooptip example" />
                <InputBox.Number>1656</InputBox.Number>
                {/* <span className="notification"/> */}
              </InputBox.Head>
              <InputBox.Body>
                <SwitchPrimary />
              </InputBox.Body>
            </Stack>
          </InputBox>
        </Stack>
      </Stack>
    </>
  );
}
