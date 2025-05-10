import { Lang } from "@/utils/useLangStore";
import { FormField } from "app/(auth)/device-info/page";
import { FIELD_VALIDATIONS } from "constants/field";
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
  lang: Lang
) => {
  const fieldIdToSection = {};
  Object.entries(INCLUDE_FIELDS).forEach(([section, fieldIds]) => {
    fieldIds.forEach((id) => {
      fieldIdToSection[id] = SECTIONS[section.replaceAll(" ", "")];
    });
  });

  // 2. title별로 key, section을 매핑
  return Object.entries(FIELD_VALIDATIONS)
    .filter(([key]) => !!formData?.[key])
    .reduce((acc, [key, value]) => {
      const section = fieldIdToSection?.[key]?.[lang] || "";
      console.log("value :::", value);

      const searchSection = SEARCH_SECTION?.[lang]?.[section];

      if (searchSection) {
        acc[(value.title as any)?.[lang]] = {
          field: key,
          searchText: `${searchSection?.searchText} > ${value.title[lang]}`,
          tab: searchSection?.tab,
        };
      }

      return acc;
    }, {});
};
