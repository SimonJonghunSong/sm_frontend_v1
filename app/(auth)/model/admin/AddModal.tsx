"use client";

import React, { useReducer, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styles from "../styles.module.scss";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import Modal from "../../../../components/Modal";
import InputBox from "../../../../components/inputbox/InputBox";
import { SwitchPrimary } from "../../../../components/switches";
import { addModel } from "@/src/api/services/model";

export interface FormState {
  devName: string;
  country: string;
  imageFile: File;
  imageFileSmall: string;
  supportedNetworkType: string[];
  supportedFeatures: string[];
  settingFile: File;
  hide: boolean;
}

// 액션 타입 정의
type FormAction =
  | { type: "RESET" }
  | { type: "SET_DATA"; value: FormState }
  | { type: "SET_DEV_NAME"; value: string }
  | { type: "SET_COUNTRY"; value: string }
  | { type: "SET_IMAGE_FILE"; value: File }
  | { type: "SET_SUPPORTED_NETWORK_TYPE"; value: string[] }
  | { type: "SET_SUPPORTED_FEATURES"; value: string[] }
  | { type: "SET_SETTING_FILE"; value: File }
  | { type: "SET_HIDE"; value: boolean };

// 리듀서 함수 정의
function reducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "RESET":
      return { ...initialState };
    case "SET_DATA":
      return { ...action.value };
    case "SET_DEV_NAME":
      return { ...state, devName: action.value };
    case "SET_COUNTRY":
      return { ...state, country: action.value };
    case "SET_IMAGE_FILE":
      return { ...state, imageFile: action.value };
    case "SET_SUPPORTED_NETWORK_TYPE":
      return { ...state, supportedNetworkType: action.value };
    case "SET_SUPPORTED_FEATURES":
      return { ...state, supportedFeatures: action.value };
    case "SET_SETTING_FILE":
      return { ...state, settingFile: action.value };
    case "SET_HIDE":
      return { ...state, hide: action.value };
    default:
      return state;
  }
}

const initialState: FormState = {
  devName: "",
  country: "",
  imageFile: undefined,
  imageFileSmall: "",
  supportedNetworkType: [],
  supportedFeatures: [],
  settingFile: undefined,
  hide: false,
};

interface Props {
  handleCloseModal: () => void;
}

export default function AddModal({ handleCloseModal }: Props) {
  const t = useTranslations("model");
  // forms
  const [state, dispatch] = useReducer(reducer, initialState);
  const queryClient = useQueryClient();
  const addModelRequest = useMutation({
    mutationFn: addModel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["model"] });
      toast("Successfully added!", {
        type: "success",
      });
      handleCloseModal();
    },
  });

  const {
    devName,
    country,
    imageFile,
    supportedNetworkType,
    supportedFeatures,
    settingFile,
    hide,
  } = state;

  const [file, setFile] = useState<File>(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);

    dispatch({
      type: "SET_SETTING_FILE",
      value: e.target.files[0],
    });
  };

  const [imagePreview, setThumbnailPreview] = useState(null);

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(imageFile);

      dispatch({
        type: "SET_IMAGE_FILE",
        value: imageFile,
      });
    }
  };

  const handleSupportedNetworkType = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = e.target;

    if (checked) {
      dispatch({
        type: "SET_SUPPORTED_NETWORK_TYPE",
        value: [...supportedNetworkType, value],
      });
    } else {
      dispatch({
        type: "SET_SUPPORTED_NETWORK_TYPE",
        value: supportedNetworkType.filter((item) => item !== value),
      });
    }
  };

  const handleSupportedFeaturesType = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = e.target;

    if (checked) {
      dispatch({
        type: "SET_SUPPORTED_FEATURES",
        value: [...supportedFeatures, value],
      });
    } else {
      dispatch({
        type: "SET_SUPPORTED_FEATURES",
        value: supportedFeatures.filter((item) => item !== value),
      });
    }
  };

  const handleAddConfirm = () => {
    const formData = new FormData();

    formData.append("image_file", imageFile);
    formData.append("default_profile", settingFile);
    formData.append(
      "json",
      JSON.stringify({
        dev_name: devName,
        fw_ver: "1.1.0",
        country,
        supported_network_type: supportedNetworkType,
        supported_features: supportedFeatures,
        hide,
        model_pkg: "model_pkg",
      })
    );

    addModelRequest.mutate(formData);
  };

  return (
    <Modal
      open={true}
      toggleOpen={handleCloseModal}
      title={t("add_model_pop_up.add_model")}
      confirm={handleAddConfirm}
      cancelButtonText={t("add_model_pop_up.cancel")}
      confirmButtonText={t("add_model_pop_up.save")}
      width="720px"
      disabled={
        !imageFile ||
        !devName ||
        !country ||
        !supportedNetworkType.length ||
        !supportedFeatures.length ||
        !settingFile
      }
    >
      <Stack>
        <InputBox>
          <InputBox.Head>
            <InputBox.Title>
              {t("add_model_pop_up.image_*")}
              <i>*</i>
            </InputBox.Title>
          </InputBox.Head>
          <InputBox.Body>
            <Stack gap="12px">
              <Stack direction="row" gap="16px" alignItems="flex-end">
                <div className={styles.thumbnail}>
                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      alt="preview"
                      width={160}
                      height={160}
                    />
                  ) : (
                    <ImageOutlinedIcon
                      sx={{ color: "var(--grey4)", fontSize: 62 }}
                    />
                  )}
                </div>
                <Button variant="contained" color="secondary" component="label">
                  <input
                    style={{ display: "none" }}
                    type="file"
                    hidden
                    accept=".jpg, .jpeg, .png"
                    onChange={handleImageChange}
                  />
                  {t("add_model_pop_up.upload")}
                </Button>
              </Stack>
              <span className="text-grey-5">
                {t(
                  "add_model_pop_up.png_or_jpg_only,_1000x1000px_recommended,_max_5mb"
                )}
              </span>
            </Stack>
          </InputBox.Body>
        </InputBox>

        <InputBox>
          <InputBox.Head>
            <InputBox.Title>
              {t("add_model_pop_up.model_name_*")}
              <i>*</i>
            </InputBox.Title>
          </InputBox.Head>
          <InputBox.Body>
            <TextField
              value={devName}
              onChange={(e) =>
                dispatch({ type: "SET_DEV_NAME", value: e.target.value })
              }
              name="dev_name"
              fullWidth
            />
          </InputBox.Body>
        </InputBox>

        <InputBox>
          <InputBox.Head>
            <InputBox.Title>
              {t("add_model_pop_up.country_*")}
              <i>*</i>
            </InputBox.Title>
          </InputBox.Head>
          <InputBox.Body>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue=""
                value={country}
                onChange={(e) => {
                  dispatch({ type: "SET_COUNTRY", value: e.target.value });
                }}
                name="country"
                row
                sx={{ gap: "24px" }}
              >
                <FormControlLabel value="USA" control={<Radio />} label="USA" />
                <FormControlLabel
                  value="LATAM"
                  control={<Radio />}
                  label="LATAM"
                />
              </RadioGroup>
            </FormControl>
          </InputBox.Body>
        </InputBox>

        <InputBox>
          <InputBox.Head>
            <InputBox.Title>
              {t("add_model_pop_up.network_*")} <i>*</i>
            </InputBox.Title>
          </InputBox.Head>

          <InputBox.Body>
            <FormControl
              sx={{ flexDirection: "row", gap: "10px", flexWrap: "wrap" }}
            >
              {[
                { label: "2G", value: "2G" },
                { label: "3G", value: "3G" },
                { label: "LTE Cat.1", value: "LTEcat1" },
                { label: "LTE Cat-M1", value: "LTECatM1" },
                { label: "5G", value: "5G" },
              ].map(({ label, value }) => {
                return (
                  <FormControlLabel
                    value={value}
                    key={value}
                    control={
                      <Checkbox
                        onChange={handleSupportedNetworkType}
                        value={value}
                        checked={supportedNetworkType.includes(value)}
                      />
                    }
                    label={label}
                  />
                );
              })}
            </FormControl>
          </InputBox.Body>
        </InputBox>

        <InputBox>
          <InputBox.Head>
            <InputBox.Title>Wireless Technology</InputBox.Title>
          </InputBox.Head>
          <InputBox.Body>
            <FormControl
              sx={{ flexDirection: "row", gap: "10px", flexWrap: "wrap" }}
            >
              {[
                { label: "Wi-Fi", value: "Wi-Fi" },
                { label: "BLE", value: "BLE" },
                { label: "RF", value: "RF" },
                { label: "NB-IoT", value: "NB-IoT" },
              ].map(({ label, value }) => {
                return (
                  <FormControlLabel
                    value={value}
                    control={
                      <Checkbox
                        onChange={handleSupportedFeaturesType}
                        value={value}
                        checked={supportedFeatures.includes(value)}
                      />
                    }
                    label={label}
                  />
                );
              })}
            </FormControl>
          </InputBox.Body>
        </InputBox>

        <InputBox>
          <InputBox.Head>
            <InputBox.Title>Features</InputBox.Title>
          </InputBox.Head>
          <InputBox.Body>
            <FormControl
              sx={{ flexDirection: "row", gap: "10px", flexWrap: "wrap" }}
            >
              {[
                { label: t("add_model_pop_up.advanced"), value: "Advanced" },
                { label: t("add_model_pop_up.low-cost"), value: "Low-cost" },
                {
                  label: t("add_model_pop_up.low-power_consumption"),
                  value: "Low-power consumption",
                },
                {
                  label: t("add_model_pop_up.compact-size"),
                  value: "Compact-size",
                },
                {
                  label: t("add_model_pop_up.boxtracker"),
                  value: "BoxTracker",
                },
                {
                  label: t("add_model_pop_up.waterproof"),
                  value: "Waterproof",
                },
                { label: t("add_model_pop_up.geofence"), value: "Geofence" },
                {
                  label: t("add_model_pop_up.jamming_detection"),
                  value: "Jamming Detection",
                },
                {
                  label: t("add_model_pop_up.accelerometer"),
                  value: "Accelerometer",
                },
                { label: t("add_model_pop_up.ignition"), value: "Ignition" },
                { label: t("add_model_pop_up.solar"), value: "Solar" },
                { label: t("add_model_pop_up.obd"), value: "OBD" },
              ].map(({ label, value }) => {
                return (
                  <FormControlLabel
                    key={value}
                    value={value}
                    control={
                      <Checkbox
                        onChange={handleSupportedFeaturesType}
                        value={value}
                        checked={supportedFeatures.includes(value)}
                      />
                    }
                    label={label}
                  />
                );
              })}
            </FormControl>
          </InputBox.Body>
        </InputBox>

        <InputBox>
          <InputBox.Head>
            <InputBox.Title>
              {t("add_model_pop_up.setting_file_*")}
              <i>*</i>
            </InputBox.Title>
          </InputBox.Head>
          <InputBox.Body>
            <Stack direction="row" gap="8px">
              <TextField
                placeholder={t("add_model_pop_up.choose_file_to_upload")}
                fullWidth
                value={file?.name || ""}
                inputProps={{ readOnly: true }}
              />
              <Button variant="contained" color="secondary" component="label">
                <input
                  style={{ display: "none" }}
                  type="file"
                  hidden
                  onChange={handleFileChange}
                />
                {t("add_model_pop_up.upload")}
              </Button>
            </Stack>
          </InputBox.Body>
        </InputBox>

        <InputBox>
          <InputBox.Head>
            <InputBox.Title>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                gap={1}
              >
                <span>{t("add_model_pop_up.hide_from_list")}</span>
                <SwitchPrimary
                  checked={hide}
                  onChange={(e) => {
                    dispatch({
                      type: "SET_HIDE",
                      value: e.target.checked as boolean,
                    });
                  }}
                />
              </Stack>
            </InputBox.Title>
          </InputBox.Head>
        </InputBox>
      </Stack>
    </Modal>
  );
}
