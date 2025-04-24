// 1. React 및 내장 훅
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import {
  Button,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Tooltip,
} from "@mui/material";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import Modal from "@/components/Modal";
import FullLoading from "@/components/FullLoading";
import LoadProfileDialog from "./LoadProfileDialog";
import useModal from "@/utils/useModal";
import useSerial, { delayPromise } from "@/src/hooks/useSerial";
import useProfile from "@/src/hooks/useProfile";
import useSerialStore from "@/src/stores/useSerialStore";
import useSerialConfigurationStore from "@/src/stores/useSerialConfigurationStore";
import useModelInfoStore from "@/src/stores/useModelInfo";
import { AT_GET_JSON } from "@/src/hooks/useSerial/constant";
import { uploadProfile } from "@/src/api/services/profile";
import { checkModelDataExists } from "@/utils/idbModelUtil";

const DELAY_MS = 100;

export default function Controller() {
  const { getCurrentImei, setImei, resetTab } = useSerialConfigurationStore();
  const imei = getCurrentImei();
  const t = useTranslations();
  const router = useRouter();
  const [modelName, setModelName] = useState<string>(imei);
  const [isLoading, setIsLoading] = useState(false);
  const [packageCount, setPackageCount] = useState(0);

  const {
    state: { portList },
    func: { write, setIsDisconnected, setIsConnected },
  } = useSerial();
  const { setPackageFetchingStart } = useSerialStore();
  const currentPort = portList.find(({ port }) => port.imei === imei);

  const {
    setModelName: setModelNameFromModelInfoStore,
    setFwVer: setFwVerFromModelInfoStore,
  } = useModelInfoStore();

  const {
    state: { isDownloading, percentage },
    func: { getProfileAllData },
  } = useProfile({
    port: currentPort.port,
    writer: currentPort.writer,
    imei,
    writeSerial: write,
  });

  const uploadProfileMutation = useMutation({
    mutationFn: uploadProfile,
  });
  const [applyModal, applyModalToggle] = useModal();
  const [saveModal, saveModalToggle] = useModal();
  const [loadModal, loadModalToggle] = useModal();
  const [uploadModal, uploadModalToggle] = useModal();

  const [isOpenCommonPopup, toggleIsOpenCommonPopup] = useModal();

  const commonPopupTitle = useRef("");
  const commonPopupMessage = useRef("");

  const handleChange = async (event: SelectChangeEvent) => {
    const targetProt = portList.find(
      ({ port }) => port.imei === event.target.value
    );
    const targetModelName = targetProt?.modelVersion?.split("_")[0];
    const targetFwVer =
      targetProt?.modelVersion?.split("_")[
        targetProt?.modelVersion?.split("_").length - 1
      ];

    const targetModelHasIdbData = await checkModelDataExists(targetModelName);

    if (targetModelHasIdbData) {
      setImei(event.target.value);
      resetTab();
      setModelName(event.target.value);
      return;
    } else {
      setModelNameFromModelInfoStore(targetModelName);
      setFwVerFromModelInfoStore(targetFwVer);
      router.replace(`/device-configuration`);
    }
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

  const handleUploadProfileConfirm = async () => {
    const profileData = await getProfileAllData(false);
    const fwVer =
      currentPort.modelVersion?.split("_")[
        currentPort.modelVersion?.split("_").length - 1
      ];
    const mockFile = new File(
      [profileData.join("\n")],
      `${modelName}_${fwVer}.profile`,
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
            model_version: fwVer,
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
        // TODO: 임의 에러 메시지 표기중
        commonPopupMessage.current = t(
          "configuration.popup_message.success_upload_profile"
        );
      })
      .catch(() => {
        toggleIsOpenCommonPopup();
        commonPopupTitle.current = t("common.popup.error");
        // TODO: 임의 에러 메시지 표기중
        commonPopupMessage.current = t(
          "configuration.popup_message.failed_upload_profile"
        );
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
        {/* <IconButton onClick={() => getProfileAllData(true)}>
          <FileDownloadOutlinedIcon sx={{ color: "var(--black)" }} />
        </IconButton> */}
      </Stack>

      <Stack direction="row" gap="8px" alignItems="center">
        <IconButton
          disabled={
            (!currentPort.port.readable && !currentPort.port.writable) ||
            currentPort.isDisconnected
          }
          onClick={handleRefreshJsonPacket}
        >
          <RefreshOutlinedIcon
            sx={{
              color:
                (!currentPort.port.readable && !currentPort.port.writable) ||
                currentPort.isDisconnected
                  ? "var(--grey4)"
                  : "var(--black)",
            }}
          />
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
        {!currentPort.isDisconnected ? (
          <Button
            variant="outlined"
            color="secondary"
            disabled={!currentPort.port.readable && !currentPort.port.writable}
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
            disabled={!currentPort.port.readable && !currentPort.port.writable}
            onClick={() => {
              setIsConnected({ imei: currentPort.port.imei });
            }}
          >
            {t("configuration.profile_menu.connect")}
          </Button>
        )}
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
        confirm={async () => {
          await getProfileAllData(true);
        }}
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
        <LoadProfileDialog
          modelName={modelName}
          fwVer={
            currentPort.modelVersion?.split("_")[
              currentPort.modelVersion?.split("_").length - 1
            ]
          }
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
