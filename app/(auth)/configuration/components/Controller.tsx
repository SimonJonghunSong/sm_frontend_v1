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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import Modal from "../../../../components/Modal";
import useModal from "../../../../utils/useModal";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../../../components/dataTable";
import useSerial, { delayPromise } from "../../../../src/hooks/useSerial";
import useSerialStore from "../../../../src/stores/useSerialStore";
import {
  AT_GET_CSV,
  AT_GET_JSON,
} from "../../../../src/hooks/useSerial/constant";

const DELAY_MS = 100;

export default function Controller() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [modelName, setModelName] = useState<string>(searchParams.get("imei"));
  const [path, setPath] = useState<File>();
  const [showSaveChanges, setShowSaveChanges] = useState<boolean>(false);
  const [showUploadChanges, setShowUploadChanges] = useState<boolean>(false);

  const {
    state: { portList },
    func: { close, write },
  } = useSerial();
  const { setPackageFetchingStart } = useSerialStore();

  const currentPort = portList.find(
    ({ port }) => port.imei === searchParams.get("imei")
  );

  const [applyModal, applyModalToggle] = useModal();
  const [saveModal, saveModalToggle] = useModal();
  const [loadModal, loadModalToggle] = useModal();
  const [uploadModal, uploadModalToggle] = useModal();

  const handleChange = (event: SelectChangeEvent) => {
    setModelName(event.target.value);
    router.push(`/configuration?imei=${event.target.value}`);
  };
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
  const handleClosePort = () => {
    close({
      port: currentPort.port,
      writableStreamClosed: currentPort.writableStreamClosed,
      readableStreamClosed: currentPort.readableStreamClosed,
      reader: currentPort.reader,
      writer: currentPort.writer,
    });
  };
  const handleRefreshJsonPacket = async () => {
    currentPort.port.grpNo = currentPort.jsonPackageCount;
    setPackageFetchingStart({ imei: currentPort.port.imei });

    const commands = Array.from(
      { length: currentPort.jsonPackageCount },
      (_, i) => `${AT_GET_JSON}${i + 1}`
    );

    for (const command of commands) {
      await delayPromise(DELAY_MS); // 200ms 지연

      write({
        data: command,
        port: currentPort.port,
        writer: currentPort.writer,
        callback: () => {
          toast("done", {
            position: "bottom-center",
          });
        },
      });
    }
  };

  const handleCsvDownload = () => {
    write({
      data: AT_GET_CSV,
      port: currentPort.port,
      writer: currentPort.writer,
    });
  };

  const toggleSaveChanges = () => {
    setShowSaveChanges(!showSaveChanges);
  };

  const toggleUploadChanges = () => {
    setShowUploadChanges(!showUploadChanges);
  };

  const handlePathChange = (e) => {
    setPath(e.target.files[0]);
  };

  useEffect(() => {
    console.log("i am a perfect");
  }, []);

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
          onClick={() => {
            toast("dododndohd");
          }}
        >
          Profile
        </span>
        <Tooltip
          title="Apply to device"
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
            sx={{ width: 80 }}
            onClick={handleApply}
          >
            Apply
          </Button>
        </Tooltip>
        <Button
          variant="contained"
          color="secondary"
          sx={{ width: 80 }}
          onClick={handleSave}
        >
          Save
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{ width: 80 }}
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
            sx={{ width: 80 }}
            onClick={handleUpload}
          >
            Upload
          </Button>
        </Tooltip>
        <IconButton onClick={handleCsvDownload}>
          <FileDownloadOutlinedIcon sx={{ color: "var(--black)" }} />
        </IconButton>
      </Stack>

      <Stack direction="row" gap="8px" alignItems="center">
        <IconButton onClick={handleRefreshJsonPacket}>
          <RefreshOutlinedIcon sx={{ color: "var(--black)" }} />
        </IconButton>
        <Select value={modelName} onChange={handleChange} sx={{ width: 168 }}>
          {portList.map(({ modelVersion, imei }, idx) => {
            return (
              <MenuItem key={idx.toString()} value={imei}>
                {modelVersion?.split("_")[0]}
              </MenuItem>
            );
          })}
        </Select>
        <Button
          variant="outlined"
          color="secondary"
          disabled={!currentPort.port.readable && !currentPort.port.writable}
          onClick={handleClosePort}
        >
          Disconnect
        </Button>
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
          <span style={{ color: "var(--primary)" }}>
            {currentPort.modelVersion}
          </span>
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
