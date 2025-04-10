"use client";

import { Stack, Select, MenuItem, TextField } from "@mui/material";
import InputBox from "@/components/inputbox/InputBox";
import { SwitchPrimary } from "@/components/switches";
import React from "react";

interface CircularTypeProps {
  id?: number;
  lat?: number;
  long?: number;
  radius?: number;
  max: number;
  excludeGroupId?: number[];
  updateCircleCenter?: (
    circleId: number,
    newLat: number,
    newLng: number
  ) => void;
  updateCircleRadius?: (circleId: number, newRadius: number) => void;
  groupId?: number;
  onChangeGroupId: (id: number) => void;
  onAlertStateChange?: (enterAlert: boolean, exitAlert: boolean) => void;
  initialEnterAlert?: boolean;
  initialExitAlert?: boolean;
}

const CircularType = ({
  id,
  lat,
  long,
  radius,
  updateCircleCenter,
  updateCircleRadius,
  max,
  excludeGroupId = [],
  groupId,
  onChangeGroupId,
  onAlertStateChange,
  initialEnterAlert = false,
  initialExitAlert = false,
}: CircularTypeProps) => {
  const [enterAlert, setEnterAlert] = React.useState(initialEnterAlert);
  const [exitAlert, setExitAlert] = React.useState(initialExitAlert);
  const isUpdatingFromProps = React.useRef(false);

  React.useEffect(() => {
    if (enterAlert !== initialEnterAlert || exitAlert !== initialExitAlert) {
      isUpdatingFromProps.current = true;
      setEnterAlert(initialEnterAlert);
      setExitAlert(initialExitAlert);
    }
  }, [initialEnterAlert, initialExitAlert]);

  React.useEffect(() => {
    if (!isUpdatingFromProps.current && onAlertStateChange) {
      onAlertStateChange(enterAlert, exitAlert);
    }
    isUpdatingFromProps.current = false;
  }, [enterAlert, exitAlert, onAlertStateChange]);

  return (
    <Stack gap="20px">
      <InputBox>
        <InputBox.Head>
          <InputBox.Title>
            Group ID<i>*</i>
          </InputBox.Title>
          <InputBox.Info tooltipText="tooptip example" />
        </InputBox.Head>
        <InputBox.Body>
          <Select
            value={groupId || ""}
            sx={{ width: "100%" }}
            onChange={(e) => onChangeGroupId(Number(e.target.value))}
          >
            {Array.from({ length: max }, (_, i) => i + 1)
              .filter((id) => !excludeGroupId.includes(id))
              .map((id) => (
                <MenuItem key={id} value={id}>
                  {id}
                </MenuItem>
              ))}
          </Select>
        </InputBox.Body>
      </InputBox>
      {id !== undefined && (
        <>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Latitude<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
            </InputBox.Head>
            <InputBox.Body>
              <TextField
                type="number"
                value={lat || ""}
                onChange={(e) =>
                  updateCircleCenter(id, Number(e.target.value), long)
                }
                sx={{ width: "100%" }}
              />
            </InputBox.Body>
          </InputBox>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Longitude<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
            </InputBox.Head>
            <InputBox.Body>
              <TextField
                type="number"
                value={long || ""}
                onChange={(e) =>
                  updateCircleCenter(id, lat, Number(e.target.value))
                }
                sx={{ width: "100%" }}
              />
            </InputBox.Body>
          </InputBox>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Radius<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
            </InputBox.Head>
            <InputBox.Body>
              <TextField
                type="number"
                value={radius || ""}
                onChange={(e) => updateCircleRadius(id, Number(e.target.value))}
                sx={{ width: "100%" }}
              />
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>Enter Alert</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
            </InputBox.Head>
            <InputBox.Body>
              <SwitchPrimary
                checked={enterAlert}
                onChange={(e) => setEnterAlert(e.target.checked)}
              />
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>Exit Alert</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
            </InputBox.Head>
            <InputBox.Body>
              <SwitchPrimary
                checked={exitAlert}
                onChange={(e) => setExitAlert(e.target.checked)}
              />
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>Output Active</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
            </InputBox.Head>
            <InputBox.Body>
              <Select value={"select-1"} sx={{ width: "100%" }}>
                <MenuItem value={"select-1"}>Select</MenuItem>
              </Select>
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>Output Keep Active</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
            </InputBox.Head>
            <InputBox.Body>
              <SwitchPrimary />
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>Output Active Delay</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
            </InputBox.Head>
            <InputBox.Body>
              <TextField
                type="number"
                fullWidth
                placeholder="0"
                inputProps={{ min: 0, max: 3600 }}
                helperText="Input only between 0 ~ 3,600"
              />
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>Buzzer Speed Limit</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
            </InputBox.Head>
            <InputBox.Body>
              <TextField
                type="number"
                fullWidth
                placeholder="0"
                inputProps={{ min: 0, max: 3600 }}
                helperText="Input only between 0 ~ 3,600"
              />
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>Anti Jamming</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
            </InputBox.Head>
            <InputBox.Body>
              <SwitchPrimary />
            </InputBox.Body>
          </InputBox>
        </>
      )}
    </Stack>
  );
};

export default CircularType;

// Output 1, Output 2, Output 3, Output 4, All Outputs
