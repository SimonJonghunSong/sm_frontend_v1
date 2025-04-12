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
}: PolygonTypeProps) => {
  const [enterAlert, setEnterAlert] = React.useState(initialEnterAlert);
  const [exitAlert, setExitAlert] = React.useState(initialExitAlert);

  React.useEffect(() => {
    onAlertStateChange?.(enterAlert, exitAlert);
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
    </Stack>
  );
};

export default PolygonType;
