"use client";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import sampleMap from "/public/images/sample-map2.png";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import Controller from "../components/Controller";
import InputBox from "../../../../components/inputbox/InputBox";
import { SwitchPrimary } from "../../../../components/switches";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../../../components/dataTable";
import Image from "next/image";
import { useTransformedConfigData } from "../../../../src/hooks/useTransformConfigData";
import useSerial, { delayPromise } from "../../../../src/hooks/useSerial";
import { useSearchParams } from "next/navigation";
import {
  AT_GET_CIRCULAR_GEOFENCE_255_LIST,
  AT_GET_CIRCULAR_GEOFENCE_999_LIST,
  AT_GET_POLYGON_GEOFENCE_LIST,
} from "../../../../src/hooks/useSerial/constant";
import { toast } from "react-toastify";
import {
  getCircularGeofenceData,
  getPolygonGeofenceData,
} from "../../../../src/hooks/useSerial/utils";

const columns: GridColDef[] = [
  {
    field: "no",
    headerName: "No",
    width: 60,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "type",
    headerName: "Type",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "groupId",
    headerName: "Group",
    width: 70,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "edit",
    headerName: "Edit",
    width: 60,
    headerAlign: "center",
    align: "center",
    renderCell: () => (
      <IconButton onClick={(e) => e.stopPropagation()}>
        <EditOutlinedIcon />
      </IconButton>
    ),
  },
  {
    field: "delete",
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

// const rows = [
//   {
//     id: 0,
//     col1: "1",
//     col2: "Circular",
//     col3: "1",
//     col8: { id: "1" },
//     col9: { id: "1" },
//   },
//   {
//     id: 1,
//     col1: "2",
//     col2: "Polygon",
//     col3: "2",
//     col8: { id: "1" },
//     col9: { id: "1" },
//   },
//   {
//     id: 2,
//     col1: "3",
//     col2: "Polygon",
//     col3: "3",
//     col8: { id: "1" },
//     col9: { id: "1" },
//   },
//   {
//     id: 3,
//     col1: "4",
//     col2: "Circular",
//     col3: "4",
//     col8: { id: "1" },
//     col9: { id: "1" },
//   },
//   {
//     id: 4,
//     col1: "5",
//     col2: "Circular",
//     col3: "5",
//     col8: { id: "1" },
//     col9: { id: "1" },
//   },
// ];

export default function Page() {
  const searchParams = useSearchParams();
  const [isCircularFetchReady, setIsCircularFetchReady] = useState(false);
  const [roleFilter, setRoleFilter] = useState<string>("All");
  const {
    state: { portList },
    func: { write },
  } = useSerial();

  const currentPort = portList.find(
    ({ port }) => port.imei === searchParams.get("imei")
  );

  const { originData, formData, getFormFields, resetData, getEditDataForPage } =
    useTransformedConfigData({
      data: portList.find(({ port }) => port.imei === searchParams.get("imei"))
        .packageToJson.synctrak,
      blacklist: ["info"],
    });

  const polygonGeofenceMax = formData.find(({ info }) => info.tab_id === "53")
    ?.info.max;
  const circularGeofenceMax = formData.find(({ info }) => info.tab_id === "50")
    ?.info.max;

  const polygonList = currentPort.polygonGeofenceData;
  const circularList = currentPort.circularGeofenceData;

  const handleSelectChange = (
    e: SelectChangeEvent,
    setState: Dispatch<SetStateAction<string>>
  ) => {
    setState(e.target.value);
  };

  useEffect(() => {
    if (!currentPort.port.readable || !currentPort.port.writable) return;

    if (!polygonGeofenceMax) {
      return setIsCircularFetchReady(true);
    }

    currentPort.port.polygonfetchcount = 0;
    currentPort.port.ispolygonfetching = true;
    currentPort.port.onafterpolygongeofence = () => {
      currentPort.port.ispolygonfetching = false;
      toast("fetch 완료");
      setIsCircularFetchReady(true);
      currentPort.port.polygongeofence = "";
    };

    (async () => {
      for (const command of AT_GET_POLYGON_GEOFENCE_LIST(
        searchParams.get("imei")
      )) {
        await delayPromise(200); // 300ms 지연

        write({
          data: command,
          port: currentPort.port,
          writer: currentPort.writer,
        });
      }
    })();
  }, [currentPort.port.readable, currentPort.port.writable]);

  useEffect(() => {
    if (!circularGeofenceMax || !isCircularFetchReady) return;

    currentPort.port.circularfetchcount = 0;
    currentPort.port.iscircularfetching = true;
    currentPort.port.onaftercirculargeofence = () => {
      currentPort.port.iscircularfetching = false;
      toast("circular geofence fetch 완료");
      // TODO Loading BAR 풀기
      currentPort.port.circulargeofence = "";
    };

    (async () => {
      for (const command of circularGeofenceMax === "255"
        ? AT_GET_CIRCULAR_GEOFENCE_255_LIST(searchParams.get("imei"))
        : AT_GET_CIRCULAR_GEOFENCE_999_LIST(searchParams.get("imei"))) {
        await delayPromise(200); // 300ms 지연

        write({
          data: command,
          port: currentPort.port,
          writer: currentPort.writer,
        });
      }
    })();
  }, [isCircularFetchReady]);

  const polygonData = getPolygonGeofenceData(polygonList);
  const circularData = getCircularGeofenceData(circularList);

  console.log([...polygonData, ...circularData]);

  const rows = [...polygonData, ...circularData].map(
    ({ type, groupId }, index) => {
      return {
        id: index + 1,
        no: index + 1,
        type: type === "polygon" ? "Polygon" : "Circular",
        groupId,
        edit: { id: groupId },
        delete: { id: groupId },
      };
    }
  );

  return (
    <div className="pageWrap">
      <article className="contentWrap">
        <Controller />

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          sx={{ width: "calc(50% - 20px)" }}
        >
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                <div className="pageTitle" style={{ marginBottom: 0 }}>
                  Geofence
                </div>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1700</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
          </InputBox>
          <SwitchPrimary />
        </Stack>
        <Stack direction="row" gap="40px" mb="40px">
          <Stack
            gap="20px"
            sx={{ width: "50%", height: "500px", overflowY: "scroll" }}
          >
            <Stack
              direction="row"
              gap="8px"
              justifyContent="space-between"
              mb="16px"
            >
              <Select
                value={roleFilter}
                onChange={(e) => handleSelectChange(e, setRoleFilter)}
                sx={{ minWidth: 160 }}
              >
                <MenuItem value={"All"}>All</MenuItem>
                <MenuItem value={"Admin"}>Admin</MenuItem>
                <MenuItem value={"Customer"}>Customer</MenuItem>
                <MenuItem value={"Guest"}>Guest</MenuItem>
              </Select>

              <Button
                variant="contained"
                color="secondary"
                href={`/configuration/geofence/add?imei=${currentPort.port.imei}`}
              >
                Add
              </Button>
            </Stack>
            <DataTable
              noDataMessage="No registered geofence"
              disablePagination
              rows={rows}
              columns={columns}
              footerButton={
                <Button variant="text" color="info">
                  Delete
                </Button>
              }
            />
          </Stack>

          <Stack gap="20px" sx={{ width: "50%" }}>
            <Box>
              <Image
                src={sampleMap}
                alt="sampleMap"
                style={{ display: "block", width: "100%", height: "auto" }}
              />
            </Box>
          </Stack>
        </Stack>
      </article>
    </div>
  );
}
