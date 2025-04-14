import React from "react";
import {
  Stack,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import Maps from "@/components/Map";
import DataTable from "@/components/dataTable";
import { ListViewProps } from "../types";
import { GridColDef } from "@mui/x-data-grid";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

/**
 * 지오펜스 테이블 컬럼 정의
 */
const columns: GridColDef[] = [
  {
    field: "no",
    headerName: "No",
    width: 60,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "type",
    headerName: "Type",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "groupId",
    headerName: "Group",
    width: 70,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "edit",
    headerName: "Edit",
    width: 60,
    headerAlign: "center",
    align: "center",
    renderCell: (e) => (
      <IconButton
        onClick={(event) => {
          event.stopPropagation();
          e.value.onEdit();
        }}
      >
        <EditOutlinedIcon />
      </IconButton>
    ),
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
];

/**
 * 리스트 뷰 컴포넌트
 * 지오펜스 목록과 지도를 표시하는 화면
 */
const GeofenceList: React.FC<ListViewProps> = ({
  onAdd,
  onRowClick,
  typeFilter,
  setTypeFilter,
  rows,
  mapRef,
  fetchedPolygonData,
  fetchedCircleData,
  mapManager,
}) => {
  // 지오펜스 타입 선택 핸들러
  const handleSelectChange = (
    e: SelectChangeEvent,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setState(e.target.value);
  };

  return (
    <Stack direction="row" gap="40px" mb="40px">
      <Stack
        gap="20px"
        sx={{ width: "50%", height: "500px", overflowY: "scroll" }}
      >
        <Stack
          direction="row"
          gap="8px"
          justifyContent="space-between"
          mb="16px"
        >
          <Select
            value={typeFilter}
            onChange={(e) => handleSelectChange(e, setTypeFilter)}
            sx={{ minWidth: 160 }}
          >
            <MenuItem value={"All"}>All</MenuItem>
            <MenuItem value={"Polygon"}>Polygon</MenuItem>
            <MenuItem value={"Circular"}>Circular</MenuItem>
          </Select>

          <Button variant="contained" color="secondary" onClick={onAdd}>
            Add
          </Button>
        </Stack>
        <DataTable
          noDataMessage="No registered geofence"
          disablePagination={false}
          onRowClick={onRowClick}
          disableRowClick={false}
          rows={rows}
          columns={columns}
          footerButton={
            <Button variant="text" color="info">
              Delete
            </Button>
          }
        />
      </Stack>

      <Stack gap="20px" sx={{ width: "50%", height: "500px" }}>
        <Box flex={1}>
          <Maps
            ref={mapRef}
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
            zoom={13}
            drawingModes={[] as google.maps.drawing.OverlayType[]}
            onOverlayComplete={mapManager.completeOverlay}
            polygons={fetchedPolygonData ? [fetchedPolygonData] : undefined}
            circles={fetchedCircleData ? [fetchedCircleData] : undefined}
          />
        </Box>
      </Stack>
    </Stack>
  );
};

export default GeofenceList;
