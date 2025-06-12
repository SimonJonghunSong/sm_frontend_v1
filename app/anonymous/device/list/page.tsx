"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import { Button, IconButton, Skeleton, Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "@/components/dataTable";
import Modal from "@/components/Modal";
import useModal from "@/utils/useModal";
import useSerial, { delayPromise } from "@/src/hooks/useSerial";
import { AT_EDIT_PREFIX } from "@/src/hooks/useSerial/constant";
import useSerialStore from "@/src/stores/useSerialStore";
import useSerialConfigurationStore from "@/src/stores/useSerialConfigurationStore";
import styles from "./styles.module.scss";
import dayjs from "dayjs";
import useModelInfoStore from "@/src/stores/useModelInfo";

const modalColumns: (t) => GridColDef[] = (t) => [
  {
    field: "col1",
    headerName: t("device.device_list.model_name"),
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "col2",
    headerName: t("device.device_list.esn"),
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "col4",
    headerName: t("device.device_list.f/w"),
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "col5",
    headerName: t("device.device_list.modem"),
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "col6",
    headerName: t("device.device_list.status"),
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => {
      if (params.value === "loading") {
        return <LoadingCircle />;
      } else {
        return <>{params.value}</>;
      }
    },
  },
];

const DELAY_MS = 50;

const RowSkeleton = () => {
  return <Skeleton animation="wave" />;
};

export default function DeviceList() {
  const t = useTranslations();
  const {
    state: { portList, connectingPortCount },
    func: { requestPort, forget, write, setIsDisconnected, setIsConnected },
  } = useSerial();
  const { setImei, resetTab } = useSerialConfigurationStore();
  const { setModelName, setFwVer, setTargetCountry } = useModelInfoStore();

  const columns: GridColDef[] = [
    {
      field: "col1",
      headerName: t("device.device_list.model_name"),
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        if (params.id === "skeleton") {
          return <RowSkeleton />;
        }
        return <>{params.value}</>;
      },
    },
    {
      field: "col2",
      headerName: t("device.device_list.esn"),
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        if (params.id === "skeleton") {
          return <RowSkeleton />;
        }
        return <>{params.value}</>;
      },
    },
    {
      field: "col3",
      headerName: t("device.device_list.f/w"),
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        if (params.id === "skeleton") {
          return <RowSkeleton />;
        }
        return <>{params.value}</>;
      },
    },
    {
      field: "col4",
      headerName: t("device.device_list.modem"),
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        if (params.id === "skeleton") {
          return <RowSkeleton />;
        }
        return <>{params.value}</>;
      },
    },
    // {
    //   field: "col5",
    //   headerName: t("device.device_list.connection"),
    //   flex: 1,
    //   headerAlign: "center",
    //   align: "center",
    //   renderCell: (params) => {
    //     if (params.id === "skeleton") {
    //       return <RowSkeleton />;
    //     }
    //     return params.value ? (
    //       !params.value.port.isDisconnected ? (
    //         <Button
    //           variant="outlined"
    //           color="secondary"
    //           sx={{ width: "120px" }}
    //           onClick={(e) => {
    //             console.log(params.value);
    //             e.stopPropagation();
    //             setIsDisconnected({ imei: params.value.port.port.imei });
    //           }}
    //         >
    //           {t("device.device_list.disconnect")}
    //         </Button>
    //       ) : (
    //         <Button
    //           variant="contained"
    //           color="secondary"
    //           sx={{ width: "120px" }}
    //           onClick={(e) => {
    //             e.stopPropagation();
    //             setIsConnected({ imei: params.value.port.port.imei });
    //           }}
    //         >
    //           {t("device.device_list.connect")}
    //         </Button>
    //       )
    //     ) : (
    //       <Button
    //         variant="outlined"
    //         color="secondary"
    //         sx={{ width: "120px" }}
    //         onClick={(e) => e.stopPropagation()}
    //       >
    //         Device detached
    //       </Button>
    //     );
    //   },
    // },
    {
      field: "col6",
      headerName: t("device.device_list.configuration"),
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        if (params.id === "skeleton") {
          return <RowSkeleton />;
        }
        if (params.value.isPackageFetching) {
          return (
            <Button
              disabled
              variant="contained"
              color="secondary"
              sx={{ width: "120px" }}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              Loading...
            </Button>
          );
        } else {
          return (
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              gap={"4px"}
              height={"100%"}
            >
              <Button
                disabled={
                  !params.value.configure || params.value.isPackageError
                }
                variant="contained"
                color="secondary"
                sx={{ width: "120px" }}
                onClick={(e) => {
                  e.stopPropagation();
                  setImei(params.value.port.port.imei);
                  resetTab();
                  setModelName(params.value.port.port.modelinfo.split("_")[0]);
                  setFwVer(
                    params.value.port.port.modelinfo.split("_")[
                      params.value.port.port.modelinfo.split("_").length - 1
                    ]
                  );
                  setTargetCountry([]);
                  router.push(`/anonymous/device-info`);
                }}
              >
                {t("device.device_list.configure")}
              </Button>
            </Stack>
          );
        }
      },
    },
  ];

  const rows = portList?.map((port, index) => {
    return {
      id: index,
      col1: port.modelVersion?.split("_")[0],
      col2: port.imei,
      col3: port.modelVersion?.split("_")[
        port.modelVersion?.split("_").length - 1
      ],
      col4: port.modemVersion || "N/A",
      col5: { connected: !!port.reader.read && !!port.writer.write, port },
      col6: {
        configure:
          port.isReadyUp &&
          !port.isPackageFetching &&
          port.jsonPackage?.length === port.jsonPackageCount,
        isPackageFetching: port.isPackageFetching,
        isPackageError: port.isPackageError,
        port,
      },
    };
  });

  const [modal, modalToggle] = useModal();
  const router = useRouter();

  return (
    <div className="pageWrap">
      <article className="contentWrap">
        <div className="pageTitle">
          <Stack direction="row" alignItems="center">
            <span>{t("device.device_list.device_list")}</span>
            <IconButton onClick={requestPort}>
              <RefreshOutlinedIcon sx={{ color: "var(--grey5)" }} />
            </IconButton>
          </Stack>
          <span className="text-grey-5" style={{ fontSize: 14 }}>
            {portList.length + "/" + portList.length}
          </span>
        </div>
        <Stack>
          <DataTable
            noDataMessage={t("device.device_detecting.no_devices_detected")}
            rowHeight={72}
            checkbox={false}
            disablePagination
            rows={
              connectingPortCount > 0 ? [...rows, { id: "skeleton" }] : rows
            }
            columns={columns}
            getRowClassName={() => {
              return "ds";
            }}
          />
          <Stack
            display={"flex"}
            flexDirection={"row"}
            width={"100%"}
            alignItems={"center"}
            justifyContent={"space-between"}
            style={{ marginTop: "24px" }}
          >
            <Button
              variant="contained"
              color="secondary"
              sx={{ maxWidth: 300 }}
              onClick={modalToggle}
              style={{ flexShrink: 0 }}
              disabled={portList.length === 0}
            >
              {t("device.device_list.configure_multi-device")}
            </Button>
            <div
              style={{
                display: "inline-flex",
                color: "#8E8E93",
                fontSize: "14px",
                lineHeight: "14px",
              }}
            >
              *{" "}
              {t(
                "device.device_list.models_that_are_not_supported_will_not_be_displayed_on_the_device_list"
              )}
            </div>
          </Stack>
        </Stack>
      </article>

      <Modal
        closeButton
        open={modal}
        toggleOpen={modalToggle}
        title={t("device.device_list.configure_multi-device")}
        confirm={() => {}}
        hasFooter={false}
        width="720px"
      >
        <ProfileModal modalToggle={modalToggle} write={write} />
      </Modal>
    </div>
  );
}

type Steps = "BEFORE" | "LOADED" | "APPLY";

function ProfileModal({
  modalToggle,
  write,
}: {
  modalToggle: () => void;
  write: ({
    data,
    port,
    writer,
    callback,
  }: {
    data: string;
    port: SerialPort;
    writer: WritableStreamDefaultWriter<string>;
    callback?: () => void;
  }) => Promise<boolean>;
}) {
  const [step, setStep] = useState<Steps>("BEFORE");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedProfile, setUploadedProfile] = useState<string[]>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file && isValidFileType(file, allowedExtensions)) {
      setSelectedFile(file);
      const reader = new FileReader();

      reader.onload = (e) => {
        const fileContent = e.target?.result;
        // 파일 내용 처리
        setUploadedProfile((fileContent as string).split("\n"));
      };

      reader.readAsText(file);
    } else {
      alert(
        "Invalid file type. Please upload a file with one of the following extensions: " +
          allowedExtensions.join(", ")
      );
    }
  };

  if (step === "BEFORE" || step === "LOADED") {
    return (
      <Before
        step={step}
        setStep={setStep}
        onFileChange={handleFileChange}
        profile={uploadedProfile}
        selectedFile={selectedFile}
      />
    );
  } else if (step === "APPLY") {
    return (
      <Apply
        step={step}
        setStep={setStep}
        modalToggle={modalToggle}
        profile={uploadedProfile}
        write={write}
      />
    );
  }
}

// 허용할 확장자 목록
const allowedExtensions = ["profile"];

// 허용된 확장자를 기반으로 파일 검증
const isValidFileType = (file: File, allowedExtensions: string[]): boolean => {
  const fileExtension = file.name.split(".").pop()?.toLowerCase();
  return allowedExtensions.includes(fileExtension || "");
};

function Before({
  step,
  setStep,
  onFileChange,
  profile,
  selectedFile,
}: {
  step: Steps;
  setStep: (step: Steps) => void;
  selectedFile?: File;
  profile?: string[];
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const t = useTranslations();
  const uploadFileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <Stack>
        <Stack
          direction="row"
          alignItems="center"
          gap="8px"
          height="56px"
          borderBottom="1px solid var(--grey3)"
        >
          <div className="list-title">{t("device.device_list.model_name")}</div>
          <div>{profile ? profile[0].split("=")[1] : "-"}</div>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          gap="8px"
          height="56px"
          borderBottom="1px solid var(--grey3)"
        >
          <div className="list-title">
            {t("device.configure_multi-device_pop_up_(profile_load).file_name")}
          </div>
          <div>{selectedFile ? selectedFile.name : "-"}</div>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          gap="8px"
          height="56px"
          borderBottom="1px solid var(--grey3)"
        >
          <div className="list-title">
            {t("device.configure_multi-device_pop_up_(profile_load).f/w")}
          </div>
          <div>{profile ? profile[1].split("=")[1] : "-"}</div>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          gap="8px"
          height="56px"
          borderBottom="1px solid var(--grey3)"
        >
          <div className="list-title">
            {t("device.configure_multi-device_pop_up_(profile_load).date")}
          </div>
          <div>
            {selectedFile?.lastModified
              ? dayjs(selectedFile.lastModified).format("MMM/DD/YYYY HH:mm:ss")
              : "-"}
          </div>
        </Stack>
      </Stack>
      <Stack
        direction="row"
        gap="8px"
        justifyContent="flex-end"
        marginTop="40px"
      >
        <Button
          variant="outlined"
          color="secondary"
          sx={{ width: 200 }}
          onClick={() => {
            uploadFileInputRef.current?.click();
          }}
        >
          {t(
            "device.configure_multi-device_pop_up_(profile_load).load_profile"
          )}
        </Button>
        <Button
          disabled={!selectedFile || !profile}
          variant="contained"
          color="secondary"
          sx={{ width: 200 }}
          onClick={() => setStep("APPLY")}
        >
          {t("device.device_list.next")}
        </Button>

        <input
          type="file"
          hidden
          ref={uploadFileInputRef}
          onChange={onFileChange}
          accept={allowedExtensions.map((ext) => `.${ext}`).join(",")} // accept 속성을 사용하여 파일 탐색기에서 확장자 제한
        />
      </Stack>
    </>
  );
}

const LoadingCircle = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader} />
    </div>
  );
};

function Apply({
  setStep,
  modalToggle,
  profile,
  write,
}: {
  step: Steps;
  setStep: (step: Steps) => void;
  modalToggle: () => void;
  profile: string[];
  write: ({
    data,
    port,
    writer,
    callback,
  }: {
    data: string;
    port: SerialPort;
    writer: WritableStreamDefaultWriter<string>;
    callback?: () => void;
  }) => Promise<boolean>;
}) {
  const t = useTranslations();
  const { portList } = useSerialStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number[]>([]);
  const [applyStatus, setApplyStatus] = useState<
    Record<number, "pending" | "loading" | "applied" | "failed">
  >({});

  const { setShouldFetchJsonPackage } = useSerialStore();

  const rows = portList
    .filter(
      ({ port }) =>
        port.modelinfo.includes(profile[0].split("=")[1].trim()) &&
        port.modelinfo?.split("_")[port.modelinfo?.split("_").length - 1] ===
          profile[1].split("=")[1].trim()
    )
    .map((port, index) => {
      return {
        id: index,
        col1: port.port.modelinfo.split("_")[0],
        col2: port.port.imei,
        col4: port.port.modelinfo.split("_")[
          port.port.modelinfo.split("_").length - 1
        ],
        col5: port.port.modelinfo.split("_")[
          port.port.modelinfo.split("_").length - 1
        ],
        col6:
          applyStatus[index] === "loading"
            ? "loading"
            : applyStatus[index] === "applied"
            ? "Applied"
            : applyStatus[index] === "failed"
            ? "Failed"
            : "-",
      };
    });

  const handleApply = async () => {
    setIsLoading(true);

    // portList에서 선택된 인덱스를 필터링한 후 for...of로 루프
    const selectedPorts = portList.filter((_, index) =>
      selectedIndex.includes(index)
    );

    for (let i = 0; i < selectedPorts.length; i++) {
      const port = selectedPorts[i];
      setApplyStatus((prev) => ({ ...prev, [i]: "loading" }));
      for (let j = 2; j < profile.length; j++) {
        await delayPromise(DELAY_MS);
        await write({
          data: `${AT_EDIT_PREFIX};${profile[j].split(";;")[1]}`,
          writer: port.writer,
          port: port.port,
        });
      }
      setApplyStatus((prev) => ({ ...prev, [i]: "applied" }));

      setShouldFetchJsonPackage({ imei: port.port.imei });
    }

    setIsLoading(false);
    // modalToggle();
  };

  return (
    <>
      <Stack>
        <DataTable
          rowHeight={56}
          disablePagination
          onRowSelectionModelChange={(selectedIndexList: number[]) =>
            setSelectedIndex(selectedIndexList)
          }
          noDataMessage={t(
            "device.configure_multi-device_pop_up_(device_list).no_applicable_devices_found"
          )}
          rows={rows}
          columns={modalColumns(t)}
        />
      </Stack>
      <Stack
        direction="row"
        gap="8px"
        justifyContent="flex-end"
        marginTop="40px"
      >
        <Button
          variant="outlined"
          color="secondary"
          sx={{ width: 200 }}
          onClick={() => setStep("LOADED")}
        >
          {t("device.configure_multi-device_pop_up_(device_list).back")}
        </Button>
        <Button
          disabled={!selectedIndex.length}
          variant="contained"
          color="secondary"
          sx={{ width: 200 }}
          onClick={handleApply}
        >
          {t("configuration.profile_menu.apply")}
        </Button>
      </Stack>
    </>
  );
}
