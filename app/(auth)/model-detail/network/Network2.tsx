import {
  Stack,
  Select,
  MenuItem,
  TextField,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";
import InputBox from "../../../../components/inputbox/InputBox";
import { SwitchPrimary } from "../../../../components/switches";
import useParameterStore from "../../../../utils/useParameterStore";

export default function Network2() {
  const { hiddenParameter } = useParameterStore();

  return (
    <>
      <div className="pageTitle">Network2</div>
      <Stack direction="row" gap="40px" mb="40px">
        <Stack gap="20px" sx={{ width: "50%" }}>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                keep Alive Interval (minutes)<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1060</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <Select value={"select-1"} sx={{ width: "100%" }}>
                <MenuItem value={"select-1"}>Automatic</MenuItem>
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
                  GNSS Report Mode<i>*</i>
                </InputBox.Title>
                <InputBox.Info tooltipText="tooptip example" />
                <InputBox.Number>1069</InputBox.Number>
                {/* <span className="notification"/> */}
              </InputBox.Head>
              <InputBox.Body>
                <SwitchPrimary />
              </InputBox.Body>
            </Stack>
          </InputBox>

          {!hiddenParameter && (
            <>
              <InputBox>
                <InputBox.Head>
                  <InputBox.Title warning>
                    Maintenance Server IP<i>*</i>
                  </InputBox.Title>
                  <InputBox.Info tooltipText="tooptip example" />
                  <InputBox.Number>1020</InputBox.Number>
                  {/* <span className="notification"/> */}
                </InputBox.Head>
                <InputBox.Body>
                  <TextField fullWidth />
                </InputBox.Body>
              </InputBox>
              <InputBox>
                <InputBox.Head>
                  <InputBox.Title warning>
                    Maintenance Server Port<i>*</i>
                  </InputBox.Title>
                  <InputBox.Info tooltipText="tooptip example" />
                  <InputBox.Number>1021</InputBox.Number>
                  {/* <span className="notification"/> */}
                </InputBox.Head>
                <InputBox.Body>
                  <TextField fullWidth />
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
                      <InputBox.Title warning>
                        Access interval (hours)<i>*</i>
                      </InputBox.Title>
                      <InputBox.Info tooltipText="tooptip example" />
                      <InputBox.Number>1022</InputBox.Number>
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
                    <InputBox.Title warning>
                      Access time<i>*</i>
                    </InputBox.Title>
                    <InputBox.Info tooltipText="tooptip example" />
                    <InputBox.Number>1023</InputBox.Number>
                    {/* <span className="notification"/> */}
                  </InputBox.Head>
                  <InputBox.Body>
                    <SwitchPrimary />
                  </InputBox.Body>
                </Stack>
              </InputBox>
            </>
          )}
        </Stack>

        <Stack gap="20px" sx={{ width: "50%" }}>
          <InputBox>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <InputBox.Head>
                <InputBox.Title>
                  TCP Keep Alive<i>*</i>
                </InputBox.Title>
                <InputBox.Info tooltipText="tooptip example" />
                <InputBox.Number>1070</InputBox.Number>
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
                TCP Keep Alive Idle Time (seconds)<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1071</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue="150" />
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                NTP Server Addr<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1076</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue="time.windows.com" />
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                NTP Server Port<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1077</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue="123" />
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
                  SAT OUT<i>*</i>
                </InputBox.Title>
                <InputBox.Info tooltipText="tooptip example" />
                <InputBox.Number>1052</InputBox.Number>
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
                SAT DELAY (seconds)<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1053</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue="20" />
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Scan Mode<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1054</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <Select value={"select-1"} sx={{ width: "100%" }}>
                <MenuItem value={"select-1"}>
                  LTE Cat M1 (or Cat 1) only
                </MenuItem>
              </Select>
            </InputBox.Body>
          </InputBox>

          {!hiddenParameter && (
            <>
              <InputBox>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <InputBox.Head>
                    <InputBox.Title warning>
                      ConfigLock<i>*</i>
                    </InputBox.Title>
                    <InputBox.Info tooltipText="tooptip example" />
                    <InputBox.Number>0110~1</InputBox.Number>
                    {/* <span className="notification"/> */}
                  </InputBox.Head>
                  <InputBox.Body>
                    <SwitchPrimary />
                  </InputBox.Body>
                </Stack>
              </InputBox>

              <InputBox>
                <InputBox.Head>
                  <InputBox.Title warning>
                    Setup Spreading Factor for LoRa<i>*</i>
                  </InputBox.Title>
                  <InputBox.Info tooltipText="tooptip example" />
                  <InputBox.Number>0710</InputBox.Number>
                  {/* <span className="notification"/> */}
                </InputBox.Head>
                <InputBox.Body>
                  <Select value={"select-1"} sx={{ width: "100%" }}>
                    <MenuItem value={"select-1"}>Select</MenuItem>
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
                    <InputBox.Title warning>
                      Read Spreading Factor for LoRa<i>*</i>
                    </InputBox.Title>
                    <InputBox.Info tooltipText="tooptip example" />
                    <InputBox.Number>0711</InputBox.Number>
                    {/* <span className="notification"/> */}
                  </InputBox.Head>
                  <InputBox.Body>
                    <SwitchPrimary />
                  </InputBox.Body>
                </Stack>
              </InputBox>
            </>
          )}
        </Stack>
      </Stack>
    </>
  );
}
