"use client";

import { Noto_Sans } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const notoSans = Noto_Sans({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#F37121",
    },
    secondary: {
      main: "#2F2F37",
    },
    info: {
      main: "#4D4D56",
    },
    error: {
      main: "#FB4343",
    },
  },
  typography: {
    fontFamily: notoSans.style.fontFamily,
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: 14,
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          marginRight: 0,
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: 0,
          marginRight: 4,
          marginLeft: 11,
          "&.Mui-checked .MuiSvgIcon-root": {
            color: "var(--primary)",
          },
          "&.Mui-checked .MuiSvgIcon-root svg": {},
          "& .MuiSvgIcon-root": {
            fontSize: 24,
            color: "var(--grey5)",
          },
          "&.Mui-disabled": {
            opacity: 0.5,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderRadius: "8px",
          height: 40,
          minWidth: 0,
          fontWeight: 400,
          textTransform: "none",
          padding: "8px 24px",

          "&:visited": {
            color: "white",
          },
          "&.MuiButton-contained": {
            color: "white",
          },
          "&.MuiButton-contained:hover": {
            boxShadow: "2px 2px 4px 0 rgba(0,0,0,0.2)",
          },
          "&.MuiButton-text": {
            padding: "4px",
            height: "min-content",
          },
          "&.MuiButton-textPrimary": {
            textDecoration: "underline",
          },
          "&.MuiButton-textInfo": {
            textDecoration: "underline",
          },
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          backgroundColor: "white !important",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          backgroundColor: "white",
          "& .MuiOutlinedInput-root": {
            fontSize: "14px",
            height: 40,
            borderRadius: "8px",
            bordercolor: "var(grey7)",
            "&:hover fieldset": {
              borderColor: "var(--grey7)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "var(--primary)",
            },
          },
        },
      },
      defaultProps: {
        inputProps: {
          style: {
            fontSize: "14px",
            padding: "0 16px",
            height: "40px",
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          "& .Mui-selected": {
            fontWeight: 800,
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          position: "absolute",
          left: "0",
          bottom: "-24px",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          fontSize: 14,
          height: 40,
          backgroundColor: "white",
          borderRadius: "8px",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: 14,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          "& .MuiPaper-root": {
            maxWidth: "unset",
          },
          "& h2": {
            fontWeight: 700,
            fontSize: 16,
            padding: "16px 20px",
          },
          "& .MuiDialogTitle-root": {
            padding: "20px",
          },
          "& .MuiDialogContent-root": {
            padding: "0 20px 20px",
          },
          "& .MuiDialog-paper": {
            borderRadius: "8px",
          },
          "& .MuiDialogActions-root": {
            padding: "0 20px 20px",
          },
        },
      },
    },
  },
});

export default theme;
