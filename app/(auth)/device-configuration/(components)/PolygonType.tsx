"use client";

import { Stack, Select, MenuItem, IconButton, TextField } from "@mui/material";
import InputBox from "@/components/inputbox/InputBox";
import DataTable from "@/components/dataTable";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import type { PolygonData } from "@/src/hooks/useMapManager";
import React from "react";
import { SwitchPrimary } from "@/components/switches";

interface PolygonTypeProps {
  polygon?: PolygonData;
  removePolygonPoint?: (polygon: PolygonData, index: number) => void;
  max: number;
  excludeGroupId?: number[];
  groupId?: number;
  onChangeGroupId: (id: number) => void;
  onAlertStateChange?: (enterAlert: boolean, exitAlert: boolean) => void;
  initialEnterAlert?: boolean;
  initialExitAlert?: boolean;
  showSpeedLimit?: boolean;
  onBuzzerSpeedLimitChange?: (value: string) => void;
  initialBuzzerSpeedLimit?: string;
}

const PolygonType = ({
  polygon,
  removePolygonPoint,
  max,
  excludeGroupId = [],
  groupId,
  onChangeGroupId,
  onAlertStateChange,
  initialEnterAlert = false,
  initialExitAlert = false,
  showSpeedLimit = false,
  onBuzzerSpeedLimitChange,
  initialBuzzerSpeedLimit = "",
}: PolygonTypeProps) => {
  // 이전 값 추적을 위한 ref
  const prevEnterAlertRef = React.useRef(initialEnterAlert);
  const prevExitAlertRef = React.useRef(initialExitAlert);

  const [enterAlert, setEnterAlert] = React.useState(initialEnterAlert);
  const [exitAlert, setExitAlert] = React.useState(initialExitAlert);

  const [buzzerSpeedLimit, setBuzzerSpeedLimit] = React.useState(
    initialBuzzerSpeedLimit
  );

  // 내부 상태가 변경될 때만 콜백 호출
  React.useEffect(() => {
    // 내부적으로 변경된 경우에만 콜백 호출 (prop에서 업데이트된 경우는 제외)
    if (
      enterAlert !== prevEnterAlertRef.current ||
      exitAlert !== prevExitAlertRef.current
    ) {
      onAlertStateChange?.(enterAlert, exitAlert);
    }

    // ref 업데이트
    prevEnterAlertRef.current = enterAlert;
    prevExitAlertRef.current = exitAlert;
  }, [enterAlert, exitAlert, onAlertStateChange]);

  // initialEnterAlert와 initialExitAlert가 변경될 때만 상태 업데이트 (처음 마운트 또는 props 변경 시)
  React.useEffect(() => {
    // props가 변경되었고 현재 상태와 다른 경우에만 상태 업데이트
    if (initialEnterAlert !== enterAlert) {
      setEnterAlert(initialEnterAlert);
      prevEnterAlertRef.current = initialEnterAlert;
    }

    if (initialExitAlert !== exitAlert) {
      setExitAlert(initialExitAlert);
      prevExitAlertRef.current = initialExitAlert;
    }
  }, [initialEnterAlert, initialExitAlert]);

  // buzzerSpeedLimit 상태가 변경될 때 부모에게 알림
  React.useEffect(() => {
    if (
      onBuzzerSpeedLimitChange &&
      buzzerSpeedLimit !== initialBuzzerSpeedLimit
    ) {
      onBuzzerSpeedLimitChange(buzzerSpeedLimit);
    }
  }, [buzzerSpeedLimit, initialBuzzerSpeedLimit, onBuzzerSpeedLimitChange]);

  // 초기값이 변경되면 상태 업데이트
  React.useEffect(() => {
    if (initialBuzzerSpeedLimit !== buzzerSpeedLimit) {
      setBuzzerSpeedLimit(initialBuzzerSpeedLimit);
    }
  }, [initialBuzzerSpeedLimit]);

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
      {polygon && (
        <DataTable
          rows={polygon.path.map((point, index) => ({
            id: index,
            no: index + 1,
            lat: point.lat,
            lng: point.lng,
            delete: {
              onDelete: () => removePolygonPoint(polygon, index),
            },
          }))}
          columns={[
            {
              field: "no",
              headerName: "No",
              width: 60,
              headerAlign: "center",
              align: "center",
            },
            {
              field: "lat",
              headerName: "Latitude",
              flex: 1,
              headerAlign: "center",
              align: "center",
            },
            {
              field: "lng",
              headerName: "Longitude",
              flex: 1,
              headerAlign: "center",
              align: "center",
            },
            {
              field: "delete",
              headerName: "Delete",
              width: 80,
              headerAlign: "center",
              align: "center",
              renderCell: (e) => (
                <IconButton
                  onClick={(event) => {
                    event.stopPropagation();
                    e.value.onDelete();
                  }}
                >
                  <DeleteForeverOutlinedIcon />
                </IconButton>
              ),
            },
          ]}
        />
      )}

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

      {showSpeedLimit && (
        <>
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
                value={buzzerSpeedLimit}
                onChange={(e) => setBuzzerSpeedLimit(e.target.value)}
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

export default PolygonType;
