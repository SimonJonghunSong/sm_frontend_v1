"use client";

import { Stack, Select, MenuItem, TextField } from "@mui/material";
import InputBox from "@/components/inputbox/InputBox";

interface CircularTypeProps {
  id?: number;
  lat?: number;
  long?: number;
  radius?: number;
  max: number;
  excludeGroupId?: number[];
  updateCircleCenter?: (
    circleId: number,
    newLat: number,
    newLng: number
  ) => void;
  updateCircleRadius?: (circleId: number, newRadius: number) => void;
  groupId?: number;
  onChangeGroupId: (id: number) => void;
}

const CircularType = ({
  id,
  lat,
  long,
  radius,
  updateCircleCenter,
  updateCircleRadius,
  max,
  excludeGroupId = [],
  groupId,
  onChangeGroupId,
}: CircularTypeProps) => {
  return (
    <Stack gap="20px">
      <InputBox>
        <InputBox.Head>
          <InputBox.Title>
            Group ID<i>*</i>
          </InputBox.Title>
          <InputBox.Info tooltipText="tooptip example" />
          <InputBox.Number>50/60</InputBox.Number>
        </InputBox.Head>
        <InputBox.Body>
          <Select
            value={groupId || ""}
            sx={{ width: "100%" }}
            onChange={(e) => onChangeGroupId(Number(e.target.value))}
          >
            {Array.from({ length: max }, (_, i) => i + 1)
              .filter((id) => !excludeGroupId.includes(id))
              .map((id) => (
                <MenuItem key={id} value={id}>
                  {id}
                </MenuItem>
              ))}
          </Select>
        </InputBox.Body>
      </InputBox>
      {id !== undefined && (
        <>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Latitude<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>50/60</InputBox.Number>
            </InputBox.Head>
            <InputBox.Body>
              <TextField
                type="number"
                value={lat || ""}
                onChange={(e) =>
                  updateCircleCenter(id, Number(e.target.value), long)
                }
                sx={{ width: "100%" }}
              />
            </InputBox.Body>
          </InputBox>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Longitude<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>50/60</InputBox.Number>
            </InputBox.Head>
            <InputBox.Body>
              <TextField
                type="number"
                value={long || ""}
                onChange={(e) =>
                  updateCircleCenter(id, lat, Number(e.target.value))
                }
                sx={{ width: "100%" }}
              />
            </InputBox.Body>
          </InputBox>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Radius<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>50/60</InputBox.Number>
            </InputBox.Head>
            <InputBox.Body>
              <TextField
                type="number"
                value={radius || ""}
                onChange={(e) => updateCircleRadius(id, Number(e.target.value))}
                sx={{ width: "100%" }}
              />
            </InputBox.Body>
          </InputBox>
        </>
      )}
    </Stack>
  );
};

export default CircularType;
