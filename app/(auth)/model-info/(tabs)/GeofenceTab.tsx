import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FormField } from "../page";
import { Stack } from "@mui/material";
import {
  AddGeofence,
  EditCircularGeofence,
  Geofence,
  GeofenceConfig,
} from "../(geofence)/@index";
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
}

export default function GeofenceTab({
  formData,
  setFormData,
  originData,
}: Props) {
  const [mustFetch, setMustFetch] = useState(true);
  const [type, setType] = useState<"list" | "add" | "edit">("list");
  const [editId, setEditId] = useState<number>(0);
  const [editType, setEditType] = useState<"polygon" | "circular">("polygon");

  const handleValueChange = (name, value, alertId = undefined) => {
    setFormData((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        value,
        realValue: value,
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
  const circularGeofenceArray = circularGeofenceObj?.["Circular Geofence"];

  const circularGeofenceKeys: string[] = circularGeofenceArray.map(
    (item) => Object.keys(item)[0]
  );

  const renderGeofence = () => {
    if (type === "list") {
      return (
        <>
          <GeofenceConfig formData={formData} setFormData={setFormData} onChange={handleValueChange} />

          <Geofence
            formData={formData}
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
          polygonGeofenceMax={polygonGeofenceMax}
          circularGeofenceMax={circularGeofenceMax}
          onSuccess={() => setMustFetch(true)}
          circularGeofenceKeys={circularGeofenceKeys}
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
