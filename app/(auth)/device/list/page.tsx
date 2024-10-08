"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import { Button, IconButton, Skeleton, Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "@/components/dataTable";
import Modal from "@/components/Modal";
import useModal from "@/utils/useModal";
import useSerial, { delayPromise } from "@/src/hooks/useSerial";
import { AT_EDIT_PREFIX, AT_GET_JSON } from "@/src/hooks/useSerial/constant";
import useSerialStore from "@/src/stores/useSerialStore";
import { toast, ToastContainer } from "react-toastify";
import FullLoading from "@/components/FullLoading";

const modalColumns: GridColDef[] = [
  {
    field: "col1",
    headerName: "Model Name",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "col2",
    headerName: "IMEI",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "col4",
    headerName: "F/W",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
];

const DELAY_MS = 50;

const RowSkeleton = () => {
  return <Skeleton animation="wave" />;
};

export default function DeviceList() {
  const {
    state: { portList, connectingPortCount },
    func: { requestPort, forget, write, close },
  } = useSerial();

  const { setPackageFetchingStart } = useSerialStore();

  const columns: GridColDef[] = [
    {
      field: "col1",
      headerName: "Model Name",
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
      headerName: "IMEI",
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
      headerName: "Country",
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
      headerName: "F/W",
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
      field: "col5",
      headerName: "Connection",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        if (params.id === "skeleton") {
          return <RowSkeleton />;
        }
        return params.value ? (
          params.value?.connected ? (
            <Button
              variant="contained"
              color="secondary"
              sx={{ width: "120px" }}
              onClick={(e) => {
                e.stopPropagation();
                forget(params.value.port.port);
                // close({
                //   port: params.value.port.port,
                //   writer: params.value.port.writer,
                //   reader: params.value.port.reader,
                //   writableStreamClosed: params.value.port.writableStreamClosed,
                //   readableStreamClosed: params.value.port.readableStreamClosed,
                // });
              }}
            >
              Connect
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="secondary"
              sx={{ width: "120px" }}
              onClick={(e) => e.stopPropagation()}
            >
              Disconnect
            </Button>
          )
        ) : (
          <Button
            variant="outlined"
            color="secondary"
            sx={{ width: "120px" }}
            onClick={(e) => e.stopPropagation()}
          >
            Device detached
          </Button>
        );
      },
    },
    {
      field: "col6",
      headerName: "Configuration",
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
                  router.push(
                    `/configuration?imei=${params.value.port.port.imei}`
                  );
                }}
              >
                Configure
              </Button>
              <Button
                disabled={
                  params.value.isPackageFetching ||
                  !params.value.port.writer.write ||
                  !params.value.port.reader.read
                }
                variant="outlined"
                color="secondary"
                sx={{ width: "10px" }}
                onClick={async (e) => {
                  e.stopPropagation();

                  params.value.port.port.grpNo =
                    params.value.port.jsonPackageCount;

                  setPackageFetchingStart({
                    imei: params.value.port.port.imei,
                  });

                  const commands = Array.from(
                    { length: params.value.port.jsonPackageCount },
                    (_, i) => `${AT_GET_JSON}${i + 1}`
                  );
                  params.value.port.port.isjsonpackagefetching = true;
                  for (const command of commands) {
                    write({
                      data: command,
                      port: params.value.port.port,
                      writer: params.value.port.writer,
                    });
                    await delayPromise(DELAY_MS); // 100ms 지연
                  }
                }}
              >
                <RefreshOutlinedIcon sx={{ color: "var(--grey5)" }} />
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
      col3: port.modelVersion,
      col4: port.modelVersion?.split("_")[
        port.modelVersion?.split("_").length - 1
      ],
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
            <span>Device List</span>
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
            rowHeight={72}
            checkbox={false}
            disablePagination
            rows={
              connectingPortCount > 0 ? [...rows, { id: "skeleton" }] : rows
            }
            columns={columns}
            getRowClassName={(params) => {
              console.log(params);
              return "ds";
            }}
          />
          <Button
            variant="contained"
            color="secondary"
            sx={{ width: 200, mt: "24px" }}
            onClick={modalToggle}
          >
            Configure Multi-Device
          </Button>
        </Stack>
      </article>

      <Modal
        closeButton
        open={modal}
        toggleOpen={modalToggle}
        title="Profile to Multi-device"
        confirm={() => {}}
        confirmButtonText="Add"
        width="720px"
      >
        <ProfileModal modalToggle={modalToggle} write={write} />
      </Modal>
      <ToastContainer />
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
          <div className="list-title">Model Name</div>
          <div>{profile ? profile[0].split("=")[1] : "-"}</div>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          gap="8px"
          height="56px"
          borderBottom="1px solid var(--grey3)"
        >
          <div className="list-title">IMEI</div>
          <div>{profile ? profile[0].split("=")[1] : "-"}</div>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          gap="8px"
          height="56px"
          borderBottom="1px solid var(--grey3)"
        >
          <div className="list-title">File Name</div>
          <div>{selectedFile ? selectedFile.name : "-"}</div>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          gap="8px"
          height="56px"
          borderBottom="1px solid var(--grey3)"
        >
          <div className="list-title">Country</div>
          <div>{step === "LOADED" ? "USA" : "-"}</div>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          gap="8px"
          height="56px"
          borderBottom="1px solid var(--grey3)"
        >
          <div className="list-title">F/W</div>
          <div>{profile ? profile[1].split("=")[1] : "-"}</div>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          gap="8px"
          height="56px"
          borderBottom="1px solid var(--grey3)"
        >
          <div className="list-title">Date</div>
          <div>
            {selectedFile
              ? new Date(selectedFile.lastModified).toLocaleDateString() +
                " " +
                new Date(selectedFile.lastModified).toLocaleTimeString()
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
          Load Profile
        </Button>
        <Button
          disabled={!selectedFile || !profile}
          variant="contained"
          color="secondary"
          sx={{ width: 200 }}
          onClick={() => setStep("APPLY")}
        >
          Next
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

function Apply({
  step,
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
  const { portList } = useSerialStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number[]>([]);
  const [percentage, setPercentage] = useState<number>(0);

  const { setShouldFetchJsonPackage } = useSerialStore();

  const rows = portList
    .filter(
      ({ port }) =>
        port.modelinfo.split("_")[port.modelinfo.split("_").length - 1] ===
        profile[1].split("=")[1]
    )
    .map((port, index) => {
      return {
        id: index,
        col1: port.port.modelinfo.split("_")[0],
        col2: port.port.imei,
        col4: port.port.modelinfo.split("_")[
          port.port.modelinfo.split("_").length - 1
        ],
      };
    });

  const handleApply = async () => {
    setIsLoading(true);

    // portList에서 선택된 인덱스를 필터링한 후 for...of로 루프
    const selectedPorts = portList.filter((_, index) =>
      selectedIndex.includes(index)
    );

    for (const port of selectedPorts) {
      for (let i = 2; i < profile.length; i++) {
        await delayPromise(DELAY_MS); // 비동기 지연 함수
        setPercentage((prev) => prev + 1);
        await write({
          data: `${AT_EDIT_PREFIX};${profile[i].split(";;")[1]}`,
          writer: port.writer,
          port: port.port,
        });
      }

      setShouldFetchJsonPackage({ imei: port.port.imei });
    }

    toast("Configure Deivce Success", {
      type: "success",
      position: "bottom-center",
    });
    setIsLoading(false);
    modalToggle();
  };

  return (
    <>
      {isLoading && (
        <FullLoading progress={(percentage / (profile.length - 2)) * 100} />
      )}
      <Stack>
        <DataTable
          rowHeight={56}
          disablePagination
          onRowSelectionModelChange={(selectedIndexList: number[]) =>
            setSelectedIndex(selectedIndexList)
          }
          rows={rows}
          columns={modalColumns}
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
          Prev
        </Button>
        <Button
          disabled={step === "BEFORE"}
          variant="contained"
          color="secondary"
          sx={{ width: 200 }}
          onClick={handleApply}
        >
          Apply
        </Button>
      </Stack>
    </>
  );
}
