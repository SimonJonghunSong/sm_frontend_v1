import { FIELD_VALIDATIONS as field } from "constants/field";
import { modelFieldPatch } from "./modelFieldPatch";

export function getFieldDefinition(fieldId: string, modelName?: string) {
  const base = field[fieldId];
  const patch = modelName && modelFieldPatch[modelName]?.[fieldId];
  if (!patch) return base;
  return { ...base, ...patch };
} 