import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import styled from "styled-components";
import { Button, Stack } from "@mui/material";
import useProfile from "@/src/hooks/useProfile";
import { SerialPortState } from "@/src/stores/useSerialStore";
import FullLoading from "@/components/FullLoading";
import { generateFilename } from "@/src/utils/profileUtil";
import { fileDownload } from "@/utils/fileDownload";

interface Props {
  currentPort: SerialPortState;
  write: any;
}

export default function EditProfileTab({ currentPort, write }: Props) {
  const t = useTranslations();
  const [profileData, setProfileData] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const {
    state: { percentage },
    func: { getProfileAllData },
  } = useProfile({
    port: currentPort?.port || null,
    writer: currentPort?.writer || null,
    imei: currentPort?.imei || "",
    writeSerial: write || "",
  });

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      const data = await getProfileAllData(false);
      setProfileData(data.join("\n"));
      setIsLoading(false);
    })();
  }, []);

  const handleSave = async () => {
    const blob = new Blob([profileData], {
      type: "text/plain;charset=utf-8",
    });

    const modelName = currentPort.port.modelinfo.split("_")[0];
    const modelVersion =
      currentPort.port.modelinfo.split("_")[
        currentPort.port.modelinfo.split("_").length - 1
      ];

    const downloadFileName = await generateFilename(
      new File([blob], `${modelName}_${modelVersion}.profile`),
      modelName,
      modelVersion
    );
    fileDownload(blob, downloadFileName);
  };

  return (
    <>
      {isLoading && <FullLoading progress={percentage} />}
      <Stack className="contentWrap" direction="column" gap={"20px"}>
        <StyledTextarea
          value={profileData}
          onChange={(e) => setProfileData(e.target.value)}
        />
        <Button
          style={{ alignSelf: "flex-end" }}
          color="secondary"
          variant="contained"
          onClick={handleSave}
          // disabled={isLoading}
        >
          {t("common.save")}
        </Button>
      </Stack>
    </>
  );
}

const StyledTextarea = styled.textarea`
  height: 100%;
  width: 100%;
  padding: 24px;
  border: 1px solid var(--grey3);
  border-radius: 10px;
  font-size: 14px;
  line-height: 24px;
  color: var(--grey10);
`;
