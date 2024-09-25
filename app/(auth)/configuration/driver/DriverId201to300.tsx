import { Stack, Select, MenuItem, TextField, Button } from "@mui/material";
import React from "react";
import InputBox from "../../../../components/inputbox/InputBox";

export default function DriverId201to300() {
  return (
    <>
      <Stack direction="row" gap="8px" alignItems={"flex-start"}>
        <div className="pageTitle">Drive ID 201-300</div>

        <InputBox.Info tooltipText="tooptip example" />
        <InputBox.Number>1800~99</InputBox.Number>
      </Stack>
      <Stack direction="row" gap="40px" mb="40px">
        <Stack gap="20px" sx={{ width: "50%" }}>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Driver ID No.<i>*</i>
              </InputBox.Title>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <Stack direction="row" gap="8px">
                <Select value={"select-1"} sx={{ minWidth: "120px" }}>
                  <MenuItem value={"select-1"}>Select</MenuItem>
                </Select>
                <TextField fullWidth defaultValue="" />
              </Stack>
            </InputBox.Body>
          </InputBox>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Driver ID No.<i>*</i>
              </InputBox.Title>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <Stack direction="row" gap="8px">
                <Select value={"select-1"} sx={{ minWidth: "120px" }}>
                  <MenuItem value={"select-1"}>Select</MenuItem>
                </Select>
                <TextField fullWidth defaultValue="" />
              </Stack>
            </InputBox.Body>
          </InputBox>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Driver ID No.<i>*</i>
              </InputBox.Title>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <Stack direction="row" gap="8px">
                <Select value={"select-1"} sx={{ minWidth: "120px" }}>
                  <MenuItem value={"select-1"}>Select</MenuItem>
                </Select>
                <TextField fullWidth defaultValue="" />
              </Stack>
            </InputBox.Body>
          </InputBox>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Driver ID No.<i>*</i>
              </InputBox.Title>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <Stack direction="row" gap="8px">
                <Select value={"select-1"} sx={{ minWidth: "120px" }}>
                  <MenuItem value={"select-1"}>Select</MenuItem>
                </Select>
                <TextField fullWidth defaultValue="" />
              </Stack>
            </InputBox.Body>
          </InputBox>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Driver ID No.<i>*</i>
              </InputBox.Title>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <Stack direction="row" gap="8px">
                <Select value={"select-1"} sx={{ minWidth: "120px" }}>
                  <MenuItem value={"select-1"}>Select</MenuItem>
                </Select>
                <TextField fullWidth defaultValue="" />
              </Stack>
            </InputBox.Body>
          </InputBox>
        </Stack>
        <Stack gap="20px" sx={{ width: "50%" }}>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Driver ID No.<i>*</i>
              </InputBox.Title>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <Stack direction="row" gap="8px">
                <Select value={"select-1"} sx={{ minWidth: "120px" }}>
                  <MenuItem value={"select-1"}>Select</MenuItem>
                </Select>
                <TextField fullWidth defaultValue="" />
              </Stack>
            </InputBox.Body>
          </InputBox>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Driver ID No.<i>*</i>
              </InputBox.Title>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <Stack direction="row" gap="8px">
                <Select value={"select-1"} sx={{ minWidth: "120px" }}>
                  <MenuItem value={"select-1"}>Select</MenuItem>
                </Select>
                <TextField fullWidth defaultValue="" />
              </Stack>
            </InputBox.Body>
          </InputBox>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Driver ID No.<i>*</i>
              </InputBox.Title>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <Stack direction="row" gap="8px">
                <Select value={"select-1"} sx={{ minWidth: "120px" }}>
                  <MenuItem value={"select-1"}>Select</MenuItem>
                </Select>
                <TextField fullWidth defaultValue="" />
              </Stack>
            </InputBox.Body>
          </InputBox>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Driver ID No.<i>*</i>
              </InputBox.Title>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <Stack direction="row" gap="8px">
                <Select value={"select-1"} sx={{ minWidth: "120px" }}>
                  <MenuItem value={"select-1"}>Select</MenuItem>
                </Select>
                <TextField fullWidth defaultValue="" />
              </Stack>
            </InputBox.Body>
          </InputBox>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Driver ID No.<i>*</i>
              </InputBox.Title>
              {/* <span className="notification"/> */}
            </InputBox.Head>
            <InputBox.Body>
              <Stack direction="row" gap="8px">
                <Select value={"select-1"} sx={{ minWidth: "120px" }}>
                  <MenuItem value={"select-1"}>Select</MenuItem>
                </Select>
                <TextField fullWidth defaultValue="" />
              </Stack>
            </InputBox.Body>
          </InputBox>
        </Stack>
      </Stack>
      <Stack alignItems="center" mb="52px">
        <Button variant="contained" color="secondary" sx={{ width: 200 }}>
          Add
        </Button>
      </Stack>
    </>
  );
}
