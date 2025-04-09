"use client";

import { Stack, Select, MenuItem, IconButton } from "@mui/material";
import InputBox from "@/components/inputbox/InputBox";
import DataTable from "@/components/dataTable";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import type { PolygonData } from "@/src/hooks/useMapManager";

interface PolygonTypeProps {
  polygon?: PolygonData;
  removePolygonPoint?: (polygon: PolygonData, index: number) => void;
  max: number;
  excludeGroupId?: number[];
  groupId?: number;
  onChangeGroupId: (id: number) => void;
}

const PolygonType = ({
  polygon,
  removePolygonPoint,
  max,
  excludeGroupId = [],
  groupId,
  onChangeGroupId,
}: PolygonTypeProps) => {
  return (
    <Stack gap="20px">
      <InputBox>
        <InputBox.Head>
          <InputBox.Title>
            Group ID<i>*</i>
          </InputBox.Title>
          <InputBox.Info tooltipText="tooptip example" />
          <InputBox.Number>50/60</InputBox.Number>
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
    </Stack>
  );
};

export default PolygonType;
