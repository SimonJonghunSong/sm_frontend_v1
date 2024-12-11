import React, { useEffect, useRef, useState } from "react";
import { GridApiCommunity } from "@mui/x-data-grid/internals";
import { Box, Pagination, PaginationItem, Stack } from "@mui/material";
import {
  DataGrid,
  GridCallbackDetails,
  GridColDef,
  GridEventListener,
  GridFooter,
  GridFooterContainer,
  GridRowClassNameParams,
  GridRowSelectionModel,
} from "@mui/x-data-grid";

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
  getRowClassName?: (params: GridRowClassNameParams) => string;
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
  getRowClassName,
}: DataTableProps) {
  const apiRef = useRef<GridApiCommunity>();
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (rows.length <= page * 10 && rows.length > 0) {
      setPage((prev) => prev - 1);
    }
  }, [rows.length, page, setPage]);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr",
        flex: 1,
        minHeight: "697.5px",
      }}
    >
      <DataGrid
        apiRef={apiRef}
        rows={rows.slice(page * 10, (page + 1) * 10)}
        columns={columns}
        checkboxSelection={checkbox}
        disableColumnMenu
        disableColumnResize={disableResize}
        disableRowSelectionOnClick={!checkbox || disableRowClick}
        getRowClassName={getRowClassName}
        rowHeight={rowHeight}
        autoHeight
        disableColumnSorting
        hideFooterSelectedRowCount
        hideFooterPagination={disablePagination}
        hideFooter={disablePagination && !footerButton}
        onRowClick={onRowClick}
        onRowSelectionModelChange={onRowSelectionModelChange}
        slots={{
          pagination: () => (
            <CustomPagination
              page={page}
              setPage={setPage}
              pageCount={Math.ceil(rows?.length / 10) || 0}
            />
          ),
          footer: () => CustomFooter(footerButton),
          noRowsOverlay: () => (
            <Stack
              height="100%"
              alignItems="center"
              justifyContent="center"
              color="var(--grey5)"
              py={10}
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

export function CustomPagination({ page, setPage, pageCount }) {
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
        setPage(value - 1)
      }
    />
  );
}
