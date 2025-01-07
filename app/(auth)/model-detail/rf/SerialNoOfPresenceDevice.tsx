import {
    Stack,
    Select,
    MenuItem,
    TextField,
  } from "@mui/material";
  import React from "react";
  import InputBox from "../../../../components/inputbox/InputBox";
  import { SwitchPrimary } from "../../../../components/switches";
  
  export default function SerialNoOfPresenceDevice() {
    return (
      <>
        <Stack sx={{ width: "calc(50% - 20px)" }}>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                <div className="pageTitle" style={{ marginBottom: 0 }}>
                  Serial No. of Presence Device
                </div>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              {/* <span className="notification"/> */}
            </InputBox.Head>
          </InputBox>
        </Stack>
        <Stack direction="row" gap="40px" mb="40px">
          <Stack gap="20px" sx={{ width: "50%" }}>
            <InputBox>
              <InputBox.Head>
                <InputBox.Title>
                  Presence Device 1<i>*</i>
                </InputBox.Title>
                <InputBox.Info tooltipText="tooptip example" />
                <InputBox.Number>2571</InputBox.Number>
                {/* <span className="notification"/> */}
              </InputBox.Head>
              <InputBox.Body>
                <TextField fullWidth defaultValue="" />
              </InputBox.Body>
            </InputBox>

            <InputBox>
              <InputBox.Head>
                <InputBox.Title>
                  Presence Device 2<i>*</i>
                </InputBox.Title>
                <InputBox.Info tooltipText="tooptip example" />
                <InputBox.Number>2572</InputBox.Number>
                {/* <span className="notification"/> */}
              </InputBox.Head>
              <InputBox.Body>
                <TextField fullWidth defaultValue="" />
              </InputBox.Body>
            </InputBox>

            <InputBox>
              <InputBox.Head>
                <InputBox.Title>
                  Presence Device 3<i>*</i>
                </InputBox.Title>
                <InputBox.Info tooltipText="tooptip example" />
                <InputBox.Number>2573</InputBox.Number>
                {/* <span className="notification"/> */}
              </InputBox.Head>
              <InputBox.Body>
                <TextField fullWidth defaultValue="" />
              </InputBox.Body>
            </InputBox>

            <InputBox>
              <InputBox.Head>
                <InputBox.Title>
                  Presence Device 4<i>*</i>
                </InputBox.Title>
                <InputBox.Info tooltipText="tooptip example" />
                <InputBox.Number>2574</InputBox.Number>
                {/* <span className="notification"/> */}
              </InputBox.Head>
              <InputBox.Body>
                <TextField fullWidth defaultValue="" />
              </InputBox.Body>
            </InputBox>

            <InputBox>
              <InputBox.Head>
                <InputBox.Title>
                  Presence Device 5<i>*</i>
                </InputBox.Title>
                <InputBox.Info tooltipText="tooptip example" />
                <InputBox.Number>2575</InputBox.Number>
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
                  Presence Device 6<i>*</i>
                </InputBox.Title>
                <InputBox.Info tooltipText="tooptip example" />
                <InputBox.Number>2576</InputBox.Number>
                {/* <span className="notification"/> */}
              </InputBox.Head>
              <InputBox.Body>
                <TextField fullWidth defaultValue="" />
              </InputBox.Body>
            </InputBox>

            <InputBox>
              <InputBox.Head>
                <InputBox.Title>
                  Presence Device 7<i>*</i>
                </InputBox.Title>
                <InputBox.Info tooltipText="tooptip example" />
                <InputBox.Number>2577</InputBox.Number>
                {/* <span className="notification"/> */}
              </InputBox.Head>
              <InputBox.Body>
                <TextField fullWidth defaultValue="" />
              </InputBox.Body>
            </InputBox>

            <InputBox>
              <InputBox.Head>
                <InputBox.Title>
                  Presence Device 8<i>*</i>
                </InputBox.Title>
                <InputBox.Info tooltipText="tooptip example" />
                <InputBox.Number>2578</InputBox.Number>
                {/* <span className="notification"/> */}
              </InputBox.Head>
              <InputBox.Body>
                <TextField fullWidth defaultValue="" />
              </InputBox.Body>
            </InputBox>

            <InputBox>
              <InputBox.Head>
                <InputBox.Title>
                  Presence Device 9<i>*</i>
                </InputBox.Title>
                <InputBox.Info tooltipText="tooptip example" />
                <InputBox.Number>2579</InputBox.Number>
                {/* <span className="notification"/> */}
              </InputBox.Head>
              <InputBox.Body>
                <TextField fullWidth defaultValue="" />
              </InputBox.Body>
            </InputBox>

            <InputBox>
              <InputBox.Head>
                <InputBox.Title>
                  Presence Device 10<i>*</i>
                </InputBox.Title>
                <InputBox.Info tooltipText="tooptip example" />
                <InputBox.Number>2580</InputBox.Number>
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
  