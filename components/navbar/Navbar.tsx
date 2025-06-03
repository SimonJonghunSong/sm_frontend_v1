"use client";

import React, { useState, useEffect, useRef } from "react";
import StorageIcon from "@mui/icons-material/Storage";
import HelpSharpIcon from "@mui/icons-material/HelpSharp";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import SettingsSharpIcon from "@mui/icons-material/SettingsSharp";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import NotificationsSharpIcon from "@mui/icons-material/NotificationsSharp";
import TrackChangesOutlinedIcon from "@mui/icons-material/TrackChangesOutlined";
import CampaignIcon from "@mui/icons-material/Campaign";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./styles.module.scss";
import Image from "next/image";
import logo from "/public/images/logo-light.svg";
import { IconButton, Stack, TextField } from "@mui/material";
import Modal from "@/components/Modal";
import useModal from "@/utils/useModal";
import CmdTool from "../../app/(auth)/_cmd-tool/CmdTool";
import useAuthStore from "@/utils/useAuthStore";
import useLangStore from "@/utils/useLangStore";
import useNetworkMonitor from "@/utils/useNetworkMonitorStore";
import getLocalizedString from "@/utils/getLocalizedString";
import { useTranslations } from "next-intl";
import NotificationModal from "./NotificationModal";
import OfflineErrorDialog from "@/components/OfflineErrorDialog";
import useErrorDialog from "@/src/hooks/useErrorDialog";
import { DISABLED_OFFLINE_MODE_PATHS } from "@/components/NetworkStatusCheck";
import { useQuery } from "@tanstack/react-query";
import { getNoti } from "@/src/api/services/notification";
import SearchConfigurationModal from "./SearchConfigurationModal";
import SearchModelInfoModal from "./SearchModelInfoModal";
import SearchDeviceConfigurationModal from "./SearchDeviceConfigurationModal";
import useCmdStore from "@/src/stores/useCmdStore";
import useDeviceSearchModalStore from "@/src/stores/useDeviceSearchModal";
import DraggableModal from "../DraggableModal";

const rootMenus = (lang: "en" | "pt" | "es") => [
  {
    name: getLocalizedString(lang, "Server", "Servidor", "Servidor"),
    href: "/server",
    offlineEnable: false,
    icon: () => <StorageIcon />,
  },
  {
    name: getLocalizedString(lang, "Account", "Conta", "Cuenta"),
    href: "/account",
    offlineEnable: false,
    icon: () => <PeopleAltOutlinedIcon />,
  },
];
const adminMenus = (lang: "en" | "pt" | "es") => [
  {
    name: getLocalizedString(lang, "Model", "Modelo", "Modelo"),
    href: "/model/admin",
    offlineEnable: false,
    icon: () => <WidgetsOutlinedIcon />,
  },
  {
    name: getLocalizedString(lang, "Device", "Dispositivo", "Dispositivo"),
    href: "/device",
    offlineEnable: true,
    icon: () => <TrackChangesOutlinedIcon />,
  },
  {
    name: getLocalizedString(lang, "Account", "Conta", "Cuenta"),
    href: "/account",
    offlineEnable: false,
    icon: () => <PeopleAltOutlinedIcon />,
  },
  {
    name: getLocalizedString(lang, "Notify", "Notificar", "Notificar"),
    href: "/notify",
    offlineEnable: true,
    icon: () => <CampaignIcon />,
  },
];
const customerMenus = (lang: "en" | "pt" | "es") => [
  {
    name: getLocalizedString(lang, "Device", "Dispositivo", "Dispositivo"),
    href: "/device",
    offlineEnable: true,
    icon: () => <TrackChangesOutlinedIcon />,
  },
  {
    name: getLocalizedString(lang, "Account", "Conta", "Cuenta"),
    href: "/account",
    offlineEnable: false,
    icon: () => <PeopleAltOutlinedIcon />,
  },
];
const clientMenus = (lang: "en" | "pt" | "es") => [
  {
    name: getLocalizedString(lang, "Device", "Dispositivo", "Dispositivo"),
    href: "/device",
    offlineEnable: true,
    icon: () => <TrackChangesOutlinedIcon />,
  },
  {
    name: getLocalizedString(lang, "Account", "Conta", "Cuenta"),
    href: "/account",
    offlineEnable: false,
    icon: () => <PeopleAltOutlinedIcon />,
  },
];
const guestMenus = (lang: "en" | "pt" | "es") => [
  {
    name: getLocalizedString(lang, "Device", "Dispositivo", "Dispositivo"),
    href: "/device",
    offlineEnable: true,
    icon: () => <TrackChangesOutlinedIcon />,
  },
];

export default function Navbar() {
  const t = useTranslations();
  const pathname = usePathname();
  const { lang } = useLangStore();
  const { userRole } = useAuthStore();
  const router = useRouter();
  const [isCmdModalWide, setIsCmdModalWide] = useState(false);
  const [offlineErrorDialog, setOfflineErrorDialog] = useState(false);

  // searchbar(device-info)
  const { onOpen: deviceSearchModalOpen } = useDeviceSearchModalStore();

  const { isOpen: cmdModal, toggleOpen: cmdModalToggle } = useCmdStore();
  const [networkModal, networkModalToggle] = useModal();
  const [searchDeviceConfigurationModal, searchDeviceConfigurationModalToggle] =
    useModal();
  const [searchModelInfoModal, searchModelInfoModalToggle] = useModal();

  const { isOnline, setIsOnline, setIsSelfOffline } = useNetworkMonitor();

  const [offlineChangeModal, offlineChangeModalToggle] = useModal();
  const [onlineChangeModal, onlineChangeModalToggle] = useModal();

  const notificationQuery = useQuery({
    queryKey: ["notification"],
    queryFn: getNoti,
    refetchOnMount: true,
    select: ({ data }) => {
      return {
        isNew: (data?.records || []).some((record) => !record.is_read),
      };
    },
  });

  const navLinkes =
    userRole && userRole === "ROOT"
      ? rootMenus(lang)
      : userRole === "ADMIN"
      ? adminMenus(lang)
      : userRole === "CUSTOMER"
      ? customerMenus(lang)
      : userRole === "CLIENT"
      ? clientMenus(lang)
      : guestMenus(lang);

  const [mounted, setMounted] = useState<boolean>(false);
  const [notificationModal, setNotificationModal] = useState(false);
  const { renderErrorModal, toggle } = useErrorDialog({
    description: t("popup.common.common.internet_connection_is_required"),
  });
  const {
    renderErrorModal: renderOfflineChangeErrorModal,
    toggle: renderOfflineChangeErrorModalToggle,
  } = useErrorDialog({
    description: t(
      "popup.gnb.online/offline.this_page_is_not_available_in_offline_mode"
    ),
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearchClick = (e) => {
    if (pathname.includes("device-configuration")) {
      // 디바이스 연결 후 커스터밍한 페이지로 검색 토글
      searchDeviceConfigurationModalToggle();
    } else if (pathname.includes("configuration")) {
      // 디바이스 연결 후 모델 정보 검색 토글
      networkModalToggle();
    } else if (pathname.includes("model-info")) {
      // 디바이스 연결 없이 모델 정보 검색 토글
      console.log("searchDeviceConfigurationModalToggle");
      searchModelInfoModalToggle();
    }
  };

  const handleToggleNetwork = (isOfflineToOnline: boolean) => {
    if (isOfflineToOnline && !navigator.onLine) {
      toggle();
      return;
    }

    if (isOfflineToOnline) {
      onlineChangeModalToggle();
    } else {
      if (DISABLED_OFFLINE_MODE_PATHS.includes(pathname)) {
        renderOfflineChangeErrorModalToggle();
        return;
      }

      offlineChangeModalToggle();
    }
  };

  const getRootHref = () => {
    switch (userRole) {
      case "ROOT":
        return "/server";
      case "ADMIN":
      case "CUSTOMER":
      case "CLIENT":
      case "GUEST":
      default:
        return "/model";
    }
  };

  const getRole = (role: string) => {
    if (!role) return "";
    switch (role.toLowerCase()) {
      case "root":
        return t("gnb.pw_set.root");
      case "admin":
        return t("gnb.pw_set.admin");
      case "customer":
        return t("gnb.pw_set.customer");
      case "client":
        return "Client";
      case "guest":
        return t("gnb.pw_set.guest");
      default:
        return role;
    }
  };

  const renderSearchModal = () => {
    if (networkModal) {
      return (
        <Modal
          closeButton
          open
          toggleOpen={networkModalToggle}
          confirm={() => {}}
          confirmButtonText="Add"
          width="720px"
          hasFooter={false}
        >
          <SearchConfigurationModal onClose={() => networkModalToggle()} />
        </Modal>
      );
    }
    // 디바이스 연결 X
    if (searchModelInfoModal) {
      return (
        <Modal
          closeButton
          open
          toggleOpen={searchModelInfoModalToggle}
          confirm={() => {}}
          confirmButtonText="Add"
          width="720px"
          hasFooter={false}
        >
          <SearchModelInfoModal onClose={searchModelInfoModalToggle} />
        </Modal>
      );
    }

    if (searchDeviceConfigurationModal) {
      return (
        <Modal
          closeButton
          open
          toggleOpen={searchDeviceConfigurationModalToggle}
          confirm={() => {}}
          confirmButtonText="Add"
          width="720px"
          hasFooter={false}
        >
          <SearchDeviceConfigurationModal
            onClose={searchDeviceConfigurationModalToggle}
          />
        </Modal>
      );
    }
  };

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.left}>
          <Link href={getRootHref()} className={styles.logo}>
            <Image src={logo} alt="synctrack" />
            {mounted && <div className={styles.role}>{getRole(userRole)}</div>}
          </Link>
          <ul className={styles.mainMenu}>
            {!mounted ? (
              <></>
            ) : (
              <>
                {navLinkes.map((link) => {
                  if (link.href) {
                    return (
                      <li
                        key={link.name}
                        className={
                          pathname.startsWith(link.href)
                            ? styles.active
                            : undefined
                        }
                      >
                        <Link
                          onClick={
                            !isOnline && !link.offlineEnable
                              ? (e) => {
                                  e.preventDefault();

                                  setOfflineErrorDialog(true);
                                }
                              : undefined
                          }
                          href={link.href}
                          aria-disabled
                        >
                          <link.icon />
                          <span>{link.name}</span>
                        </Link>
                      </li>
                    );
                  } else {
                    return (
                      <li
                        key={link.name}
                        className={
                          pathname.startsWith(link.href)
                            ? styles.active
                            : undefined
                        }
                      >
                        <button onClick={cmdModalToggle}>
                          <link.icon />
                          <span>{link.name}</span>
                        </button>
                      </li>
                    );
                  }
                })}
              </>
            )}
          </ul>
        </div>

        <div className={styles.right}>
          <ul className={styles.subMenu}>
            <li>
              <Link href="/settings">
                <SettingsSharpIcon />
              </Link>
            </li>
            {userRole !== "ROOT" && (
              <li>
                <button
                  style={{ position: "relative" }}
                  onClick={() => setNotificationModal(!notificationModal)}
                >
                  <NotificationsSharpIcon />
                  {notificationQuery.data?.isNew && (
                    <div
                      style={{
                        width: "5px",
                        height: "5px",
                        backgroundColor: "#FC6508",
                        borderRadius: "50%",
                        position: "absolute",
                        top: 0,
                        right: 0,
                      }}
                    />
                  )}
                </button>
              </li>
            )}
            <li>
              <Link
                href="/info"
                onClick={
                  !isOnline
                    ? (e) => {
                        e.preventDefault();
                        router.push("/offline");
                      }
                    : undefined
                }
              >
                <HelpSharpIcon />
              </Link>
            </li>
            {(userRole === "CUSTOMER" || userRole === "GUEST") && (
              <li>
                <Link
                  target="_blank"
                  href="https://stsunlab.com/board/board_form?bd_id=CONTACT"
                  onClick={
                    !isOnline
                      ? (e) => {
                          e.preventDefault();
                          router.push("/offline");
                        }
                      : undefined
                  }
                >
                  <HeadsetMicIcon />
                </Link>
              </li>
            )}
          </ul>

          {userRole !== "ROOT" && (
            <>
              {(pathname.includes("device-info") ||
                pathname.includes("model-info")) && (
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder={`${t("gnb.pw_set.search")}`}
                  id="search"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      paddingRight: 0,
                      color: "var(--grey5)",
                    },
                    backgroundColor: "var(--black)",
                  }}
                  InputProps={{
                    endAdornment: (
                      <IconButton type="submit">
                        <SearchOutlinedIcon sx={{ color: "var(--grey5)" }} />
                      </IconButton>
                    ),
                  }}
                  onClick={() => {
                    deviceSearchModalOpen();
                  }}
                  inputProps={{ readOnly: true }}
                />
              )}
            </>
          )}

          {userRole !== "ROOT" && (
            <>
              {(pathname.includes("configuration") ||
                pathname.includes("device-configuration")) && (
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder={`${t("gnb.pw_set.search")}`}
                  id="search"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      paddingRight: 0,
                      color: "var(--grey5)",
                    },
                    backgroundColor: "var(--black)",
                  }}
                  InputProps={{
                    endAdornment: (
                      <IconButton type="submit">
                        <SearchOutlinedIcon sx={{ color: "var(--grey5)" }} />
                      </IconButton>
                    ),
                  }}
                  onClick={handleSearchClick}
                  inputProps={{ readOnly: true }}
                />
              )}

              <div
                className={
                  isOnline
                    ? `${styles.toggle} ${styles.active}`
                    : `${styles.toggle} ${styles.offline}`
                }
              >
                <div onClick={() => isOnline && handleToggleNetwork(false)}>
                  {t("gnb.pw_set.offline")}
                </div>
                <div onClick={() => !isOnline && handleToggleNetwork(true)}>
                  {t("gnb.pw_set.online")}
                </div>
              </div>
            </>
          )}
        </div>

        {renderSearchModal()}

        {cmdModal && (
          <DraggableModal
            title={t("configuration.cmd_tool.command_tool")}
            open
            toggleOpen={cmdModalToggle}
            width={isCmdModalWide ? "1240px" : "700px"}
          >
            <CmdModal setIsCmdModalWide={setIsCmdModalWide} />
          </DraggableModal>
        )}

        {notificationModal && (
          <NotificationModal onClose={() => setNotificationModal(false)} />
        )}
      </nav>
      {offlineErrorDialog && (
        <OfflineErrorDialog
          onClose={() => {
            setOfflineErrorDialog(false);
          }}
        />
      )}
      {renderErrorModal()}
      {renderOfflineChangeErrorModal()}
      {offlineChangeModal && (
        <Modal
          open
          closeButton
          width={"357px"}
          toggleOpen={offlineChangeModalToggle}
          confirm={() => {
            setIsOnline(false);
            setIsSelfOffline(true);
          }}
          title={t("common.popup.confrim")}
        >
          <Stack>
            <span style={{ wordBreak: "keep-all" }}>
              {t(
                "popup.gnb.online/offline.are_you_sure_you_want_to_switch_to_offline_usage?"
              )}
            </span>
          </Stack>
        </Modal>
      )}
      {onlineChangeModal && (
        <Modal
          open
          closeButton
          width={"357px"}
          toggleOpen={onlineChangeModalToggle}
          confirm={() => {
            setIsOnline(true);
            setIsSelfOffline(false);
          }}
          title={t("common.popup.confrim")}
        >
          <Stack>
            <span style={{ wordBreak: "keep-all" }}>
              {t(
                "popup.gnb.online/offline.are_you_sure_you_want_to_switch_to_online_usage?"
              )}
            </span>
          </Stack>
        </Modal>
      )}
    </>
  );
}

function CmdModal({
  setIsCmdModalWide,
}: {
  setIsCmdModalWide: (isWide: boolean) => void;
}) {
  const searchRef = useRef<HTMLInputElement>();

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, []);

  return <CmdTool setIsCmdModalWide={setIsCmdModalWide} />;
}
