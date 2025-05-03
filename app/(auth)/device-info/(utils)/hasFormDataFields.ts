import { FormField } from "../page";

const hasFormDataFields = (
  formData: { [key: string]: FormField } | undefined,
  fieldIds: string[]
): boolean => {
  if (!formData) return false;
  return fieldIds.some((id) => formData[id]);
};

export const filterFormDataFields = (
  formData: { [key: string]: FormField } | undefined,
  fieldIds: string[]
): string[] => {
  if (!formData) return [];
  return fieldIds.filter((id) => formData[id]);
};

export default hasFormDataFields;
