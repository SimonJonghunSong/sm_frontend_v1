"use client";

import {
  Button,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import SideMenu from "../../../../components/sidemenu/SideMenu";
import { sideMenuItems } from "../sideMenuItems";
import InputBox from "../../../../components/inputbox/InputBox";

export default function Page() {

  return (
    <div className="pageWrap">
      <SideMenu configuration sideMenuItems={sideMenuItems} />

      <article className="contentWrap">
        <Stack sx={{ height: "100%" }}>
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
                      Commands
                    </div>
                  </InputBox.Title>
                  {/* <span className="notification"/> */}
                </InputBox.Head>
              </Stack>
            </InputBox>
          </Stack>

          <Stack gap="16px">
            <div
              style={{
                border: "1px solid var(--grey4)",
                borderRadius: "8px",
                height: "100%",
                padding: "16px",
                maxHeight: "720px",
                overflowY: "scroll",
              }}
            >
              <Stack direction="row" gap="40px" pb={4}>
                <Stack gap="20px" sx={{ width: "50%" }}>
                  <InputBox>
                    <InputBox.Head>
                      <InputBox.Title>Preset</InputBox.Title>
                      {/* <span className="notification"/> */}
                    </InputBox.Head>
                    <InputBox.Body>
                      <Stack direction="row" gap="8px">
                        <TextField fullWidth defaultValue="" />
                        <Button variant="outlined" color="secondary">
                          Set
                        </Button>
                      </Stack>
                    </InputBox.Body>
                  </InputBox>
                  <InputBox>
                    <InputBox.Head>
                      <InputBox.Title>PresetP</InputBox.Title>
                      {/* <span className="notification"/> */}
                    </InputBox.Head>
                    <InputBox.Body>
                      <Stack direction="row" gap="8px">
                        <TextField fullWidth defaultValue="" />
                        <Button variant="outlined" color="secondary">
                          Set
                        </Button>
                      </Stack>
                    </InputBox.Body>
                  </InputBox>
                  <InputBox>
                    <InputBox.Head>
                      <InputBox.Title>ReqlCCID</InputBox.Title>
                      {/* <span className="notification"/> */}
                    </InputBox.Head>
                    <InputBox.Body>
                      <Stack direction="row" gap="8px">
                        <TextField fullWidth defaultValue="" />
                        <Button variant="outlined" color="secondary">
                          Set
                        </Button>
                      </Stack>
                    </InputBox.Body>
                  </InputBox>
                  <InputBox>
                    <InputBox.Head>
                      <InputBox.Title>ReqlCCID</InputBox.Title>
                      {/* <span className="notification"/> */}
                    </InputBox.Head>
                    <InputBox.Body>
                      <Stack direction="row" gap="8px">
                        <TextField fullWidth defaultValue="" />
                        <Button variant="outlined" color="secondary">
                          Set
                        </Button>
                      </Stack>
                    </InputBox.Body>
                  </InputBox>
                  <InputBox>
                    <InputBox.Head>
                      <InputBox.Title>ReqlCCID</InputBox.Title>
                      {/* <span className="notification"/> */}
                    </InputBox.Head>
                    <InputBox.Body>
                      <Stack direction="row" gap="8px">
                        <TextField fullWidth defaultValue="" />
                        <Button variant="outlined" color="secondary">
                          Set
                        </Button>
                      </Stack>
                    </InputBox.Body>
                  </InputBox>
                  <InputBox>
                    <InputBox.Head>
                      <InputBox.Title>ReqlCCID</InputBox.Title>
                      {/* <span className="notification"/> */}
                    </InputBox.Head>
                    <InputBox.Body>
                      <Stack direction="row" gap="8px">
                        <TextField fullWidth defaultValue="" />
                        <Button variant="outlined" color="secondary">
                          Set
                        </Button>
                      </Stack>
                    </InputBox.Body>
                  </InputBox>
                </Stack>
                <Stack gap="20px" sx={{ width: "50%" }}>
                  <InputBox>
                    <InputBox.Head>
                      <InputBox.Title>InitMsgNo</InputBox.Title>
                      {/* <span className="notification"/> */}
                    </InputBox.Head>
                    <InputBox.Body>
                      <Stack direction="row" gap="8px">
                        <TextField fullWidth defaultValue="" />
                        <Button variant="outlined" color="secondary">
                          Set
                        </Button>
                      </Stack>
                    </InputBox.Body>
                  </InputBox>
                  <InputBox>
                    <InputBox.Head>
                      <InputBox.Title>SetHMeter</InputBox.Title>
                      {/* <span className="notification"/> */}
                    </InputBox.Head>
                    <InputBox.Body>
                      <Stack direction="row" gap="8px">
                        <TextField fullWidth defaultValue="" />
                        <Button variant="outlined" color="secondary">
                          Set
                        </Button>
                      </Stack>
                    </InputBox.Body>
                  </InputBox>
                  <InputBox>
                    <InputBox.Head>
                      <InputBox.Title>InitAIPolygonGeo</InputBox.Title>
                      {/* <span className="notification"/> */}
                    </InputBox.Head>
                    <InputBox.Body>
                      <Stack direction="row" gap="8px">
                        <TextField fullWidth defaultValue="" />
                        <Button variant="outlined" color="secondary">
                          Set
                        </Button>
                      </Stack>
                    </InputBox.Body>
                  </InputBox>
                  <InputBox>
                    <InputBox.Head>
                      <InputBox.Title>InitAIPolygonGeo</InputBox.Title>
                      {/* <span className="notification"/> */}
                    </InputBox.Head>
                    <InputBox.Body>
                      <Stack direction="row" gap="8px">
                        <TextField fullWidth defaultValue="" />
                        <Button variant="outlined" color="secondary">
                          Set
                        </Button>
                      </Stack>
                    </InputBox.Body>
                  </InputBox>
                  <InputBox>
                    <InputBox.Head>
                      <InputBox.Title>InitAIPolygonGeo</InputBox.Title>
                      {/* <span className="notification"/> */}
                    </InputBox.Head>
                    <InputBox.Body>
                      <Stack direction="row" gap="8px">
                        <TextField fullWidth defaultValue="" />
                        <Button variant="outlined" color="secondary">
                          Set
                        </Button>
                      </Stack>
                    </InputBox.Body>
                  </InputBox>
                  <InputBox>
                    <InputBox.Head>
                      <InputBox.Title>InitAIPolygonGeo</InputBox.Title>
                      {/* <span className="notification"/> */}
                    </InputBox.Head>
                    <InputBox.Body>
                      <Stack direction="row" gap="8px">
                        <TextField fullWidth defaultValue="" />
                        <Button variant="outlined" color="secondary">
                          Set
                        </Button>
                      </Stack>
                    </InputBox.Body>
                  </InputBox>
                </Stack>
              </Stack>
            </div>
            <Stack direction="row" gap="16px">
              <TextField
                inputProps={{
                  readOnly: true
                }}
                multiline
                fullWidth
                rows={1}
                sx={{
                  flexGrow: 1,
                  height: "120px",
                  "& .MuiInputBase-root": {
                    padding: "10px 12px",
                    height: "100% !important",
                  },
                  "& textarea": {
                    height: "100% !important",
                  },
                }}
              />
            </Stack>
          </Stack>
        </Stack>
      </article>
    </div>
  );
}