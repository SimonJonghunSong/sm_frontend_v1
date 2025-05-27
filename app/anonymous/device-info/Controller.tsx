import {
  Button,
  IconButton,
  Radio,
  Stack,
  Chip,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import React, { useRef, useState } from "react";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import { GridColDef } from "@mui/x-data-grid";
import useModal from "@/utils/useModal";
import Modal from "@/components/Modal";
import DataTable from "@/components/dataTable";
import { useMutation } from "@tanstack/react-query";
import {
  deleteProfile,
  downloadProfile,
  uploadProfile,
} from "@/src/api/services/profile";
import { useTranslations } from "next-intl";
import dayjs from "dayjs";
import useSerial from "@/src/hooks/useSerial";
import useSerialConfigurationStore from "@/src/stores/useSerialConfigurationStore";
import { useRouter } from "next/navigation";
import useModelInfoStore from "@/src/stores/useModelInfo";
import useProfile from "@/src/hooks/useProfile";
import FullLoading from "@/components/FullLoading";
import useErrorDialog from "@/src/hooks/useErrorDialog";

interface ModelInfoControllerProps {
  onRefreshJsonPacket: () => void;
  onLoadProfile: (profile: string) => void;
  onApply: () => void;
  onModelChange: () => void;
}

export default function ModelInfoController({
  onRefreshJsonPacket,
  onLoadProfile,
  onApply,
  onModelChange,
}: ModelInfoControllerProps) {
  const t = useTranslations();

  const [isLoadedProfile, setIsLoadedProfile] = useState(false);

  const router = useRouter();

  const { setImei, getCurrentImei } = useSerialConfigurationStore();
  const imei = getCurrentImei();
  const [modelNameState, setModelNameState] = useState<string>(imei);

  const {
    state: { portList },
    func: { setIsDisconnected, setIsConnected, write },
  } = useSerial();
  const currentPort =
    portList.find(({ port }) => port.imei === modelNameState) || null;

  const {
    state: { isDownloading, percentage },
    func: { getProfileAllData },
  } = useProfile({
    port: currentPort?.port || null,
    writer: currentPort?.writer || null,
    imei: imei || "",
    writeSerial: write,
  });
  const {
    modelName,
    fw_ver,
    setModelName: setModelNameFromModelInfoStore,
    setFwVer: setFwVerFromModelInfoStore,
  } = useModelInfoStore();

  const [applyModal, applyModalToggle] = useModal();
  const [saveModal, saveModalToggle] = useModal();
  const [loadModal, loadModalToggle] = useModal();
  const [uploadModal, uploadModalToggle] = useModal();

  const [isOpenCommonPopup, toggleIsOpenCommonPopup] = useModal();
  const commonPopupTitle = useRef("");
  const commonPopupMessage = useRef("");

  const uploadProfileMutation = useMutation({
    mutationFn: uploadProfile,
  });
  const downloadProfileMutation = useMutation({
    mutationFn: downloadProfile,
  });

  const handleApply = () => {
    applyModalToggle();
  };
  const handleSave = () => {
    saveModalToggle();
  };
  const handleLoad = () => {
    loadModalToggle();
  };

  const handleDownloadProfileFile = () => {
    try {
      downloadProfileMutation
        .mutateAsync({
          model_name: modelName,
          model_version: fw_ver,
        })
        .then((response) => {
          const { data } = response;

          // TODO: 지금은 만약 여러개 있으면 가장 마지막 것만 다운로드 되도록 구현함
          const records = data?.result?.records;

          if (records.length > 0) {
            const targetRcord = records[records.length - 1];

            const { file, file_nickname } = targetRcord;
            const url = file;
            const link = document.createElement("a");
            link.href = url;
            link.download = file_nickname;
            document.body.appendChild(link);
            link.click();
            link.remove();
          } else {
            toggleIsOpenCommonPopup();
            commonPopupTitle.current = t("common.popup.error");
            // TODO: 임의 에러 메시지 표기중
            commonPopupMessage.current = t(
              "configuration.popup_message.no_profile"
            );
          }
        })
        .catch((error) => {
          toggleIsOpenCommonPopup();
          commonPopupTitle.current = t("common.popup.error");
          // TODO: 임의 에러 메시지 표기중
          commonPopupMessage.current = t(
            "configuration.popup_message.failed_download_profile"
          );
          console.error("Error downloading file:", error);
        });
    } catch (error) {
      toggleIsOpenCommonPopup();
      commonPopupTitle.current = t("common.popup.error");
      // TODO: 임의 에러 메시지 표기중
      commonPopupMessage.current = t(
        "configuration.popup_message.failed_download_profile"
      );
      console.error("Error creating download link:", error);
    }
  };

  const handleChange = async (event: SelectChangeEvent) => {
    const targetProt = portList.find(
      ({ port }) => port.imei === event.target.value
    );

    if (!targetProt) return;

    onModelChange();
    const targetModelName = targetProt.modelVersion?.split("_")[0];
    const targetFwVer =
      targetProt.modelVersion?.split("_")[
        targetProt.modelVersion?.split("_").length - 1
      ];
    setModelNameState(targetProt.imei);
    setImei(targetProt.imei);
    setModelNameFromModelInfoStore(targetModelName);
    setFwVerFromModelInfoStore(targetFwVer);
    router.refresh();
  };

  const handleUploadProfileConfirm = async () => {
    if (!currentPort) return;

    const profileData = await getProfileAllData(false);
    const mockFile = new File(
      [profileData.join("\n")],
      `${modelName}_${fw_ver}.profile`,
      {
        type: "text/plain",
      }
    );
    const formData = new FormData();
    formData.append(
      "json",
      JSON.stringify({
        profile_info: [
          {
            model_name: modelName,
            model_version: fw_ver,
            nickname: `profile_${Date.now()}`,
          },
        ],
      })
    );
    formData.append("profile", mockFile);
    uploadProfileMutation
      .mutateAsync(formData)
      .then(() => {
        toggleIsOpenCommonPopup();
        commonPopupTitle.current = t("common.popup.success");
        commonPopupMessage.current = t(
          "configuration.popup_message.success_upload_profile"
        );
      })
      .catch(() => {
        toggleIsOpenCommonPopup();
        commonPopupTitle.current = t("common.popup.error");
        commonPopupMessage.current = t(
          "configuration.popup_message.failed_upload_profile"
        );
      });
  };

  return (
    <>
      {isDownloading && <FullLoading progress={percentage} />}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        width={"100%"}
        p="24px"
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
            onClick={handleApply}
            disabled={!isLoadedProfile}
          >
            Apply
          </Button>
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
        </Stack>

        <Stack direction="row" gap="8px" alignItems="center">
          <IconButton
            disabled={
              !currentPort ||
              (!currentPort.port.readable && !currentPort.port.writable) ||
              currentPort.isDisconnected
            }
            onClick={onRefreshJsonPacket}
          >
            <RefreshOutlinedIcon
              sx={{
                color:
                  !currentPort ||
                  (!currentPort.port.readable && !currentPort.port.writable) ||
                  currentPort.isDisconnected
                    ? "var(--grey4)"
                    : "var(--black)",
              }}
            />
          </IconButton>
          <Select
            value={modelNameState}
            onChange={handleChange}
            sx={{ width: 168 }}
          >
            {portList.map(({ modelVersion, imei }, idx) => {
              return (
                <MenuItem key={idx.toString()} value={imei}>
                  {modelVersion?.split("_")[0]}({imei})
                </MenuItem>
              );
            })}
          </Select>
          {currentPort && !currentPort.isDisconnected ? (
            <Button
              variant="outlined"
              color="secondary"
              disabled={
                !currentPort.port.readable && !currentPort.port.writable
              }
              onClick={() => {
                setIsDisconnected({ imei: currentPort.port.imei });
              }}
            >
              {t("configuration.profile_menu.disconnect")}
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              disabled={
                !currentPort ||
                (!currentPort.port.readable && !currentPort.port.writable)
              }
              onClick={() => {
                if (currentPort) {
                  setIsConnected({ imei: currentPort.port.imei });
                }
              }}
            >
              {t("configuration.profile_menu.connect")}
            </Button>
          )}
        </Stack>
        {/* <Stack direction="row" gap="8px" alignItems="center">
          <IconButton onClick={onRefreshJsonPacket}>
            <RefreshOutlinedIcon sx={{ color: "var(--black)" }} />
          </IconButton>
        </Stack> */}

        {/* Apply Modal */}
        <Modal
          open={applyModal}
          toggleOpen={applyModalToggle}
          title="Confirm"
          disabled={!isLoadedProfile}
          confirm={onApply}
          confirmButtonText="Apply"
          width="360px"
        >
          <Stack>
            <span>Are you sure you want to apply profile to the device?</span>
          </Stack>
        </Modal>

        {/* Save Modal */}
        <Modal
          open={saveModal}
          toggleOpen={saveModalToggle}
          title="Confirm"
          confirm={async () => await getProfileAllData(true)}
          confirmButtonText="Yes"
          width="360px"
        >
          <Stack>
            <span>Are you sure you want to save profile?</span>
          </Stack>
        </Modal>

        {/* Load Modal */}
        <Modal
          closeButton
          open={loadModal}
          toggleOpen={loadModalToggle}
          title="Load Profile"
          width="1240px"
          hasFooter={false}
        >
          <LoadModal
            modelName={modelName}
            fwVer={fw_ver}
            onLoad={(profileText) => {
              setIsLoadedProfile(true);
              onLoadProfile(profileText);
              loadModalToggle();
            }}
          />
        </Modal>

        {/* Upload Modal */}
        <Modal
          open={uploadModal}
          toggleOpen={uploadModalToggle}
          title="Confirm"
          confirm={handleUploadProfileConfirm}
          confirmButtonText="Yes"
          width="360px"
        >
          <Stack>
            <span>Are you sure you want to upload the profile to Scuti?</span>
          </Stack>
        </Modal>
      </Stack>

      {isOpenCommonPopup && (
        <Modal
          open
          width={"357px"}
          toggleOpen={toggleIsOpenCommonPopup}
          title={commonPopupTitle.current}
        >
          <Stack>
            <span style={{ wordBreak: "keep-all" }}>
              {commonPopupMessage.current}
            </span>
          </Stack>
        </Modal>
      )}
    </>
  );
}

function LoadModal({
  modelName,
  fwVer,
  onLoad,
}: {
  modelName: string;
  fwVer: string;
  onLoad: (text: string) => void;
}) {
  const { renderErrorModal, toggle } = useErrorDialog({
    description: "Profile file is not compatible with the device",
  });
  const [selectedValue, setSelectedValue] = React.useState<string>();
  const [selectedFiles, setSelectedFiles] = React.useState<
    {
      id: string;
      col0: { id: string };
      col1: string;
      col2: string;
      col3: string;
      col4: string;
      col6: { id: string };
      isLocal: boolean;
    }[]
  >([]);
  const t = useTranslations();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const ref = useRef<{ id: string; file: string }[]>([]);

  const profileFromScutiMutation = useMutation({
    mutationFn: downloadProfile,
  });

  const deleteProfileMutation = useMutation({
    mutationFn: deleteProfile,
    onSuccess: () => {
      profileFromScutiMutation.mutate({
        model_name: modelName,
        model_version: fwVer,
      });
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const handleLoadFromScuti = () => {
    profileFromScutiMutation.mutate({
      model_name: modelName,
    });
  };

  const parseProfileFile = async (
    file: File
  ): Promise<{
    model: string;
    version: string;
  }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const lines = content.split("\n");
        const modelLine = lines.find((line) => line.startsWith("MODEL="));
        const versionLine = lines.find((line) => line.startsWith("VERSION="));
        ref.current.push({ id: file.name, file: content });

        if (
          modelLine.split("=")[1].trim() !== modelName ||
          versionLine.split("=")[1].trim() !== fwVer
        ) {
          toggle();
          reject(new Error("Profile file is not compatible with the device"));
          return;
        }

        if (!modelLine || !versionLine) {
          reject(new Error("Invalid profile file format"));
          return;
        }

        resolve({
          model: modelLine.split("=")[1].trim(),
          version: versionLine.split("=")[1].trim(),
        });
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsText(file);
    });
  };

  const formatDate = (dateString: string) => {
    return dayjs(dateString).format("MMM/DD/YYYY HH:mm");
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    try {
      const newFiles = await Promise.all(
        files.map(async (file) => {
          const { model, version } = await parseProfileFile(file);
          return {
            id: file.name,
            col0: { id: file.name },
            col1: model,
            col2: version,
            col3: file.name,
            col4: formatDate(new Date().toISOString()),
            col6: { id: file.name },
            isLocal: true,
          };
        })
      );

      setSelectedFiles((prev) => [...prev, ...newFiles]);
    } catch (error) {
      console.error("Error parsing profile files:", error);
    }
  };

  const handleRemoveLocalFile = (fileName: string) => {
    setSelectedFiles((prev) => prev.filter((file) => file.id !== fileName));
    if (selectedValue === fileName) {
      setSelectedValue(undefined);
    }
    // 파일 업로드 후 파일 삭제 시 파일 입력 창 값이 남아있어 파일 업로드 시 중복 파일 업로드 가능하도록 함
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
      headerName: t("device.device_list.model_name"),
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "col2",
      headerName: t("device.device_list.f/w"),
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "source",
      headerName: "Source",
      width: 120,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Chip
          label={params.row.isLocal ? "Local" : "Scuti"}
          color={params.row.isLocal ? "default" : "primary"}
          size="small"
        />
      ),
    },
    {
      field: "col3",
      headerName: t(
        "device.configure_multi-device_pop_up_(profile_load).file_name"
      ),
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "col4",
      headerName: t("device.configure_multi-device_pop_up_(profile_load).date"),
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
      renderCell: (params) => (
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            if (!params.row.isLocal) {
              deleteProfileMutation.mutate([params.value.id]);
            } else {
              handleRemoveLocalFile(params.value.id);
            }
          }}
        >
          <DeleteForeverOutlinedIcon />
        </IconButton>
      ),
    },
  ];

  const scutiRecords =
    profileFromScutiMutation.data?.data?.result?.records || [];

  const handleLoadProfile = async (url?: string) => {
    try {
      if (!url) return;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text(); // 텍스트로 읽기
      console.log(text);
      onLoad(text);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Stack gap="24px">
      {renderErrorModal()}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".profile"
        multiple
        style={{ display: "none" }}
      />
      <Stack gap="8px" direction="row" justifyContent="flex-end">
        <Button
          variant="outlined"
          color="secondary"
          sx={{ width: 210 }}
          onClick={() => fileInputRef.current?.click()}
        >
          {t("configuration.load_profile_popup.load_from_pc")}
        </Button>
      </Stack>

      <DataTable
        rows={[
          ...selectedFiles,
          ...scutiRecords.map(({ uid, model, fw_ver, file, date }) => ({
            id: uid,
            col0: { id: uid },
            col1: model,
            col2: fw_ver,
            col3: file,
            col4: formatDate(date),
            col6: { id: uid },
            isLocal: false,
          })),
        ]}
        columns={columns}
        checkbox={false}
        disablePagination
      />

      <Stack gap="8px" alignItems="flex-end">
        <Button
          variant="contained"
          color="secondary"
          sx={{ width: 210 }}
          onClick={() => {
            const selectedFile = selectedFiles.find(
              (file) => file.id === selectedValue
            );
            if (selectedFile?.isLocal) {
              const localFile = ref.current.find(
                (file) => file.id === selectedValue
              );
              if (localFile) {
                onLoad(localFile.file);
              }
            } else {
              const scutiFile = scutiRecords.find(
                (record) => record.uid === selectedValue
              );
              if (scutiFile?.file) {
                handleLoadProfile(scutiFile.file);
              }
            }
          }}
          disabled={!selectedValue}
        >
          {t("configuration.load_profile_popup.load")}
        </Button>
      </Stack>
    </Stack>
  );
}
