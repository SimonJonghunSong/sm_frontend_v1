import { useCallback, useEffect, useMemo, useState } from "react";
import { splitArrayIntoChunks } from "../functions";
import { useSearchParams } from "next/navigation";
interface BaseField {
  fieldName: string;
  options?: FieldOption[];
  name?: string;
  number?: string;
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
  realValue: string;
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
        realValue,
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
  let name = fieldName;
  const targetIndex = name.lastIndexOf("(");
  const targetIndex2 = name.lastIndexOf(")");

  name = name.slice(0, targetIndex);
  const number = fieldName.slice(targetIndex + 1, targetIndex2);

  switch (fieldData.type) {
    case "combo":
      if ("list" in fieldData) {
        const options = parseComboList(fieldData.list);
        return { ...fieldData, fieldName, name, number, options };
      }
    case "edit+button":
      if (fieldData.AssignList) {
        const assignList = parseAssignList(fieldData.AssignList);
        return { ...fieldData, fieldName, name, number, assignList };
      }
      return { ...fieldData, fieldName, name, number };
    case "edit":
    case "ip":
    case "any":
    case "alert_id":
    case "sAssign":
    case "mAssign":
    case "lAssign":
    default:
      return { ...fieldData, fieldName, name, number };
  }
}

// field value를 edit 형태로 변환
function fieldToEditString(fieldData: Field): string {
  const optionId =
    Number(fieldData.ID) < 10 ? `0${fieldData.ID}` : fieldData.ID;

  switch (fieldData.type) {
    case "combo":
      if ("list" in fieldData) {
        const options = parseComboList(fieldData.list);
        const selectValue = options.find(
          (item) => item.value === fieldData.value
        ).realValue;

        const editValue =
          Number(selectValue) < 10 ? `0${selectValue}` : `${selectValue}`;

        return `${optionId}#${editValue}`;
      }
    case "alert_id":
      const checked = `0${fieldData.value}`;
      const hexValue =
        Number(fieldData.alert_id).toString(16).length < 2
          ? `0${Number(fieldData.alert_id).toString(16).toUpperCase()}`
          : Number(fieldData.alert_id).toString(16).toUpperCase();
      return `${optionId}#${checked}${hexValue}`;
    case "sAssign":
    case "mAssign":
    case "lAssign":
      return `${optionId}#0${fieldData.value}`;
    case "edit+button":
    case "edit":
    case "ip":
    case "any":
    default:
      return `${optionId}#${fieldData.value}`;
  }
}

export function useTransformedConfigData({
  data,
  blacklist = [],
}: UseTransformedConfigDataProps) {
  const searchParams = useSearchParams();

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
      const { value, alert_id }: { value: string; alert_id?: string } = formData
        .find((item) => {
          return item.tabName === tabName;
        })
        .fields.find((field) => field.fieldName === fieldName);
      const onChange = (value: string, options?: Partial<Field>) => {
        setOriginData((prev) => {
          return prev.map((item) => {
            const [key, fields] = Object.entries(item)[0];

            return key === tabName
              ? {
                  [key]: fields.map((field) => {
                    const [fieldKey, info] = Object.entries(field)[0];

                    return fieldKey === fieldName
                      ? {
                          [fieldKey]: (info as any[]).map((infoItem) => {
                            console.log("infoItem >>>", infoItem);

                            return {
                              ...infoItem,
                              ...(options || {}),
                              value,
                            };
                          }),
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

      // 변경된 데이터 체크
      const isChange =
        originalFieldValue[0].value !== value ||
        originalFieldValue[0].alert_id !== alert_id;

      return { value, onChange, isChange };
    },
    [formData, data, searchParams.get("tab")]
  );

  const resetData = useCallback(() => {
    setOriginData(data);
  }, [data]);

  const getEditDataForPage = useCallback(
    (pageName: string, onlyEdited = true) => {
      const pageData = (formData || []).find(
        (item) => item.tabName === pageName
      );

      if (!pageData) return [];

      const tabType = pageData.info.type;
      const tabId =
        Number(pageData.info.tab_id) < 10
          ? `0${pageData.info.tab_id}`
          : pageData.info.tab_id;

      let result: string[] = [];

      // 특수 처리가 필요한 타입 분기 처리
      switch (tabType) {
        case "assign":
          const mapId = pageData.info.map_id as string;
          const mapIdPrefix = mapId.slice(0, 2);
          const mapIdSuffix = mapId.slice(2);

          const string16Data = parseInt(
            pageData.fields.toReversed().reduce((acc, cur) => {
              return acc + cur.value;
            }, "0"),
            2
          )
            .toString(16)
            .toUpperCase();

          const fullDataEditString = `${mapIdPrefix};${mapIdSuffix}#${new Array(
            8 - string16Data.length
          )
            .fill(0)
            .join("")}${string16Data}`;

          const assignEditStrings: string[] = (
            pageData.fields as Field[]
          ).reduce((acc, cur) => {
            return [...acc, fieldToEditString(cur)];
          }, [] as string[]);

          if (assignEditStrings.length === 0) return [];

          if (assignEditStrings.length > 20) {
            const splitEditStrings = splitArrayIntoChunks(assignEditStrings);

            result = splitEditStrings.map(
              (item) => `${tabId};${item.join(";")}`
            );
          } else {
            result = [`${tabId};${assignEditStrings.join(";")}`];
          }

          // 첫번째 요약 데이터 삽입
          result.unshift(fullDataEditString);
          break;
        default:
          // 수정 된 값만 처리
          const editedData = pageData.fields.filter((item) => {
            return getFormFields(pageData.tabName, item.fieldName).isChange;
          });
          const editStrings: string[] = (
            onlyEdited ? editedData : pageData.fields
          ).reduce((acc, cur) => {
            return [...acc, fieldToEditString(cur)];
          }, [] as string[]);
          if (editStrings.length === 0) return [];

          if (editStrings.length > 20) {
            const splitEditStrings = splitArrayIntoChunks(editStrings);

            result = splitEditStrings.map(
              (item) => `${tabId};${item.join(";")}`
            );
          } else {
            result = [`${tabId};${editStrings.join(";")}`];
          }
      }

      return result;
    },
    [formData, getFormFields]
  );

  const getEditedData = useCallback(() => {
    const editedData = formData.filter((item) => item.tabName !== "info");

    const editString = Object.entries(editedData).reduce((acc, cur) => {
      const [curKey, curValue] = cur;

      const tabId =
        curValue.info.id < 10 ? `0${curValue.info.id}` : curValue.info.id;

      const editedData = curValue.fields.filter(
        (item) => getFormFields(curValue.tabName, item.fieldName).isChange
      );

      // 전체 데이터 처리
      // const tabEditString = (curValue.fields || []).reduce((acc, cur) => {
      //   return acc + fieldToEditString(cur);
      // }, "");

      // 수정 된 값만 처리
      const tabEditStrings: string[] = editedData.reduce((acc, cur) => {
        return [...acc, fieldToEditString(cur)];
      }, [] as string[]);

      if (tabEditStrings.length === 0) {
        return acc;
      }

      return acc + `${tabId};${tabEditStrings.join(";")}`;
    }, "");

    console.log("editString >>>", editString);
  }, [formData]);

  const getProfileData = useCallback(() => {
    let editStrings = [] as string[];

    formData.forEach((item) => {
      getEditDataForPage(item.tabName, false).forEach((data) => {
        editStrings.push(`${item.info.hdr},PRG;;${data}`);
      });
    });

    return editStrings;
  }, [formData]);

  useEffect(() => {
    setOriginData(data);
  }, [data]);

  return {
    originData,
    formData,
    getFormFields,
    resetData,
    isDirty,
    getEditDataForPage,
    getEditedData,
    getProfileData,
  };
}
