import { Button, Stack, TextField } from "@mui/material";
import { FormField } from "../page";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { Dispatch } from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import useSendFormData from "../(utils)/useSendFormData";
import Modal from "@/components/Modal";

interface Props {
  formData: {
    [key: string]: FormField;
  };
  setFormData: Dispatch<
    SetStateAction<{
      [key: string]: FormField;
    }>
  >;
  profileData: string;
  setProfileData: Dispatch<SetStateAction<string>>;
}

export default function EditProfileTab({
  profileData,
  setProfileData,
  formData,
  setFormData,
}: Props) {
  const t = useTranslations();

  const { sendFormData, isLoading } = useSendFormData();

  // state
  const errorTitle = useRef("");
  const errorMessage = useRef("");
  const confirmButtonText = useRef("");
  const handleErrorPopupOk = useRef<() => void | null>(null);
  const [isOpenErrorPopup, setIsOpenErrorPopup] = useState(false);

  const getFormDataByProfile = (profile: string) => {
    const newFormData = { ...formData };

    console.log("newFormData ::::", newFormData);

    // Split profile data into lines and process each line
    profile.split("\n").forEach((line) => {
      // Skip empty lines
      if (!line.trim()) return;

      console.log("\nProcessing line:", line);

      // Parse the line
      const parts = line.split(";");
      if (parts.length < 3) return; // Need at least NTW,PRG,empty,prefix
      console.log(parts, "partspartspartsparts");
      // Get the prefix (e.g., "10")
      const prefixValue = parts[2]; // The prefix is the 4th element
      console.log("Prefix value:", prefixValue);

      // Process each pair (e.g., "00#01")
      parts.slice(3).forEach((pair) => {
        const [id, value] = pair.split("#");

        // 빈값은 이미 입력된 값으로
        // if (!id || !value) return;

        // 빈값도 load
        if (!id) return;

        // Create the key (e.g., "1000")
        const key = `${prefixValue}${id}`;
        console.log(
          `Processing pair - ID: ${id}, Value: ${value}, Key: ${key}`
        );

        // Update only if the key exists in formData
        console.log("key :::", key);

        if (newFormData[key]) {
          const isAlertId = !!newFormData[key]?.alert_id;
          const isList = !!newFormData[key]?.labelList;
          const isAssign = !!newFormData[key]?.text_num;
          let valueProps = value;
          let realValueProps = value;
          let textNumProps = undefined;

          console.log("isAssign :::", isAssign);
          if (isAssign) {
            console.log("isAssign value ::::", value);

            textNumProps = `${Number(value)}`;
            valueProps = value === "00" ? "0" : "1";
            realValueProps = valueProps;
          }

          if (isAlertId) {
            valueProps = value?.[1] || "0";
            realValueProps = valueProps;
          }

          if (isList) {
            valueProps = newFormData[key].labelList[value];
          }

          console.log(`Updating formData for key ${key}:`, {
            before: newFormData[key],
            after: {
              ...newFormData[key],
              value: valueProps,
              realValue: realValueProps,
              text_num: textNumProps,
            },
          });

          newFormData[key] = {
            ...newFormData[key],
            value: valueProps,
            realValue: realValueProps,
            text_num: textNumProps,
          };
        } else {
          console.log(`Key ${key} not found in formData`);
        }
      });
    });

    console.log("\nFinal formData:", newFormData);
    console.log("=== Profile Data Processing End ===\n");

    return newFormData;
  };

  const openErrorPopup = (
    message: string,
    options?: {
      title?: string;
      confirmText?: string;
      onErrorPopupOk?: () => void;
    }
  ) => {
    errorTitle.current = options?.title || t("common.popup.error");
    errorMessage.current = message;
    confirmButtonText.current = options?.confirmText || t("common.popup.ok");
    handleErrorPopupOk.current = options?.onErrorPopupOk;
    setIsOpenErrorPopup(true);
  };

  const closeErrorPopup = () => {
    errorMessage.current = "";
    handleErrorPopupOk.current = null;
    setIsOpenErrorPopup(false);
  };

  const handleSave = () => {
    const newFormData = getFormDataByProfile(profileData);

    const fieldValues = Object.keys(newFormData).reduce((acc, key) => {
      acc[key] = {
        id: key,
        value: newFormData[key].value,
        realValue: newFormData[key].realValue,
        text_num: newFormData[key].text_num,
        alert_id: newFormData[key].alert_id,
      };
      return acc;
    }, {});

    setFormData(newFormData);
    sendFormData(fieldValues);

    openErrorPopup(t("common.message.save-success"), {
      title: t("common.popup.success"),
    });
  };

  return (
    <>
      <Stack className="contentWrap" direction="column" gap={"20px"}>
        <StyledTextarea
          value={profileData}
          onChange={(e) => setProfileData(e.target.value)}
        />
        <Button
          style={{ alignSelf: "flex-end" }}
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={isLoading}
        >
          {t("common.save")}
        </Button>
      </Stack>

      {isOpenErrorPopup && (
        <Modal
          open
          width={"357px"}
          toggleOpen={closeErrorPopup}
          cancelButtonText={t("common.popup.cancel")}
          confirmButtonText={confirmButtonText.current}
          title={errorTitle.current}
          confirm={handleErrorPopupOk.current}
        >
          <Stack>
            <span style={{ wordBreak: "keep-all" }}>
              {errorMessage.current}
            </span>
          </Stack>
        </Modal>
      )}
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
