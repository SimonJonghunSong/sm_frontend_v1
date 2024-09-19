import { Switch, styled } from "@mui/material";

const commonStyle = {
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    top: "1px",
    left: "1px",
    "&.Mui-checked": {
      transform: "translateX(10px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "var(--primary)",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: "#ff0",
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: 0.7,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: "var(--grey3)",
    opacity: 1,
  },
};

export const SwitchPrimary = styled((props: any) => (
  <Switch
    focusVisibleClassName=".Mui-focusVisible"
    disableRipple
    checked={props.checked}
    {...props}
  />
))(() => ({
  ...commonStyle,
  width: 40,
  height: 22,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    //   top: "1px",
    //   left: "1px",
    "&.Mui-checked": {
      transform: "translateX(18px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "var(--primary)",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: "#ff0",
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: 0.7,
    },
  },
  "& .MuiSwitch-thumb": {
    width: 18,
    height: 18,
  },
}));

export const SwitchSecondary = styled((props: any) => (
  <Switch
    focusVisibleClassName=".Mui-focusVisible"
    disableRipple
    checked={props.checked}
    {...props}
  />
))(() => ({
  ...commonStyle,
  width: 40,
  height: 22,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    //   top: "1px",
    //   left: "1px",

    "&.Mui-checked": {
      transform: "translateX(18px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "var(--primary)",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: "#ff0",
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: 0.7,
    },
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: "var(--grey7)",
    opacity: 1,
  },
  "& .MuiSwitch-thumb": {
    width: 18,
    height: 18,
  },
}));
