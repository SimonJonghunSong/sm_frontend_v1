import { FIELD_VALIDATIONS as field } from "constants/field";
import { modelFieldPatch } from "./modelFieldPatch";
import { groupFieldPatch } from "./groupFieldPatch";
import { MODEL_GROUPS } from "./modelGroups";

export function getFieldDefinition(fieldId: string, modelName?: string) {
  const base = field[fieldId];
  
  // 1. 개별 모델 패치 확인 (기존 방식)
  const individualPatch = modelName && modelFieldPatch[modelName]?.[fieldId];
  if (individualPatch) return { ...base, ...individualPatch };
  
  // 2. 그룹 패치 확인 (새로운 방식)
  const modelGroup = Object.entries(MODEL_GROUPS)
    .find(([_, models]) => models.includes(modelName))?.[0];
  const groupPatch = modelGroup && groupFieldPatch[modelGroup]?.[fieldId];
  if (groupPatch) return { ...base, ...groupPatch };
  
  // 3. 기본 정의 반환
  return base;
} 