import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FormField } from "../page";
import { Stack } from "@mui/material";
import {
  AddGeofence,
  EditCircularGeofence,
  Geofence,
  GeofenceConfig,
} from "../(geofence)/@index";
import { SerialPortState } from "@/src/stores/useSerialStore";
import EditPolygonGeofence from "../(geofence)/EditPolygonGefence";

interface Props {
  formData: {
    [key: string]: FormField;
  };
  setFormData: Dispatch<
    SetStateAction<{
      [key: string]: FormField;
    }>
  >;
  originData: any;
  isReady: boolean;
  write?: ({
    data,
    port,
    writer,
  }: {
    data: string;
    port: SerialPortState;
    writer: WritableStreamDefaultWriter<string>;
  }) => Promise<Boolean>;
  port?: SerialPortState;
}

export default function GeofenceTab({
  formData,
  setFormData,
  originData,
  isReady,
  write,
  port,
}: Props) {
  const [mustFetch, setMustFetch] = useState(true);
  const [type, setType] = useState<"list" | "add" | "edit">("list");
  const [editId, setEditId] = useState<number>(0);
  const [editType, setEditType] = useState<"polygon" | "circular">("polygon");

  const handleValueChange = (name, value, alertId = undefined) => {
    setFormData((prev) => ({
      ...prev,
      [name]: {
        value,
        key: prev[name].key,
        realValue: value,
        list: prev[name].list,
        alert_id: alertId,
      },
    }));
  };

  const infoFields = originData.map(
    (shit) => Object.values(shit)[0][0].info?.[0]
  );

  const circularGeofenceMax =
    infoFields.find((shit) => shit?.tab_id === "50")?.max * 1 || 0;
  const polygonGeofenceMax =
    infoFields.find((shit) => shit?.tab_id === "53")?.max * 1 || 0;

  const circularGeofenceObj = originData.find(
    (item) => item["Circular Geofence"]
  );
  const polygonGeofenceObj = originData.find(
    (item) => item["Polygon Geofence"]
  );
  const circularGeofenceArray = circularGeofenceObj?.["Circular Geofence"];
  const polygonGeofenceArray = polygonGeofenceObj?.["Polygon Geofence"];

  const circularGeofenceKeys: string[] = circularGeofenceArray.map(
    (item) => Object.keys(item)[0]
  );

  const polygonGeofenceInfo: { [key: string]: { [key: string]: string[] } }[] =
    polygonGeofenceArray
      .find((item) => Object.keys(item)[0] === "Set Geofence Parameter")
      ?.["Set Geofence Parameter"].find(
        (item) => Object.keys(item)[0] === "sub"
      )?.["sub"];

  const polygonGeofenceKeys = (polygonGeofenceInfo || []).map(
    (object) => Object.keys(object)[0]
  );

  const renderGeofence = () => {
    if (type === "list") {
      return (
        <>
          <GeofenceConfig formData={formData} onChange={handleValueChange} />

          <Geofence
            formData={formData}
            currentPort={port}
            isReady={isReady && mustFetch}
            write={write}
            polygonGeofenceMax={polygonGeofenceMax}
            circularGeofenceMax={circularGeofenceMax}
            onAfterFetch={() => setMustFetch(false)}
            onAdd={() => setType("add")}
            onEdit={(id: number, type: "polygon" | "circular") => {
              setType("edit");
              setEditId(id);
              setEditType(type);
            }}
          />
        </>
      );
    }

    if (type === "add") {
      return (
        <AddGeofence
          formData={formData}
          currentPort={port}
          write={write}
          polygonGeofenceMax={polygonGeofenceMax}
          circularGeofenceMax={circularGeofenceMax}
          onSuccess={() => setMustFetch(true)}
          circularGeofenceKeys={circularGeofenceKeys}
          polygonGeofenceKeys={polygonGeofenceKeys}
          onCancel={() => setType("list")}
        />
      );
    }

    if (type === "edit") {
      if (editType === "polygon") {
        return (
          <EditPolygonGeofence
            id={editId}
            formData={formData}
            currentPort={port}
            write={write}
            onSuccess={() => setMustFetch(true)}
            onCancel={() => setType("list")}
          />
        );
      }

      if (editType === "circular") {
        return (
          <>
            <EditCircularGeofence
              id={editId}
              formData={formData}
              currentPort={port}
              write={write}
              circularGeofenceKeys={circularGeofenceKeys}
              onSuccess={() => setMustFetch(true)}
              onCancel={() => setType("list")}
            />
          </>
        );
      }
    }
  };

  return (
    <Stack className="contentWrap" direction="column" gap={"20px"}>
      {renderGeofence()}
    </Stack>
  );
}
