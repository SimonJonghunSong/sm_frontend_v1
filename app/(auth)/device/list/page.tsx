"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import { Button, IconButton, Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "@/components/dataTable";
import Modal from "@/components/Modal";
import useModal from "@/utils/useModal";
import useSerial, { delayPromise } from "@/src/hooks/useSerial";
import { AT_GET_JSON } from "@/src/hooks/useSerial/constant";
import useSerialStore from "@/src/stores/useSerialStore";

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

const modalRows = [
  {
    id: 0,
    col1: "ST8300",
    col2: "867730-05-275676-8",
    col4: "1.1",
  },
  {
    id: 1,
    col1: "ST8300",
    col2: "867730-05-275676-8",
    col4: "1.1",
  },
  {
    id: 2,
    col1: "ST8300",
    col2: "867730-05-275676-8",
    col4: "1.1",
  },
  {
    id: 3,
    col1: "ST8300",
    col2: "867730-05-275676-8",
    col4: "1.1",
  },
  {
    id: 4,
    col1: "ST8300",
    col2: "867730-05-275676-8",
    col4: "1.1",
  },
  {
    id: 5,
    col1: "ST8300",
    col2: "867730-05-275676-8",
    col4: "1.1",
  },
  {
    id: 6,
    col1: "ST8300",
    col2: "867730-05-275676-8",
    col4: "1.1",
  },
  {
    id: 7,
    col1: "ST8300",
    col2: "867730-05-275676-8",
    col4: "1.1",
  },
  {
    id: 8,
    col1: "ST8300",
    col2: "867730-05-275676-8",
    col4: "1.1",
  },
  {
    id: 9,
    col1: "ST8300",
    col2: "867730-05-275676-8",
    col4: "1.1",
  },
];

const DELAY_MS = 100;

export default function DeviceList() {
  const {
    state: { portList },
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
    },
    {
      field: "col2",
      headerName: "IMEI",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "col3",
      headerName: "Country",
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
    {
      field: "col5",
      headerName: "Connection",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return params.value ? (
          params.value?.connected ? (
            <Button
              variant="contained"
              color="secondary"
              sx={{ width: "120px" }}
              onClick={(e) => {
                e.stopPropagation();
                forget(params.value.port.port);
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
      renderCell: (params) =>
        params.value.isPackageFetching ? (
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
        ) : (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            gap={"4px"}
            height={"100%"}
          >
            <Button
              disabled={!params.value.configure || params.value.isPackageError}
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
              disabled={params.value.isPackageFetching}
              variant="outlined"
              color="secondary"
              sx={{ width: "10px" }}
              onClick={async (e) => {
                e.stopPropagation();

                params.value.port.port.grpNo =
                  params.value.port.jsonPackageCount;

                setPackageFetchingStart({ imei: params.value.port.port.imei });

                const commands = Array.from(
                  { length: params.value.port.jsonPackageCount },
                  (_, i) => `${AT_GET_JSON}${i + 1}`
                );

                for (const command of commands) {
                  await delayPromise(DELAY_MS); // 300ms 지연

                  write({
                    data: command,
                    port: params.value.port.port,
                    writer: params.value.port.writer,
                  });
                }
              }}
            >
              <RefreshOutlinedIcon sx={{ color: "var(--grey5)" }} />
            </Button>
          </Stack>
        ),
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
            rows={rows}
            columns={columns}
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
        <ProfileModal modalToggle={modalToggle} />
      </Modal>
    </div>
  );
}

type Steps = "BEFORE" | "LOADED" | "APPLY";

function ProfileModal({ modalToggle }) {
  // TODO: step 상태 연결
  const [step, setStep] = useState<Steps>("BEFORE");

  if (step === "BEFORE" || step === "LOADED") {
    return <Before step={step} setStep={setStep} />;
  } else if (step === "APPLY") {
    return <Apply step={step} setStep={setStep} modalToggle={modalToggle} />;
  }
}

function Before({ step, setStep }) {
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
          <div>{step === "LOADED" ? "ST8300" : "-"}</div>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          gap="8px"
          height="56px"
          borderBottom="1px solid var(--grey3)"
        >
          <div className="list-title">IMEI</div>
          <div>{step === "LOADED" ? "867730-05-275678-8" : "-"}</div>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          gap="8px"
          height="56px"
          borderBottom="1px solid var(--grey3)"
        >
          <div className="list-title">File Name</div>
          <div>{step === "LOADED" ? "AAAA_BBBB_CCCC.profile" : "-"}</div>
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
          <div>{step === "LOADED" ? "1.1" : "-"}</div>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          gap="8px"
          height="56px"
          borderBottom="1px solid var(--grey3)"
        >
          <div className="list-title">Date</div>
          <div>{step === "LOADED" ? "Jan/19/2024 18:06" : "-"}</div>
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
          onClick={() => setStep("LOADED")}
        >
          Load Profile
        </Button>
        <Button
          disabled={step === "BEFORE"}
          variant="contained"
          color="secondary"
          sx={{ width: 200 }}
          onClick={() => setStep("APPLY")}
        >
          Next
        </Button>
      </Stack>
    </>
  );
}

function Apply({ step, setStep, modalToggle }) {
  return (
    <>
      <Stack>
        <DataTable
          rowHeight={56}
          disablePagination
          rows={modalRows}
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
          onClick={modalToggle}
        >
          Apply
        </Button>
      </Stack>
    </>
  );
}
