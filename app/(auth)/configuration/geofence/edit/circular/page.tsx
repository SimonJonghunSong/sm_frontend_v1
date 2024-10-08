"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import Maps from "@/components/Map";
import InputBox from "@/components/inputbox/InputBox";
import { useMapManager } from "@/src/hooks/useMapManager";
import useSerial from "@/src/hooks/useSerial";
import { AT_EDIT_PREFIX, AT_REQ, CR } from "@/src/hooks/useSerial/constant";
import { convertCircleCoordinatesToHexString } from "@/utils/coordinateToHex";
import { findCircleIndexByNumber } from "@/utils/generateFormattedIndexes";
import Controller from "../../../components/Controller";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import FullLoading from "@/components/FullLoading";
import { parseLatLngRadius } from "../../utils";

export default function Page() {
  const router = useRouter();
  const mapManager = useMapManager();
  const searchParams = useSearchParams();
  const {
    state: { portList },
    func: { write },
  } = useSerial();
  const [isFullLoading, setIsFullLoading] = useState(false);
  const mapRef = useRef<google.maps.Map>(null);
  const isCircleOutputActiveBuffer = useRef<string>();
  const currentGrpId = searchParams.get("grpId");
  const currentImei = searchParams.get("imei");
  const currentPort = portList.find(({ port }) => port.imei === currentImei);

  const handleEdit = () => {
    const imei = currentPort.port.imei;

    const circleOutputActiveFetchPromise = new Promise<boolean>((resolve) => {
      // 9001: Circular Output Active
      // Determines whether to use the output active & delay item of the circular item. (Supported by LATAM or Brazil only)
      currentPort.port.iscircleoutputactivefetching = true;
      currentPort.port.circleoutputactivehandler = (value) => {
        isCircleOutputActiveBuffer.current += value;
        if (value.includes(CR)) {
          currentPort.port.iscircleoutputactivefetching = false;
          const isEnable =
            isCircleOutputActiveBuffer.current.split("#")[1] === "01";
          isCircleOutputActiveBuffer.current = undefined;
          resolve(isEnable);
        }
      };
      write({
        data: `${AT_REQ}${imei};90;01`,
        port: currentPort.port,
        writer: currentPort.writer,
      });
    });

    circleOutputActiveFetchPromise.then((isOutputActive) => {
      const circleIndex = findCircleIndexByNumber(Number(currentGrpId) - 1);
      const circle = mapManager.circles[0];
      const coordinateToHexString = convertCircleCoordinatesToHexString({
        lat: circle.center.lat,
        lng: circle.center.lng,
        radius: circle.radius,
      });

      currentPort.port.oneditsuccess = () => {
        toast("Save Success", { type: "success" });
        router.push(`/configuration/geofence?imei=${currentPort.port.imei}`);
      };
      write({
        data: `${AT_EDIT_PREFIX}${imei};${circleIndex}#${coordinateToHexString}${
          isOutputActive ? "01010000000000" : "0101"
        }`,
        port: currentPort.port,
        writer: currentPort.writer,
      });
    });
  };

  useEffect(() => {
    setIsFullLoading(true);

    if (!currentPort.port.readable && !currentPort.port.writable) return;

    const circleIndex = findCircleIndexByNumber(Number(currentGrpId) - 1);
    currentPort.port.iscircularpointfetching = true;
    currentPort.port.circlehandler = (value) => {
      if (value.includes(CR)) {
        const circleData = parseLatLngRadius(value);
        const newCircle = new google.maps.Circle({
          center: circleData.center,
          radius: circleData.radius,
          map: mapRef.current, // mapRef에 담긴 지도 객체에 폴리곤 추가
          editable: true, // 필요에 따라 편집 가능 여부 설정
        });
        mapManager.shapesRef.current.push({
          overlay: newCircle,
          type: google.maps.drawing.OverlayType.CIRCLE,
        });

        mapManager.addCircle({
          id: 0,
          radius: circleData.radius,
          center: circleData.center,
        });
        mapManager.registerEditableHandlers();

        if (mapRef.current) {
          mapRef.current.setCenter({
            lat: circleData.center.lat,
            lng: circleData.center.lng,
          });
        }
        setIsFullLoading(false);
        currentPort.port.iscircularpointfetching = false;
      }
    };

    write({
      data: `AT^REQ;${currentImei};${circleIndex}`,
      port: currentPort.port,
      writer: currentPort.writer,
    });
  }, [currentPort.port.readable, currentPort.port.writable]);

  return (
    <div className="pageWrap">
      {isFullLoading && <FullLoading />}
      <article className="contentWrap">
        <Controller />
        <div className="pageTitle">Edit Circular Geofence</div>

        <Stack direction="row" gap="40px" mb="40px">
          <Stack gap="20px" sx={{ width: "50%" }}>
            <InputBox>
              <InputBox.Head>
                <InputBox.Title>
                  Type<i>*</i>
                </InputBox.Title>
                <InputBox.Info tooltipText="tooptip example" />
                <InputBox.Number>50/60</InputBox.Number>
              </InputBox.Head>
              <InputBox.Body>
                <Select value={"circular"} sx={{ width: "100%" }} disabled>
                  <MenuItem value={"circular"}>Circular</MenuItem>
                  <MenuItem value={"polygon"}>Polygon</MenuItem>
                </Select>
              </InputBox.Body>
            </InputBox>

            <CircularType
              id={
                mapManager.circles.length > 0
                  ? mapManager.circles[0].id
                  : undefined
              }
              updateCircleRadius={mapManager.updateCircleRadius}
              updateCircleCenter={mapManager.updateCircleCenter}
              lat={
                mapManager.circles.length > 0
                  ? mapManager.circles[0].center.lat
                  : undefined
              }
              long={
                mapManager.circles.length > 0
                  ? mapManager.circles[0].center.lng
                  : undefined
              }
              radius={
                mapManager.circles.length > 0
                  ? mapManager.circles[0].radius
                  : undefined
              }
              groupId={Number(currentGrpId)}
            />
          </Stack>

          <Stack gap="20px" sx={{ width: "50%", height: "500px" }}>
            <Box flex={1}>
              <Maps
                ref={mapRef}
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
                zoom={13}
                center={{
                  lat: 37.564823,
                  lng: 126.976951,
                }}
                drawingModes={["circle"] as google.maps.drawing.OverlayType[]}
                onOverlayComplete={mapManager.completeOverlay}
                editableDrawing
                disableDrawing={mapManager.circles.length > 0}
              />
            </Box>
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
            onClick={() =>
              router.push(
                `/configuration/geofence?imei=${currentPort.port.imei}`
              )
            }
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleEdit}
            disabled={mapManager.circles.length === 0}
          >
            Save
          </Button>
        </Stack>
      </article>
    </div>
  );
}

function CircularType({
  id,
  lat,
  long,
  radius,
  updateCircleCenter,
  updateCircleRadius,
  groupId,
}: {
  id?: number;
  lat?: number;
  long?: number;
  radius?: number;
  updateCircleCenter?: (
    circleId: number,
    newLat: number,
    newLng: number
  ) => void;
  updateCircleRadius?: (circleId: number, newRadius: number) => void;
  groupId?: number;
}) {
  return (
    <>
      <InputBox>
        <InputBox.Head>
          <InputBox.Title>
            Group<i>*</i>
          </InputBox.Title>
          <InputBox.Info tooltipText="tooptip example" />
          <InputBox.Number>2300</InputBox.Number>
        </InputBox.Head>
        <InputBox.Body>
          <Select disabled value={groupId} sx={{ width: "100%" }}>
            <MenuItem value={`${groupId}`}>{groupId}</MenuItem>
          </Select>
        </InputBox.Body>
      </InputBox>

      <InputBox>
        <InputBox.Head>
          <InputBox.Title>
            Latitude<i>*</i>
          </InputBox.Title>
          <InputBox.Info tooltipText="tooptip example" />
          <InputBox.Number>2300</InputBox.Number>
        </InputBox.Head>
        <InputBox.Body>
          <TextField
            fullWidth
            value={lat?.toFixed(6)}
            disabled={id === undefined}
            onChange={(e) =>
              updateCircleCenter(id, Number(e.target.value), long)
            }
          />
        </InputBox.Body>
      </InputBox>

      <InputBox>
        <InputBox.Head>
          <InputBox.Title>
            Longitude<i>*</i>
          </InputBox.Title>
          <InputBox.Info tooltipText="tooptip example" />
          <InputBox.Number>2300</InputBox.Number>
        </InputBox.Head>
        <InputBox.Body>
          <TextField
            fullWidth
            value={long?.toFixed(6)}
            disabled={id === undefined}
            onChange={(e) =>
              updateCircleCenter(id, lat, Number(e.target.value))
            }
          />
        </InputBox.Body>
      </InputBox>

      <InputBox>
        <InputBox.Head>
          <InputBox.Title>
            Radius<i>*</i>
          </InputBox.Title>
          <InputBox.Info tooltipText="tooptip example" />
          <InputBox.Number>2300</InputBox.Number>
        </InputBox.Head>
        <InputBox.Body>
          <TextField
            fullWidth
            value={radius?.toFixed(6)}
            disabled={id === undefined}
            onChange={(e) => updateCircleRadius(id, Number(e.target.value))}
          />
        </InputBox.Body>
      </InputBox>
    </>
  );
}

const columns: GridColDef[] = [
  {
    field: "lat",
    headerName: "Latitude",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "long",
    headerName: "Longitude",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "delete",
    headerName: "Delete",
    width: 80,
    headerAlign: "center",
    align: "center",
    renderCell: (event) => (
      <IconButton
        onClick={() => {
          event.value.onDelete();
        }}
      >
        <DeleteForeverOutlinedIcon />
      </IconButton>
    ),
  },
];
