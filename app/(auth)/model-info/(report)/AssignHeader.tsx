import AssignMenus, { AssignMenuItem } from "@/components/AssignMenus";
import FullLoading from "@/components/FullLoading";
import useLangStore from "@/utils/useLangStore";
import { Button, Stack, Tab, Tabs } from "@mui/material";
import { AssignItem, FormField } from "../page";
import { useTranslations } from "next-intl";
import {
  SetStateAction,
  Dispatch,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { FIELD_VALIDATIONS } from "constants/field";
import { SECTIONS } from "constants/searchField";
import useSendFormData from "../(utils)/useSendFormData";
import AssignMenusWithDevice from "@/components/AssignMenusTest";

const sttSmallIds = [
  "1100",
  "1101",
  "1102",
  "1103",
  "1104",
  "1105",
  "1106",
  "1107",
  "1108",
  "1109",
  "1110",
  "1111",
  "1112",
  "1113",
  "1114",
];
const sttMediumIds = [
  "1140",
  "1141",
  "1142",
  "1143",
  "1144",
  "1145",
  "1146",
  "1147",
];
const sttLargeIds = [
  "1160",
  "1161",
  "1162",
  "1163",
  "1164",
  "1165",
  "1166",
  "1167",
];

const altSmallIds = [
  "1200",
  "1201",
  "1202",
  "1203",
  "1204",
  "1205",
  "1206",
  "1207",
  "1208",
  "1209",
  "1210",
  "1211",
  "1212",
  "1213",
  "1214",
];
const altMediumIds = [
  "1240",
  "1241",
  "1242",
  "1243",
  "1244",
  "1245",
  "1246",
  "1247",
];
const altLargeIds = [
  "1260",
  "1261",
  "1262",
  "1263",
  "1264",
  "1265",
  "1266",
  "1267",
];

function parseAssigns(
  inputs: {
    p1: string;
    p2: string;
    p3: string;
    p4: string;
    p5: string;
    p6: string;
    p7: string;
    p8: string;
    p9: string;
  }[]
) {
  const s_assigns: { id: string; title: string; description: string }[] = [];
  const m_assigns: { id: string; title: string; description: string }[] = [];
  const l_assigns: { id: string; title: string; description: string }[] = [];

  for (const input of inputs) {
    const parts = [
      input.p1,
      input.p2,
      input.p3,
      input.p4,
      input.p5,
      input.p6,
      input.p7,
      input.p8,
      input.p9,
    ];

    const [
      s_id,
      s_title,
      s_desc,
      m_id,
      m_title,
      m_desc,
      l_id,
      l_title,
      l_desc,
    ] = parts;

    if (s_id && s_title) {
      s_assigns.push({
        id: s_id,
        title: s_title,
        description: s_desc || "",
      });
    }

    if (m_id && m_title) {
      m_assigns.push({
        id: m_id,
        title: m_title,
        description: m_desc || "",
      });
    }

    if (l_id && l_title) {
      l_assigns.push({
        id: l_id,
        title: l_title,
        description: l_desc || "",
      });
    }
  }

  return { s_assigns, m_assigns, l_assigns };
}

interface Props {
  formData: {
    [key: string]: FormField;
  };
  setFormData: Dispatch<
    SetStateAction<{
      [key: string]: FormField;
    }>
  >;
  csvData: {
    p1: string;
    p2: string;
    p3: string;
    p4: string;
    p5: string;
    p6: string;
    p7: string;
    p8: string;
    p9: string;
  }[];
}

export default function AssignHeader({
  csvData,
  formData,
  setFormData,
}: Props) {
  // utils
  const t = useTranslations();

  // state
  const [tab, setTab] = useState<string>("stt");
  const [isFullLoading, setIsFullLoading] = useState(false);
  const { lang } = useLangStore();

  const { sendFormData } = useSendFormData();

  const parseData = parseAssigns(csvData);

  const isDirtyFields = useMemo(() => {
    return Object.keys(formData).filter((key) => {
      return (
        (tab === "stt"
          ? [...sttSmallIds, ...sttMediumIds, ...sttLargeIds].includes(key)
          : [...altSmallIds, ...altMediumIds, ...altLargeIds].includes(key)) &&
        (formData[key].realValue !== formData[key].beforeValue ||
          formData[key].text_num !== formData[key].beforeTextNum)
      );
    });
  }, [tab, formData]);

  // stt
  const sttData = parseData;
  const selectedSttData = useMemo(() => {
    const targetSassigns = sttSmallIds
      .map((item, index) => ({ ...formData[item], index }))
      .filter((item) => item.value === "1");
    const targetMassigns = sttMediumIds
      .map((item, index) => ({ ...formData[item], index }))
      .filter((item) => item.value === "1");
    const targetLassigns = sttLargeIds
      .map((item, index) => ({ ...formData[item], index }))
      .filter((item) => item.value === "1");

    return {
      s_assigns: targetSassigns.map((targetSassigns) => {
        const target = sttData.s_assigns.find(
          (sItem) => sItem.id === targetSassigns.text_num
        );

        return {
          id: target.id,
          name: target.title,
          description: target.description,
          value: targetSassigns.value,
        };
      }),
      m_assigns: targetMassigns.map((targetMassigns) => {
        const target = sttData.m_assigns.find(
          (mItem) => mItem.id === targetMassigns.text_num
        );

        return {
          id: target.id,
          name: target.title,
          description: target.description,
          value: targetMassigns.value,
        };
      }),
      l_assigns: targetLassigns.map((targetLassigns) => {
        const target = sttData.l_assigns.find(
          (lItem) => lItem.id === targetLassigns.text_num
        );

        return {
          id: target.id,
          name: target.title,
          description: target.description,
          value: targetLassigns.value,
        };
      }),
    };
  }, [formData]);
  const handleSaveStt = () => {
    const fieldValues = Object.keys(formData).reduce((acc, key) => {
      if ([...sttSmallIds, ...sttMediumIds, ...sttLargeIds].includes(key)) {
        acc[key] = {
          id: key,
          value: formData[key].value,
          realValue: formData[key].realValue,
          text_num: formData[key].text_num,
        };
      }
      return acc;
    }, {});

    sendFormData(fieldValues, setFormData);
  };
  const handleUpdateStt = ({
    s_assigns,
    m_assigns,
    l_assigns,
  }: {
    s_assigns: AssignMenuItem[];
    m_assigns: AssignMenuItem[];
    l_assigns: AssignMenuItem[];
  }) => {
    const result = {
      s_assigns: sttSmallIds.map((item, index) => {
        const target = s_assigns[index];
        const ID = item.slice(2);

        console.log("item :::", item);

        if (target) {
          return {
            ...formData[item],
            value: "1",
            text_num: target.id,
            ID,
          };
        }

        return { ...formData[item], value: "0", text_num: "0", ID };
      }),
      m_assigns: sttMediumIds.map((item, index) => {
        const target = m_assigns[index];
        const ID = item.slice(2);

        console.log("item :::", item);

        if (target) {
          return {
            ...formData[item],
            value: "1",
            text_num: target.id,
            ID,
          };
        }

        return { ...formData[item], value: "0", text_num: "0", ID };
      }),
      l_assigns: sttLargeIds.map((item, index) => {
        const target = l_assigns[index];
        const ID = item.slice(2);

        console.log("item :::", item);

        if (target) {
          return {
            ...formData[item],
            value: "1",
            realValue: "1",
            text_num: target.id,
            ID,
          };
        }

        return {
          ...formData[item],
          value: "0",
          realValue: "0",
          text_num: "0",
          ID,
        };
      }),
    };

    const tabId = "11";

    const arr = [...result.s_assigns, ...result.m_assigns, ...result.l_assigns];

    const updateData = arr.reduce((acc, item) => {
      const jsonId = `${tabId}${
        Number(item.ID) < 10 ? `0${Number(item.ID)}` : item.ID
      }`;

      return {
        ...acc,
        [jsonId]: {
          ...formData[jsonId],
          value: item.value,
          realValue: item.value,
          text_num: item.text_num,
        },
      };
    }, {} as Record<string, string>);

    setFormData((prev) => ({ ...prev, ...(updateData as any) }));
  };
  const handleSttAdd = (
    type: "small" | "medium" | "large",
    item: AssignMenuItem
  ) => {
    // onChange
    const newSassigns = [...selectedSttData.s_assigns];
    const newMassigns = [...selectedSttData.m_assigns];
    const newLassigns = [...selectedSttData.l_assigns];

    switch (type) {
      case "small":
        newSassigns.push(item);
        break;
      case "medium":
        newMassigns.push(item);
        break;
      case "large":
        newLassigns.push(item);
        break;
      default:
        break;
    }

    handleUpdateStt({
      s_assigns: newSassigns as AssignMenuItem[],
      m_assigns: newMassigns as AssignMenuItem[],
      l_assigns: newLassigns as AssignMenuItem[],
    });
  };
  const handleSttDelete = (
    type: "small" | "medium" | "large",
    item: AssignMenuItem
  ) => {
    // onChange
    // onChange
    let newSassigns = [...selectedSttData.s_assigns];
    let newMassigns = [...selectedSttData.m_assigns];
    let newLassigns = [...selectedSttData.l_assigns];

    switch (type) {
      case "small":
        newSassigns = newSassigns.filter(
          (innerItem) => innerItem.id !== item.id
        );
        break;
      case "medium":
        newMassigns = newMassigns.filter(
          (innerItem) => innerItem.id !== item.id
        );
        break;
      case "large":
        newLassigns = newLassigns.filter(
          (innerItem) => innerItem.id !== item.id
        );
        break;
      default:
        break;
    }

    handleUpdateStt({
      s_assigns: newSassigns as AssignMenuItem[],
      m_assigns: newMassigns as AssignMenuItem[],
      l_assigns: newLassigns as AssignMenuItem[],
    });
  };
  const handleSttChange = (
    type: "small" | "medium" | "large",
    item: AssignMenuItem,
    value: boolean
  ) => {
    // onChange
    if (value) {
      handleSttAdd(type, item);
    } else {
      handleSttDelete(type, item);
    }
  };

  // alt
  const altData = parseData;

  const selectedAltData = useMemo(() => {
    const targetSassigns = altSmallIds
      .map((item, index) => ({ ...formData[item], index }))
      .filter((item) => item.value === "1");
    const targetMassigns = altMediumIds
      .map((item, index) => ({ ...formData[item], index }))
      .filter((item) => item.value === "1");
    const targetLassigns = altLargeIds
      .map((item, index) => ({ ...formData[item], index }))
      .filter((item) => item.value === "1");

    return {
      s_assigns: targetSassigns.map((targetSassigns) => {
        const target = altData.s_assigns.find(
          (sItem) => sItem.id === targetSassigns.text_num
        );

        return {
          id: target.id,
          name: target.title,
          description: target.description,
          value: targetSassigns.value,
        };
      }),
      m_assigns: targetMassigns.map((targetMassigns) => {
        const target = altData.m_assigns.find(
          (mItem) => mItem.id === targetMassigns.text_num
        );

        return {
          id: target.id,
          name: target.title,
          description: target.description,
          value: targetMassigns.value,
        };
      }),
      l_assigns: targetLassigns.map((targetLassigns) => {
        const target = altData.l_assigns.find(
          (lItem) => lItem.id === targetLassigns.text_num
        );

        return {
          id: target.id,
          name: target.title,
          description: target.description,
          value: targetLassigns.value,
        };
      }),
    };
  }, [formData]);
  const handleSaveAlt = () => {
    const fieldValues = Object.keys(formData).reduce((acc, key) => {
      if ([...altSmallIds, ...altMediumIds, ...altLargeIds].includes(key)) {
        acc[key] = {
          id: key,
          value: formData[key].value,
          realValue: formData[key].realValue,
          text_num: formData[key].text_num,
        };
      }
      return acc;
    }, {});

    sendFormData(fieldValues, setFormData);
  };
  const handleUpdateAlt = ({
    s_assigns,
    m_assigns,
    l_assigns,
  }: {
    s_assigns: AssignMenuItem[];
    m_assigns: AssignMenuItem[];
    l_assigns: AssignMenuItem[];
  }) => {
    const result = {
      s_assigns: altSmallIds.map((item, index) => {
        const target = s_assigns[index];
        const ID = item.slice(2);

        if (target) {
          return {
            ...formData[item],
            value: "1",
            text_num: target.id,
            ID,
          };
        }

        return { ...formData[item], value: "0", text_num: "0", ID };
      }),
      m_assigns: altMediumIds.map((item, index) => {
        const target = m_assigns[index];
        const ID = item.slice(2);

        if (target) {
          return {
            ...formData[item],
            value: "1",
            text_num: target.id,
            ID,
          };
        }

        return { ...formData[item], value: "0", text_num: "0", ID };
      }),
      l_assigns: altLargeIds.map((item, index) => {
        const target = l_assigns[index];
        const ID = item.slice(2);

        if (target) {
          return {
            ...formData[item],
            value: "1",
            realValue: "1",
            text_num: target.id,
            ID,
          };
        }

        return {
          ...formData[item],
          value: "0",
          realValue: "0",
          text_num: "0",
          ID,
        };
      }),
    };

    const tabId = "12";

    const arr = [...result.s_assigns, ...result.m_assigns, ...result.l_assigns];

    const updateData = arr.reduce((acc, item) => {
      const jsonId = `${tabId}${
        Number(item.ID) < 10 ? `0${Number(item.ID)}` : item.ID
      }`;

      return {
        ...acc,
        [jsonId]: {
          ...formData[jsonId],
          value: item.value,
          realValue: item.value,
          text_num: item.text_num,
        },
      };
    }, {} as Record<string, string>);

    setFormData((prev) => ({ ...prev, ...(updateData as any) }));
  };

  const handleAltAdd = (
    type: "small" | "medium" | "large",
    item: AssignMenuItem
  ) => {
    const newSassigns = [...selectedAltData.s_assigns];
    const newMassigns = [...selectedAltData.m_assigns];
    const newLassigns = [...selectedAltData.l_assigns];

    switch (type) {
      case "small":
        newSassigns.push(item);
        break;
      case "medium":
        newMassigns.push(item);
        break;
      case "large":
        newLassigns.push(item);
        break;
      default:
        break;
    }

    handleUpdateAlt({
      s_assigns: newSassigns as AssignMenuItem[],
      m_assigns: newMassigns as AssignMenuItem[],
      l_assigns: newLassigns as AssignMenuItem[],
    });
  };

  const handleAltDelete = (
    type: "small" | "medium" | "large",
    item: AssignMenuItem
  ) => {
    let newSassigns = [...selectedAltData.s_assigns];
    let newMassigns = [...selectedAltData.m_assigns];
    let newLassigns = [...selectedAltData.l_assigns];

    switch (type) {
      case "small":
        newSassigns = newSassigns.filter(
          (innerItem) => innerItem.id !== item.id
        );
        break;
      case "medium":
        newMassigns = newMassigns.filter(
          (innerItem) => innerItem.id !== item.id
        );
        break;
      case "large":
        newLassigns = newLassigns.filter(
          (innerItem) => innerItem.id !== item.id
        );
        break;
      default:
        break;
    }

    handleUpdateAlt({
      s_assigns: newSassigns as AssignMenuItem[],
      m_assigns: newMassigns as AssignMenuItem[],
      l_assigns: newLassigns as AssignMenuItem[],
    });
  };

  const handleAltChange = (
    type: "small" | "medium" | "large",
    item: AssignMenuItem,
    value: boolean
  ) => {
    if (value) {
      handleAltAdd(type, item);
    } else {
      handleAltDelete(type, item);
    }
  };

  return (
    <Container>
      {isFullLoading && <FullLoading />}
      <Stack direction="column" gap={"24px"} style={{ width: "100%" }}>
        <h1 data-section-id={SECTIONS.AssignHeader.en}>
          {SECTIONS.AssignHeader[lang]}
        </h1>
        <StyledTabs
          value={tab}
          onChange={(e, value) => {
            setTab(value);
          }}
          variant="fullWidth"
        >
          <Tab
            value="stt"
            label={FIELD_VALIDATIONS["1075"].list[0].label[lang]}
            sx={{ flex: 1 }}
          />
          <Tab
            value="alt"
            label={FIELD_VALIDATIONS["1075"].list[1].label[lang]}
          />
        </StyledTabs>
        {tab === "stt" && (
          <div>
            <AssignMenusWithDevice
              smallItems={sttData.s_assigns.map((item) => ({
                id: item.id,
                name: item.title,
                description: item.description,
                value: item.id,
              }))}
              mediumItems={sttData.m_assigns.map((item) => ({
                id: item.id,
                name: item.title,
                description: item.description,
                value: item.id,
              }))}
              largeItems={sttData.l_assigns.map((item) => ({
                id: item.id,
                name: item.title,
                description: item.description,
                value: item.id,
              }))}
              seletedSmallItems={selectedSttData.s_assigns}
              seletedMediumItems={selectedSttData.m_assigns}
              seletedLargeItems={selectedSttData.l_assigns}
              onChange={handleSttChange}
            />
          </div>
        )}
        {tab === "alt" && (
          <div>
            <AssignMenusWithDevice
              smallItems={altData.s_assigns.map((item) => ({
                id: item.id,
                name: item.title,
                description: item.description,
                value: item.id,
              }))}
              mediumItems={altData.m_assigns.map((item) => ({
                id: item.id,
                name: item.title,
                description: item.description,
                value: item.id,
              }))}
              largeItems={altData.l_assigns.map((item) => ({
                id: item.id,
                name: item.title,
                description: item.description,
                value: item.id,
              }))}
              seletedSmallItems={selectedAltData.s_assigns}
              seletedMediumItems={selectedAltData.m_assigns}
              seletedLargeItems={selectedAltData.l_assigns}
              onChange={handleAltChange}
            />
          </div>
        )}
        <Button
          color="secondary"
          style={{ alignSelf: "flex-end" }}
          variant="contained"
          disabled={isDirtyFields.length === 0}
          onClick={tab === "stt" ? handleSaveStt : handleSaveAlt}
        >
          {t("common.save")}
        </Button>
      </Stack>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0px 1px 5px 0px #0000001a;
  border-radius: 8px;
  padding: 24px;
  gap: 16px;

  h1 {
    padding: 16px 0;
    font-weight: 700;
    font-size: 20px;
    line-height: 100%;
  }
`;

const StyledTabs = styled(Tabs)`
  border-radius: 8px 8px 0 0;

  .MuiTabs-indicator {
    height: 3px;
  }
`;
