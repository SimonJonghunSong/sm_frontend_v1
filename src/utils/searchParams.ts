import { Lang } from "@/utils/useLangStore";
import { FormField } from "app/(auth)/device-info/page";
import { FIELD_VALIDATIONS } from "constants/field";
import { getFieldDefinition } from "@/src/constants/getFieldDefinition";
import {
  INCLUDE_FIELDS,
  SEARCH_SECTION,
  SECTIONS,
} from "constants/searchField";

// 1. fieldId -> sectionName 매핑 생성
export const getSearchParamsData = (
  formData: {
    [key: string]: FormField;
  },
  lang: Lang,
  modelName?: string
) => {
  const fieldIdToSection = {};
  Object.entries(INCLUDE_FIELDS).forEach(([section, fieldIds]) => {
    fieldIds.forEach((id) => {
      fieldIdToSection[id] = SECTIONS[section.replaceAll(" ", "")];
    });
  });

  // 2. title별로 key, section을 매핑 (getFieldDefinition 사용)
  return Object.entries(FIELD_VALIDATIONS)
    .filter(([key]) => !!formData?.[key])
    .reduce((acc, [key, value]) => {
      const section = fieldIdToSection?.[key]?.[lang] || "";

      const searchSection = SEARCH_SECTION?.[lang]?.[section];

      if (searchSection) {
        // getFieldDefinition을 사용하여 모델별 정의 가져오기
        const fieldDef = getFieldDefinition(key, modelName);
        const title = fieldDef?.title?.[lang] || value.title[lang];
        
        // 1973 필드 디버깅 로그
        if (key === "1973") {
          console.log("=== getSearchParamsData 1973 ===");
          console.log("modelName:", modelName);
          console.log("fieldDef:", fieldDef);
          console.log("title:", title);
          console.log("value.title[lang]:", value.title[lang]);
        }
        
        acc[title] = {
          field: key,
          searchText: `${searchSection?.searchText} > ${title}`,
          tab: searchSection?.tab,
        };
      }

      return acc;
    }, {});
};
