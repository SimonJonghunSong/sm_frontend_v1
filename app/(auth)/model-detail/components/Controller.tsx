import {
  Button,
  IconButton,
  MenuItem,
  Radio,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import Modal from "../../../../components/Modal";
import useModal from "../../../../utils/useModal";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../../../components/dataTable";

export default function Controller() {
  const [modelName, setModelName] = useState<string>("model-1");

  const handleChange = (event: SelectChangeEvent) => {
    setModelName(event.target.value);
  };

  const [applyModal, applyModalToggle] = useModal();
  const [saveModal, saveModalToggle] = useModal();
  const [loadModal, loadModalToggle] = useModal();
  const [uploadModal, uploadModalToggle] = useModal();

  const handleApply = () => {
    applyModalToggle();
  };
  const handleSave = () => {
    saveModalToggle();
  };
  const handleLoad = () => {
    loadModalToggle();
  };
  const handleUpload = () => {
    uploadModalToggle();
  };

  const [showSaveChanges, setShowSaveChanges] = useState<boolean>(false);
  const toggleSaveChanges = () => {
    setShowSaveChanges(!showSaveChanges);
  };

  const [showUploadChanges, setShowUploadChanges] = useState<boolean>(false);
  const toggleUploadChanges = () => {
    setShowUploadChanges(!showUploadChanges);
  };

  const [path, setPath] = useState<File>();
  const handlePathChange = (e) => {
    setPath(e.target.files[0]);
  };
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      mb="24px"
      pb="24px"
      borderBottom="1px solid var(--grey4)"
    >
      <Stack
        direction="row"
        gap="8px"
        alignItems="center"
        sx={{
          backgroundColor: "var(--grey2)",
          width: "min-content",
          padding: "12px 24px",
          borderRadius: "8px",
        }}
      >
        <span
          style={{
            fontSize: "18px",
            fontWeight: 700,
            marginRight: 16,
          }}
        >
          Profile
        </span>
        <Button
          variant="contained"
          color="secondary"
          sx={{ width: 100 }}
          onClick={handleSave}
        >
          Save
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{ width: 100 }}
          onClick={handleLoad}
        >
          Load
        </Button>
        <Tooltip
          title="Scuti Upload"
          placement="top"
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0, -10],
                  },
                },
              ],
            },
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            sx={{ width: 100 }}
            onClick={handleUpload}
          >
            Upload
          </Button>
        </Tooltip>
        <IconButton>
          <FileDownloadOutlinedIcon sx={{ color: "var(--black)" }} />
        </IconButton>
      </Stack>

      {/* Apply Modal */}
      <Modal
        open={applyModal}
        toggleOpen={applyModalToggle}
        title="Confirm"
        confirm={() => {}}
        confirmButtonText="Apply"
        width="360px"
      >
        <Stack>
          <span>Are you sure you want to apply profile to the device?</span>
          <span style={{ color: "var(--primary)" }}>ST8300(275676-8)</span>
        </Stack>
      </Modal>

      {/* Save Modal */}
      <Modal
        open={saveModal}
        toggleOpen={saveModalToggle}
        title="Confirm"
        confirm={() => {}}
        confirmButtonText="Yes"
        width="360px"
      >
        <Stack>
          <span>Are you sure you want to save profile?</span>
          <Stack direction="row" gap="8px" mt={1}>
            <TextField
              fullWidth
              value={path?.name || ""}
              inputProps={{ readOnly: true }}
            />
            <Button variant="outlined" color="secondary" component="label">
              <input
                style={{ display: "none" }}
                type="file"
                hidden
                onChange={handlePathChange}
              />
              Path
            </Button>
          </Stack>
          <Button sx={{ width: "fit-content" }} onClick={toggleSaveChanges}>
            Show Changes
          </Button>
          {showSaveChanges && (
            <TextField
              value={"Show Changed Value..."}
              multiline
              rows={1}
              inputProps={{ readOnly: true }}
              sx={{
                mt: 2,
                flexGrow: 1,
                height: "160px",
                "& .MuiInputBase-root": {
                  padding: "10px 12px",
                  height: "100% !important",
                },
                "& textarea": {
                  height: "100% !important",
                },
              }}
            />
          )}
        </Stack>
      </Modal>

      {/* Load Modal */}
      <Modal
        closeButton
        open={loadModal}
        toggleOpen={loadModalToggle}
        title="Load Profile"
        width="720px"
      >
        <LoadModal />
      </Modal>

      {/* Upload Modal */}
      <Modal
        open={uploadModal}
        toggleOpen={uploadModalToggle}
        title="Confirm"
        confirm={() => {}}
        confirmButtonText="Save"
        width="360px"
      >
        <Stack>
          <span>Are you sure you want to upload profile to Scuti?</span>
          <Button sx={{ width: "fit-content" }} onClick={toggleUploadChanges}>
            Show Changes
          </Button>
          {showUploadChanges && (
            <TextField
              value={"Show Changed Value..."}
              multiline
              rows={1}
              inputProps={{ readOnly: true }}
              sx={{
                mt: 2,
                flexGrow: 1,
                height: "160px",
                "& .MuiInputBase-root": {
                  padding: "10px 12px",
                  height: "100% !important",
                },
                "& textarea": {
                  height: "100% !important",
                },
              }}
            />
          )}
        </Stack>
      </Modal>
    </Stack>
  );
}

function LoadModal() {
  const [selectedValue, setSelectedValue] = React.useState("a");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const columns: GridColDef[] = [
    {
      field: "col0",
      headerName: "",
      width: 80,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Radio
          checked={selectedValue === params.value.id}
          onChange={handleChange}
          value={params.value.id}
          name="radio-buttons"
        />
      ),
    },
    {
      field: "col1",
      headerName: "Country",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "col2",
      headerName: "Region",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "col3",
      headerName: "ServerIP",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "col4",
      headerName: "Port",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "col6",
      headerName: "Delete",
      width: 80,
      headerAlign: "center",
      align: "center",
      renderCell: () => (
        <IconButton onClick={(e) => e.stopPropagation()}>
          <DeleteForeverOutlinedIcon />
        </IconButton>
      ),
    },
  ];

  const rows = [
    {
      id: 0,
      col0: { id: "1" },
      col1: "USA",
      col2: "LA",
      col3: "231.232.22.34",
      col4: "3000",
      col6: { id: "1" },
    },
    {
      id: 1,
      col0: { id: "2" },
      col1: "USA",
      col2: "LA",
      col3: "231.232.22.34",
      col4: "3000",
      col6: { id: "2" },
    },
    {
      id: 2,
      col0: { id: "3" },
      col1: "USA",
      col2: "LA",
      col3: "231.232.22.34",
      col4: "3000",
      col6: { id: "3" },
    },
    {
      id: 3,
      col0: { id: "4" },
      col1: "USA",
      col2: "LA",
      col3: "231.232.22.34",
      col4: "3000",
      col6: { id: "4" },
    },
    {
      id: 4,
      col0: { id: "5" },
      col1: "USA",
      col2: "LA",
      col3: "231.232.22.34",
      col4: "3000",
      col6: { id: "5" },
    },
    {
      id: 5,
      col0: { id: "6" },
      col1: "USA",
      col2: "LA",
      col3: "231.232.22.34",
      col4: "3000",
      col6: { id: "6" },
    },
    {
      id: 6,
      col0: { id: "7" },
      col1: "USA",
      col2: "LA",
      col3: "231.232.22.34",
      col4: "3000",
      col6: { id: "7" },
    },
    {
      id: 7,
      col0: { id: "8" },
      col1: "USA",
      col2: "LA",
      col3: "231.232.22.34",
      col4: "3000",
      col6: { id: "8" },
    },
  ];

  return (
    <Stack gap="24px">
      <Stack gap="8px" direction="row" justifyContent="flex-end">
        <Button variant="outlined" color="secondary" sx={{ width: 210 }}>
          Load from PC
        </Button>
        <Button variant="outlined" color="secondary" sx={{ width: 210 }}>
          Load from Scuti
        </Button>
      </Stack>

      <DataTable
        rows={rows}
        columns={columns}
        checkbox={false}
        disablePagination
      />

      <Stack gap="8px" alignItems="flex-end">
        <Button variant="contained" color="secondary" sx={{ width: 210 }}>
          Load
        </Button>
      </Stack>
    </Stack>
  );
}
