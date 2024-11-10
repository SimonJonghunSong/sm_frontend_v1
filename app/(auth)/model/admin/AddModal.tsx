"use client";
import styles from "../styles.module.scss";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import Modal from "../../../../components/Modal";
import InputBox from "../../../../components/inputbox/InputBox";
import { SwitchPrimary } from "../../../../components/switches";
import Image from "next/image";
import { addModel } from "@/src/api/services/model";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const selectNetworkData = [
  { label: "network1", value: "network1" },
  { label: "network2", value: "network2" },
  { label: "network3", value: "network3" },
];

export interface FormState {
  devName: string;
  country: string;
  imageFile: string;
  imageFileSmall: string;
  supportedNetworkType: string[];
  supportedFeatures: string[];
  settingFile: string;
  hide: boolean;
}

// 액션 타입 정의
type FormAction =
  | { type: "RESET" }
  | { type: "SET_DATA"; value: FormState }
  | { type: "SET_DEV_NAME"; value: string }
  | { type: "SET_COUNTRY"; value: string }
  | { type: "SET_IMAGE_FILE"; value: string }
  | { type: "SET_IMAGE_FILE_SMALL"; value: string }
  | { type: "SET_SUPPORTED_NETWORK_TYPE"; value: string[] }
  | { type: "SET_SUPPORTED_FEATURES"; value: string[] }
  | { type: "SET_SETTING_FILE"; value: string }
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
    case "SET_IMAGE_FILE_SMALL":
      return { ...state, imageFileSmall: action.value };
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
  imageFile: "",
  imageFileSmall: "",
  supportedNetworkType: [],
  supportedFeatures: [],
  settingFile: "",
  hide: false,
};

interface Props {
  handleCloseModal: () => void;
}

export default function AddModal({ handleCloseModal }: Props) {
  // forms
  const [state, dispatch] = useReducer(reducer, initialState);

  const queryClient = useQueryClient();
  const addModelRequest = useMutation({
    mutationFn: addModel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["model"] });
      toast("Successfully added!", {
        type: "success",
        position: "top-center",
      });
      handleCloseModal();
    },
  });

  const {
    devName,
    country,
    imageFile,
    imageFileSmall,
    supportedNetworkType,
    supportedFeatures,
    settingFile,
    hide,
  } = state;

  const [file, setFile] = useState<File>(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const [imagePreview, setThumbnailPreview] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
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

  const handleAddConfirm = async () => {
    addModelRequest.mutateAsync({
      country,
      hide,
      image_file: imageFile,
      image_file_small: imageFileSmall,
      model_pkg: "model_pkg",
      setting_file: settingFile,
      dev_name: devName,
      fw_ver: "1.1.0",
      supported_network_type: supportedNetworkType,
      supported_features: supportedFeatures,
    });
  };

  return (
    <Modal
      open={true}
      toggleOpen={handleCloseModal}
      title="Add Model"
      confirm={handleAddConfirm}
      confirmButtonText="Add"
      width="720px"
      disabled={!devName || !country || !supportedFeatures.length}
    >
      <Stack>
        <InputBox>
          <InputBox.Head>
            <InputBox.Title>
              Image<i>*</i>
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
                  Upload
                </Button>
              </Stack>
              <span className="text-grey-5">
                PNG or JPG only, 1000x1000px recommended, max 5MB
              </span>
            </Stack>
          </InputBox.Body>
        </InputBox>

        <InputBox>
          <InputBox.Head>
            <InputBox.Title>
              Model Name<i>*</i>
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
              Country<i>*</i>
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
              Network<i>*</i>
            </InputBox.Title>
          </InputBox.Head>
          <InputBox.Body>
            <FormControl sx={{ width: "100%" }} size="small">
              <Select
                displayEmpty
                renderValue={(v) =>
                  v?.length ? (
                    selectNetworkData.find((item) => item.value === v).label
                  ) : (
                    <span className="text-grey-5">Select</span>
                  )
                }
                value={""}
                disabled
              >
                {selectNetworkData.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
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
              <FormControlLabel
                value="Wi-Fi"
                control={
                  <Checkbox
                    onChange={handleSupportedFeaturesType}
                    value="Wi-Fi"
                    checked={supportedFeatures.includes("Wi-Fi")}
                  />
                }
                label="Wi-Fi"
              />
              <FormControlLabel
                value="BLE"
                control={
                  <Checkbox
                    onChange={handleSupportedFeaturesType}
                    value="BLE"
                    checked={supportedFeatures.includes("BLE")}
                  />
                }
                label="BLE"
              />
              <FormControlLabel
                value="RF"
                control={
                  <Checkbox
                    onChange={handleSupportedFeaturesType}
                    value="RF"
                    checked={supportedFeatures.includes("RF")}
                  />
                }
                label="RF"
              />
              <FormControlLabel
                value="NB-IoT"
                control={
                  <Checkbox
                    onChange={handleSupportedFeaturesType}
                    value="NB-IoT"
                    checked={supportedFeatures.includes("NB-IoT")}
                  />
                }
                label="NB-IoT"
              />
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
              <FormControlLabel
                value="Advanced"
                control={
                  <Checkbox
                    name="Advanced"
                    checked={supportedFeatures.includes("Advanced")}
                    onChange={handleSupportedFeaturesType}
                  />
                }
                label="Advanced"
              />
              <FormControlLabel
                value="Low-cost"
                control={
                  <Checkbox
                    name="Low-cost"
                    checked={supportedFeatures.includes("Low-cost")}
                    onChange={handleSupportedFeaturesType}
                  />
                }
                label="Low-cost"
              />
              <FormControlLabel
                value="Low-power consumption"
                control={
                  <Checkbox
                    name="Low-power consumption"
                    checked={supportedFeatures.includes(
                      "Low-power consumption"
                    )}
                    onChange={handleSupportedFeaturesType}
                  />
                }
                label="Low-power consumption"
              />
              <FormControlLabel
                value="Compact-size"
                control={
                  <Checkbox
                    name="Compact-size"
                    checked={supportedFeatures.includes("Compact-size")}
                    onChange={handleSupportedFeaturesType}
                  />
                }
                label="Compact-size"
              />
              <FormControlLabel
                value="BoxTracker"
                control={
                  <Checkbox
                    name="BoxTracker"
                    checked={supportedFeatures.includes("BoxTracker")}
                    onChange={handleSupportedFeaturesType}
                  />
                }
                label="BoxTracker"
              />
              <FormControlLabel
                value="Waterproof"
                control={
                  <Checkbox
                    name="Waterproof"
                    checked={supportedFeatures.includes("Waterproof")}
                    onChange={handleSupportedFeaturesType}
                  />
                }
                label="Waterproof"
              />
              <FormControlLabel
                value="Geofence"
                control={
                  <Checkbox
                    name="Geofence"
                    checked={supportedFeatures.includes("Geofence")}
                    onChange={handleSupportedFeaturesType}
                  />
                }
                label="Geofence"
              />
              <FormControlLabel
                value="Jamming Detection"
                control={
                  <Checkbox
                    name="Jamming Detection"
                    checked={supportedFeatures.includes("Jamming Detection")}
                    onChange={handleSupportedFeaturesType}
                  />
                }
                label="Jamming Detection"
              />
              <FormControlLabel
                value="Accelerometer"
                control={
                  <Checkbox
                    name="Accelerometer"
                    checked={supportedFeatures.includes("Accelerometer")}
                    onChange={handleSupportedFeaturesType}
                  />
                }
                label="Accelerometer"
              />
              <FormControlLabel
                value="Ignition"
                control={
                  <Checkbox
                    name="Ignition"
                    checked={supportedFeatures.includes("Ignition")}
                    onChange={handleSupportedFeaturesType}
                  />
                }
                label="Ignition"
              />
              <FormControlLabel
                value="Solar"
                control={
                  <Checkbox
                    name="Solar"
                    checked={supportedFeatures.includes("Solar")}
                    onChange={handleSupportedFeaturesType}
                  />
                }
                label="Solar"
              />
              <FormControlLabel
                value="OBD"
                control={
                  <Checkbox
                    name="OBD"
                    checked={supportedFeatures.includes("OBD")}
                    onChange={handleSupportedFeaturesType}
                  />
                }
                label="OBD"
              />
            </FormControl>
          </InputBox.Body>
        </InputBox>

        <InputBox>
          <InputBox.Head>
            <InputBox.Title>
              Setting File<i>*</i>
            </InputBox.Title>
          </InputBox.Head>
          <InputBox.Body>
            <Stack direction="row" gap="8px">
              <TextField
                placeholder="Choose file to upload"
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
                Upload
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
                width="100%"
              >
                <span>Hide from List</span>
                <SwitchPrimary
                  value={hide}
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
