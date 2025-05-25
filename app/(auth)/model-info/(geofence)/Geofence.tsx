import { Button, IconButton, MenuItem, Select, Stack } from "@mui/material";
import { GridColDef, GridRowParams } from "@mui/x-data-grid";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import styled from "styled-components";
import InputBox from "@/components/inputbox/InputBox";
import { SECTIONS } from "constants/searchField";
import useLangStore from "@/utils/useLangStore";
import Maps from "@/components/Map";
import { useEffect, useMemo, useRef, useState } from "react";
import { useMapManager } from "@/src/hooks/useMapManager";
import DataTable from "@/components/dataTable";
import { CircleType, PolygonType } from "@/components/Map/type";
import { useTranslations } from "next-intl";
import { FormField } from "../page";
import {
  getModelDataFromIDB,
  IDBCircularGeofence,
  IDBPolygonGeofence,
  IDBModelData,
  deletePolygonGeofenceFromIDB,
  deleteCircularGeofenceFromIDB,
} from "@/utils/idbModelUtil";
import useModelInfoStore from "@/src/stores/useModelInfo";

interface Props {
  formData: {
    [key: string]: FormField;
  };

  polygonGeofenceMax: number;
  circularGeofenceMax: number;
  onAfterFetch?: () => void;
  onAdd?: () => void;
  onEdit?: (id: number, type: "polygon" | "circular") => void;
}

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
    headerName: "ID",
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
    renderCell: (e) => (
      <IconButton
        onClick={(event) => {
          event.stopPropagation();
          e.value.onEdit();
        }}
      >
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
    renderCell: (e) => (
      <IconButton
        onClick={(event) => {
          event.stopPropagation();
          e.value.onDelete();
        }}
      >
        <DeleteForeverOutlinedIcon />
      </IconButton>
    ),
  },
];

const tooltipText = {
  en: "When geofences are set in the form of a polygon or circular shape on the map, the configured actives will be triggered when the device enters or exits the boundary.",
  pt: "Quando os geofences são configurados na forma de um polígono ou forma circular no mapa, as ações configuradas serão acionadas quando o dispositivo entrar ou sair do limite.",
  es: "Cuando las geocercas se configuran en forma de polígono o círculo en el mapa, las acciones configuradas se activarán cuando el dispositivo ingrese o salga del límite.",
};

const Geofence = ({ onAdd, onEdit }: Props) => {
  const { getModelName, getFwVer, getTargetCountry } = useModelInfoStore();

  const modelName = useMemo(() => getModelName(), [getModelName]);
  const fwVer = useMemo(() => getFwVer(), [getFwVer]);
  const targetCountry = useMemo(() => getTargetCountry(), [getTargetCountry]);

  const [typeFilter, setTypeFilter] = useState<"All" | "Polygon" | "Circular">(
    "All"
  );
  const t = useTranslations();
  const lang = useLangStore((state) => state.lang);
  const mapRef = useRef<google.maps.Map>(null);
  const mapManager = useMapManager();
  const [fetchedPolygonData, setFetchedPolygonData] = useState<PolygonType>();
  const [fetchedCircleData, setFetchedCircleData] = useState<CircleType>();

  const [circularGeofences, setCircularGeofences] = useState<
    IDBCircularGeofence[]
  >([]);
  const [polygonGeofences, setPolygonGeofences] = useState<
    IDBPolygonGeofence[]
  >([]);

  const syncGeofenceConfig = () => {
    const submitButton = document.getElementById("geofence-config-submit");
    if (submitButton) {
      submitButton.click();
    }
  };

  const makeRow = (
    item: IDBCircularGeofence | IDBPolygonGeofence,
    idx: number,
    type: "Circular" | "Polygon"
  ) => ({
    id: `${type.toLowerCase()}-${item.id ?? idx + 1}`,
    no: idx + 1,
    type,
    groupId: item.id ?? idx + 1,
    edit: {
      id: item.id ?? idx + 1,
      onEdit: () => {
        onEdit?.(item.id ?? idx + 1, type.toLowerCase() as any);
      },
    },
    delete: {
      id: item.id ?? idx + 1,
      onDelete: async () => {
        if (type === "Polygon") {
          await deletePolygonGeofenceFromIDB(
            modelName,
            fwVer,
            targetCountry,
            item.id as number
          );
          const modelData = await getModelDataFromIDB(
            modelName,
            fwVer,
            targetCountry
          );
          setPolygonGeofences(modelData?.geofence?.polygon || []);
        } else {
          await deleteCircularGeofenceFromIDB(
            modelName,
            fwVer,
            targetCountry,
            item.id as number
          );
          const modelData = await getModelDataFromIDB(
            modelName,
            fwVer,
            targetCountry
          );
          setCircularGeofences(modelData?.geofence?.circular || []);
        }
      },
    },
  });

  const rows = useMemo(() => {
    let data: Array<any> = [];
    if (typeFilter === "Circular") {
      data = circularGeofences.map((item, idx) =>
        makeRow(item, idx, "Circular")
      );
    } else if (typeFilter === "Polygon") {
      data = polygonGeofences.map((item, idx) => makeRow(item, idx, "Polygon"));
    } else {
      const circularRows = circularGeofences.map((item, idx) =>
        makeRow(item, idx, "Circular")
      );
      const polygonRows = polygonGeofences.map((item, idx) =>
        makeRow(item, idx, "Polygon")
      );
      // no 필드가 연속되게 하려면 아래처럼
      polygonRows.forEach(
        (row, idx) => (row.no = circularRows.length + idx + 1)
      );
      data = [...circularRows, ...polygonRows];
    }
    return data;
  }, [typeFilter, circularGeofences, polygonGeofences, onEdit]);

  const handleRowClick = (data: GridRowParams<any>) => {
    if (data.row.type === "Polygon") {
      const polygon = polygonGeofences.find(
        (item) => (item.id ?? 0) === data.row.groupId
      );
      if (polygon) {
        const polygonData: PolygonType = {
          paths: polygon.coordinates.map(({ lat, lng }) => ({
            lat,
            lng,
          })),
          // 필요하다면 추가 필드도 여기에
        };
        setFetchedPolygonData(polygonData);
        setFetchedCircleData(undefined);
        mapRef.current.setCenter({
          lat: polygon.coordinates[0].lat,
          lng: polygon.coordinates[0].lng,
        });
      }
    } else {
      // 1. id로 해당 circular geofence 찾기
      const circular = circularGeofences.find(
        (item) => (item.id ?? 0) === data.row.groupId
      );
      if (circular) {
        // 2. CircleType으로 변환
        const circleData: CircleType = {
          center: {
            lat: circular.latitude,
            lng: circular.longitude,
          },
          radius: circular.distance,
          // 필요하다면 추가 필드도 여기에
        };
        setFetchedPolygonData(undefined);
        setFetchedCircleData(circleData);
        mapRef.current.setCenter({
          lat: circular.latitude,
          lng: circular.longitude,
        });
      }
    }
  };

  useEffect(() => {
    const loadGeofence = async () => {
      const modelData = (await getModelDataFromIDB(
        modelName,
        fwVer,
        targetCountry
      )) as IDBModelData | null;
      if (modelData && modelData.geofence) {
        setCircularGeofences(modelData.geofence.circular || []);
        setPolygonGeofences(modelData.geofence.polygon || []);
      } else {
        setCircularGeofences([]);
        setPolygonGeofences([]);
      }
    };
    loadGeofence();
  }, []);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Stack direction="row" gap={"4px"} alignItems="center">
        <h1 data-section-id={SECTIONS.GeofenceConfig.en}>
          {t("configuration.geofence.geofence")}
        </h1>
        <InputBox.Info
          tooltipText={
            <span style={{ whiteSpace: "pre-wrap" }}>{tooltipText[lang]}</span>
          }
        />
      </Stack>

      <Stack direction="row" gap={"24px"}>
        <Stack gap={"8px"} flex={1}>
          <Stack direction="row" gap="8px" justifyContent="space-between">
            <Select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              sx={{ minWidth: 160 }}
            >
              <MenuItem value={"All"}>{t("configuration.driver.all")}</MenuItem>
              <MenuItem value={"Polygon"}>
                {t("configuration.geofence.polygon")}
              </MenuItem>
              <MenuItem value={"Circular"}>
                {t("configuration.geofence.circular")}
              </MenuItem>
            </Select>

            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                syncGeofenceConfig();
                onAdd?.();
              }}
            >
              {t("model.add_model_pop_up.add")}
            </Button>
          </Stack>

          <DataTable
            noDataMessage={t("configuration.geofence.no_registered_geofence")}
            onRowClick={handleRowClick}
            rows={rows}
            columns={columns}
          />
        </Stack>

        <Stack gap={"24px"} flex={1}>
          <Stack gap="20px" sx={{ width: "100%", height: "500px" }}>
            <Maps
              ref={mapRef}
              apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
              zoom={13}
              drawingModes={[] as google.maps.drawing.OverlayType[]}
              onOverlayComplete={mapManager.completeOverlay}
              polygons={fetchedPolygonData ? [fetchedPolygonData] : undefined}
              circles={fetchedCircleData ? [fetchedCircleData] : undefined}
            />
          </Stack>
        </Stack>
      </Stack>
    </Form>
  );
};

export default Geofence;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;

  h1 {
    padding: 16px 0;
    font-weight: 700;
    font-size: 20px;
    line-height: 100%;
  }
`;
