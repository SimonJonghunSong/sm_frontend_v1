import {
  Stack,
  Divider,
  Checkbox,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import React from "react";
import InputBox from "../../../../components/inputbox/InputBox";
import { SwitchPrimary } from "../../../../components/switches";

const checkboxStyles = {
  width: "33.33%",
  alignItems: "flex-start",
};
export default function ReportMapping() {
  return (
    <>
      <div className="pageTitle">Report Mapping</div>
      <Stack direction="row" gap="40px" mb="40px">
        <Stack gap="20px" sx={{ width: "50%" }}>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Status Report Map<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1080</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <Stack>
                <FormControlLabel
                  value="All"
                  control={<Checkbox />}
                  label="All"
                />
                <Divider sx={{ margin: "8px 0" }} />
              </Stack>

              <FormControl
                sx={{
                  flexDirection: "row",
                  gap: "4px",
                  flexWrap: "wrap",
                  width: "100%",
                }}
              >
                <FormControlLabel
                  value="Report Map"
                  control={<Checkbox />}
                  label="Report Map"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="MNC"
                  control={<Checkbox />}
                  label="MNC"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="GPS Fix Status"
                  control={<Checkbox />}
                  label="GPS Fix Status"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Model"
                  control={<Checkbox />}
                  label="Model"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="LAC – Local Area Code"
                  control={<Checkbox />}
                  label="LAC – Local Area Code"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Input States"
                  control={<Checkbox />}
                  label="Input States"
                  sx={checkboxStyles}
                />

                <FormControlLabel
                  value="Software Version"
                  control={<Checkbox />}
                  label="Software Version"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="RX_LVL"
                  control={<Checkbox />}
                  label="RX_LVL"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Output States"
                  control={<Checkbox />}
                  label="Output States"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Message Type"
                  control={<Checkbox />}
                  label="Message Type"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Latitude"
                  control={<Checkbox />}
                  label="Latitude"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Mode"
                  control={<Checkbox />}
                  label="Mode"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Date"
                  control={<Checkbox />}
                  label="Date"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Longitude"
                  control={<Checkbox />}
                  label="Longitude"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Status Report Type"
                  control={<Checkbox />}
                  label="Status Report Type"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Time"
                  control={<Checkbox />}
                  label="Time"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Speed"
                  control={<Checkbox />}
                  label="Speed"
                  sx={checkboxStyles}
                />

                <FormControlLabel
                  value="Message Number"
                  control={<Checkbox />}
                  label="Message Number"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Cell ID"
                  control={<Checkbox />}
                  label="Cell ID"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Course/Heading"
                  control={<Checkbox />}
                  label="Course/Heading"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Reserved"
                  control={<Checkbox />}
                  label="Reserved"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="MCC"
                  control={<Checkbox />}
                  label="MCC"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Satellite Count"
                  control={<Checkbox />}
                  label="Satellite Count"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Assign Map"
                  control={<Checkbox />}
                  label="Assign Map"
                  sx={checkboxStyles}
                />
              </FormControl>
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Alert ID Report Map<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1082</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <Stack>
                <FormControlLabel
                  value="All"
                  control={<Checkbox />}
                  label="All"
                />
                <Divider sx={{ margin: "8px 0" }} />
              </Stack>

              <FormControl
                sx={{
                  flexDirection: "row",
                  gap: "4px",
                  flexWrap: "wrap",
                  width: "100%",
                }}
              >
                <FormControlLabel
                  value="Report Map"
                  control={<Checkbox />}
                  label="Report Map"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="MNC"
                  control={<Checkbox />}
                  label="MNC"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="GPS Fix Status"
                  control={<Checkbox />}
                  label="GPS Fix Status"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Model"
                  control={<Checkbox />}
                  label="Model"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="LAC – Local Area Code"
                  control={<Checkbox />}
                  label="LAC – Local Area Code"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Input States"
                  control={<Checkbox />}
                  label="Input States"
                  sx={checkboxStyles}
                />

                <FormControlLabel
                  value="Software Version"
                  control={<Checkbox />}
                  label="Software Version"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="RX_LVL"
                  control={<Checkbox />}
                  label="RX_LVL"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Output States"
                  control={<Checkbox />}
                  label="Output States"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Message Type"
                  control={<Checkbox />}
                  label="Message Type"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Latitude"
                  control={<Checkbox />}
                  label="Latitude"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Mode"
                  control={<Checkbox />}
                  label="Mode"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Date"
                  control={<Checkbox />}
                  label="Date"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Longitude"
                  control={<Checkbox />}
                  label="Longitude"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Status Report Type"
                  control={<Checkbox />}
                  label="Status Report Type"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Time"
                  control={<Checkbox />}
                  label="Time"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Speed"
                  control={<Checkbox />}
                  label="Speed"
                  sx={checkboxStyles}
                />

                <FormControlLabel
                  value="Message Number"
                  control={<Checkbox />}
                  label="Message Number"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Cell ID"
                  control={<Checkbox />}
                  label="Cell ID"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Course/Heading"
                  control={<Checkbox />}
                  label="Course/Heading"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Reserved"
                  control={<Checkbox />}
                  label="Reserved"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="MCC"
                  control={<Checkbox />}
                  label="MCC"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Satellite Count"
                  control={<Checkbox />}
                  label="Satellite Count"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Assign Map"
                  control={<Checkbox />}
                  label="Assign Map"
                  sx={checkboxStyles}
                />
              </FormControl>
            </InputBox.Body>
          </InputBox>
        </Stack>

        <Stack gap="20px" sx={{ width: "50%" }}>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                External Serial Report Map<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1084</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <Stack>
                <FormControlLabel
                  value="All"
                  control={<Checkbox />}
                  label="All"
                />
                <Divider sx={{ margin: "8px 0" }} />
              </Stack>

              <FormControl
                sx={{
                  flexDirection: "row",
                  gap: "4px",
                  flexWrap: "wrap",
                  width: "100%",
                }}
              >
                <FormControlLabel
                  value="Report Map"
                  control={<Checkbox />}
                  label="Report Map"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="MNC"
                  control={<Checkbox />}
                  label="MNC"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="GPS Fix Status"
                  control={<Checkbox />}
                  label="GPS Fix Status"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Model"
                  control={<Checkbox />}
                  label="Model"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="LAC – Local Area Code"
                  control={<Checkbox />}
                  label="LAC – Local Area Code"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Input States"
                  control={<Checkbox />}
                  label="Input States"
                  sx={checkboxStyles}
                />

                <FormControlLabel
                  value="Software Version"
                  control={<Checkbox />}
                  label="Software Version"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="RX_LVL"
                  control={<Checkbox />}
                  label="RX_LVL"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Output States"
                  control={<Checkbox />}
                  label="Output States"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Message Type"
                  control={<Checkbox />}
                  label="Message Type"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Latitude"
                  control={<Checkbox />}
                  label="Latitude"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Mode"
                  control={<Checkbox />}
                  label="Mode"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Date"
                  control={<Checkbox />}
                  label="Date"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Longitude"
                  control={<Checkbox />}
                  label="Longitude"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Status Report Type"
                  control={<Checkbox />}
                  label="Status Report Type"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Time"
                  control={<Checkbox />}
                  label="Time"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Speed"
                  control={<Checkbox />}
                  label="Speed"
                  sx={checkboxStyles}
                />

                <FormControlLabel
                  value="Message Number"
                  control={<Checkbox />}
                  label="Message Number"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Cell ID"
                  control={<Checkbox />}
                  label="Cell ID"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Course/Heading"
                  control={<Checkbox />}
                  label="Course/Heading"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Reserved"
                  control={<Checkbox />}
                  label="Reserved"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="MCC"
                  control={<Checkbox />}
                  label="MCC"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Satellite Count"
                  control={<Checkbox />}
                  label="Satellite Count"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Assign Map"
                  control={<Checkbox />}
                  label="Assign Map"
                  sx={checkboxStyles}
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
                  Travel Event<i>*</i>
                </InputBox.Title>
                <InputBox.Info tooltipText="tooptip example" />
                <InputBox.Number>1060</InputBox.Number>
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
                CAM Report Map<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1092</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <Stack>
                <FormControlLabel
                  value="All"
                  control={<Checkbox />}
                  label="All"
                />
                <Divider sx={{ margin: "8px 0" }} />
              </Stack>

              <FormControl
                sx={{
                  flexDirection: "row",
                  gap: "4px",
                  flexWrap: "wrap",
                  width: "100%",
                }}
              >
                <FormControlLabel
                  value="Report Map"
                  control={<Checkbox />}
                  label="Report Map"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="MNC"
                  control={<Checkbox />}
                  label="MNC"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="GPS Fix Status"
                  control={<Checkbox />}
                  label="GPS Fix Status"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Model"
                  control={<Checkbox />}
                  label="Model"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="LAC – Local Area Code"
                  control={<Checkbox />}
                  label="LAC – Local Area Code"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Input States"
                  control={<Checkbox />}
                  label="Input States"
                  sx={checkboxStyles}
                />

                <FormControlLabel
                  value="Software Version"
                  control={<Checkbox />}
                  label="Software Version"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="RX_LVL"
                  control={<Checkbox />}
                  label="RX_LVL"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Output States"
                  control={<Checkbox />}
                  label="Output States"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Message Type"
                  control={<Checkbox />}
                  label="Message Type"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Latitude"
                  control={<Checkbox />}
                  label="Latitude"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Mode"
                  control={<Checkbox />}
                  label="Mode"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Date"
                  control={<Checkbox />}
                  label="Date"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Longitude"
                  control={<Checkbox />}
                  label="Longitude"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Status Report Type"
                  control={<Checkbox />}
                  label="Status Report Type"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Time"
                  control={<Checkbox />}
                  label="Time"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Speed"
                  control={<Checkbox />}
                  label="Speed"
                  sx={checkboxStyles}
                />

                <FormControlLabel
                  value="Message Number"
                  control={<Checkbox />}
                  label="Message Number"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Cell ID"
                  control={<Checkbox />}
                  label="Cell ID"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Course/Heading"
                  control={<Checkbox />}
                  label="Course/Heading"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Reserved"
                  control={<Checkbox />}
                  label="Reserved"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="MCC"
                  control={<Checkbox />}
                  label="MCC"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Satellite Count"
                  control={<Checkbox />}
                  label="Satellite Count"
                  sx={checkboxStyles}
                />
                <FormControlLabel
                  value="Assign Map"
                  control={<Checkbox />}
                  label="Assign Map"
                  sx={checkboxStyles}
                />
              </FormControl>
            </InputBox.Body>
          </InputBox>
        </Stack>
      </Stack>
    </>
  );
}
