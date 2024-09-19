"use client";

import {
  Divider,
  Stack,
  Tab,
  Tabs,
} from "@mui/material";
import React, { useState } from "react";
import SideMenu from "../../../../components/sidemenu/SideMenu";
import { sideMenuItems } from "../sideMenuItems";
import Controller from "../components/Controller";
import Input from "./Input";
import InputBox from "../../../../components/inputbox/InputBox";
import Output from "./Output";

export default function Page() {

    const [value, setValue] = useState("input");

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
    };

  return (
    <div className="pageWrap">
      <SideMenu configuration sideMenuItems={sideMenuItems} />

      <article className="contentWrap">
        <Controller />

        <Stack>
          <Stack sx={{ width: "calc(50% - 20px)" }}>
            <InputBox>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <InputBox.Head>
                  <InputBox.Title>
                    <div className="pageTitle" style={{ marginBottom: 0 }}>
                      Input/Output(I/O)
                    </div>
                  </InputBox.Title>
                  <InputBox.Info tooltipText="tooptip example" />
                  <InputBox.Number>17</InputBox.Number>
                  {/* <span className="notification"/> */}
                </InputBox.Head>
              </Stack>
            </InputBox>
          </Stack>

          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="notification"
            sx={{
              borderBottom: "1px solid var(--grey4)",
              marginBottom: "16px",
            }}
          >
            <Tab value="input" label="Input" sx={{width: "50%", maxWidth: "unset"}}/>
            <Tab value="output" label="Output" sx={{width: "50%", maxWidth: "unset"}}/>
          </Tabs>

          {value === "input" ? (
            <Input />
          ) : (
            <Output />
          )}
        </Stack>
      </article>
    </div>
  );
}