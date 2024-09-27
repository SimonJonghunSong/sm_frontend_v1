import { Box, Button, Pagination, PaginationItem, Stack } from "@mui/material";
import {
  DataGrid,
  GridCallbackDetails,
  GridColDef,
  GridEventListener,
  GridFooter,
  GridFooterContainer,
  gridPageCountSelector,
  gridPageSelector,
  GridRowSelectionModel,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import React from "react";

type DataTableProps = {
  onRowClick?: GridEventListener<"rowClick">;
  disableResize?: boolean;
  disableRowClick?: boolean;
  disablePagination?: boolean;
  checkbox?: boolean;
  rows: any;
  columns: GridColDef[];
  rowHeight?: number;
  footerButton?: React.ReactNode;
  noDataMessage?: string;
  onRowSelectionModelChange?: (
    rowSelectionModel: GridRowSelectionModel,
    details: GridCallbackDetails
  ) => void;
};
export default function DataTable({
  disableResize = false,
  disableRowClick = true,
  disablePagination = false,
  checkbox = true,
  rows,
  columns,
  rowHeight,
  footerButton,
  noDataMessage = "No Data",
  onRowClick = () => {},
  onRowSelectionModelChange = () => {},
}: DataTableProps) {
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "1fr" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection={checkbox}
        disableColumnMenu
        disableColumnResize={disableResize}
        disableRowSelectionOnClick={!checkbox || disableRowClick}
        rowHeight={rowHeight}
        autoHeight
        disableColumnSorting
        hideFooterSelectedRowCount
        hideFooterPagination={disablePagination}
        hideFooter={disablePagination && !footerButton}
        onRowClick={onRowClick}
        onRowSelectionModelChange={onRowSelectionModelChange}
        slots={{
          pagination: CustomPagination,
          footer: () => CustomFooter(footerButton),
          noRowsOverlay: () => (
            <Stack
              height="100%"
              alignItems="center"
              justifyContent="center"
              color="var(--grey5)"
            >
              {noDataMessage}
            </Stack>
          ),
          noResultsOverlay: () => (
            <Stack
              height="100%"
              alignItems="center"
              justifyContent="center"
              color="var(--grey5)"
            >
              {noDataMessage}
            </Stack>
          ),
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10, //TODO: 필요 시 수정
            },
          },
        }}
        sx={{
          "&.MuiDataGrid-root": {
            border: "none",
            "--unstable_DataGrid-radius": "0px !important",
          },
          "&.MuiDataGrid-root .MuiDataGrid-columnHeaderCheckbox:focus-within": {
            outline: "none !important",
          },
          "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
            outline: "none !important",
          },
          "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus,": {
            outline: "none !important",
          },
          "&.MuiDataGrid-root .MuiDataGrid-footerContainer": {
            justifyContent: "center",
          },
          "&.MuiDataGrid-root .MuiCheckbox-root svg": {
            width: 24,
            height: 24,
          },
        }}
      />
    </Box>
  );
}

function CustomFooter(footerButton: React.ReactNode) {
  return (
    <GridFooterContainer>
      <Stack direction="column" width="100%">
        <Stack
          direction="row"
          justifyContent="flex-start"
          width="100%"
          mt="12px"
        >
          {footerButton}
        </Stack>
        <Stack width="100%" mt="24px">
          <GridFooter
            sx={{
              border: "none",
            }}
          />
        </Stack>
      </Stack>
    </GridFooterContainer>
  );
}

export function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      variant="outlined"
      shape="rounded"
      page={page + 1}
      count={pageCount}
      renderItem={(props2) => (
        // @ts-expect-error
        <PaginationItem
          {...props2}
          disableRipple
          sx={{ minWidth: 21, width: 21, height: 21, padding: 0, fontSize: 12 }}
        />
      )}
      onChange={(event: React.ChangeEvent<unknown>, value: number) =>
        apiRef.current.setPage(value - 1)
      }
    />
  );
}
