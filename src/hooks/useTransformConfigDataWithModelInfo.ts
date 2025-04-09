import { useCallback, useEffect, useMemo, useState } from "react";
import { splitArrayIntoChunks } from "../functions";
import { useSearchParams } from "next/navigation";
import { ModelConfigWithData } from "@/src/api/services/model/type";
import {
  binaryStringGroupedToHex,
  padZerosWithSpaces,
} from "app/(auth)/device-configuration/utils/functions";

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

export function useTransformConfigDataWithModelInfo({
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

  const resetData = useCallback(() => {
    setOriginData(data);
  }, [data]);

  const getEditDataForPage = useCallback(
    (updateMenuList: ModelConfigWithData[]) => {
      console.log("updateMenuList :::", updateMenuList);
      const updateMenuObject = updateMenuList.reduce((acc, cur) => {
        if (cur?.JSON_ID) {
          switch (cur.UI_INPUT_TYPE) {
            case "checkbox":
              console.log("cur :::", cur);
              console.log("cur.value :::", cur.value);

              return {
                ...acc,
                [cur.JSON_ID]: binaryStringGroupedToHex(
                  cur.value ||
                    padZerosWithSpaces(
                      cur.DEFAULT_VAL_INDEX?.split(",").length || 0
                    )
                ),
              };
            default:
              return { ...acc, [cur.JSON_ID]: cur.value };
          }
        }

        return acc;
      }, {});

      const updateFormData = formData.reduce((acc, cur) => {
        const hasChild = cur.fields.some((field) => {
          return updateMenuObject[field.number];
        });

        if (hasChild) {
          return [
            ...acc,
            {
              ...cur,
              fields: cur.fields
                .filter((item) => {
                  if (!!updateMenuObject[item.number]) {
                    let isChanged = false;

                    switch (item.type) {
                      case "combo":
                        const realValue = item.options.find(
                          (option) => option.value === item.value
                        ).realValue;

                        isChanged =
                          (realValue < 10
                            ? `0${realValue}`
                            : `${realValue}`) !== updateMenuObject[item.number];
                        break;
                      default:
                        isChanged =
                          item.value !== updateMenuObject[item.number];
                        break;
                    }

                    return isChanged;
                  }

                  return false;
                })
                .map((item) => {
                  return {
                    ...item,
                    value: updateMenuObject[item.number],
                  };
                }),
            },
          ];
        }

        return acc;
      }, []);

      const pageDatas = updateFormData;
      let result: string[] = [];

      if (!pageDatas.length) return [];

      for (let i = 0; i < pageDatas.length; i++) {
        const pageData = pageDatas[i];

        console.log("pageData :::", pageData);
        console.log("result :::", result);

        const tabType = pageData.info.type;
        const tabId =
          Number(pageData.info.tab_id) < 10
            ? `0${pageData.info.tab_id}`
            : pageData.info.tab_id;

        console.log("tabType :::", tabType);

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

              result = result.concat(
                splitEditStrings.map((item) => `${tabId};${item.join(";")}`)
              );
            } else {
              result = result.concat([
                `${tabId};${assignEditStrings.join(";")}`,
              ]);
            }

            // 첫번째 요약 데이터 삽입
            result.unshift(fullDataEditString);
            break;
          default:
            const editStrings: string[] = (pageData.fields as Field[]).reduce(
              (acc, cur) => {
                return [...acc, fieldToEditString(cur)];
              },
              [] as string[]
            );

            if (editStrings.length === 0) result = result.concat([]);

            if (editStrings.length > 20) {
              const splitEditStrings = splitArrayIntoChunks(editStrings);

              result = result.concat(
                splitEditStrings.map((item) => `${tabId};${item.join(";")}`)
              );
            } else {
              result = result.concat([`${tabId};${editStrings.join(";")}`]);
            }
        }
      }

      console.log("result :::", result);

      return result;
    },
    [formData]
  );

  const getEditedData = useCallback(() => {
    const editedData = formData.filter((item) => item.tabName !== "info");

    const editString = Object.entries(editedData).reduce((acc, cur) => {
      const [curKey, curValue] = cur;

      const tabId =
        curValue.info.id < 10 ? `0${curValue.info.id}` : curValue.info.id;

      // 전체 데이터 처리
      // const tabEditString = (curValue.fields || []).reduce((acc, cur) => {
      //   return acc + fieldToEditString(cur);
      // }, "");

      // 수정 된 값만 처리
      const tabEditStrings: string[] = (curValue.fields as Field[]).reduce(
        (acc, cur) => {
          return [...acc, fieldToEditString(cur)];
        },
        [] as string[]
      );

      if (tabEditStrings.length === 0) {
        return acc;
      }

      return acc + `${tabId};${tabEditStrings.join(";")}`;
    }, "");

    console.log("editString >>>", editString);
  }, [formData]);

  useEffect(() => {
    setOriginData(data);
  }, [data]);

  return {
    originData,
    setOriginData,
    formData,
    resetData,
    isDirty,
    getEditDataForPage,
    getEditedData,
  };
}
