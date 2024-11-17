"use client";

import React, { useState, useEffect, useRef } from "react";
import StorageIcon from "@mui/icons-material/Storage";
import HelpSharpIcon from "@mui/icons-material/HelpSharp";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import SettingsSharpIcon from "@mui/icons-material/SettingsSharp";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import TerminalOutlinedIcon from "@mui/icons-material/TerminalOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import NotificationsSharpIcon from "@mui/icons-material/NotificationsSharp";
import TrackChangesOutlinedIcon from "@mui/icons-material/TrackChangesOutlined";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";
import Image from "next/image";
import logo from "/public/images/logo-light.svg";
import { Button, IconButton, Stack, Tab, Tabs, TextField } from "@mui/material";
import Modal from "@/components/Modal";
import useModal from "@/utils/useModal";
import Confirm from "../Confirm";
import CmdTool from "../../app/(auth)/_cmd-tool/CmdTool";
import useAuthStore from "@/utils/useAuthStore";
import useLangStore from "@/utils/useLangStore";
import useNetworkMonitor from "@/utils/useNetworkMonitorStore";
import getLocalizedString from "@/utils/getLocalizedString";
import { useTranslations } from "next-intl";

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
    name: "CMD Tool",
    offlineEnable: true,
    icon: () => <TerminalOutlinedIcon />,
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
  {
    name: "CMD Tool",
    offlineEnable: true,
    icon: () => <TerminalOutlinedIcon />,
  },
];
const guestMenus = (lang: "en" | "pt" | "es") => [
  {
    name: getLocalizedString(lang, "Device", "Dispositivo", "Dispositivo"),
    href: "/device",
    offlineEnable: true,
    icon: () => <TrackChangesOutlinedIcon />,
  },
  {
    name: "CMD Tool",
    offlineEnable: true,
    icon: () => <TerminalOutlinedIcon />,
  },
];

export default function Navbar() {
  const t = useTranslations("gnb");
  const pathname = usePathname();
  const { lang } = useLangStore();
  const { userRole } = useAuthStore();

  const [cmdModal, cmdModalToggle] = useModal();
  const [networkModal, networkModalToggle] = useModal();

  const { isOnline, setIsOnline } = useNetworkMonitor();

  const navLinkes =
    userRole && userRole === "ROOT"
      ? rootMenus(lang)
      : userRole === "ADMIN"
      ? adminMenus(lang)
      : userRole === "CUSTOMER"
      ? customerMenus(lang)
      : guestMenus(lang);

  const [mounted, setMounted] = useState<boolean>(false);
  const [notificationModal, setNotificationModal] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearchClick = (e) => {
    e.preventDefault();
    networkModalToggle();
  };

  const handleToggleNetwork = (isOfflineToOnline: boolean) => {
    if (isOfflineToOnline && !navigator.onLine) {
      toast("Switching online is not possible when there is no network.", {
        type: "error",
        position: "top-center",
      });
      return;
    }

    Confirm({
      title: "Confirm",
      text: `Are you sure you want to switch to ${
        isOfflineToOnline ? "online" : "offline"
      } usage?`,
    }).then((result) => {
      if (result.isConfirmed) {
        setIsOnline(isOfflineToOnline);
      }
    });
  };

  const getRootHref = () => {
    switch (userRole) {
      case "ROOT":
        return "/server";
      case "ADMIN":
      case "CUSTOMER":
      case "GUEST":
      default:
        return "/model";
    }
  };

  const getRole = (role: string) => {
    switch (role.toLowerCase()) {
      case "root":
        return t("pw_set.root");
      case "admin":
        return t("pw_set.admin");
      case "customer":
        return t("pw_set.customer");
      case "guest":
        return t("pw_set.guest");
      default:
        return role;
    }
  };

  return (
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
                        className={
                          !isOnline &&
                          !link.offlineEnable &&
                          !pathname.startsWith(link.href)
                            ? "disabled"
                            : ""
                        }
                        onClick={
                          !isOnline && !link.offlineEnable
                            ? (e) => {
                                e.preventDefault();
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
                      <button
                        onClick={() => {
                          window.open(
                            `${window.location.origin}/cmd`,
                            "_blank"
                          );
                        }}
                      >
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
            <button onClick={() => setNotificationModal(!notificationModal)}>
              <NotificationsSharpIcon />
            </button>
          </li>
          <li>
            <Link href="/settings">
              <SettingsSharpIcon />
            </Link>
          </li>
          <li>
            <Link
              href="/info"
              className={!isOnline ? "disabled" : ""}
              onClick={
                !isOnline
                  ? (e) => {
                      e.preventDefault();
                    }
                  : undefined
              }
            >
              <HelpSharpIcon />
            </Link>
          </li>
          <li>
            <Link
              href="/support"
              className={!isOnline ? "disabled" : ""}
              onClick={
                !isOnline
                  ? (e) => {
                      e.preventDefault();
                    }
                  : undefined
              }
            >
              <HeadsetMicIcon />
            </Link>
          </li>
        </ul>

        <TextField
          variant="outlined"
          size="small"
          placeholder={`${t("pw_set.search")}`}
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

        <div
          className={
            isOnline
              ? `${styles.toggle} ${styles.active}`
              : `${styles.toggle} ${styles.offline}`
          }
        >
          <div onClick={() => isOnline && handleToggleNetwork(false)}>
            {t("pw_set.offline")}
          </div>
          <div onClick={() => !isOnline && handleToggleNetwork(true)}>
            {t("pw_set.online")}
          </div>
        </div>
      </div>

      <Modal
        closeButton
        open={cmdModal}
        toggleOpen={cmdModalToggle}
        confirm={() => {}}
        confirmButtonText="Add"
        width="1240px"
      >
        <CmdModal />
      </Modal>

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
        <NotificationModal setNotificationModal={setNotificationModal} />
      )}
    </nav>
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

function NotificationModal({ setNotificationModal }) {
  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setNotificationModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [value, setValue] = useState("new");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <div className={styles.notificationModal} ref={modalRef}>
      <div className={styles.notiTitle}>Notifications</div>
      <IconButton
        onClick={() => setNotificationModal(false)}
        sx={{
          position: "absolute",
          right: "6px",
          top: "6px",
          zIndex: 30,
        }}
      >
        <CloseOutlinedIcon sx={{ color: "var(--black)" }} />
      </IconButton>
      <Stack className={styles.notification}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="notification"
          sx={{
            borderBottom: "1px solid var(--grey4)",
          }}
        >
          <Tab value="new" label={`New (${3})`} sx={{ width: "50%" }} />
          <Tab value="all" label={`All (${100})`} sx={{ width: "50%" }} />
        </Tabs>
        {value === "new" ? (
          <Stack width="100%" className={styles.notificationListWrap}>
            <ul className={styles.list}>
              <li className={styles.active}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack>
                    <div className={styles.subTitle}>
                      SyncMaster update is available
                    </div>
                    <div className={styles.description}>
                      SyncMaster update is available
                    </div>
                  </Stack>
                  <Stack>
                    <span className={styles.date}>Jan/19/2024 18:08</span>
                  </Stack>
                </Stack>
              </li>
              <li className={styles.active}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack>
                    <div className={styles.subTitle}>
                      SyncMaster update is available
                    </div>
                    <div className={styles.description}>
                      SyncMaster update is available
                    </div>
                  </Stack>
                  <Stack>
                    <span className={styles.date}>Jan/19/2024 18:08</span>
                  </Stack>
                </Stack>
              </li>
              <li className={styles.active}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack>
                    <div className={styles.subTitle}>
                      SyncMaster update is available
                    </div>
                    <div className={styles.description}>
                      SyncMaster update is available
                    </div>
                  </Stack>
                  <Stack>
                    <span className={styles.date}>Jan/19/2024 18:08</span>
                  </Stack>
                </Stack>
              </li>
              <li className={styles.active}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack>
                    <div className={styles.subTitle}>
                      SyncMaster update is available
                    </div>
                    <div className={styles.description}>
                      SyncMaster update is available
                    </div>
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{ marginTop: 1, width: 100 }}
                    >
                      Upload
                    </Button>
                  </Stack>
                  <Stack>
                    <span className={styles.date}>Jan/19/2024 18:08</span>
                  </Stack>
                </Stack>
              </li>
            </ul>
          </Stack>
        ) : (
          <Stack width="100%" className={styles.notificationListWrap}>
            <ul className={styles.list}>
              <li>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack>
                    <div className={styles.subTitle}>
                      SyncMaster update is available
                    </div>
                    <div className={styles.description}>
                      SyncMaster update is available
                    </div>
                  </Stack>
                  <Stack>
                    <span className={styles.date}>Jan/19/2024 18:08</span>
                  </Stack>
                </Stack>
              </li>
              <li>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack>
                    <div className={styles.subTitle}>
                      SyncMaster update is available
                    </div>
                    <div className={styles.description}>
                      SyncMaster update is available
                    </div>
                  </Stack>
                  <Stack>
                    <span className={styles.date}>Jan/19/2024 18:08</span>
                  </Stack>
                </Stack>
              </li>
              <li>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack>
                    <div className={styles.subTitle}>
                      SyncMaster update is available
                    </div>
                    <div className={styles.description}>
                      SyncMaster update is available
                    </div>
                  </Stack>
                  <Stack>
                    <span className={styles.date}>Jan/19/2024 18:08</span>
                  </Stack>
                </Stack>
              </li>
              <li>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack>
                    <div className={styles.subTitle}>
                      SyncMaster update is available
                    </div>
                    <div className={styles.description}>
                      SyncMaster update is available
                    </div>
                  </Stack>
                  <Stack>
                    <span className={styles.date}>Jan/19/2024 18:08</span>
                  </Stack>
                </Stack>
              </li>
              <li>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack>
                    <div className={styles.subTitle}>
                      SyncMaster update is available
                    </div>
                    <div className={styles.description}>
                      SyncMaster update is available
                    </div>
                  </Stack>
                  <Stack>
                    <span className={styles.date}>Jan/19/2024 18:08</span>
                  </Stack>
                </Stack>
              </li>
            </ul>
          </Stack>
        )}
      </Stack>
    </div>
  );
}
