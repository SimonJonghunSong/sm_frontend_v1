"use client";

import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import React  from "react";
import SideMenu from "../../../../components/sidemenu/SideMenu";
import { sideMenuItems } from "../sideMenuItems";

export default function Server() {


  return (
    <div className="pageWrap">
      <SideMenu sideMenuItems={sideMenuItems} />
      <article className="contentWrap">
        <div className="pageTitle">Languages</div>
        <Stack height="300px">
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="english"
              name="radio-buttons-group"
              row
              sx={{ gap: "24px" }}
            >
              <FormControlLabel
                value="english"
                control={<Radio />}
                label="English"
              />
              <FormControlLabel value="spanish" control={<Radio />} label="Spanish" />
              <FormControlLabel value="portuguese" control={<Radio />} label="Portuguese" />
            </RadioGroup>
          </FormControl>
        </Stack>
        <Stack
          direction="row"
          gap="8px"
          justifyContent="flex-end"
          marginTop="40px"
        >
          <Button variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button variant="contained" color="secondary">
            Save
          </Button>
        </Stack>
      </article>
    </div>
  );
}
