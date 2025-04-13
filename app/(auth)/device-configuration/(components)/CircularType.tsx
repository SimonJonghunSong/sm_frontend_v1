"use client";

import { Stack, Select, MenuItem, TextField } from "@mui/material";
import InputBox from "@/components/inputbox/InputBox";
import { SwitchPrimary } from "@/components/switches";
import React from "react";

interface CircularTypeProps {
  id?: number;
  updateCircleRadius?: (circleId: number, newRadius: number) => void;
  updateCircleCenter?: (
    circleId: number,
    newLat: number,
    newLng: number
  ) => void;
  lat?: number;
  long?: number;
  radius?: number;
  max: number;
  excludeGroupId?: number[];
  groupId?: number;
  onChangeGroupId: (id: number) => void;
  onAlertStateChange?: (enterAlert: boolean, exitAlert: boolean) => void;
  initialEnterAlert?: boolean;
  initialExitAlert?: boolean;
  showOutputActive?: boolean;
  showBuzzerSpeedLimit?: boolean;
  outputActiveValue?: string;
  onOutputActiveValueChange?: (value: string) => void;
  outputKeepActive?: boolean;
  onOutputKeepActiveChange?: (value: boolean) => void;
  outputActiveDelay?: number;
  onOutputActiveDelayChange?: (value: number) => void;
  buzzerSpeedLimit?: number;
  onBuzzerSpeedLimitChange?: (value: number) => void;
}

const CircularType = ({
  id,
  updateCircleRadius,
  updateCircleCenter,
  lat,
  long,
  radius,
  max,
  excludeGroupId = [],
  groupId,
  onChangeGroupId,
  onAlertStateChange,
  initialEnterAlert = false,
  initialExitAlert = false,
  showOutputActive = false,
  showBuzzerSpeedLimit = false,
  outputActiveValue = "00",
  onOutputActiveValueChange = () => {},
  outputKeepActive = false,
  onOutputKeepActiveChange = () => {},
  outputActiveDelay = 0,
  onOutputActiveDelayChange = () => {},
  buzzerSpeedLimit = 0,
  onBuzzerSpeedLimitChange = () => {},
}: CircularTypeProps) => {
  const [enterAlert, setEnterAlert] = React.useState(initialEnterAlert);
  const [exitAlert, setExitAlert] = React.useState(initialExitAlert);
  const isUpdatingFromProps = React.useRef(false);
  console.log(showOutputActive, showBuzzerSpeedLimit);

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

          {showOutputActive && (
            <>
              <InputBox>
                <InputBox.Head>
                  <InputBox.Title>Output Active</InputBox.Title>
                  <InputBox.Info tooltipText="Output Active 설정" />
                </InputBox.Head>
                <InputBox.Body>
                  <Select
                    value={outputActiveValue}
                    sx={{ width: "100%" }}
                    onChange={(e) => onOutputActiveValueChange(e.target.value)}
                  >
                    <MenuItem value="00">None</MenuItem>
                    <MenuItem value="01">Output1 Active</MenuItem>
                    <MenuItem value="02">Output2 Active</MenuItem>
                    <MenuItem value="03">Output3 Active</MenuItem>
                    <MenuItem value="04">Output4 Active</MenuItem>
                    <MenuItem value="05">Output All Active</MenuItem>
                    <MenuItem value="06">Output1 Keep Active</MenuItem>
                    <MenuItem value="07">Output2 Keep Active</MenuItem>
                    <MenuItem value="08">Output3 Keep Active</MenuItem>
                    <MenuItem value="09">Output4 Keep Active</MenuItem>
                    <MenuItem value="0A">Output All Keep Active</MenuItem>
                  </Select>
                </InputBox.Body>
              </InputBox>

              <InputBox>
                <InputBox.Head>
                  <InputBox.Title>Output Keep Active</InputBox.Title>
                  <InputBox.Info tooltipText="Output Keep Active 설정" />
                </InputBox.Head>
                <InputBox.Body>
                  <SwitchPrimary
                    checked={outputKeepActive}
                    onChange={(e) => onOutputKeepActiveChange(e.target.checked)}
                  />
                </InputBox.Body>
              </InputBox>

              <InputBox>
                <InputBox.Head>
                  <InputBox.Title>Output Active Delay</InputBox.Title>
                  <InputBox.Info tooltipText="지연 시간 설정 (0~3600초)" />
                </InputBox.Head>
                <InputBox.Body>
                  <TextField
                    type="number"
                    fullWidth
                    value={outputActiveDelay}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      // 범위 내 값만 허용
                      if (value >= 0 && value <= 3600) {
                        onOutputActiveDelayChange(value);
                      }
                    }}
                    placeholder="0"
                    inputProps={{ min: 0, max: 3600 }}
                    helperText="Input only between 0 ~ 3,600"
                  />
                </InputBox.Body>
              </InputBox>
            </>
          )}

          {showBuzzerSpeedLimit && (
            <InputBox>
              <InputBox.Head>
                <InputBox.Title>Buzzer Speed Limit</InputBox.Title>
                <InputBox.Info tooltipText="속도 제한 설정 (0~3600, 0은 비활성화)" />
              </InputBox.Head>
              <InputBox.Body>
                <TextField
                  type="number"
                  fullWidth
                  value={buzzerSpeedLimit}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    // 범위 내 값만 허용
                    if (value >= 0 && value <= 3600) {
                      onBuzzerSpeedLimitChange(value);
                    }
                  }}
                  placeholder="0"
                  inputProps={{ min: 0, max: 3600 }}
                  helperText="Input only between 0 ~ 3,600 (0 to disable)"
                />
              </InputBox.Body>
            </InputBox>
          )}

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
