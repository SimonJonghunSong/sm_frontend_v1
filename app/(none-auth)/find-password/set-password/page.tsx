"use client";

import { useRouter } from 'next/navigation';
import { useState } from "react";
import Image from "next/image";
import logo from "/public/images/logo-dark.svg";
import {
  Button,
  IconButton,
  Stack,
  TextField,
  } from "@mui/material";
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import InputBox from "../../../../components/inputbox/InputBox";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export default function page() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    router.push("/");
  };

  return (
    <>
      <div className="logo">
        <Image src={logo} alt="synctrack" />
      </div>
      <div className="pageTitle">Set your password!</div>
      <div className="description">Set a password for your account</div>

      <div className="content">
        <form onSubmit={handleSubmit}>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>Password</InputBox.Title>
            </InputBox.Head>
            <InputBox.Body>
              <TextField
                id="input1"
                variant="outlined"
                size="small"
                fullWidth
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
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>Confirm Password</InputBox.Title>
            </InputBox.Head>
            <InputBox.Body>
              <TextField
                id="input1"
                variant="outlined"
                size="small"
                fullWidth
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
            </InputBox.Body>
          </InputBox>

          {true && (
            <Stack direction="row" gap="6px" sx={{color: 'var(--error)', mb: "8px"}}>
              <CloseIcon />
              <span style={{fontWeight: 500}}>At least 8 characters</span>
            </Stack>
          )}
          {true && (
            <Stack direction="row" gap="6px" sx={{color: 'var(--error)', mb: "8px"}}>
              <CloseIcon />
              <span style={{fontWeight: 500}}>At least 1 upper/lowercase</span>
            </Stack>
          )}
          {true && (
            <Stack direction="row" gap="6px" sx={{color: 'var(--success)', mb: "8px"}}>
              <CheckIcon />
              <span style={{fontWeight: 500}}>At least 1 number</span>
            </Stack>
          )}
          {true && (
            <Stack direction="row" gap="6px" sx={{color: 'var(--error)', mb: "8px"}}>
              <CloseIcon />
              <span style={{fontWeight: 500}}>Password do not match</span>
            </Stack>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ background: "var(--primary-gradient)", mt: 1 }}
          >
            Set Password
          </Button>
        </form>
      </div>
    </>
  );
}
