"use client";

import { useState } from "react";
import styles from "../styles.module.scss";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import logo from "/public/images/logo-dark.svg";
import Link from "next/link";
import InputBox from "../../../components/inputbox/InputBox";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  TextField,
} from "@mui/material";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import SelectCountry from "../../../components/SelectCountry";
import useAuthStore, { UserRole } from "../../../utils/useAuthStore";
import Alert from "../../../components/Alert";
import { login } from "@/src/api/services/auth";
import httpInstance from "@/src/api/axiosConfig";

export default function page() {
  const router = useRouter();

  const { setUserId, setUserRole } = useAuthStore();
  const [inputId, setInputId] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await httpInstance.post(`/api/v1/auth/login`, {
        country: selectedCountry,
        user_id: inputId,
        password: inputPassword,
      });
    } catch (error) {
      console.log(error, "error");
    }

    // if (loginValidator({ id: inputId, password: inputPassword })) {
    // 전역 변수에 저장
    // router.push("/");
    // } else {
    //   Alert({
    //     title: "Error",
    //     text: `Invalid country or ID or password.\nPlease try again.`,
    //   });
    // }
  };

  const accounts: {
    id: string;
    password: string;
    role: UserRole;
  }[] = [
    { id: "root1", password: "1234", role: "ROOT" },
    { id: "admin1", password: "1234", role: "ADMIN" },
    { id: "customer1", password: "1234", role: "CUSTOMER" },
    { id: "guest1", password: "1234", role: "GUEST" },
  ];

  // const loginValidator = ({ id, password }) => {
  //   const checkId = accounts.some((item) => item.id === id);
  //   const matchIndex = accounts.findIndex((item) => item.id === id);

  //   // const checkPassword =
  //   if (checkId) {
  //     if (accounts[matchIndex].password === password) {
  //       // 아이디, 비밀번호 일치
  //       console.log("아이디 및 비밀번호가 일치합니다.");

  //       console.log("accounts[matchIndex].role");
  //       console.log(accounts[matchIndex].role);
  //       console.log("id");
  //       console.log(id);

  //       setUserId(id);
  //       setUserRole(accounts[matchIndex].role);
  //       return true;
  //     }
  //   } else {
  //     return false;
  //   }
  // };

  return (
    <>
      <div className="logo">
        <Image src={logo} alt="synctrack" />
      </div>
      <div className="pageTitle">Sign in to your SyncMaster account!</div>
      <div className="description">
        You can log in with your Scuti ID!
        <br />
        Don’t have an account yet?
        <Link
          href="http://www.wizardlab.co.kr/main/index_06_1"
          className="underlineTextButton"
        >
          Contact us
        </Link>
      </div>

      <div className="content">
        <form onSubmit={handleSubmit}>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>Country</InputBox.Title>
            </InputBox.Head>
            <InputBox.Body>
              <FormControl sx={{ width: "100%" }} size="small">
                <SelectCountry setCountryData={setSelectedCountry} />
              </FormControl>
            </InputBox.Body>
          </InputBox>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>ID</InputBox.Title>
            </InputBox.Head>
            <InputBox.Body>
              <TextField
                id="id"
                variant="outlined"
                size="small"
                fullWidth
                value={inputId}
                onChange={(e) => setInputId(e.target.value)}
                // error
                // helperText="error!!"
              />
            </InputBox.Body>
          </InputBox>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>Password</InputBox.Title>
            </InputBox.Head>
            <InputBox.Body>
              <TextField
                id="password"
                variant="outlined"
                size="small"
                fullWidth
                type={showPassword ? "text" : "password"}
                value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)}
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
          <div className={styles.loginHelpWrap}>
            <div>
              <Link className="underlineTextButton" href="/find-id">
                Find ID
              </Link>
              /
              <Link className="underlineTextButton" href="/find-password">
                Find Password
              </Link>
            </div>
            <div>
              <FormControlLabel control={<Checkbox />} label="Remember me" />
            </div>
          </div>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              background: "var(--primary-gradient)",
              mt: 2,
              opacity:
                selectedCountry.length === 0 ||
                inputId.length === 0 ||
                inputPassword.length === 0
                  ? "0.5"
                  : undefined,
            }}
            disabled={
              selectedCountry.length === 0 ||
              inputId.length === 0 ||
              inputPassword.length === 0
            }
          >
            Login
          </Button>
        </form>
      </div>
    </>
  );
}
