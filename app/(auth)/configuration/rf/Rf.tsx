import { Stack, Select, MenuItem, TextField } from "@mui/material";
import React from "react";
import InputBox from "../../../../components/inputbox/InputBox";
import { SwitchPrimary } from "../../../../components/switches";

export default function Rf() {
  return (
    <>
      <Stack sx={{ width: "calc(50% - 20px)" }}>
        <InputBox>
          <InputBox.Head>
            <InputBox.Title>
              <div className="pageTitle" style={{ marginBottom: 0 }}>
                RF
              </div>
            </InputBox.Title>
            <InputBox.Info tooltipText="tooptip example" />
            <InputBox.Number>2500</InputBox.Number>
            {/* <span className="notification"/> */}
          </InputBox.Head>
        </InputBox>
      </Stack>

      <Stack direction="row" gap="40px" mb="40px">
        <Stack gap="20px" sx={{ width: "50%" }}>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                RF Channel<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>2501</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <Select value={"select-1"} sx={{ width: "100%" }}>
                <MenuItem value={"select-1"}>1</MenuItem>
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
                  Status of Battery<i>*</i>
                </InputBox.Title>
                <InputBox.Info tooltipText="tooptip example" />
                <InputBox.Number>2502</InputBox.Number>
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
                Normal Wait Delay (seconds)<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>2503</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue="25" />
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Sleep Delay (seconds)<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>2504</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue="100" />
            </InputBox.Body>
          </InputBox>
        </Stack>

        <Stack gap="20px" sx={{ width: "50%" }}>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Customer Code<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>2505</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue="" />
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
                  Type of Presence Function<i>*</i>
                </InputBox.Title>
                <InputBox.Info tooltipText="tooptip example" />
                <InputBox.Number>2561</InputBox.Number>
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
                Timeout of Presence Function (seconds)<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>2363</InputBox.Number>
              {/* <span className="notification"/> */}
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
                  GPS Included<i>*</i>
                </InputBox.Title>
                <InputBox.Info tooltipText="tooptip example" />
                <InputBox.Number>2564</InputBox.Number>
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
