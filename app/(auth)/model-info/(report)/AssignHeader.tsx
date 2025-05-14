import AssignMenus, { AssignMenuItem } from "@/components/AssignMenus";
import FullLoading from "@/components/FullLoading";
import useLangStore from "@/utils/useLangStore";
import { Button, Stack, Tab, Tabs } from "@mui/material";
import { AssignItem, FormField } from "../page";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { FIELD_VALIDATIONS } from "constants/field";
import { SECTIONS } from "constants/searchField";

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
  sttFormData: {
    s_assigns: AssignItem[];
    m_assigns: AssignItem[];
    l_assigns: AssignItem[];
  };
  altFormData: {
    s_assigns: AssignItem[];
    m_assigns: AssignItem[];
    l_assigns: AssignItem[];
  };
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
  onSttChange: (
    smallDataIndexes: AssignMenuItem[],
    mediumDataIndexes: AssignMenuItem[],
    largeDataIndexes: AssignMenuItem[]
  ) => void;
  onAltChange: (
    smallDataIndexes: AssignMenuItem[],
    mediumDataIndexes: AssignMenuItem[],
    largeDataIndexes: AssignMenuItem[]
  ) => void;
  handleSendStt: () => void;
  handleSendAlt: () => void;
}

export default function AssignHeader({
  sttFormData,
  altFormData,
  csvData,
  onSttChange,
  onAltChange,
  handleSendStt,
  handleSendAlt,
}: Props) {
  // utils
  const t = useTranslations();

  console.log("sttFormData :::", sttFormData);
  console.log("altFormData :::", altFormData);

  // state
  const [tab, setTab] = useState<string>("stt");
  const [isFullLoading, setIsFullLoading] = useState(false);
  const { lang } = useLangStore();

  // stt
  const [sttData, setSttData] = useState({
    s_assigns: [],
    m_assigns: [],
    l_assigns: [],
  });
  const [defaultSttIndexes, setDefaultSttIndexes] = useState({
    s_assigns: [],
    m_assigns: [],
    l_assigns: [],
  });
  const [updateSttDatas, setUpdateSttDatas] = useState({
    s_assigns: [],
    m_assigns: [],
    l_assigns: [],
  });
  const sttPageSendDisabled = useMemo(() => {
    return (
      updateSttDatas.s_assigns.length === 0 &&
      updateSttDatas.m_assigns.length === 0 &&
      updateSttDatas.l_assigns.length === 0
    );
  }, [updateSttDatas]);

  // alt
  const [altData, setAltData] = useState({
    s_assigns: [],
    m_assigns: [],
    l_assigns: [],
  });
  const [defaultAltIndexes, setDefaultAltIndexes] = useState({
    s_assigns: [],
    m_assigns: [],
    l_assigns: [],
  });

  const [updateAltDatas, setUpdateAltDatas] = useState({
    s_assigns: [],
    m_assigns: [],
    l_assigns: [],
  });
  const altPageSendDisabled = useMemo(() => {
    return (
      updateAltDatas.s_assigns.length === 0 &&
      updateAltDatas.m_assigns.length === 0 &&
      updateAltDatas.l_assigns.length === 0
    );
  }, [updateAltDatas]);

  useEffect(() => {
    const parseData = parseAssigns(csvData);

    setSttData(parseData);
    setDefaultSttIndexes({
      s_assigns: sttFormData.s_assigns
        .filter((item) => item.value === "1")
        .map((item) => Number(item.text_num)),
      m_assigns: sttFormData.m_assigns
        .filter((item) => item.value === "1")
        .map((item) => Number(item.text_num)),
      l_assigns: sttFormData.l_assigns
        .filter((item) => item.value === "1")
        .map((item) => Number(item.text_num)),
    });

    setAltData(parseData);
    setDefaultAltIndexes({
      s_assigns: altFormData.s_assigns
        .filter((item) => item.value === "1")
        .map((item) => Number(item.text_num)),
      m_assigns: altFormData.m_assigns
        .filter((item) => item.value === "1")
        .map((item) => Number(item.text_num)),
      l_assigns: altFormData.l_assigns
        .filter((item) => item.value === "1")
        .map((item) => Number(item.text_num)),
    });
  }, [tab]);

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
            <AssignMenus
              key={
                defaultSttIndexes.s_assigns.length +
                defaultSttIndexes.m_assigns.length +
                defaultSttIndexes.l_assigns.length
              }
              smallItems={(sttData["s_assigns"] || []).map((item) => ({
                id: item.id,
                name: item.title,
                description: item.description,
                value: item.value,
              }))}
              mediumItems={(sttData["m_assigns"] || []).map((item) => ({
                id: item.id,
                name: item.title,
                description: item.description,
                value: item.value,
              }))}
              largeItems={(sttData["l_assigns"] || []).map((item) => ({
                id: item.id,
                name: item.title,
                description: item.description,
                value: item.value,
              }))}
              defaultSmallIndexes={defaultSttIndexes.s_assigns}
              defaultMediumIndexes={defaultSttIndexes.m_assigns}
              defaultLargeIndexes={defaultSttIndexes.l_assigns}
              onChange={(
                smallDataIndexes,
                mediumDataIndexes,
                largeDataIndexes
              ) => {
                onSttChange(
                  smallDataIndexes,
                  mediumDataIndexes,
                  largeDataIndexes
                );

                setUpdateSttDatas({
                  s_assigns: smallDataIndexes,
                  m_assigns: mediumDataIndexes,
                  l_assigns: largeDataIndexes,
                });
              }}
            />
          </div>
        )}
        {tab === "alt" && (
          <div>
            <AssignMenus
              key={
                defaultAltIndexes.s_assigns.length +
                defaultAltIndexes.m_assigns.length +
                defaultAltIndexes.l_assigns.length
              }
              smallItems={(altData["s_assigns"] || []).map((item) => ({
                id: item.id,
                name: item.title,
                description: item.description,
                value: item.value,
              }))}
              mediumItems={(altData["m_assigns"] || []).map((item) => ({
                id: item.id,
                name: item.title,
                description: item.description,
                value: item.value,
              }))}
              largeItems={(altData["l_assigns"] || []).map((item) => ({
                id: item.id,
                name: item.title,
                description: item.description,
                value: item.value,
              }))}
              defaultSmallIndexes={defaultAltIndexes.s_assigns}
              defaultMediumIndexes={defaultAltIndexes.m_assigns}
              defaultLargeIndexes={defaultAltIndexes.l_assigns}
              onChange={(
                smallDataIndexes,
                mediumDataIndexes,
                largeDataIndexes
              ) => {
                onAltChange(
                  smallDataIndexes,
                  mediumDataIndexes,
                  largeDataIndexes
                );

                setUpdateAltDatas({
                  s_assigns: smallDataIndexes,
                  m_assigns: mediumDataIndexes,
                  l_assigns: largeDataIndexes,
                });
              }}
            />
          </div>
        )}
        <Button
          color="secondary"
          style={{ alignSelf: "flex-end" }}
          variant="contained"
          disabled={tab === "stt" ? sttPageSendDisabled : altPageSendDisabled}
          onClick={tab === "stt" ? handleSendStt : handleSendAlt}
        >
          {t("configuration.commands.send")}
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
    font-size: 16px;
    line-height: 14px;
  }
`;

const StyledTabs = styled(Tabs)`
  border-radius: 8px 8px 0 0;

  .MuiTabs-indicator {
    height: 3px;
  }
`;
