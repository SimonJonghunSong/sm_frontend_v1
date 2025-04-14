import React from "react";
import { Stack, Button } from "@mui/material";
import InputBox from "@/components/inputbox/InputBox";
import { SwitchPrimary } from "@/components/switches";

interface GeofenceConfigProps {
  imei: string;
  formData: any[];
  getFormFields: (
    tabName: string,
    fieldName: string
  ) => { value: string; onChange: (value: string) => void };
  onSave: (tabName: string) => void;
}

/**
 * 지오펜스 설정 컴포넌트
 * 지오펜스 관련 설정을 표시하고 저장하는 기능 제공
 */
const GeofenceConfig: React.FC<GeofenceConfigProps> = ({
  imei,
  formData,
  getFormFields,
  onSave,
}) => {
  if (!formData) return null;

  const geofenceConfig = formData.find(({ info }) => {
    return info.tab_id === "90";
  });

  if (!geofenceConfig) return null;

  const geoConfigFields = geofenceConfig.fields.map(({ ID }) => ID); // ["0", "1", "2"]

  const renderConfigItem = (
    fieldId: string,
    title: string,
    number: string,
    tooltipText: React.ReactNode
  ) => {
    if (!geoConfigFields.includes(fieldId)) return null;

    const fieldName = geofenceConfig.fields.find(
      ({ ID }) => ID === fieldId
    )?.fieldName;

    if (!fieldName) return null;

    const { value, onChange } = getFormFields(
      geofenceConfig.tabName,
      fieldName
    );

    return (
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        gap="10px"
        sx={{ width: "calc(50% - 20px)" }}
      >
        <Stack direction="row" alignItems="center" gap="5px">
          <InputBox.Title>{title}</InputBox.Title>
          <InputBox.Info tooltipText={tooltipText} />
          <InputBox.Number>{number}</InputBox.Number>
        </Stack>
        <InputBox.Body>
          <SwitchPrimary
            checked={value === "Enable"}
            onChange={(e) => onChange(e.target.checked ? "Enable" : "Disable")}
          />
        </InputBox.Body>
      </Stack>
    );
  };

  const handleSave = () => {
    onSave(geofenceConfig.tabName);
  };

  return (
    <Stack>
      <InputBox>
        <Stack direction="row" justifyContent="space-between">
          <InputBox.Head>
            <InputBox.Title>
              <div className="pageTitle" style={{ marginBottom: 0 }}>
                Geofence Config
              </div>
            </InputBox.Title>
          </InputBox.Head>
          <Button color="secondary" variant="contained" onClick={handleSave}>
            Send
          </Button>
        </Stack>
      </InputBox>

      <InputBox>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          gap="20px"
        >
          {renderConfigItem(
            "0",
            "Polygon Speed Limit",
            "9000",
            <>
              Set whether to use the Speed Limit Buzzer in the Polygon Geofence
              Settings.
              <br />• Default : Off
            </>
          )}
          {renderConfigItem(
            "2",
            "Circular Buzzer Speed Limit",
            "9002",
            <>
              Set whether to use the Speed Limit Buzzer in the Circular Geofence
              Settings.
              <br />• Default : Off
            </>
          )}
          {renderConfigItem(
            "1",
            "Circular Output Active",
            "9001",
            <>
              Set whether to use the Output Active & Delay Time in the Circular
              Geofence Settings.
              <br />• Default : Off
            </>
          )}
        </Stack>
      </InputBox>
    </Stack>
  );
};

export default GeofenceConfig;
