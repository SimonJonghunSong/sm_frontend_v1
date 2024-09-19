import LanguageIcon from '@mui/icons-material/Language';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PrivacyTipOutlinedIcon from '@mui/icons-material/PrivacyTipOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';

export const sideMenuItems = [
  { name: "Languages", href: "/settings/languages", icon: () => <LanguageIcon /> },
  { name: "My Info", href: "/settings/my-info", icon: () => <PersonOutlineIcon /> },
  { name: "Privacy Policy", href: "/settings/privacy-policy", icon: () => <PrivacyTipOutlinedIcon /> },
  { name: "Logout", icon: () => <ExitToAppOutlinedIcon /> },
];
