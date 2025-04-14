"use client";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import Maps from "@/components/Map";
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
  useEffect,
  useRef,
  useState,
  Suspense,
  lazy,
} from "react";
import InputBox from "@/components/inputbox/InputBox";
import { SwitchPrimary } from "@/components/switches";
import { GridColDef, GridRowParams } from "@mui/x-data-grid";
import DataTable from "@/components/dataTable";
import { useTransformedConfigData } from "@/src/hooks/useTransformConfigData";
import useSerial, { delayPromise } from "@/src/hooks/useSerial";
import {
  AT_EDIT_PREFIX,
  AT_GET_CIRCULAR_GEOFENCE_255_LIST,
  AT_GET_CIRCULAR_GEOFENCE_999_LIST,
  AT_GET_POLYGON_GEOFENCE_LIST,
  CR,
  POLYGON_GEOFENCE_POINTS,
} from "@/src/hooks/useSerial/constant";
import {
  getCircularGeofenceData,
  getPolygonGeofenceData,
} from "@/src/hooks/useSerial/utils";
import {
  findCircleIndexByNumber,
  generateFormattedIndexes,
} from "@/utils/generateFormattedIndexes";
import { useMapManager } from "@/src/hooks/useMapManager";
import type { PolygonType, CircleType } from "@/components/Map/type";
import useSerialStore from "@/src/stores/useSerialStore";
import FullLoading from "@/components/FullLoading";
import {
  parseLatLngRadius,
  parseResponseToPolygonData,
} from "../configuration/geofence/utils";
import { chunkDataByNumberAndWrite } from "@/src/functions";

interface GeofenceProps {
  imei: string;
}

// 컴포넌트 타입 정의
type GeofenceViewType = "list" | "edit-polygon" | "edit-circular" | "add";

/**
 * ListView 컴포넌트 props 타입 정의
 * 지오펜스 목록을 표시하고 필터링, 추가, 삭제, 편집 기능을 제공하는 컴포넌트의 props
 */
interface ListViewProps {
  imei: string;
  onEdit: () => void;
  onAdd: () => void;
  onDelete: () => void;
  onRowClick: (data: GridRowParams<any>) => void;
  typeFilter: string;
  setTypeFilter: Dispatch<SetStateAction<string>>;
  rows: any[];
  mapRef: React.RefObject<google.maps.Map>;
  fetchedPolygonData: PolygonType | undefined;
  fetcheCircleData: CircleType | undefined;
  mapManager: ReturnType<typeof useMapManager>;
}

// EditPolygonView 컴포넌트 props 타입 정의
interface EditPolygonViewProps {
  imei: string;
  groupId: number | null;
  onBack: () => void;
}

// EditCircularView 컴포넌트 props 타입 정의
interface EditCircularViewProps {
  imei: string;
  groupId: number | null;
  onBack: () => void;
}

// 동적 임포트를 사용하여 AddGeofence 컴포넌트 로드
const AddGeofence = lazy(() => import("./AddGeofence"));
const EditGeofence = lazy(() => import("./EditGeofence"));

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

const center = {
  lat: 37.564823,
  lng: 126.976951,
};

/**
 * 리스트 뷰 컴포넌트
 * 지오펜스 목록과 지도를 표시하는 화면
 */
const ListView = ({
  imei,
  onEdit,
  onAdd,
  onDelete,
  onRowClick,
  typeFilter,
  setTypeFilter,
  rows,
  mapRef,
  fetchedPolygonData,
  fetcheCircleData,
  mapManager,
}: ListViewProps) => {
  const handleSelectChange = (
    e: SelectChangeEvent,
    setState: Dispatch<SetStateAction<string>>
  ) => {
    setState(e.target.value);
  };

  return (
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
            value={typeFilter}
            onChange={(e) => handleSelectChange(e, setTypeFilter)}
            sx={{ minWidth: 160 }}
          >
            <MenuItem value={"All"}>All</MenuItem>
            <MenuItem value={"Polygon"}>Polygon</MenuItem>
            <MenuItem value={"Circular"}>Circular</MenuItem>
          </Select>

          <Button variant="contained" color="secondary" onClick={onAdd}>
            Add
          </Button>
        </Stack>
        <DataTable
          noDataMessage="No registered geofence"
          disablePagination={false}
          onRowClick={onRowClick}
          disableRowClick={false}
          rows={rows}
          columns={columns}
          footerButton={
            <Button variant="text" color="info">
              Delete
            </Button>
          }
        />
      </Stack>

      <Stack gap="20px" sx={{ width: "50%", height: "500px" }}>
        <Box flex={1}>
          <Maps
            ref={mapRef}
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
            zoom={13}
            center={center}
            drawingModes={
              ["circle", "polygon"] as google.maps.drawing.OverlayType[]
            }
            onOverlayComplete={mapManager.completeOverlay}
            polygons={fetchedPolygonData ? [fetchedPolygonData] : undefined}
            circles={fetcheCircleData ? [fetcheCircleData] : undefined}
          />
        </Box>
      </Stack>
    </Stack>
  );
};

// 편집 뷰 컴포넌트 (폴리곤)
const EditPolygonView = ({ imei, groupId, onBack }: EditPolygonViewProps) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditGeofence
        imei={imei}
        groupId={groupId}
        type="polygon"
        onBack={onBack}
      />
    </Suspense>
  );
};

// 편집 뷰 컴포넌트 (원형)
const EditCircularView = ({ imei, groupId, onBack }: EditCircularViewProps) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditGeofence
        imei={imei}
        groupId={groupId}
        type="circular"
        onBack={onBack}
      />
    </Suspense>
  );
};

/**
 * Geofence 메인 컴포넌트
 * 지오펜스 목록 조회, 추가, 편집, 삭제 기능을 관리
 */
const Geofence = ({ imei }: GeofenceProps) => {
  // 뷰 상태 관리
  const [currentView, setCurrentView] = useState<GeofenceViewType>("list");
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);

  // 지오펜스 데이터 관리
  const [fetchedPolygonData, setFetchedPolygonData] = useState<PolygonType>();
  const [fetcheCircleData, setFetchedCircleData] = useState<CircleType>();
  const [isCircularFetchReady, setIsCircularFetchReady] = useState(false);
  const [typeFilter, setTypeFilter] = useState<"All" | "Polygon" | "Circular">(
    "All"
  );
  const [isFullLoading, setIsFullLoading] = useState<boolean>(false);

  // 참조 및 상태 관리
  const mapRef = useRef<google.maps.Map>(null);
  const polygonPointRef = useRef("");
  const circlePointRef = useRef("");
  const mapManager = useMapManager();
  const { setPolygonGeofence, setCircularGeofence } = useSerialStore();

  // 시리얼 통신 관련
  const {
    state: { portList },
    func: { write },
  } = useSerial();

  const currentPort = portList.find(({ port }) => port.imei === imei);

  // 설정 데이터 관련
  const { formData, getFormFields, getEditDataForPage } =
    useTransformedConfigData({
      data: portList.find(({ port }) => port.imei === imei).packageToJson
        .synctrak,
      blacklist: ["info"],
    });

  // 최대 지오펜스 개수 설정
  const polygonGeofenceMax = formData.find(({ info }) => info.tab_id === "53")
    ?.info.max;
  const circularGeofenceMax = formData.find(({ info }) => info.tab_id === "50")
    ?.info.max;

  // 지오펜스 데이터
  const polygonList = currentPort.polygonGeofenceData;
  const circularList = currentPort.circularGeofenceData;
  const polygonData = getPolygonGeofenceData(polygonList);
  const circularData = getCircularGeofenceData(circularList);

  /**
   * 테이블에 표시할 행 데이터 생성
   * typeFilter에 따라 필터링된 지오펜스 목록을 표시
   */
  const rows = [
    ...(typeFilter === "Circular" ? [] : polygonData),
    ...(typeFilter === "Polygon" ? [] : circularData),
  ].map(({ type, groupId }, index) => {
    return {
      id: index + 1,
      no: index + 1,
      type: type === "polygon" ? "Polygon" : "Circular",
      groupId,
      edit: {
        id: groupId,
        onEdit: () => {
          if (type === "polygon") {
            setSelectedGroupId(groupId);
            setCurrentView("edit-polygon");
          } else {
            setSelectedGroupId(groupId);
            setCurrentView("edit-circular");
          }
        },
      },
      delete: {
        id: groupId,
        onDelete: () => {
          // 지오펜스 삭제 처리
          const imei = currentPort.port.imei;
          if (type === "polygon") {
            // 폴리곤 지오펜스 삭제 로직
            const isPolygonSpeedLimitDisabled =
              polygonList[groupId - 1].split("#")[1].length === 6;

            currentPort.port.oneditsuccess = () => {
              // 삭제 성공 시 상태 업데이트
              setPolygonGeofence({
                imei,
                payload: polygonList.map((value, index) =>
                  index === groupId - 1
                    ? `${groupId}#${
                        isPolygonSpeedLimitDisabled
                          ? "000000"
                          : "00000000000000"
                      }`
                    : value
                ),
              });
            };

            // 삭제 명령 전송
            write({
              data: `${AT_EDIT_PREFIX}${imei};53;${String(groupId - 1).padStart(
                2,
                "0"
              )}#${isPolygonSpeedLimitDisabled ? "000000" : "00000000000000"}`,
              port: currentPort.port,
              writer: currentPort.writer,
            });
          } else {
            // 원형 지오펜스 삭제 로직
            const circleIndex = findCircleIndexByNumber(groupId - 1);
            const [id, circleInfo] = circularList[groupId - 1].split("#");
            const removedCircleInfo =
              circleInfo.slice(0, 20) + "0000" + circleInfo.slice(24);

            currentPort.port.oneditsuccess = () => {
              // 삭제 성공 시 상태 업데이트
              setCircularGeofence({
                imei,
                payload: circularList.map((value, index) =>
                  index === groupId - 1 ? `${id}#NoData` : value
                ),
              });
            };

            // 삭제 명령 전송
            write({
              data: `${AT_EDIT_PREFIX}${imei};${circleIndex}#${removedCircleInfo}`,
              port: currentPort.port,
              writer: currentPort.writer,
            });
          }
        },
      },
    };
  });

  /**
   * 테이블 행 클릭 핸들러
   * 선택된 지오펜스를 지도에 표시
   */
  const handleRowClick = (data: GridRowParams<any>) => {
    const imei = currentPort.port.imei;

    if (data.row.type === "Polygon") {
      // 폴리곤 지오펜스 선택 시
      setFetchedCircleData(undefined);
      const polyCount = polygonData.find(
        ({ groupId }) => groupId === data.row.groupId
      ).polygonCount;

      // 폴리곤 포인트 페칭 설정
      currentPort.port.ispolygonpointfetching = true;
      currentPort.port.polygonhandler = (value) => {
        // 응답 데이터 누적
        polygonPointRef.current += value;

        // 모든 데이터가 수신되었는지 확인
        if (
          polygonPointRef.current.split(CR).length - 1 ===
          Math.ceil(polyCount / 20)
        ) {
          currentPort.port.ispolygonpointfetching = false;

          // 수신된 데이터 처리
          const polygonPoint = polygonPointRef.current
            .split(CR)
            .filter((item) => item !== "");
          const header = polygonPoint[0].split(";").slice(0, 3).join(";") + ";";
          const combinedData = polygonPoint
            .map((item) => item.split(";").slice(3).join(";"))
            .join(";");
          const polygonAllData = header + combinedData;

          // 폴리곤 데이터 파싱
          const polygonData = parseResponseToPolygonData(polygonAllData, () => {
            polygonPointRef.current = "";
            setFetchedPolygonData(undefined);
          });

          // 파싱된 데이터가 있으면 지도에 표시
          if (polygonData) {
            setFetchedPolygonData({ paths: polygonData.path });
            if (mapRef.current) {
              // 지도 중심 위치 조정
              mapRef.current.setCenter({
                lat: polygonData.path[0].lat,
                lng: polygonData.path[0].lng,
              });
            }
          }
          polygonPointRef.current = "";
        }
      };

      // 이전 화면으로 돌아갈 때 핸들러 정리
      currentPort.port.onprev = () => {
        currentPort.port.polygonhandler = null;
        currentPort.port.ispolygonpointfetching = false;
      };

      // 폴리곤 지오펜스 데이터 요청
      chunkDataByNumberAndWrite(
        { write, port: currentPort.port, writer: currentPort.writer },
        {
          chuckString: ",",
          prefix: `AT^REQ;${imei};${
            POLYGON_GEOFENCE_POINTS[(data.row.groupId - 1) as number]
          };`,
          target: generateFormattedIndexes(polyCount).join(),
        }
      );
    } else {
      // 원형 지오펜스 선택 시
      setFetchedPolygonData(undefined);
      const circleIndex = findCircleIndexByNumber(data.row.groupId - 1);

      // 원형 지오펜스 데이터 페칭 설정
      currentPort.port.iscircularpointfetching = true;
      currentPort.port.circlehandler = (value) => {
        circlePointRef.current += value;
        if (value.includes(CR)) {
          // 응답 데이터 처리
          const circleData = parseLatLngRadius(circlePointRef.current);
          if (mapRef.current) {
            // 지도 중심 위치 조정
            mapRef.current.setCenter({
              lat: circleData.center.lat,
              lng: circleData.center.lng,
            });

            circlePointRef.current = "";
          }
          // 파싱된 데이터 저장 및 표시
          setFetchedCircleData(circleData);
          currentPort.port.iscircularpointfetching = false;
        }
      };

      // 이전 화면으로 돌아갈 때 핸들러 정리
      currentPort.port.onprev = () => {
        currentPort.port.circlehandler = null;
        currentPort.port.iscircularpointfetching = false;
      };

      // 원형 지오펜스 데이터 요청
      write({
        data: `AT^REQ;${imei};${circleIndex}`,
        port: currentPort.port,
        writer: currentPort.writer,
      });
    }
  };

  /**
   * 리스트 화면으로 돌아가기
   * 지오펜스 추가/편집 후 호출됨
   */
  const handleBackToList = () => {
    setCurrentView("list");
    setSelectedGroupId(null);

    // 지오펜스 추가/편집 후 리스트로 돌아왔을 때 데이터 리페칭
    if (currentPort.port.needsGeofenceRefetch) {
      currentPort.port.needsGeofenceRefetch = false;
      fetchGeofenceData();
    }
  };

  /**
   * 지오펜스 데이터 페칭
   * 폴리곤 지오펜스 데이터를 먼저 가져오고, 완료되면 원형 지오펜스 데이터를 가져옴
   */
  const fetchGeofenceData = () => {
    setIsFullLoading(true);
    setIsCircularFetchReady(false);

    // 포트가 유효한지 확인
    if (!currentPort.port.readable || !currentPort.port.writable) return;

    // 폴리곤 지오펜스 최대 개수가 없으면 원형 지오펜스 데이터 페칭으로 넘어감
    if (!polygonGeofenceMax) {
      return setIsCircularFetchReady(true);
    }

    // 폴리곤 지오펜스 데이터 페칭 설정
    currentPort.port.polygonfetchcount = 0;
    currentPort.port.ispolygonfetching = true;
    currentPort.port.polygonmax = Number(polygonGeofenceMax);

    // 폴리곤 지오펜스 데이터 페칭 완료 후 콜백
    currentPort.port.onafterpolygongeofence = () => {
      currentPort.port.ispolygonfetching = false;
      // 폴리곤 데이터 페칭 완료 후 원형 지오펜스 데이터 페칭 트리거
      setIsCircularFetchReady(true);
      currentPort.port.polygongeofence = "";
    };

    // 폴리곤 지오펜스 데이터 요청 (여러 명령 연속 실행)
    (async () => {
      for (const command of AT_GET_POLYGON_GEOFENCE_LIST(imei)) {
        await delayPromise(60); // 60ms 지연

        write({
          data: command,
          port: currentPort.port,
          writer: currentPort.writer,
        });
      }
    })();
  };

  // 추가 버튼 클릭 핸들러
  const handleAddClick = () => {
    setCurrentView("add");
  };

  // 초기 데이터 로드
  useEffect(() => {
    fetchGeofenceData();
  }, [currentPort.port.readable, currentPort.port.writable]);

  /**
   * 원형 지오펜스 데이터 페칭
   * 폴리곤 지오펜스 데이터 페칭이 완료되면 실행됨
   */
  useEffect(() => {
    // 원형 지오펜스 최대 개수가 없거나 페칭 준비가 안 되었으면 종료
    if (!circularGeofenceMax || !isCircularFetchReady) return;
    // 포트가 유효한지 확인
    if (!currentPort.port.writable || !currentPort.port.readable) return;

    // 원형 지오펜스 데이터 페칭 설정
    currentPort.port.circularfetchcount = 0;
    currentPort.port.iscircularfetching = true;
    currentPort.port.circlemax = Number(circularGeofenceMax);

    // 원형 지오펜스 데이터 페칭 완료 후 콜백
    currentPort.port.onaftercirculargeofence = () => {
      currentPort.port.iscircularfetching = false;
      setIsFullLoading(false);
      setIsCircularFetchReady(false);
      currentPort.port.circulargeofence = "";
    };

    // 원형 지오펜스 데이터 요청 (여러 명령 연속 실행)
    (async () => {
      for (const command of circularGeofenceMax === "255"
        ? AT_GET_CIRCULAR_GEOFENCE_255_LIST(imei)
        : AT_GET_CIRCULAR_GEOFENCE_999_LIST(imei)) {
        await delayPromise(60); // 60ms 지연

        write({
          data: command,
          port: currentPort.port,
          writer: currentPort.writer,
        });
      }
    })();
  }, [isCircularFetchReady]);

  /**
   * 지오펜스 설정 UI 렌더링
   * 지오펜스 설정을 변경할 수 있는 스위치와 저장 버튼 제공
   */
  const renderGeofenceConfig = () => {
    if (currentView !== "list") return null;
    const geofenceConfig = formData.find(({ info }) => {
      return info.tab_id === "90";
    });

    if (!geofenceConfig) return null;

    const geoConfigFields = geofenceConfig.fields.map(({ ID }) => ID); // ["0", "1", "2"]

    const renderConfigItem = (
      fieldId: string,
      title: string,
      number: string,
      tooltipText: React.ReactNode
    ) => {
      if (!geoConfigFields.includes(fieldId)) return null;

      const fieldName = geofenceConfig.fields.find(
        ({ ID }) => ID === fieldId
      )?.fieldName;

      const { value, onChange } = getFormFields(
        geofenceConfig.tabName,
        fieldName
      );

      return (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap="10px"
          sx={{ width: "calc(50% - 20px)" }}
        >
          <Stack direction="row" alignItems="center" gap="5px">
            <InputBox.Title>{title}</InputBox.Title>
            <InputBox.Info tooltipText={tooltipText} />
            <InputBox.Number>{number}</InputBox.Number>
          </Stack>
          <InputBox.Body>
            <SwitchPrimary
              checked={value === "Enable"}
              onChange={(e) =>
                onChange(e.target.checked ? "Enable" : "Disable")
              }
            />
          </InputBox.Body>
        </Stack>
      );
    };

    return (
      <Stack>
        <InputBox>
          <Stack direction="row" justifyContent="space-between">
            <InputBox.Head>
              <InputBox.Title>
                <div className="pageTitle" style={{ marginBottom: 0 }}>
                  Geofence Config
                </div>
              </InputBox.Title>
            </InputBox.Head>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => {
                write({
                  data: `${AT_EDIT_PREFIX}${imei};${getEditDataForPage(
                    geofenceConfig.tabName
                  )}`,
                  port: currentPort.port,
                  writer: currentPort.writer,
                });
              }}
            >
              Send
            </Button>
          </Stack>
        </InputBox>

        <InputBox>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            flexWrap="wrap"
            gap="20px"
          >
            {renderConfigItem(
              "0",
              "Polygon Speed Limit",
              "9000",
              <>
                Set whether to use the Speed Limit Buzzer in the Polygon
                Geofence Settings.
                <br />• Default : Off
              </>
            )}
            {renderConfigItem(
              "2",
              "Circular Buzzer Speed Limit",
              "9002",
              <>
                Set whether to use the Speed Limit Buzzer in the Circular
                Geofence Settings.
                <br />• Default : Off
              </>
            )}
            {renderConfigItem(
              "1",
              "Circular Output Active",
              "9001",
              <>
                Set whether to use the Output Active & Delay Time in the
                Circular Geofence Settings.
                <br />• Default : Off
              </>
            )}
          </Stack>
        </InputBox>
      </Stack>
    );
  };

  /**
   * 현재 뷰에 따라 적절한 컴포넌트 렌더링
   * list, edit-polygon, edit-circular, add 중 하나 표시
   */
  const renderCurrentView = () => {
    switch (currentView) {
      case "list":
        return (
          <ListView
            imei={imei}
            onEdit={() => {}}
            onAdd={handleAddClick}
            onDelete={() => {}}
            onRowClick={handleRowClick}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            rows={rows}
            mapRef={mapRef}
            fetchedPolygonData={fetchedPolygonData}
            fetcheCircleData={fetcheCircleData}
            mapManager={mapManager}
          />
        );
      case "edit-polygon":
        return (
          <EditPolygonView
            imei={imei}
            groupId={selectedGroupId}
            onBack={handleBackToList}
          />
        );
      case "edit-circular":
        return (
          <EditCircularView
            imei={imei}
            groupId={selectedGroupId}
            onBack={handleBackToList}
          />
        );
      case "add":
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <AddGeofence imei={imei} onBack={handleBackToList} />
          </Suspense>
        );
      default:
        return null;
    }
  };

  return (
    <div className="pageWrap" style={{ flex: 1 }}>
      {isFullLoading && <FullLoading />}
      <Stack flex={1} gap={"20px"}>
        {renderGeofenceConfig()}
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
            </InputBox.Head>
          </InputBox>
        </Stack>
        {renderCurrentView()}
      </Stack>
    </div>
  );
};

export default Geofence;
