"use client";

import React, { useEffect, useRef, useState, Suspense, useMemo } from "react";
import { Stack } from "@mui/material";
import InputBox from "@/components/inputbox/InputBox";
import { GridRowParams } from "@mui/x-data-grid";
import useSerial from "@/src/hooks/useSerial";
import { AT_EDIT_PREFIX } from "@/src/hooks/useSerial/constant";
import { useMapManager } from "@/src/hooks/useMapManager";
import useSerialStore from "@/src/stores/useSerialStore";
import FullLoading from "@/components/FullLoading";
import { useTransformedConfigData } from "@/src/hooks/useTransformConfigData";
import { findCircleIndexByNumber } from "@/utils/generateFormattedIndexes";

// Import from geofence directory
import { GeofenceViewType } from "./geofence/types";
import GeofenceConfig from "./geofence/components/GeofenceConfig";
import GeofenceList from "./geofence/components/GeofenceList";
import { useGeofenceFetch } from "./geofence/hooks/useGeofenceFetch";

// Lazy load components
const AddGeofence = React.lazy(() => import("./AddGeofence"));
const EditGeofence = React.lazy(() => import("./EditGeofence"));

// Edit view components
const EditPolygonView = ({ imei, groupId, onBack }) => (
  <Suspense fallback={<div>Loading...</div>}>
    <EditGeofence
      imei={imei}
      groupId={groupId}
      type="polygon"
      onBack={onBack}
    />
  </Suspense>
);

const EditCircularView = ({ imei, groupId, onBack }) => (
  <Suspense fallback={<div>Loading...</div>}>
    <EditGeofence
      imei={imei}
      groupId={groupId}
      type="circular"
      onBack={onBack}
    />
  </Suspense>
);

/**
 * Geofence 메인 컴포넌트
 * 지오펜스 목록 조회, 추가, 편집, 삭제 기능을 관리
 */
const Geofence = ({ imei }) => {
  // 뷰 상태 관리
  const [currentView, setCurrentView] = useState<GeofenceViewType>("list");
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);

  // 지오펜스 필터링
  const [typeFilter, setTypeFilter] = useState("All");
  const [isFullLoading, setIsFullLoading] = useState<boolean>(false);

  // 참조 및 상태 관리
  const mapRef = useRef<google.maps.Map>(null);
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
      data: currentPort?.packageToJson?.synctrak,
      blacklist: ["info"],
    });

  // 커스텀 훅 사용
  const {
    isLoading,
    fetchGeofenceData,
    fetchRowData,
    fetchedPolygonData,
    fetchedCircleData,
  } = useGeofenceFetch(imei);

  // 지오펜스 데이터
  const polygonList = currentPort?.polygonGeofenceData || [];
  const circularList = currentPort?.circularGeofenceData || [];

  /**
   * 테이블에 표시할 행 데이터 생성
   */
  const rows = useMemo(() => {
    if (!currentPort) return [];

    // Import these from geofence/utils
    const getPolygonGeofenceData = (list) =>
      list.map((item, index) => ({
        type: "polygon",
        groupId: index + 1,
        polygonCount: parseInt(item.split("#")[1]?.substring(0, 2) || "0", 16),
      }));

    const getCircularGeofenceData = (list) =>
      list.map((item, index) => ({
        type: "circular",
        groupId: index + 1,
      }));

    const polygonData = getPolygonGeofenceData(polygonList);
    const circularData = getCircularGeofenceData(circularList);

    return [
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
            if (!currentPort) return;

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
                data: `${AT_EDIT_PREFIX}${imei};53;${String(
                  groupId - 1
                ).padStart(2, "0")}#${
                  isPolygonSpeedLimitDisabled ? "000000" : "00000000000000"
                }`,
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
  }, [
    typeFilter,
    polygonList,
    circularList,
    imei,
    write,
    currentPort,
    setPolygonGeofence,
    setCircularGeofence,
  ]);

  /**
   * 테이블 행 클릭 핸들러
   */
  const handleRowClick = (data: GridRowParams<any>) => {
    if (!currentPort) return;
    fetchRowData(data.row.type, data.row.groupId, mapRef);
  };

  /**
   * 리스트 화면으로 돌아가기
   */
  const handleBackToList = () => {
    setCurrentView("list");
    setSelectedGroupId(null);

    // 지오펜스 추가/편집 후 리스트로 돌아왔을 때 데이터 리페칭
    if (currentPort?.port?.needsGeofenceRefetch) {
      currentPort.port.needsGeofenceRefetch = false;
      fetchGeofenceData();
    }
  };

  // 추가 버튼 클릭 핸들러
  const handleAddClick = () => {
    setCurrentView("add");
  };

  // 설정 저장 핸들러
  const handleSaveConfig = (tabName: string) => {
    if (!currentPort?.port?.writable) return;

    write({
      data: `${AT_EDIT_PREFIX}${imei};${getEditDataForPage(tabName)}`,
      port: currentPort.port,
      writer: currentPort.writer,
    });
  };

  // 초기 데이터 로드
  useEffect(() => {
    if (currentPort?.port?.readable && currentPort?.port?.writable) {
      fetchGeofenceData();
    }
  }, [currentPort?.port?.readable, currentPort?.port?.writable]);

  // 로딩 상태 관리
  useEffect(() => {
    setIsFullLoading(
      isLoading ||
        currentPort?.port?.ispolygonfetching ||
        currentPort?.port?.iscircularfetching
    );
  }, [
    isLoading,
    currentPort?.port?.ispolygonfetching,
    currentPort?.port?.iscircularfetching,
  ]);

  /**
   * 현재 뷰에 따라 적절한 컴포넌트 렌더링
   */
  const renderCurrentView = () => {
    switch (currentView) {
      case "list":
        return (
          <GeofenceList
            onAdd={handleAddClick}
            onRowClick={handleRowClick}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            rows={rows}
            mapRef={mapRef}
            fetchedPolygonData={fetchedPolygonData}
            fetchedCircleData={fetchedCircleData}
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
        {currentView === "list" && (
          <GeofenceConfig
            imei={imei}
            formData={formData}
            getFormFields={getFormFields}
            onSave={handleSaveConfig}
          />
        )}

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
