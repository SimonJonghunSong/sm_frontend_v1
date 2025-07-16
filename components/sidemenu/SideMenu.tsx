"use client";

import React, { useEffect, useState } from "react";

import styles from "./styles.module.scss";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button, Divider, Stack } from "@mui/material";
import { SwitchSecondary } from "../switches";
import useParameterStore from "../../utils/useParameterStore";
import useAuthStore from "@/utils/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { logout } from "@/src/api/services/auth";
import useNetworkMonitor from "@/utils/useNetworkMonitorStore";
import OfflineErrorDialog from "@/components/OfflineErrorDialog";
import useConfirmDialog from "@/src/hooks/useConfirmDialog";
import { useTranslations } from "next-intl";
import Modal from "@/components/Modal";
import CmdTool from "app/(auth)/_cmd-tool/CmdTool";
import useModal from "@/utils/useModal";
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
  onDelete?: () => void;
};

export default function SideMenu({
  sideMenuItems,
  configuration = false,
  queries,
  onDelete,
}: SideMenuProps) {
  const router = useRouter();
  const t = useTranslations();
  const pathname = usePathname();
  const { isOnline, reset } = useNetworkMonitor();
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
    onSettled: () => {
      reset();
      setToken(undefined);
      setUserId(undefined);
      setUserRole(undefined);
      setRefreshToken(undefined);
      router.replace("/login");
    },
  });

  const purgeAuthSetting = async () => {
    loginMutation.mutate();
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

  return (
    <>
      <aside className={styles.sideMenuWrap}>
        <ul className={styles.sideMenu}>
          {sideMenuItems.map((link) => {
            if (link.name === t("configuration.side_bar.show_hidden_parameters")) {
              return (
                <li key={link.name}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems={"center"}
                    padding="16px 16px 8px"
                    borderTop="1px solid #4D4D56"
                  >
                    {t("configuration.side_bar.show_hidden_parameters")}
                    <SwitchSecondary
                      checked={!hiddenParameter}
                      onChange={() => toggleHiddenParameter()}
                    />
                  </Stack>
                </li>
              );
            } else if (link.href) {
              return (
                <li
                  key={link.name}
                  className={link?.isActive ? styles.active : undefined}
                  style={
                    link.name === "CMD Tool"
                      ? {
                          borderTop: "1px solid var(--grey7)",
                          paddingTop: "8px",
                        }
                      : undefined
                  }
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

          {/* {configuration && (
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
            </>
          )} */}
          {onDelete && (
            <li>
              <Divider sx={{ borderColor: "var(--grey7)" }} />
              <span
                onClick={onDelete}
                style={{
                  display: "inline-block",
                  cursor: "pointer",
                  textDecoration: "underline",
                  margin: "24px 16px",
                  textAlign: "left",
                  color: "var(--grey5)",
                }}
              >
                {t("configuration.side_bar.delete_model")}
              </span>
            </li>
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
          disableScrollLock
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
