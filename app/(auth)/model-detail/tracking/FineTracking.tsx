import { Stack, Select, MenuItem, TextField } from "@mui/material";
import React from "react";
import InputBox from "../../../../components/inputbox/InputBox";
import { SwitchPrimary } from "../../../../components/switches";

export default function FineTracking() {
  return (
    <>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          sx={{ width: "calc(50% - 20px)" }}
        >
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                <div className="pageTitle" style={{ marginBottom: 0 }}>
                  Fine Tracking
                </div>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1700</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
          </InputBox>
          <SwitchPrimary />
        </Stack>
    </>
  );
}
