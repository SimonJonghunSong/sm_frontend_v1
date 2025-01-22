import {
  Stack,
  Select,
  MenuItem,
  TextField,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";
import InputBox from "../../../../components/inputbox/InputBox";
import { SwitchPrimary } from "../../../../components/switches";
import useParameterStore from "../../../../utils/useParameterStore";

export default function JammingDetection() {
  const { hiddenParameter } = useParameterStore();

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        sx={{ width: "calc(50% - 20px)" }}
      >
        <div className="pageTitle">Jamming Detection</div>
        <SwitchPrimary />
      </Stack>
      <Stack direction="row" gap="40px" mb="40px">
        <Stack gap="20px" sx={{ width: "50%" }}>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Jamming Detection<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1061</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <Select value={"select-1"} sx={{ width: "100%" }}>
                <MenuItem value={"select-1"}>Select</MenuItem>
              </Select>
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Check distance for jamming (meters)<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1062</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue="500" />
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Check distance for jamming (meters)<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1063</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue="300" />
            </InputBox.Body>
          </InputBox>

          {!hiddenParameter && (
            <>
              <InputBox>
                <InputBox.Head>
                  <InputBox.Title warning>Period (seconds)</InputBox.Title>
                  <InputBox.Info tooltipText="tooptip example" />
                  <InputBox.Number>0740</InputBox.Number>
                  {/* <span className="notification"/> */}
                </InputBox.Head>
                <InputBox.Body>
                  <TextField fullWidth defaultValue="0" />
                </InputBox.Body>
              </InputBox>

              <InputBox>
                <InputBox.Head>
                  <InputBox.Title warning>Minch</InputBox.Title>
                  <InputBox.Info tooltipText="tooptip example" />
                  <InputBox.Number>0741</InputBox.Number>
                  {/* <span className="notification"/> */}
                </InputBox.Head>
                <InputBox.Body>
                  <TextField fullWidth defaultValue="10" />
                </InputBox.Body>
              </InputBox>

              <InputBox>
                <InputBox.Head>
                  <InputBox.Title warning>Minsqual</InputBox.Title>
                  <InputBox.Info tooltipText="tooptip example" />
                  <InputBox.Number>0743</InputBox.Number>
                  {/* <span className="notification"/> */}
                </InputBox.Head>
                <InputBox.Body>
                  <TextField fullWidth defaultValue="10" />
                </InputBox.Body>
              </InputBox>

              <InputBox>
                <InputBox.Head>
                  <InputBox.Title warning>Maxsrxlev</InputBox.Title>
                  <InputBox.Info tooltipText="tooptip example" />
                  <InputBox.Number>0744</InputBox.Number>
                  {/* <span className="notification"/> */}
                </InputBox.Head>
                <InputBox.Body>
                  <TextField fullWidth defaultValue="50" />
                </InputBox.Body>
              </InputBox>

              <InputBox>
                <InputBox.Head>
                  <InputBox.Title warning>Maxrxlev</InputBox.Title>
                  <InputBox.Info tooltipText="tooptip example" />
                  <InputBox.Number>0745</InputBox.Number>
                  {/* <span className="notification"/> */}
                </InputBox.Head>
                <InputBox.Body>
                  <TextField fullWidth defaultValue="30" />
                </InputBox.Body>
              </InputBox>

              <InputBox>
                <InputBox.Head>
                  <InputBox.Title warning>Jam Release Delay</InputBox.Title>
                  <InputBox.Info tooltipText="tooptip example" />
                  <InputBox.Number>0746</InputBox.Number>
                  {/* <span className="notification"/> */}
                </InputBox.Head>
                <InputBox.Body>
                  <TextField fullWidth defaultValue="100" />
                </InputBox.Body>
              </InputBox>

              <InputBox>
                <InputBox.Head>
                  <InputBox.Title warning>NO Jamming Delay</InputBox.Title>
                  <InputBox.Info tooltipText="tooptip example" />
                  <InputBox.Number>0769</InputBox.Number>
                  {/* <span className="notification"/> */}
                </InputBox.Head>
                <InputBox.Body>
                  <TextField fullWidth defaultValue="120" />
                </InputBox.Body>
              </InputBox>
            </>
          )}
        </Stack>

        <Stack gap="20px" sx={{ width: "50%" }}>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Jamming detection cycle timer 1 (seconds)<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1065</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue="60" />
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Jamming detection cycle timer 2 (seconds)<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1066</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue="60" />
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Jamming detection cycle timer 3 (seconds)<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1067</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue="60" />
            </InputBox.Body>
          </InputBox>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Jamming detection cycle timer 4 (seconds)<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1068</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <TextField fullWidth defaultValue="60" />
            </InputBox.Body>
          </InputBox>

          {
            !hiddenParameter && (
              <>
                <InputBox>
                  <InputBox.Head>
                    <InputBox.Title warning>RSSI</InputBox.Title>
                    <InputBox.Info tooltipText="tooptip example" />
                    <InputBox.Number>1068</InputBox.Number>
                    {/* <span className="notification"/> */}
                  </InputBox.Head>
                  <InputBox.Body>
                    <TextField fullWidth defaultValue="-40" />
                  </InputBox.Body>
                </InputBox>
                <InputBox>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <InputBox.Head>
                      <InputBox.Title warning>Jamming Check Condition</InputBox.Title>
                      <InputBox.Info tooltipText="tooptip example" />
                      <InputBox.Number>0779</InputBox.Number>
                      {/* <span className="notification"/> */}
                    </InputBox.Head>
                    <InputBox.Body>
                      <SwitchPrimary />
                    </InputBox.Body>
                  </Stack>
                </InputBox>

                <InputBox>
                  <InputBox.Head>
                    <InputBox.Title warning>Mnl</InputBox.Title>
                    <InputBox.Info tooltipText="tooptip example" />
                    <InputBox.Number>0793</InputBox.Number>
                    {/* <span className="notification"/> */}
                  </InputBox.Head>
                  <InputBox.Body>
                    <TextField fullWidth defaultValue="25" />
                  </InputBox.Body>
                </InputBox>

                <InputBox>
                  <InputBox.Head>
                    <InputBox.Title warning>RSRP</InputBox.Title>
                    <InputBox.Info tooltipText="tooptip example" />
                    <InputBox.Number>0794</InputBox.Number>
                    {/* <span className="notification"/> */}
                  </InputBox.Head>
                  <InputBox.Body>
                    <TextField fullWidth defaultValue="-105" />
                  </InputBox.Body>
                </InputBox>

                <InputBox>
                  <InputBox.Head>
                    <InputBox.Title warning>RSRQ</InputBox.Title>
                    <InputBox.Info tooltipText="tooptip example" />
                    <InputBox.Number>0795</InputBox.Number>
                    {/* <span className="notification"/> */}
                  </InputBox.Head>
                  <InputBox.Body>
                    <TextField fullWidth defaultValue="-15" />
                  </InputBox.Body>
                </InputBox>

                <InputBox>
                  <InputBox.Head>
                    <InputBox.Title warning>SINR</InputBox.Title>
                    <InputBox.Info tooltipText="tooptip example" />
                    <InputBox.Number>0796</InputBox.Number>
                    {/* <span className="notification"/> */}
                  </InputBox.Head>
                  <InputBox.Body>
                    <TextField fullWidth defaultValue="3" />
                  </InputBox.Body>
                </InputBox>
              </>
            )
          }
          
        </Stack>
      </Stack>
    </>
  );
}
