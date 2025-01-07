import {
    Stack,
    Select,
    MenuItem,
    TextField,
    Button,
  } from "@mui/material";
  import React from "react";
  import InputBox from "../../../../components/inputbox/InputBox";
  import { SwitchPrimary } from "../../../../components/switches";
  
  export default function WireSettings() {
    return (
      <>
        <div className="pageTitle">1-Wire Settings</div>
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
                    1-Wire Selection<i>*</i>
                  </InputBox.Title>
                  <InputBox.Info tooltipText="tooptip example" />
                  <InputBox.Number>1970</InputBox.Number>
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
                    DID Tolerance Time (seconds)<i>*</i>
                  </InputBox.Title>
                  <InputBox.Info tooltipText="tooptip example" />
                  <InputBox.Number>1971</InputBox.Number>
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
                    DID Life Time (seconds)<i>*</i>
                  </InputBox.Title>
                  <InputBox.Info tooltipText="tooptip example" />
                  <InputBox.Number>1972</InputBox.Number>
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
                    Exclude Key Register<i>*</i>
                  </InputBox.Title>
                  <InputBox.Info tooltipText="tooptip example" />
                  <InputBox.Number>1973</InputBox.Number>
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
                  I-Button Add Master<i>*</i>
                </InputBox.Title>
                <InputBox.Info tooltipText="tooptip example" />
                <InputBox.Number>1974</InputBox.Number>
                {/* <span className="notification"/> */}
              </InputBox.Head>
              <InputBox.Body>
                <TextField fullWidth />
              </InputBox.Body>
            </InputBox>

            <InputBox>
              <InputBox.Head>
                <InputBox.Title>
                  I-Button Remove Master<i>*</i>
                </InputBox.Title>
                <InputBox.Info tooltipText="tooptip example" />
                <InputBox.Number>1975</InputBox.Number>
                {/* <span className="notification"/> */}
              </InputBox.Head>
              <InputBox.Body>
                <TextField fullWidth />
              </InputBox.Body>
            </InputBox>

            <InputBox>
              <InputBox.Head>
                <InputBox.Title>
                  Temp 1 Threshold (°C)<i>*</i>
                </InputBox.Title>
                <InputBox.Info tooltipText="tooptip example" />
                <InputBox.Number>1980~1</InputBox.Number>
                {/* <span className="notification"/> */}
              </InputBox.Head>
              <InputBox.Body>
                <Stack direction="row" gap="8px" alignItems="center">
                  <TextField fullWidth defaultValue="-50" />
                  <span>~</span>
                  <TextField fullWidth defaultValue="100" />
                </Stack>
              </InputBox.Body>
            </InputBox>

            <InputBox>
              <InputBox.Head>
                <InputBox.Title>
                  Temp 2 Threshold (°C)<i>*</i>
                </InputBox.Title>
                <InputBox.Info tooltipText="tooptip example" />
                <InputBox.Number>1982~3</InputBox.Number>
                {/* <span className="notification"/> */}
              </InputBox.Head>
              <InputBox.Body>
                <Stack direction="row" gap="8px" alignItems="center">
                  <TextField fullWidth defaultValue="-50" />
                  <span>~</span>
                  <TextField fullWidth defaultValue="100" />
                </Stack>
              </InputBox.Body>
            </InputBox>
            <InputBox>
              <InputBox.Head>
                <InputBox.Title>
                  Temp 3 Threshold (°C)<i>*</i>
                </InputBox.Title>
                <InputBox.Info tooltipText="tooptip example" />
                <InputBox.Number>1984~5</InputBox.Number>
                {/* <span className="notification"/> */}
              </InputBox.Head>
              <InputBox.Body>
                <Stack direction="row" gap="8px" alignItems="center">
                  <TextField fullWidth defaultValue="-50" />
                  <span>~</span>
                  <TextField fullWidth defaultValue="100" />
                </Stack>
              </InputBox.Body>
            </InputBox>
            <InputBox>
              <InputBox.Head>
                <InputBox.Title>
                  Temp 4 Threshold (°C)<i>*</i>
                </InputBox.Title>
                <InputBox.Info tooltipText="tooptip example" />
                <InputBox.Number>1986~7</InputBox.Number>
                {/* <span className="notification"/> */}
              </InputBox.Head>
              <InputBox.Body>
                <Stack direction="row" gap="8px" alignItems="center">
                  <TextField fullWidth defaultValue="-50" />
                  <span>~</span>
                  <TextField fullWidth defaultValue="100" />
                </Stack>
              </InputBox.Body>
            </InputBox>
            <InputBox>
              <InputBox.Head>
                <InputBox.Title>
                  Temp 5 Threshold (°C)<i>*</i>
                </InputBox.Title>
                <InputBox.Info tooltipText="tooptip example" />
                <InputBox.Number>1988~9</InputBox.Number>
                {/* <span className="notification"/> */}
              </InputBox.Head>
              <InputBox.Body>
                <Stack direction="row" gap="8px" alignItems="center">
                  <TextField fullWidth defaultValue="-50" />
                  <span>~</span>
                  <TextField fullWidth defaultValue="100" />
                </Stack>
              </InputBox.Body>
            </InputBox>
            <InputBox>
              <InputBox.Head>
                <InputBox.Title>
                  Temp 6 Threshold (°C)<i>*</i>
                </InputBox.Title>
                <InputBox.Info tooltipText="tooptip example" />
                <InputBox.Number>1990~1</InputBox.Number>
                {/* <span className="notification"/> */}
              </InputBox.Head>
              <InputBox.Body>
                <Stack direction="row" gap="8px" alignItems="center">
                  <TextField fullWidth defaultValue="-50" />
                  <span>~</span>
                  <TextField fullWidth defaultValue="100" />
                </Stack>
              </InputBox.Body>
            </InputBox>
            <InputBox>
              <InputBox.Head>
                <InputBox.Title>
                  Temp 7 Threshold (°C)<i>*</i>
                </InputBox.Title>
                <InputBox.Info tooltipText="tooptip example" />
                <InputBox.Number>1992~3</InputBox.Number>
                {/* <span className="notification"/> */}
              </InputBox.Head>
              <InputBox.Body>
                <Stack direction="row" gap="8px" alignItems="center">
                  <TextField fullWidth defaultValue="-50" />
                  <span>~</span>
                  <TextField fullWidth defaultValue="100" />
                </Stack>
              </InputBox.Body>
            </InputBox>
            <InputBox>
              <InputBox.Head>
                <InputBox.Title>
                  Temp 8 Threshold (°C)<i>*</i>
                </InputBox.Title>
                <InputBox.Info tooltipText="tooptip example" />
                <InputBox.Number>1994~5</InputBox.Number>
                {/* <span className="notification"/> */}
              </InputBox.Head>
              <InputBox.Body>
                <Stack direction="row" gap="8px" alignItems="center">
                  <TextField fullWidth defaultValue="-50" />
                  <span>~</span>
                  <TextField fullWidth defaultValue="100" />
                </Stack>
              </InputBox.Body>
            </InputBox>
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
                    Temp. scan Interval in Driving (minutes)<i>*</i>
                  </InputBox.Title>
                  <InputBox.Info tooltipText="tooptip example" />
                  <InputBox.Number>1996</InputBox.Number>
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
                    Temp. scan Interval in Parking (minutes)<i>*</i>
                  </InputBox.Title>
                  <InputBox.Info tooltipText="tooptip example" />
                  <InputBox.Number>1997</InputBox.Number>
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
                    Scan Count Threshold<i>*</i>
                  </InputBox.Title>
                  <InputBox.Info tooltipText="tooptip example" />
                  <InputBox.Number>1998</InputBox.Number>
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
                    Scan Count Threshold<i>*</i>
                  </InputBox.Title>
                  <InputBox.Info tooltipText="tooptip example" />
                  <InputBox.Number>1999</InputBox.Number>
                  {/* <span className="notification"/> */}
                </InputBox.Head>
                <InputBox.Body>
                  <SwitchPrimary />
                </InputBox.Body>
              </Stack>
            </InputBox>

            <div className="pageTitle">Driver ID 1-100</div>

            <InputBox>
              <InputBox.Head>
                <InputBox.Title>
                Driver  ID No.<i>*</i>
                </InputBox.Title>
                {/* <span className="notification"/> */}
              </InputBox.Head>
              <InputBox.Body>
                <Stack direction="row" gap="8px">
                  <Select value={"select-1"} sx={{ minWidth: "120px" }}>
                    <MenuItem value={"select-1"}>Select</MenuItem>
                  </Select>
                  <TextField fullWidth defaultValue="123123123" />
                </Stack>
              </InputBox.Body>
            </InputBox>
            <InputBox>
              <InputBox.Head>
                <InputBox.Title>
                Driver  ID No.<i>*</i>
                </InputBox.Title>
                {/* <span className="notification"/> */}
              </InputBox.Head>
              <InputBox.Body>
                <Stack direction="row" gap="8px">
                  <Select value={"select-1"} sx={{ minWidth: "120px" }}>
                    <MenuItem value={"select-1"}>Select</MenuItem>
                  </Select>
                  <TextField fullWidth defaultValue="123123123" />
                </Stack>
              </InputBox.Body>
            </InputBox>
            <InputBox>
              <InputBox.Head>
                <InputBox.Title>
                Driver  ID No.<i>*</i>
                </InputBox.Title>
                {/* <span className="notification"/> */}
              </InputBox.Head>
              <InputBox.Body>
                <Stack direction="row" gap="8px">
                  <Select value={"select-1"} sx={{ minWidth: "120px" }}>
                    <MenuItem value={"select-1"}>Select</MenuItem>
                  </Select>
                  <TextField fullWidth defaultValue="123123123" />
                </Stack>
              </InputBox.Body>
            </InputBox>
            <InputBox>
              <InputBox.Head>
                <InputBox.Title>
                Driver  ID No.<i>*</i>
                </InputBox.Title>
                {/* <span className="notification"/> */}
              </InputBox.Head>
              <InputBox.Body>
                <Stack direction="row" gap="8px">
                  <Select value={"select-1"} sx={{ minWidth: "120px" }}>
                    <MenuItem value={"select-1"}>Select</MenuItem>
                  </Select>
                  <TextField fullWidth defaultValue="123123123" />
                </Stack>
              </InputBox.Body>
            </InputBox>
            <InputBox>
              <InputBox.Head>
                <InputBox.Title>
                Driver  ID No.<i>*</i>
                </InputBox.Title>
                {/* <span className="notification"/> */}
              </InputBox.Head>
              <InputBox.Body>
                <Stack direction="row" gap="8px">
                  <Select value={"select-1"} sx={{ minWidth: "120px" }}>
                    <MenuItem value={"select-1"}>Select</MenuItem>
                  </Select>
                  <TextField fullWidth defaultValue="123123123" />
                </Stack>
              </InputBox.Body>
            </InputBox>

            <Stack alignItems="center">
              <Button variant="outlined" color="secondary" sx={{width: 200}}>Add</Button>
            </Stack>
          </Stack>
        </Stack>
      </>
    );
  }
  