"use client";

import React, { useEffect, useRef, useState } from "react";

import styles from "./styles.module.scss";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Confirm from "../Confirm";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SyncOutlinedIcon from "@mui/icons-material/SyncOutlined";
import { Divider } from "@mui/material";
import { SwitchSecondary } from "../switches";
import useParameterStore from "../../utils/useParameterStore";
import useAuthStore from "@/utils/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { logout } from "@/src/api/services/auth";
import { toast } from "react-toastify";
import useNetworkMonitor from "@/utils/useNetworkMonitorStore";
import OfflineErrorDialog from "@/components/OfflineErrorDialog";
import useConfirmDialog from "@/src/hooks/useConfirmDialog";
import { useTranslations } from "next-intl";
import Modal from "@/components/Modal";
import CmdTool from "app/(auth)/_cmd-tool/CmdTool";
import useModal from "@/utils/useModal";
import TerminalOutlinedIcon from "@mui/icons-material/TerminalOutlined";
import useModelPkgStore from "@/src/stores/useModelPkgStore";

type sideMenuItem = {
  name: string;
  href?: string;
  icon?: () => React.ReactNode;
  offlineEnable?: boolean;
  onClick?: (name: string) => void;
  isActive?: boolean;
};

type SideMenuProps = {
  sideMenuItems: sideMenuItem[];
  configuration?: boolean;
  queries?: Record<string, string>;
};

export default function SideMenu({
  sideMenuItems,
  configuration = false,
  queries,
}: SideMenuProps) {
  const router = useRouter();
  const t = useTranslations();
  const pathname = usePathname();
  const { isOnline } = useNetworkMonitor();
  const { hiddenParameter, toggleHiddenParameter } = useParameterStore();
  const { resetData } = useModelPkgStore();

  const [offlineErrorDialog, setOfflineErrorDialog] = useState(false);
  const { setToken, setUserId, setUserRole, setRefreshToken } = useAuthStore();

  const [cmdModal, cmdModalToggle] = useModal();
  const [isCmdModalWide, setIsCmdModalWide] = useState(false);

  const { renderConfirmModal: renderLogoutModal, toggle: toggleLogoutModal } =
    useConfirmDialog({
      description: t("popup.settings.logout.are_you_sure_you_want_to_log_out?"),
      onYes: () => {
        purgeAuthSetting();
        resetData();
      },
    });

  const loginMutation = useMutation({
    mutationFn: logout,
  });

  const purgeAuthSetting = async () => {
    try {
      await loginMutation.mutateAsync();
    } catch (error) {
    } finally {
      setToken(undefined);
      setUserId(undefined);
      setUserRole(undefined);
      setRefreshToken(undefined);
      router.replace("/login");
      toast("Logged out successfully.", {
        type: "info",
      });
    }
  };

  const getSubHref = (href: string) => {
    const queryData = queries
      ? Object.entries(queries).reduce((acc, cur, idx) => {
          const [key, value] = cur;

          return idx === 0 ? `?${key}=${value}` : `&${key}=${value}`;
        }, "")
      : "";

    return `${href}${queryData}`;
  };

  function handleDeleteModel() {
    Confirm({
      title: "Confirm",
      text: "Are you sure you want to delete this model from loaded model list? If there is any unsaved data, it will be lost.",
    });
  }

  return (
    <>
      <aside className={styles.sideMenuWrap}>
        <ul className={styles.sideMenu}>
          {sideMenuItems.map((link) => {
            if (link.href) {
              return (
                <li
                  key={link.name}
                  className={link?.isActive ? styles.active : undefined}
                >
                  {link?.onClick ? (
                    <button
                      type="button"
                      onClick={() => link.onClick(link.name)}
                    >
                      {link.icon && <link.icon />}
                      <span>{link.name}</span>
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className={
                        pathname.startsWith(link.href)
                          ? styles.active
                          : undefined
                      }
                    >
                      {link.icon && <link.icon />}
                      <span>{link.name}</span>
                    </Link>
                  )}
                </li>
              );
            } else {
              return (
                <li
                  key={link.name}
                  className={
                    pathname.startsWith(link.href) ? styles.active : undefined
                  }
                >
                  <button onClick={toggleLogoutModal}>
                    {link.icon && <link.icon />}
                    <span>{link.name}</span>
                  </button>
                </li>
              );
            }
          })}

          {configuration && (
            <>
              <li>
                <Divider
                  sx={{ borderColor: "var(--grey7)", marginBottom: "16px" }}
                />
                <button onClick={cmdModalToggle}>
                  <TerminalOutlinedIcon />
                  <span>CMD Tool</span>
                </button>
              </li>
              <li
                className={
                  pathname.startsWith("/configuration/edit-profile")
                    ? styles.active
                    : undefined
                }
              >
                <Link href={getSubHref("/configuration/edit-profile")}>
                  <ModeEditIcon />
                  <span>Edit Profile</span>
                </Link>

                <Divider
                  sx={{ borderColor: "var(--grey7)", marginTop: "16px" }}
                />
              </li>
              <li>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    height: "40px",
                  }}
                >
                  <span style={{ letterSpacing: "-0.4px" }}>
                    Show Hidden Parameters
                  </span>
                  <SwitchSecondary
                    checked={!hiddenParameter}
                    onChange={() => toggleHiddenParameter()}
                  />
                </div>
              </li>
              {/* <li>
                <button
                  style={{ textDecoration: "underline" }}
                  onClick={handleDeleteModel}
                >
                  Delete Model
                </button>
              </li> */}
              <li
                className={
                  pathname.startsWith("/configuration/fw-update")
                    ? styles.active
                    : undefined
                }
              >
                <Divider
                  sx={{ borderColor: "var(--grey7)", marginBottom: "16px" }}
                />
                <Link
                  href={getSubHref("/configuration/fw-update")}
                  onClick={(e) => {
                    if (!isOnline) {
                      e.preventDefault();
                      setOfflineErrorDialog(true);
                    }
                  }}
                >
                  <SyncOutlinedIcon />
                  <span>F/W Update</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </aside>

      {renderLogoutModal()}
      {offlineErrorDialog && (
        <OfflineErrorDialog
          onClose={() => {
            setOfflineErrorDialog(false);
          }}
        />
      )}

      {cmdModal && (
        <Modal
          isDraggable
          hideBackdrop
          hasMinimize
          closeButton
          open={cmdModal}
          toggleOpen={cmdModalToggle}
          width={isCmdModalWide ? "1240px" : "700px"}
          hasFooter={false}
        >
          <CmdModal setIsCmdModalWide={setIsCmdModalWide} />
        </Modal>
      )}
    </>
  );
}

function CmdModal({
  setIsCmdModalWide,
}: {
  setIsCmdModalWide: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const searchRef = useRef<HTMLInputElement>();

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, []);

  return <CmdTool setIsCmdModalWide={setIsCmdModalWide} />;
}
