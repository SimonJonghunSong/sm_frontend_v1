import { Stack, Select, MenuItem, TextField } from "@mui/material";
import React from "react";
import InputBox from "../../../../components/inputbox/InputBox";
import { SwitchPrimary } from "../../../../components/switches";

export default function Power() {
  return (
    <>
      <div className="pageTitle">Power</div>
      <Stack direction="row" gap="40px" mb="40px">
        <Stack gap="20px" sx={{ width: "50%" }}>
          <InputBox>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <InputBox.Head>
                <InputBox.Title>
                  Power Down Type<i>*</i>
                </InputBox.Title>
                <InputBox.Info tooltipText="tooptip example" />
                <InputBox.Number>1930</InputBox.Number>
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
                  Main Power Check<i>*</i>
                </InputBox.Title>
                <InputBox.Info tooltipText="tooptip example" />
                <InputBox.Number>1931</InputBox.Number>
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
                  Battery Error Check<i>*</i>
                </InputBox.Title>
                <InputBox.Info tooltipText="tooptip example" />
                <InputBox.Number>1932</InputBox.Number>
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
                Decide Vehicle Battery 12V or 24V (Volts DC)<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1933</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue={"17.0"} />
            </InputBox.Body>
          </InputBox>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Shutdown Threshold 12V Vehicle Battery (Volts DC)<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1934</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue={"8.0"} />
            </InputBox.Body>
          </InputBox>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Shutdown Threshold 24V Vehicle Battery (Volt DC)<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1935</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue={"18.0"} />
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
                  Use Low Battery Shutdown<i>*</i>
                </InputBox.Title>
                <InputBox.Info tooltipText="tooptip example" />
                <InputBox.Number>1936</InputBox.Number>
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
                Low Battery Shutdown Threshold (Volts DC)<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1937</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue={"3.40"} />
            </InputBox.Body>
          </InputBox>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Low Battery Alert Threshold (Volt DC)<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1938</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue={"3.50"} />
            </InputBox.Body>
          </InputBox>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                LV Exit Delay Timer (seconds)<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1939</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth />
            </InputBox.Body>
          </InputBox>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Check LVA Delay Timer (seconds) <i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1940</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth />
            </InputBox.Body>
          </InputBox>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Ref.normal V threshold (Volt DC) <i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1941</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth />
            </InputBox.Body>
          </InputBox>
        </Stack>

        <Stack gap="20px" sx={{ width: "50%" }}>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                LVA threshold (Volt DC) <i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1942</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth />
            </InputBox.Body>
          </InputBox>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Very LV threshold (Volt DC)<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1943</InputBox.Number>
              {/* <span className="notification"/> */}
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
                  EDRX Mode<i>*</i>
                </InputBox.Title>
                <InputBox.Info tooltipText="tooptip example" />
                <InputBox.Number>1944</InputBox.Number>
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
                EDRX Value<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1945</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue={"0"} />
            </InputBox.Body>
          </InputBox>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                EDRX PTW (Paging Time Window)<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1946</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue={"0"} />
            </InputBox.Body>
          </InputBox>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Low Battery Alert Capacity (%)<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1947</InputBox.Number>
              {/* <span className="notification"/> */}
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
                  Charging in Parking<i>*</i>
                </InputBox.Title>
                <InputBox.Info tooltipText="tooptip example" />
                <InputBox.Number>1952</InputBox.Number>
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
                    Charging Stop Threshold 12V<i>*</i>
                  </InputBox.Title>
                  <InputBox.Info tooltipText="tooptip example" />
                  <InputBox.Number>1953</InputBox.Number>
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
                    Charging Stop Threshold 24V<i>*</i>
                  </InputBox.Title>
                  <InputBox.Info tooltipText="tooptip example" />
                  <InputBox.Number>1954</InputBox.Number>
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
                    Periodic Reboot Interval (minutes)<i>*</i>
                  </InputBox.Title>
                  <InputBox.Info tooltipText="tooptip example" />
                  <InputBox.Number>1954</InputBox.Number>
                  {/* <span className="notification"/> */}
                </Stack>
                <SwitchPrimary />
              </Stack>
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue={"1,440"} />
            </InputBox.Body>
          </InputBox>
        </Stack>
      </Stack>
    </>
  );
}
