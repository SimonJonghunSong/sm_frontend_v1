"use client";

import React, { useState, useEffect, useRef } from "react";
import StorageIcon from "@mui/icons-material/Storage";
import HelpSharpIcon from "@mui/icons-material/HelpSharp";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import SettingsSharpIcon from "@mui/icons-material/SettingsSharp";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import NotificationsSharpIcon from "@mui/icons-material/NotificationsSharp";
import TrackChangesOutlinedIcon from "@mui/icons-material/TrackChangesOutlined";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";
import Image from "next/image";
import logo from "/public/images/logo-light.svg";
import { Button, IconButton, Stack, TextField } from "@mui/material";
import Modal from "@/components/Modal";
import useModal from "@/utils/useModal";
import Confirm from "../Confirm";
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

  const [offlineErrorDialog, setOfflineErrorDialog] = useState(false);

  const [cmdModal, cmdModalToggle] = useModal();
  const [networkModal, networkModalToggle] = useModal();

  const { isOnline, setIsOnline, setIsSelfOffline } = useNetworkMonitor();

  const [offlineChangeModal, offlineChangeModalToggle] = useModal();
  const [onlineChangeModal, onlineChangeModalToggle] = useModal();

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
    description: t(
      "popup.gnb.online/offline.switching_online_is_not_possible_when_there_is_no_network"
    ),
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
    e.preventDefault();
    networkModalToggle();
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

    // Confirm({
    //   title: "Confirm",
    //   text: `Are you sure you want to switch to ${
    //     isOfflineToOnline ? "online" : "offline"
    //   } usage?`,
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     setIsOnline(isOfflineToOnline);
    //     setIsSelfOffline(!isOfflineToOnline);
    //   }
    // });
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
            <li>
              <button onClick={() => setNotificationModal(!notificationModal)}>
                <NotificationsSharpIcon />
              </button>
            </li>
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
              {pathname.includes("configuration") && (
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

        {cmdModal && (
          <Modal
            isDraggable
            hideBackdrop
            hasMinimize
            closeButton
            open={cmdModal}
            toggleOpen={cmdModalToggle}
            width="1240px"
            hasFooter={false}
          >
            <CmdModal />
          </Modal>
        )}

        <Modal
          closeButton
          open={networkModal}
          toggleOpen={networkModalToggle}
          confirm={() => {}}
          confirmButtonText="Add"
          width="720px"
        >
          <SearchModal />
        </Modal>

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

function SearchModal() {
  const searchRef = useRef<HTMLInputElement>();

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, []);

  return (
    <Stack className={styles.search}>
      <Stack
        direction="row"
        sx={{
          width: "calc(100% + 40px)",
          padding: "20px 60px 20px 20px",
          transform: "translate(-20px, 0)",
          borderBottom: "1px solid var(--grey4)",
        }}
      >
        <TextField
          inputRef={searchRef}
          fullWidth
          InputProps={{
            endAdornment: (
              <Stack direction="row">
                <IconButton sx={{ width: 28, height: 28 }}>
                  <CancelOutlinedIcon />
                </IconButton>
                <IconButton sx={{ width: 28, height: 28 }}>
                  <SearchOutlinedIcon />
                </IconButton>
              </Stack>
            ),
          }}
        />
      </Stack>
      <Stack py={2} alignItems="flex-end" gap="16px">
        <Stack width="100%">
          <div className={styles.title}>Sections</div>
          <ul className={styles.list}>
            <li>
              <div className={styles.subTitle}>System &gt; GNSS settings</div>
              <div className={styles.description}>
                Select global navigation stelite systems, whitch are used for
                the device operation.
              </div>
            </li>
            <li>
              <div className={styles.subTitle}>System &gt; GNSS settings</div>
              <div className={styles.description}>
                Select global navigation stelite systems, whitch are used for
                the device operation.
              </div>
            </li>
            <li>
              <div className={styles.subTitle}>System &gt; GNSS settings</div>
              <div className={styles.description}>
                Select global navigation stelite systems, whitch are used for
                the device operation.
              </div>
            </li>
          </ul>
        </Stack>
        <Button color="secondary" sx={{ textDecoration: "underline" }}>
          Show all result
        </Button>
      </Stack>
      <Stack py={2} alignItems="flex-end" gap="16px">
        <Stack width="100%">
          <div className={styles.title}>Parameters</div>
          <ul className={styles.list}>
            <li>
              <div className={styles.subTitle}>Device Status &gt; GNSS</div>
              <div className={styles.description}>
                Select global navigation stelite systems, whitch are used for
                the device operation.
              </div>
            </li>
            <li>
              <div className={styles.subTitle}>Device Status &gt; GNSS</div>
              <div className={styles.description}>
                Select global navigation stelite systems, whitch are used for
                the device operation.
              </div>
            </li>
            <li>
              <div className={styles.subTitle}>Device Status &gt; GNSS</div>
              <div className={styles.description}>
                Select global navigation stelite systems, whitch are used for
                the device operation.
              </div>
            </li>
          </ul>
        </Stack>
        <Button color="secondary" sx={{ textDecoration: "underline" }}>
          Show all result
        </Button>
      </Stack>
    </Stack>
  );
}

function CmdModal() {
  const searchRef = useRef<HTMLInputElement>();

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, []);

  return <CmdTool />;
}
