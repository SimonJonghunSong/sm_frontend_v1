import { Dispatch, SetStateAction } from "react";
import { FormField, AssignItem } from "../page";
import { Stack } from "@mui/material";
import Report from "../(report)/Report";
import {
  AlertConfig,
  AntiTheft,
  OBD,
  ObdPid,
  ReportSchdule,
} from "../(report)/@index";
import ReportMapping from "../(report)/ReportMapping";
import ReportMapping2 from "../(report)/ReportMapping2";
import AssignHeader from "../(report)/AssignHeader";
import useSerialConfigurationStore from "@/src/stores/useSerialConfigurationStore";
import { AssignMenuItem } from "@/components/AssignMenus";
import useSendFormData from "app/(auth)/model-info/(utils)/useSendFormData";

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
  setStt: Dispatch<
    SetStateAction<{
      s_assigns: AssignItem[];
      m_assigns: AssignItem[];
      l_assigns: AssignItem[];
    }>
  >;
  setAlt: Dispatch<
    SetStateAction<{
      s_assigns: AssignItem[];
      m_assigns: AssignItem[];
      l_assigns: AssignItem[];
    }>
  >;
}

export default function ReportTab({
  formData,
  setFormData,
  csvData,
  sttFormData,
  altFormData,
  setStt,
  setAlt,
}: Props) {
  const handleValueChange = (
    name,
    value,
    selectValue = undefined,
    alertId = undefined
  ) => {
    console.log(name, value, selectValue, alertId);

    setFormData((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        value: selectValue || value,
        realValue: value,
        alert_id: alertId,
      },
    }));
  };
  const { getCurrentImei } = useSerialConfigurationStore();
  const { sendFormData } = useSendFormData();

  const imei = getCurrentImei();

  console.log("sttFormData 222 :::", sttFormData);
  console.log("altFormData 222 :::", altFormData);

  const handleSttChange = (
    smallDataIndexes: AssignMenuItem[],
    mediumDataIndexes: AssignMenuItem[],
    largeDataIndexes: AssignMenuItem[]
  ) => {
    setStt((prev) => {
      const result = {
        s_assigns: prev.s_assigns.map((item, idx) => {
          const target = smallDataIndexes[idx];
          console.log("smallDataIndexes[idx] :::", smallDataIndexes[idx]);
          if (target) {
            return {
              ...item,
              value: "1",
              text_num: target.id,
            };
          }

          return { ...item, value: "0", text_num: "0" };
        }),
        m_assigns: prev.m_assigns.map((item, idx) => {
          const target = mediumDataIndexes[idx];
          if (target) {
            return { ...item, value: "1", text_num: target.id };
          }
          return { ...item, value: "0", text_num: "0" };
        }),
        l_assigns: prev.l_assigns.map((item, idx) => {
          const target = largeDataIndexes[idx];
          if (target) {
            return { ...item, value: "1", text_num: target.id };
          }
          return { ...item, value: "0", text_num: "0" };
        }),
      };

      const tabId = "11";

      const arr = [
        ...result.s_assigns,
        ...result.m_assigns,
        ...result.l_assigns,
      ];

      const updateData = arr.reduce((acc, item) => {
        const jsonId = `${tabId}${
          Number(item.ID) < 10 ? `0${item.ID}` : item.ID
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

      setFormData((prev) => ({
        ...prev,
        ...(updateData as Record<string, FormField>),
      }));

      return result;
    });
  };

  const handleAltChange = (
    smallDataIndexes: AssignMenuItem[],
    mediumDataIndexes: AssignMenuItem[],
    largeDataIndexes: AssignMenuItem[]
  ) => {
    setAlt((prev) => {
      const result = {
        s_assigns: prev.s_assigns.map((item, idx) => {
          const target = smallDataIndexes[idx];
          if (target) {
            return { ...item, value: "1", text_num: target.id };
          }
          return { ...item, value: "0", text_num: "0" };
        }),
        m_assigns: prev.m_assigns.map((item, idx) => {
          const target = mediumDataIndexes[idx];
          if (target) {
            return { ...item, value: "1", text_num: target.id };
          }
          return { ...item, value: "0", text_num: "0" };
        }),
        l_assigns: prev.l_assigns.map((item, idx) => {
          const target = largeDataIndexes[idx];
          if (target) {
            return { ...item, value: "1", text_num: target.id };
          }
          return { ...item, value: "0", text_num: "0" };
        }),
      };

      const tabId = "12";

      const arr = [
        ...result.s_assigns,
        ...result.m_assigns,
        ...result.l_assigns,
      ];

      const updateData = arr.reduce((acc, item) => {
        const jsonId = `${tabId}${
          Number(item.ID) < 10 ? `0${item.ID}` : item.ID
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

      setFormData((prev) => ({
        ...prev,
        ...(updateData as Record<string, FormField>),
      }));

      return result;
    });
  };

  const handleSendStt = () => {
    const tabId = "11";

    const arr = [
      ...sttFormData.s_assigns,
      ...sttFormData.m_assigns,
      ...sttFormData.l_assigns,
    ];

    const updateData = arr.reduce((acc, item) => {
      const jsonId = `${tabId}${
        Number(item.ID) < 10 ? `0${item.ID}` : item.ID
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

    console.log("updateData ::::", updateData);
    sendFormData(updateData as Record<string, FormField>);
  };
  const handleSendAlt = () => {
    const tabId = "12";
    console.log("altFormData ::::", altFormData);
    const arr = [
      ...altFormData.s_assigns,
      ...altFormData.m_assigns,
      ...altFormData.l_assigns,
    ];

    const updateData = arr.reduce((acc, item) => {
      const jsonId = `${tabId}${
        Number(item.ID) < 10 ? `0${item.ID}` : item.ID
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

    console.log("updateData ::::", updateData);
    sendFormData(updateData as Record<string, FormField>);
  };

  return (
    <Stack className="contentWrap" direction="column" gap={"20px"}>
      <Report formData={formData} onChange={handleValueChange} />

      <AntiTheft formData={formData} onChange={handleValueChange} />

      <ReportMapping formData={formData} onChange={handleValueChange} />

      <ReportMapping2 formData={formData} onChange={handleValueChange} />

      <AssignHeader
        onSttChange={handleSttChange}
        onAltChange={handleAltChange}
        handleSendStt={handleSendStt}
        handleSendAlt={handleSendAlt}
        sttFormData={sttFormData}
        altFormData={altFormData}
        csvData={csvData}
      />

      <AlertConfig formData={formData} onChange={handleValueChange} />

      <OBD formData={formData} onChange={handleValueChange} />

      <ObdPid formData={formData} onChange={handleValueChange} />

      <ReportSchdule formData={formData} onChange={handleValueChange} />
    </Stack>
  );
}
