"use client";

import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import {
  Button,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import SideMenu from "../../../../components/sidemenu/SideMenu";
import { sideMenuItems } from "../sideMenuItems";
import useAuthStore from "../../../../utils/useAuthStore";

export default function Server() {
  const [showPassword, setShowPassword] = useState(false);
  const {userId, userRole} = useAuthStore();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const [affilication, setAffiliation] = useState<string>("");

  const handleChange = (event: SelectChangeEvent) => {
    setAffiliation(event.target.value);
  };

  return (
    <div className="pageWrap">
      <SideMenu sideMenuItems={sideMenuItems} />
      <article className="contentWrap">
        <div className="pageTitle">My Info</div>
        <Stack>
          <Stack
            direction="row"
            alignItems="center"
            gap="8px"
            height="56px"
            borderBottom="1px solid var(--grey3)"
          >
            <div className="list-title">Company</div>
            <div>James Franco</div>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            gap="8px"
            height="56px"
            borderBottom="1px solid var(--grey3)"
          >
            <div className="list-title">ID</div>
            <div>{userId}</div>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            gap="8px"
            height="56px"
            borderBottom="1px solid var(--grey3)"
          >
            <div className="list-title">E-mail</div>
            <div>abc@abc.com</div>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            gap="8px"
            height="56px"
            borderBottom="1px solid var(--grey3)"
          >
            <div className="list-title">Password</div>
            <div>
              <TextField
                placeholder="Change password"
                id="input2"
                variant="outlined"
                size="small"
                sx={{ width: 320 }}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOutlinedIcon
                          sx={{ color: "var(--grey5)" }}
                        />
                      ) : (
                        <VisibilityOffOutlinedIcon
                          sx={{ color: "var(--grey5)" }}
                        />
                      )}
                    </IconButton>
                  ),
                }}
              />
            </div>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            gap="8px"
            height="56px"
            borderBottom="1px solid var(--grey3)"
          >
            <div className="list-title">Confirm Password</div>
            <div>
              <TextField
                placeholder="Change password"
                id="input1"
                variant="outlined"
                size="small"
                sx={{ width: 320 }}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOutlinedIcon
                          sx={{ color: "var(--grey5)" }}
                        />
                      ) : (
                        <VisibilityOffOutlinedIcon
                          sx={{ color: "var(--grey5)" }}
                        />
                      )}
                    </IconButton>
                  ),
                }}
              />
            </div>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            gap="8px"
            height="56px"
            borderBottom="1px solid var(--grey3)"
          >
            <div className="list-title">Country</div>
            <div>United States</div>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            gap="8px"
            height="56px"
            borderBottom="1px solid var(--grey3)"
          >
            <div className="list-title">Role</div>
            <div>{userRole}</div>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            gap="8px"
            height="56px"
            borderBottom="1px solid var(--grey3)"
          >
            <div className="list-title">Affiliation</div>
            <div>
              <Select
                value={affilication}
                onChange={handleChange}
                sx={{ width: 320 }}
              >
                <MenuItem value={"su"}>SU</MenuItem>
              </Select>
            </div>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            gap="8px"
            height="56px"
            borderBottom="1px solid var(--grey3)"
          >
            <div className="list-title">Department</div>
            <div>
              <TextField sx={{ width: 320 }} />
            </div>
          </Stack>
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
