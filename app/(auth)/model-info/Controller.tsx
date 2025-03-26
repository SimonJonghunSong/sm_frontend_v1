import { Button, IconButton, Radio, Stack, Tooltip, Chip } from "@mui/material";
import React, { useRef } from "react";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
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

interface ModelInfoControllerProps {
  modelName: string;
  fwVer: string;
}

export default function ModelInfoController({
  modelName,
  fwVer,
}: ModelInfoControllerProps) {
  const t = useTranslations();

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

  const handleSave = () => {
    saveModalToggle();
  };
  const handleLoad = () => {
    loadModalToggle();
  };
  const handleUpload = () => {
    uploadModalToggle();
  };

  const handleDownloadProfileFile = () => {
    try {
      downloadProfileMutation
        .mutateAsync({
          model_name: modelName,
          model_version: fwVer,
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

  const handleUploadProfileConfirm = () => {
    // TODO: 일단 고정 string으로 생성하여 보내도록 구현함
    const mockFileString = `
      MODEL=ST8310U
VERSION=1.0.9
NTW,PRG;;10;00#02;01#;02#;03#;04#0000;05#211.118.107.218;06#15104;07#00;08#0.0.0.0;09#0;10#00;11#0;12#0;13#00;60#0;70#01;71#150;61#00;62#500;63#300
NTW,PRG;;10;16#00;52#00;53#20;54#01;14#00;15#http://agps.suntechlatam.com
RPT,PRG;;10;55#00;58#00;64#00;50#30;51#0;72#00;73#
GSM,PRG;;10;25#;30#00;31#;32#;33#;34#
DPA,PRG;;19;00#00;01#0.06;02#600;03#0.70;04#1.50;10#00;12#10.0;13#20.0;14#40.0;21#10.0;22#10.0;23#10.0;24#00;25#0
PWR,PRG;;19;30#00;31#01;32#01;33#17.00;34#8.00;35#18.00;36#01;37#3.4;38#3.5
IGN,PRG;;17;00#01;01#0;02#0;05#5;06#10;07#70;08#5;09#10;10#70;15#0.00;16#0.00
INP,PRG;;17;20#12;21#20;22#00;23#20;24#09;25#0;26#09;27#0
OUT,PRG;;17;60#00;61#01;75#0;76#0;77#0;62#16;63#00;80#0;81#0;82#0;64#16;65#00;83#0;84#0;85#0;86#00
PRO,PRG;;16;70#180;71#0;72#0;73#600;74#0;75#0;76#3600;77#0;78#0;79#60;80#1000;81#90;82#30;83#1000;84#60;85#3600;86#1000;87#30
RMC,PRG;;16;00#04;01#0;05#04;06#0;10#04;11#0;12#30;13#30;14#30;15#0;16#0;17#0;20#05;21#100;22#10;23#10;24#5;25#10;36#02;57#0
RMC,PRG;;16;58#0;59#01;60#10
ALTCFG1,PRG;;13;00#0121;01#0122;02#011D;04#011F;06#0144;08#0123;11#0124;13#0101;14#0102;21#013A;25#0109;26#010A;28#012B;29#0163;30#0128;31#0129;32#012C;33#012D;34#010D;35#010E
ALTCFG1,PRG;;13;36#0003;37#0004;38#0008;39#0048;40#0132;50#010F;51#0110;52#0011;54#012E;55#012F;56#0130;57#0131;60#0115;65#0105;66#0106;67#014A;68#014F;71#010B;72#010C
ALTCFG2,PRG;;14;17#0061;34#0164;35#0165;43#012A;44#0149;53#0181;54#0182;70#0184;71#008D;72#018E;73#018F;79#0196;80#0197;85#009A
ASGNSTT,PRG;;11;00#00;01#00;02#00;03#00;04#00;05#00;06#00;07#00;08#00;09#00;10#00;11#00;12#00;13#00;14#00;40#00;41#00;42#00;43#00;44#00
ASGNSTT,PRG;;11;45#00;46#00;47#00;60#00;61#00;62#00;63#00;64#00;65#00;66#00;67#00
RMAP,PRG;;10;81#00000000
ASGNALT,PRG;;12;00#00;01#00;02#00;03#00;04#00;05#00;06#00;07#00;08#00;09#00;10#00;11#00;12#00;13#00;14#00;40#00;41#00;42#00;43#00;44#00
ASGNALT,PRG;;12;45#00;46#00;47#00;60#00;61#00;62#00;63#00;64#00;65#00;66#00;67#00
RMAP,PRG;;10;83#00000000
RMAP,PRG;;10;80#3fffff;82#3fffff;84#003fffff;86#00;87#00001ffbff;97#01
FTR,PRG;;30;10#00;11#1;12#5
GEOCONF,PRG;;90;00#01;01#01;02#01
    `;

    const mockFile = new File(
      [mockFileString],
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

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        width={"100%"}
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
          {/* 
            // Administrator/Customer/Client : Shown
            // Guest/Anonnymous : Hidden
            // Online : Enabled
            // Offline : Disabled
        */}
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
          <IconButton onClick={handleDownloadProfileFile}>
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
          <LoadModal modelName={modelName} fwVer={fwVer} />
        </Modal>

        {/* Upload Modal */}
        <Modal
          open={uploadModal}
          toggleOpen={uploadModalToggle}
          title="Confirm"
          confirm={handleUploadProfileConfirm}
          confirmButtonText="Save"
          width="360px"
        >
          <Stack>
            <span>Are you sure you want to upload profile to Scuti?</span>
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

function LoadModal({ modelName, fwVer }: { modelName: string; fwVer: string }) {
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

  return (
    <Stack gap="24px">
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
        <Button
          variant="outlined"
          color="secondary"
          sx={{ width: 210 }}
          onClick={handleLoadFromScuti}
        >
          {t("configuration.load_profile_popup.load_from_scuti")}
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
          onClick={() => {}}
          disabled={!selectedValue}
        >
          {t("configuration.load_profile_popup.load")}
        </Button>
      </Stack>
    </Stack>
  );
}
