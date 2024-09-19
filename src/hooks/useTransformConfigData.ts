import { useCallback, useEffect, useMemo, useState } from "react";
interface BaseField {
  fieldName: string;
  options?: FieldOption[];
}

interface ComboField extends BaseField {
  type: "combo";
  ID: string;
  value: string;
  max?: string;
  list: Array<{ [key: string]: string }>;
}

interface PasswdField extends BaseField {
  type: "passwd";
  ID: string;
  value: string;
  max?: string;
}
interface EditField extends BaseField {
  type: "edit";
  ID: string;
  value: string;
  max?: string;
}
interface EditNumberField extends BaseField {
  type: "edit_number";
  ID: string;
  value: string;
  max?: string;
}

interface IpField extends BaseField {
  type: "ip";
  ID: string;
  value: string;
  max?: string;
}

interface AnyField extends BaseField {
  type: "any";
  ID: string;
  value: string;
  max?: string;
}

interface AlertIdField extends BaseField {
  type: "alert_id";
  ID: string;
  value: string;
  max?: string;
  alert_id: string;
}

interface AssignField extends BaseField {
  type: "sAssign" | "mAssign" | "lAssign";
  ID: string;
  value: string;
  text_num: string;
  max?: string;
}

interface EditButtonField extends BaseField {
  type: "edit+button";
  ID: string;
  value: string;
  max?: string;
  num?: string;
  AssignList?: Array<{ [key: string]: string }>;
  assignList?: AssignOption[];
}

export type Field =
  | ComboField
  | PasswdField
  | EditField
  | EditNumberField
  | IpField
  | AnyField
  | AlertIdField
  | AssignField
  | EditButtonField;

interface TabInfo {
  id: string;
  tab_id: string;
  visible: string;
  hdr: string;
  num_type: string;
}

interface Tab {
  tabName: string;
  info: TabInfo;
  fields: Field[];
}

interface UseTransformedConfigDataProps {
  data: { [key: string]: any[] }[];
  blacklist?: string[];
}

interface FieldOption {
  label: string;
  value: string; // 원본 데이터 문자열
  max?: number; // range 타입일 때 최대 값(num3)
  type: "string" | "range" | "none"; // combo 타입 (0: string, 1: range, 2: none)
}

interface AssignOption {
  label: string; // string_data,
  typeName: string; // type_name
}

function parseComboList(
  comboList: Array<{ [key: string]: string }>
): FieldOption[] {
  return comboList.flatMap((item) => {
    return Object.values(item).map((value) => {
      const [realValue, label, num3, num4] = value.split(";");

      return {
        value: label, // 원본 데이터 문자열
        label, // 실제 사용되는 인덱스 값
        max: num4 === "1" ? parseInt(num3, 10) : undefined, // range 타입일 경우 최대 값
        type:
          parseInt(num4, 10) === 0
            ? "string"
            : parseInt(num4, 10) === 1
            ? "range"
            : "none", // combo 타입 (0: string, 1: range, 2: none)
      };
    });
  });
}

function parseAssignList(
  assignList: Array<{ [key: string]: string }>
): AssignOption[] {
  return assignList.flatMap((item) => {
    return Object.values(item).map((value) => {
      const [label, typeName] = value.split(";");
      return {
        label: label, // 예: "REPORT MAP"
        typeName: typeName, // 예: "check box"
      };
    });
  });
}

function processField(fieldData: Field, fieldName: string): Field | null {
  switch (fieldData.type) {
    case "combo":
      if ("list" in fieldData) {
        const options = parseComboList(fieldData.list);
        return { ...fieldData, fieldName, options };
      }
    case "edit+button":
      if (fieldData.AssignList) {
        const assignList = parseAssignList(fieldData.AssignList);
        return { ...fieldData, fieldName, assignList };
      }
      return { ...fieldData, fieldName };
    case "edit":
    case "ip":
    case "any":
    case "alert_id":
    case "sAssign":
    case "mAssign":
    case "lAssign":
    default:
      return { ...fieldData, fieldName };
  }
}

export function useTransformedConfigData({
  data,
  blacklist = [],
}: UseTransformedConfigDataProps) {
  const [isDirty, setIsDirty] = useState(false);
  const [originData, setOriginData] = useState(data || []);
  const formData = useMemo(
    () =>
      originData
        .map((tabObj) => {
          const [tabName, tabFields] = Object.entries(tabObj)[0];
          if (blacklist.includes(tabName)) return null;

          let tabInfo: TabInfo | undefined;
          const fields: Field[] = [];

          tabFields.forEach((fieldObj) => {
            const [fieldName, fieldDataArray] = Object.entries(fieldObj)[0];

            if (fieldName === "info") {
              tabInfo = (fieldDataArray as TabInfo[])[0];
            } else {
              const fieldData = (fieldDataArray as Field[])[0];

              const processedField = processField(fieldData, fieldName);
              if (processedField) {
                fields.push(processedField);
              }
            }
          });

          if (!tabInfo && tabName === "info") {
            return {
              tabName,
              info: tabFields?.[0] || {},
              fields: [],
            };
          }

          if (!tabInfo) return null;

          return {
            tabName,
            info: tabInfo,
            fields,
          };
        })
        .filter((field) => field !== null) || [],
    [originData]
  );

  const getFormFields = useCallback(
    (tabName: string, fieldName: string) => {
      const value = formData
        .find((item) => {
          return item.tabName === tabName;
        })
        .fields.find((field) => field.fieldName === fieldName).value as string;
      const onChange = (value: string) => {
        setOriginData((prev) => {
          return prev.map((item) => {
            const [key, fields] = Object.entries(item)[0];

            return key === tabName
              ? {
                  [key]: fields.map((field) => {
                    const [fieldKey, info] = Object.entries(field)[0];

                    return fieldKey === fieldName
                      ? {
                          [fieldKey]: (info as any[]).map((infoItem) => ({
                            ...infoItem,
                            value,
                          })),
                        }
                      : field;
                  }),
                }
              : item;
          });
        });

        setIsDirty(true);
      };

      const originalTab = data.find((item) => {
        const [key, value] = Object.entries(item)[0];

        return key === tabName;
      });

      const [, originalFields] = Object.entries(originalTab)[0];

      const originalField = originalFields.find((item) => {
        const [key, value] = Object.entries(item)[0];

        return key === fieldName;
      });

      const [, originalFieldValue] = Object.entries(originalField)[0];

      const isChange = originalFieldValue[0].value !== value;

      return { value, onChange, isChange };
    },
    [formData]
  );

  console.log("originData >>>", originData);

  console.log("formData >>>", formData);

  const resetData = useCallback(() => {
    setOriginData(data);
  }, [data]);

  useEffect(() => {
    setOriginData(data);
  }, [data]);

  return {
    originData,
    formData,
    getFormFields,
    resetData,
    isDirty,
  };
}
