import LanguageIcon from "@mui/icons-material/Language";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PrivacyTipOutlinedIcon from "@mui/icons-material/PrivacyTipOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import getLocalizedString from "@/utils/getLocalizedString";
import { Lang } from "@/utils/useLangStore";

export const sideMenuItems = (lang: Lang, role: string) => {
  switch (role.toUpperCase()) {
    case "ADMIN":
    case "CLIENT":
      return [
        {
          key: "myInfo",
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
          key: "language", // 권한 별 필터링 하기위한 키값 생성 - 김덕기
          name: getLocalizedString(lang, "Languages", "Idiomas", "Idiomas"),
          offlineEnable: true,
          href: "/settings/languages",
          icon: () => <LanguageIcon />,
        },
        {
          key: "logout",
          name: getLocalizedString(lang, "Logout", "Sair", "Cerrar sesión"),
          offlineEnable: false,
          icon: () => <ExitToAppOutlinedIcon />,
        },
      ];
    case "CUSTOMER":
    case "ROOT":
    case "GUEST":
    default:
      return [
        {
          key: "myInfo",
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
          key: "language", // 권한 별 필터링 하기위한 키값 생성 - 김덕기
          name: getLocalizedString(lang, "Languages", "Idiomas", "Idiomas"),
          offlineEnable: true,
          href: "/settings/languages",
          icon: () => <LanguageIcon />,
        },
        {
          key: "privacyPolicy",
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
          key: "logout",
          name: getLocalizedString(lang, "Logout", "Sair", "Cerrar sesión"),
          offlineEnable: false,
          icon: () => <ExitToAppOutlinedIcon />,
        },
      ];
  }
};
