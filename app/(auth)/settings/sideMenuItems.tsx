import LanguageIcon from "@mui/icons-material/Language";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PrivacyTipOutlinedIcon from "@mui/icons-material/PrivacyTipOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";

export const sideMenuItems = [
  {
    name: "Languages",
    offlineEnable: true,
    href: "/settings/languages",
    icon: () => <LanguageIcon />,
  },
  {
    name: "My Info",
    offlineEnable: false,
    href: "/settings/my-info",
    icon: () => <PersonOutlineIcon />,
  },
  {
    name: "Privacy Policy",
    offlineEnable: false,
    href: "/settings/privacy-policy",
    icon: () => <PrivacyTipOutlinedIcon />,
  },
  {
    name: "Logout",
    offlineEnable: false,
    icon: () => <ExitToAppOutlinedIcon />,
  },
];
