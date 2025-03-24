"use client";

import React, { useEffect, useReducer, useState } from "react";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styles from "../styles.module.scss";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import Modal from "@/components/Modal";
import InputBox from "@/components/inputbox/InputBox";
import { SwitchPrimary } from "@/components/switches";
import { editModel } from "@/src/api/services/model";
import { Model } from "@/src/api/services/model/type";
import useModelPkgStore from "@/src/stores/useModelPkgStore";

export interface FormState {
  devName: string;
  country: string;
  imageFile: File;
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
  supportedNetworkType: [],
  supportedFeatures: [],
  settingFile: undefined,
  hide: false,
};

interface Props {
  handleCloseModal: () => void;
  selectedData: Model;
  openErrorPopup: (
    message: string,
    options?: {
      title?: string;
      confirmText?: string;
      onErrorPopupOk?: () => void;
    }
  ) => void;
}

export default function EditModal({
  handleCloseModal,
  selectedData,
  openErrorPopup,
}: Props) {
  const t = useTranslations();
  // forms
  const [state, dispatch] = useReducer(reducer, initialState);
  const queryClient = useQueryClient();
  const editModelRequest = useMutation({
    mutationFn: editModel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["model"] });
      openErrorPopup(t("common.message.save-success"), {
        title: t("common.popup.success"),
      });
      handleCloseModal();
    },
  });

  const { getIncludeUids } = useModelPkgStore();

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
  const [imagePreview, setThumbnailPreview] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);

    dispatch({
      type: "SET_SETTING_FILE",
      value: e.target.files[0],
    });
  };

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

  const handleEditConfirm = () => {
    openErrorPopup(
      t(
        "popup.model.edit_model_pop_up.are_you_sure_you_want_to_change_this_option"
      ),
      {
        title: t("common.popup.confrim"),
        confirmText: t("common.popup.yes"),
        onErrorPopupOk: () => {
          const formData = new FormData();

          if (imageFile) {
            formData.append("image_file", imageFile);
          }
          if (settingFile) {
            formData.append("default_config_file", settingFile);
          }
          formData.append(
            "json",
            JSON.stringify({
              uid: selectedData.uid,
              dev_name: devName,
              fw_ver: "1.1.0",
              country,
              supported_network_type: supportedNetworkType,
              supported_features: supportedFeatures,
              hide,
              model_pkg: "model_pkg",
            })
          );

          editModelRequest.mutate(formData);
        },
      }
    );
  };

  const [initData, setInitData] = useState("");

  useEffect(() => {
    const initValues = {
      devName: selectedData.dev_name,
      country: selectedData.country.name,
      imageFile: undefined,
      supportedNetworkType: selectedData.supported_network_type,
      supportedFeatures: selectedData.supported_features,
      settingFile: undefined,
      hide: selectedData.hide,
    };

    setInitData(JSON.stringify(initValues));

    dispatch({
      type: "SET_DATA",
      value: initValues,
    });
    setThumbnailPreview(selectedData.image_file);
  }, [selectedData]);

  return (
    <Modal
      open={true}
      toggleOpen={handleCloseModal}
      title={t("model.edit_model_pop_up.edit_model")}
      confirm={handleEditConfirm}
      confirmButtonText={t("model.edit_model_pop_up.save")}
      cancelButtonText={t("model.edit_model_pop_up.cancel")}
      width="720px"
      disabled={
        initData === JSON.stringify(state) ||
        !devName ||
        !country ||
        !supportedNetworkType.length ||
        !supportedFeatures.length
      }
      manualToggleOpenWhenConfirm
    >
      <Stack>
        <InputBox>
          <InputBox.Head>
            <InputBox.Title>
              {t("model.edit_model_pop_up.image_*")}
              <i>*</i>
            </InputBox.Title>
          </InputBox.Head>
          <InputBox.Body>
            <Stack gap="12px">
              <Stack direction="row" gap="16px" alignItems="flex-end">
                <div className={styles.thumbnail}>
                  {imagePreview ? (
                    <Box width={160} height={160}>
                      <img
                        src={imagePreview}
                        alt="thumbnail"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </Box>
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
                  {t("model.edit_model_pop_up.upload")}
                </Button>
              </Stack>
              <span className="text-grey-5">
                {t(
                  "model.edit_model_pop_up.png_or_jpg_only_1000x1000px_recommended_max_5mb"
                )}
              </span>
            </Stack>
          </InputBox.Body>
        </InputBox>

        <InputBox>
          <InputBox.Head>
            <InputBox.Title>
              {t("model.edit_model_pop_up.model_name_*")}
              <i>*</i>
            </InputBox.Title>
          </InputBox.Head>
          <InputBox.Body>
            <TextField
              disabled
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
              {t("model.edit_model_pop_up.country_*")}
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
                <FormControlLabel value="USA" control={<Radio />} label="SU" />
                <FormControlLabel
                  value="Brazil"
                  control={<Radio />}
                  label="SB"
                />
                <FormControlLabel
                  value="Mexico"
                  control={<Radio />}
                  label="SM"
                />
                <FormControlLabel
                  value="Europe"
                  control={<Radio />}
                  label="SE"
                />
              </RadioGroup>
            </FormControl>
          </InputBox.Body>
        </InputBox>

        <InputBox>
          <InputBox.Head>
            <InputBox.Title>
              {t("model.edit_model_pop_up.network_*")}
              <i>*</i>
            </InputBox.Title>
          </InputBox.Head>
          <InputBox.Body>
            <FormControl
              sx={{ flexDirection: "row", gap: "10px", flexWrap: "wrap" }}
            >
              {[
                { label: "2G", value: "2G" },
                { label: "NB-IoT", value: "NB-IoT" },
                { label: "LTE Cat.1", value: "LTEcat1" },
                { label: "LTE Cat.M1", value: "LTECatM1" },
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
            <InputBox.Title>
              {t("model.edit_model_pop_up.features")}
              <i>*</i>
            </InputBox.Title>
          </InputBox.Head>
          <InputBox.Body>
            <FormControl
              sx={{ flexDirection: "row", gap: "10px", flexWrap: "wrap" }}
            >
              {[
                {
                  label: t("model.add_model_pop_up.features-item.basic"),
                  value: "Basic",
                },
                {
                  label: t("model.add_model_pop_up.features-item.advanced"),
                  value: "Advanced",
                },
                {
                  label: t("model.add_model_pop_up.features-item.wired"),
                  value: "Wired",
                },
                {
                  label: t("model.add_model_pop_up.features-item.bot"),
                  value: "BOT",
                },
                {
                  label: t("model.add_model_pop_up.features-item.box-tracker"),
                  value: "BoxTracker",
                },
                {
                  label: t("model.add_model_pop_up.features-item.obd"),
                  value: "OBD",
                },
                {
                  label: t("model.add_model_pop_up.features-item.wi-fi"),
                  value: "Wi-Fi",
                },
                {
                  label: t("model.add_model_pop_up.features-item.ble"),
                  value: "BLE",
                },
                {
                  label: t("model.add_model_pop_up.features-item.rf"),
                  value: "RF",
                },
                {
                  label: t(
                    "model.add_model_pop_up.features-item.digital-inputs-outputs"
                  ),
                  value: "Digital Inputs/Outputs",
                },
                {
                  label: t("model.add_model_pop_up.features-item.rs232"),
                  value: "RS232",
                },
                {
                  label: t("model.add_model_pop_up.features-item.one-wire"),
                  value: "1-Wire",
                },
                {
                  label: t("model.add_model_pop_up.features-item.voice-call"),
                  value: "Voice Call",
                },
                {
                  label: t(
                    "model.add_model_pop_up.features-item.dead-reckoning"
                  ),
                  value: "Dead Reckoning",
                },
                {
                  label: t("model.add_model_pop_up.features-item.geofence"),
                  value: "Geofence",
                },
                {
                  label: t("model.add_model_pop_up.features-item.jamming"),
                  value: "Jamming",
                },
                {
                  label: t(
                    "model.add_model_pop_up.features-item.motion-sensor"
                  ),
                  value: "Motion Sensor",
                },
                {
                  label: t("model.add_model_pop_up.features-item.ignition"),
                  value: "Ignition",
                },
                {
                  label: t(
                    "model.add_model_pop_up.features-item.low-power-consumption"
                  ),
                  value: "Low-power consumption (eDRX)",
                },
                {
                  label: t(
                    "model.add_model_pop_up.features-item.temperature-sensor"
                  ),
                  value: "Temperature Sensor",
                },
                {
                  label: t("model.add_model_pop_up.features-item.waterproof"),
                  value: "Waterproof",
                },
                {
                  label: t(
                    "model.add_model_pop_up.features-item.tamper-detection"
                  ),
                  value: "Tamper Detection",
                },
                {
                  label: t("model.add_model_pop_up.features-item.solar"),
                  value: "Solar",
                },
                {
                  label: t(
                    "model.add_model_pop_up.features-item.j1939-support"
                  ),
                  value: "J1939 Support",
                },
                {
                  label: t(
                    "model.add_model_pop_up.features-item.engine-diagnostics"
                  ),
                  value: "Engine Diagnostics",
                },
                {
                  label: t(
                    "model.add_model_pop_up.features-item.primary-battery"
                  ),
                  value: "Primary Battery",
                },
                {
                  label: t(
                    "model.add_model_pop_up.features-item.rechargeable-battery"
                  ),
                  value: "Rechargeable Battery",
                },
                {
                  label: t("model.add_model_pop_up.features-item.dpa"),
                  value: "DPA",
                },
                {
                  label: t(
                    "model.add_model_pop_up.features-item.backup-battery"
                  ),
                  value: "Backup Battery",
                },
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
              {t("model.edit_model_pop_up.setting_file_*")}
              <i>*</i>
            </InputBox.Title>
          </InputBox.Head>
          <InputBox.Body>
            <Stack direction="row" gap="8px">
              <TextField
                fullWidth
                value={file?.name || selectedData.default_profile}
                inputProps={{ readOnly: true }}
              />
              <Button variant="contained" color="secondary" component="label">
                <input
                  style={{ display: "none" }}
                  type="file"
                  hidden
                  accept=".xlsx, .xls"
                  onChange={handleFileChange}
                />
                {t("model.edit_model_pop_up.upload")}
              </Button>
            </Stack>
          </InputBox.Body>
        </InputBox>

        <InputBox>
          <InputBox.Head>
            <InputBox.Title
              style={{
                width: "100%",
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                gap={1}
              >
                <span>{t("model.edit_model_pop_up.hide_from_list")}</span>
                <SwitchPrimary
                  checked={hide}
                  onChange={(e) => {
                    if (getIncludeUids().includes(selectedData.uid)) {
                      openErrorPopup(
                        t(
                          "popup.model.model.models_loaded_by_the_user_cannot_be_hidden"
                        )
                      );
                      return;
                    }

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
