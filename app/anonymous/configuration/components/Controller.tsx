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
import React, { useEffect, useState } from "react";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import Modal from "@/components/Modal";
import useModal from "@/utils/useModal";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "@/components/dataTable";
import useSerial, { delayPromise } from "@/src/hooks/useSerial";
import useSerialStore from "@/src/stores/useSerialStore";
import { AT_GET_JSON } from "@/src/hooks/useSerial/constant";
import useProfile from "@/src/hooks/useProfile";
import FullLoading from "@/components/FullLoading";
import useSerialConfigurationStore from "@/src/stores/useSerialConfigurationStore";
import { useTranslations } from "next-intl";

const DELAY_MS = 100;

export default function Controller() {
  const { getCurrentImei, setImei, resetTab } = useSerialConfigurationStore();
  const imei = getCurrentImei();
  const t = useTranslations();
  const [modelName, setModelName] = useState<string>(imei);
  const [path, setPath] = useState<File>();
  const [showSaveChanges, setShowSaveChanges] = useState<boolean>(false);
  const [showUploadChanges, setShowUploadChanges] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [packageCount, setPackageCount] = useState(0);

  const {
    state: { portList },
    func: { close, write },
  } = useSerial();
  const { setPackageFetchingStart } = useSerialStore();
  const currentPort = portList.find(({ port }) => port.imei === imei);

  const {
    state: { isDownloading, percentage },
    func: { getProfileAllData },
  } = useProfile({
    port: currentPort.port,
    writer: currentPort.writer,
    imei,
    writeSerial: write,
  });

  const [applyModal, applyModalToggle] = useModal();
  const [saveModal, saveModalToggle] = useModal();
  const [loadModal, loadModalToggle] = useModal();
  const [uploadModal, uploadModalToggle] = useModal();

  const handleChange = (event: SelectChangeEvent) => {
    setImei(event.target.value);
    resetTab();
    setModelName(event.target.value);
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
    setIsLoading(true);
    currentPort.port.grpNo = currentPort.jsonPackageCount;
    setPackageFetchingStart({ imei: currentPort.port.imei });

    const commands = Array.from(
      { length: currentPort.jsonPackageCount },
      (_, i) => `${AT_GET_JSON}${i + 1}`
    );
    currentPort.port.isjsonpackagefetching = true;
    currentPort.port.onjsonpacketcountup = (count) => {
      setPackageCount((prev) => prev + count);
    };
    for (const command of commands) {
      await delayPromise(DELAY_MS); // 100ms 지연

      write({
        data: command,
        port: currentPort.port,
        writer: currentPort.writer,
      });
    }

    setIsLoading(false);
    setPackageCount(0);
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
    if (
      currentPort.port.writable &&
      currentPort.port.readable &&
      currentPort.shouldRefetchPackage
    ) {
      handleRefreshJsonPacket();
    }
  }, [
    currentPort.port.writable,
    currentPort.port.readable,
    currentPort.shouldRefetchPackage,
  ]);

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      mb="24px"
      pb="24px"
      borderBottom="1px solid var(--grey4)"
    >
      {(isDownloading || isLoading) && (
        <FullLoading
          progress={
            isDownloading
              ? percentage
              : (packageCount / currentPort.jsonPackageCount) * 100
          }
        />
      )}
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
          {t("configuration.profile_menu.profile")}
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
            sx={{ width: 100 }}
            onClick={handleApply}
          >
            {t("configuration.profile_menu.apply")}
          </Button>
        </Tooltip>
        <Button
          variant="contained"
          color="secondary"
          sx={{ width: 100 }}
          onClick={handleSave}
        >
          {t("configuration.profile_menu.save")}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{ width: 100 }}
          onClick={handleLoad}
        >
          {t("configuration.profile_menu.load")}
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
            {t("configuration.profile_menu.upload")}
          </Button>
        </Tooltip>
        <IconButton onClick={getProfileAllData}>
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
                {modelVersion?.split("_")[0]}({imei})
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
          {t("configuration.profile_menu.disconnect")}
        </Button>
      </Stack>

      {/* Apply Modal */}
      <Modal
        open={applyModal}
        toggleOpen={applyModalToggle}
        title="Confirm"
        confirm={() => {}}
        confirmButtonText="Yes"
        width="360px"
      >
        <Stack>
          <span>Are you sure you want to apply profile to the device?</span>
          <span style={{ color: "var(--primary)" }}>
            {currentPort.modelVersion.split("_")[0]} ({currentPort.imei})
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
              {t("popup.configuration.profile_menu.path")}
            </Button>
          </Stack>
          <Button sx={{ width: "fit-content" }} onClick={toggleSaveChanges}>
            {t("popup.configuration.profile_menu.show_changes")}
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
        hasFooter={false}
      >
        <LoadModal />
      </Modal>

      {/* Upload Modal */}
      <Modal
        open={uploadModal}
        toggleOpen={uploadModalToggle}
        title="Confirm"
        confirm={() => {}}
        confirmButtonText="Yes"
        width="360px"
      >
        <Stack>
          <span>Are you sure you want to upload profile to Scuti?</span>
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

const rows = [
  {
    id: 0,
    col0: { id: "1" },
    col1: "ST023",
    col2: "Profile.pofile",
    col3: "2024-12-12",
    col4: "3000",
    col6: { id: "1" },
  },
  {
    id: 1,
    col0: { id: "2" },
    col1: "ST023",
    col2: "Profile.pofile",
    col3: "2024-12-12",
    col4: "3000",
    col6: { id: "2" },
  },
  {
    id: 2,
    col0: { id: "3" },
    col1: "ST023",
    col2: "Profile.pofile",
    col3: "2024-12-12",
    col4: "3000",
    col6: { id: "3" },
  },
  {
    id: 3,
    col0: { id: "4" },
    col1: "ST023",
    col2: "Profile.pofile",
    col3: "2024-12-12",
    col4: "3000",
    col6: { id: "4" },
  },
  {
    id: 4,
    col0: { id: "5" },
    col1: "ST023",
    col2: "Profile.pofile",
    col3: "2024-12-12",
    col4: "3000",
    col6: { id: "5" },
  },
  {
    id: 5,
    col0: { id: "6" },
    col1: "ST023",
    col2: "Profile.pofile",
    col3: "2024-12-12",
    col4: "3000",
    col6: { id: "6" },
  },
  {
    id: 6,
    col0: { id: "7" },
    col1: "ST023",
    col2: "Profile.pofile",
    col3: "2024-12-12",
    col4: "3000",
    col6: { id: "7" },
  },
  {
    id: 7,
    col0: { id: "8" },
    col1: "ST023",
    col2: "Profile.pofile",
    col3: "2024-12-12",
    col4: "3000",
    col6: { id: "8" },
  },
];

function LoadModal() {
  const [selectedValue, setSelectedValue] = React.useState<string>();

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
      headerName: "Model Name",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "col2",
      headerName: "File Name",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "col3",
      headerName: "Date",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    // {
    //   field: "col4",
    //   headerName: "Port",
    //   flex: 1,
    //   headerAlign: "center",
    //   align: "center",
    // },

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
        minHeight={"auto"}
      />

      <Stack gap="8px" alignItems="flex-end">
        <Button
          variant="contained"
          color="secondary"
          sx={{ width: 210 }}
          disabled={!selectedValue}
        >
          Load
        </Button>
      </Stack>
    </Stack>
  );
}
