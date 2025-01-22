import { Stack, Select, MenuItem, TextField } from "@mui/material";
import React from "react";
import InputBox from "../../../../components/inputbox/InputBox";
import { SwitchPrimary } from "../../../../components/switches";

export default function Sms() {
  return (
    <>
      <div className="pageTitle">SMS</div>
      <Stack direction="row" gap="40px" mb="40px">
        <Stack gap="20px" sx={{ width: "50%" }}>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>SMS Number<i>*</i></InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1025</InputBox.Number>
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
                <InputBox.Title>SMS Lock<i>*</i></InputBox.Title>
                <InputBox.Info tooltipText="tooptip example" />
                <InputBox.Number>1030</InputBox.Number>
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
              <InputBox.Title>SMS MT1<i>*</i></InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1030</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth />
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>SMS MT2<i>*</i></InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1031</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth />
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>SMS MT3<i>*</i></InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1032</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth />
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>SMS MT4<i>*</i></InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1033</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth />
            </InputBox.Body>
          </InputBox>
        </Stack>
      </Stack>
    </>
  );
}
