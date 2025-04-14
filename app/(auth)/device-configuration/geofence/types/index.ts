import { Dispatch, SetStateAction, RefObject } from "react";
import { GridRowParams } from "@mui/x-data-grid";
import { PolygonType, CircleType } from "@/components/Map/type";
import { useMapManager } from "@/src/hooks/useMapManager";

/**
 * 지오펜스 뷰 타입
 */
export type GeofenceViewType =
  | "list"
  | "edit-polygon"
  | "edit-circular"
  | "add";

/**
 * ListView 컴포넌트 props 타입 정의
 * 지오펜스 목록을 표시하고 필터링, 추가, 삭제, 편집 기능을 제공하는 컴포넌트의 props
 */
export interface ListViewProps {
  onAdd: () => void;
  onRowClick: (data: GridRowParams<any>) => void;
  typeFilter: string;
  setTypeFilter: Dispatch<SetStateAction<string>>;
  rows: any[];
  mapRef: RefObject<google.maps.Map>;
  fetchedPolygonData: PolygonType | undefined;
  fetchedCircleData: CircleType | undefined;
  mapManager: ReturnType<typeof useMapManager>;
}

/**
 * EditPolygonView 컴포넌트 props 타입 정의
 */
export interface EditPolygonViewProps {
  imei: string;
  groupId: number | null;
  onBack: () => void;
}

/**
 * EditCircularView 컴포넌트 props 타입 정의
 */
export interface EditCircularViewProps {
  imei: string;
  groupId: number | null;
  onBack: () => void;
}

/**
 * GeofenceProps 타입 정의
 */
export interface GeofenceProps {
  imei: string;
}

/**
 * GeofenceConfigProps 타입 정의
 */
export interface GeofenceConfigProps {
  imei: string;
  formData: any[];
  getFormFields: (
    tabName: string,
    fieldName: string
  ) => { value: any; onChange: (value: any) => void };
  getEditDataForPage: (tabName: string) => string;
  onSave: (tabName: string) => void;
}
