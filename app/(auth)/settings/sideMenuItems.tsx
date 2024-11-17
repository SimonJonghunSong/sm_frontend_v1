import LanguageIcon from "@mui/icons-material/Language";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PrivacyTipOutlinedIcon from "@mui/icons-material/PrivacyTipOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import getLocalizedString from "@/utils/getLocalizedString";
import { Lang } from "@/utils/useLangStore";

export const sideMenuItems = (lang: Lang) => [
  {
    name: getLocalizedString(lang, "Languages", "Idiomas", "Idiomas"),
    offlineEnable: true,
    href: "/settings/languages",
    icon: () => <LanguageIcon />,
  },
  {
    name: getLocalizedString(
      lang,
      "My Info",
      "Minhas Informações",
      "Mi Información"
    ),
    offlineEnable: false,
    href: "/settings/my-info",
    icon: () => <PersonOutlineIcon />,
  },
  {
    name: getLocalizedString(
      lang,
      "Privacy Policy",
      "Política de Privacidade",
      "Política de Privacidad"
    ),
    offlineEnable: false,
    href: "/settings/privacy-policy",
    icon: () => <PrivacyTipOutlinedIcon />,
  },
  {
    name: getLocalizedString(lang, "Logout", "Sair", "Cerrar sesión"),
    offlineEnable: false,
    icon: () => <ExitToAppOutlinedIcon />,
  },
];
