import { Stack, Select, MenuItem, TextField } from "@mui/material";
import React from "react";
import InputBox from "../../../../components/inputbox/InputBox";
import { SwitchPrimary } from "../../../../components/switches";

export default function LoRaWan() {
  return (
    <>
      <Stack direction="row" justifyContent="space-between" sx={{ width: "calc(50% - 20px)" }}>
        <InputBox>
          <InputBox.Head>
            <InputBox.Title>
              <div className="pageTitle" style={{ marginBottom: 0 }}>
                LoRaWAN
              </div>
            </InputBox.Title>
            <InputBox.Info tooltipText="tooptip example" />
            <InputBox.Number>2581</InputBox.Number>
            {/* <span className="notification"/> */}
          </InputBox.Head>
        </InputBox>
        <SwitchPrimary />
      </Stack>
      <Stack direction="row" gap="40px" mb="40px">
        <Stack gap="20px" sx={{ width: "50%" }}>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
              LoRa Device EUI<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>2582</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue="" />
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
              LoRa Uplink Port<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>2583</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue="1" />
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
              LoRa Downlink Port<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>2584</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue="1" />
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
              LoRa Device Address<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>2585</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue="" />
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
              LoRa Network Session Key<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>2586</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue="" />
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
              LoRa App. Session Key<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>2587</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue="" />
            </InputBox.Body>
          </InputBox>
        </Stack>

        <Stack gap="20px" sx={{ width: "50%" }}>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
              LoRaWAN Parking Interval (minutes)<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>2588</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue="" />
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
              LoRaWAN Driving Interval (minutes)<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>2589</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue="" />
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
              LoRaWAN Idle Interval (minutes)<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>2590</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue="" />
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
              LoRaWAN Towing Interval (minutes)<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>2591</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue="" />
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
                  LoRaWAN Report Type<i>*</i>
                  </InputBox.Title>
                  <InputBox.Info tooltipText="tooptip example" />
                  <InputBox.Number>2592</InputBox.Number>
                  {/* <span className="notification"/> */}
                </Stack>
                <SwitchPrimary />
              </Stack>
            </InputBox.Head>
            <InputBox.Body>
              <Select value={"select-1"} sx={{ width: "100%" }}>
                <MenuItem value={"select-1"}>Always</MenuItem>
              </Select>
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
              LoRaWAN Backup Delay (minutes)<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>2593</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue="" />
            </InputBox.Body>
          </InputBox>
        </Stack>
      </Stack>
    </>
  );
}
