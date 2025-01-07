import { Stack, Select, MenuItem, TextField } from "@mui/material";
import React from "react";
import InputBox from "../../../../components/inputbox/InputBox";
import { SwitchPrimary } from "../../../../components/switches";
import useParameterStore from "../../../../utils/useParameterStore";

export default function Call() {
  const { hiddenParameter } = useParameterStore();

  return (
    <>
      <div className="pageTitle">Call</div>
      <Stack direction="row" gap="40px" mb="40px">
        <Stack gap="20px" sx={{ width: "50%" }}>

          <InputBox>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <InputBox.Head>
                <InputBox.Title>MT Call Lock<i>*</i></InputBox.Title>
                <InputBox.Info tooltipText="tooptip example" />
                <InputBox.Number>1035</InputBox.Number>
                {/* <span className="notification"/> */}
              </InputBox.Head>
              <InputBox.Body>
                <SwitchPrimary />
              </InputBox.Body>
            </Stack>
          </InputBox>
        </Stack>

        <Stack gap="20px" sx={{ width: "50%" }}>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>Call MO1<i>*</i></InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1041</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth />
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>Call MO2<i>*</i></InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1042</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth />
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>Call Support<i>*</i></InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1043</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth />
            </InputBox.Body>
          </InputBox>
          {
            !hiddenParameter && (
              <>
                <InputBox>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <InputBox.Head>
                      <InputBox.Title warning>Set Spy Phone Call</InputBox.Title>
                      <InputBox.Info tooltipText="tooptip example" />
                      <InputBox.Number>0521</InputBox.Number>
                      {/* <span className="notification"/> */}
                    </InputBox.Head>
                    <InputBox.Body>
                      <SwitchPrimary />
                    </InputBox.Body>
                  </Stack>
                </InputBox>

                <InputBox>
                  <InputBox.Head>
                    <InputBox.Title warning>Set Timeout for Spy Phone Call (seconds)</InputBox.Title>
                    <InputBox.Info tooltipText="tooptip example" />
                    <InputBox.Number>0522</InputBox.Number>
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
                      <InputBox.Title warning>Request Spy Phone Call Info</InputBox.Title>
                      <InputBox.Info tooltipText="tooptip example" />
                      <InputBox.Number>0523</InputBox.Number>
                      {/* <span className="notification"/> */}
                    </InputBox.Head>
                    <InputBox.Body>
                      <SwitchPrimary />
                    </InputBox.Body>
                  </Stack>
                </InputBox>
              </>
            )
          }

        </Stack>
      </Stack>
    </>
  );
}
