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
  profileData?: string;
  setProfileData?: (data: string) => void;
}

export default function EditProfileTab({ currentPort, write, profileData: externalProfileData, setProfileData: setExternalProfileData }: Props) {
  const t = useTranslations();
  const [internalProfileData, setInternalProfileData] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isProfileLoaded, setIsProfileLoaded] = useState(false);


  // Use external profile data if provided, otherwise use internal state
  const profileData = externalProfileData || internalProfileData || "";
  const setProfileData = setExternalProfileData || setInternalProfileData;

  const {
    state: { percentage },
    func: { getProfileAllData },
  } = useProfile({
    port: currentPort?.port || null,
    writer: currentPort?.writer || null,
    imei: currentPort?.imei || "",
    writeSerial: write || "",
  });

    // 현재 에러 있음. 전체 선택하고 backspace누르면 지워지고난 후 다시 데이터가 리로드 됨. 
    // 나중에 다시 살펴볼 것. 

  useEffect(() => { // 이건 에러남. 
    // Only load from device if no external profile data is provided and internal data is empty
    if (!externalProfileData && !internalProfileData) {
      (async () => {
        setIsLoading(true);
        const data = await getProfileAllData(false);
        setInternalProfileData(data.join("\n"));
        setIsLoading(false);
      })();
    }
  }, []); // Remove externalProfileData dependency



  // #01 - 데이터 만 로드하는 코드 
  // useEffect(() => {
  //   if (!externalProfileData && !internalProfileData && !isProfileLoaded) {
  //     (async () => {
  //       setIsLoading(true);
  //       const data = await getProfileAllData(false);
  //       setInternalProfileData(data.join("\n"));
  //       setIsProfileLoaded(true); // ✅ 이후 다시 실행 안 됨
  //       setIsLoading(false);
  //     })();
  //   }
  // }, [externalProfileData, internalProfileData, isProfileLoaded]);

  // #02 - 이건 Port 변경되면 다시 리로드 하는 코드. 
  // useEffect(() => { //이것은 
  //   if (!externalProfileData && !internalProfileData && currentPort?.port && !isProfileLoaded) {
  //     (async () => {
  //       setIsLoading(true);
  //       const data = await getProfileAllData(false);
  //       setInternalProfileData(data.join("\n"));
  //       setIsProfileLoaded(true);
  //       setIsLoading(false);
  //     })();
  //   }
  // }, [currentPort?.port, externalProfileData, internalProfileData, isProfileLoaded]);


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

          onKeyDown={(e) => {
            const textarea = e.currentTarget;
          
            if (
              e.key === "Backspace" &&
              textarea.selectionStart !== textarea.selectionEnd
            ) {
              e.preventDefault();
              const start = textarea.selectionStart;
              const end = textarea.selectionEnd;
              const newValue = profileData.substring(0, start) + profileData.substring(end);
              setProfileData(newValue);
          
              // Fix: use saved reference to textarea
              setTimeout(() => {
                textarea.setSelectionRange(start, start);
              }, 0);
            }
          }}

//           onKeyDown={(e) => {
//             // Prevent default behavior for backspace when text is selected
// //일부 에러 있음. Ctrl-A로 전체 선택하고 Backspace 누르면 안지워짐. 
// // 문자열 블록처리하고 backspace 누르면 에러남. 

//             if (e.key === 'Backspace' && e.currentTarget.selectionStart !== e.currentTarget.selectionEnd) {
//               e.preventDefault();
//               const start = e.currentTarget.selectionStart;
//               const end = e.currentTarget.selectionEnd;
//               const newValue = profileData.substring(0, start) + profileData.substring(end);
//               setProfileData(newValue);
//               // Set cursor position after the change
//               setTimeout(() => {
//                 e.currentTarget.setSelectionRange(start, start);
//               }, 0);
//             }
//           }}
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
