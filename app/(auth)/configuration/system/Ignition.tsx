import {
  Stack,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import React from "react";
import InputBox from "../../../../components/inputbox/InputBox";
import { SwitchPrimary } from "../../../../components/switches";

export default function Ignition() {
  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        sx={{ width: "calc(50% - 20px)" }}
      >
        <div className="pageTitle">Ignition</div>
        <SwitchPrimary />
      </Stack>
      <Stack direction="row" gap="40px" mb="40px">
        <Stack gap="20px" sx={{ width: "50%" }}>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Ignition<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1700</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <Select value={"select-1"} sx={{ width: "100%" }}>
                <MenuItem value={"select-1"}>Use Ignition Line</MenuItem>
              </Select>
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Ignition Off Delay (seconds)<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1701</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue="60" />
            </InputBox.Body>
          </InputBox>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Ignition On Delay (seconds)<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1702</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue="60" />
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
                    VI-M: Ignition On Threshold (1/255G)<i>*</i>
                  </InputBox.Title>
                  <InputBox.Info tooltipText="tooptip example" />
                  <InputBox.Number>1705</InputBox.Number>
                  {/* <span className="notification"/> */}
                </Stack>
                <SwitchPrimary />
              </Stack>
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue="5" />
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                VI-M: Ignition On Delay (seconds)<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1702</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue="10" />
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                VI-M: Ignition On Percent (%)<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1707</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue="70" />
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
                    VI-M: Ignition Off Threshold (1/255G)<i>*</i>
                  </InputBox.Title>
                  <InputBox.Info tooltipText="tooptip example" />
                  <InputBox.Number>1708</InputBox.Number>
                  {/* <span className="notification"/> */}
                </Stack>
                <SwitchPrimary />
              </Stack>
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue="5" />
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                VI-M: Ignition Off Delay (seconds)<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1709</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue="10" />
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                VI-M: Ignition Off Percent (%)<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1710</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue="70" />
            </InputBox.Body>
          </InputBox>
        </Stack>

        <Stack gap="20px" sx={{ width: "50%" }}>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                VI-M: Ignition On Rotation Threshold (deg/s)<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1711</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue="5.0" />
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                VI-M: Ignition On Rotation Delay (seconds)<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1712</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue="10" />
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                gap="8px"
                sx={{ width: "100%" }}
              >
                <Stack direction="row" alignItems="center" gap="8px">
                  <InputBox.Title>
                    VI-M: Ignition Off Rotation Threshold (deg/s)<i>*</i>
                  </InputBox.Title>
                  <InputBox.Info tooltipText="tooptip example" />
                  <InputBox.Number>1713</InputBox.Number>
                  {/* <span className="notification"/> */}
                </Stack>
                <SwitchPrimary />
              </Stack>
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue="5.0" />
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                VI-M: Ignition Off Rotation Delay (seconds)<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1714</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue="10" />
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                VI-V: Ignition High (Volts DC)<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1715</InputBox.Number>
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
                    VI-V: Ignition Low (Volts DC)<i>*</i>
                  </InputBox.Title>
                  <InputBox.Info tooltipText="tooptip example" />
                  <InputBox.Number>1716</InputBox.Number>
                  {/* <span className="notification"/> */}
                </Stack>
                <SwitchPrimary />
              </Stack>
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue="0" />
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
                  GPS ON at Motion<i>*</i>
                </InputBox.Title>
                <InputBox.Info tooltipText="tooptip example" />
                <InputBox.Number>1717</InputBox.Number>
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
