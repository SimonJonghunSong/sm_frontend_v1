"use client";

import React, { useState } from "react";

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
  const pathname = usePathname();
  const router = useRouter();
  const { setToken, setUserId, setUserRole, setRefreshToken } = useAuthStore();
  const { isOnline } = useNetworkMonitor();
  const [offlineErrorDialog, setOfflineErrorDialog] = useState(false);

  const loginMutation = useMutation({
    mutationFn: logout,
  });

  function handleLogout() {
    Confirm({
      title: "Confirm",
      text: "Are you sure you want to log out?",
    }).then((result) => {
      if (result.isConfirmed) {
        purgeAuthSetting();
      }
    });
  }

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

  function handleDeleteModel() {
    Confirm({
      title: "Confirm",
      text: "Are you sure you want to delete this model from loaded model list? If there is any unsaved data, it will be lost.",
    });
  }

  const { hiddenParameter, toggleHiddenParameter } = useParameterStore();

  const getSubHref = (href: string) => {
    const queryData = queries
      ? Object.entries(queries).reduce((acc, cur, idx) => {
          const [key, value] = cur;

          return idx === 0 ? `?${key}=${value}` : `&${key}=${value}`;
        }, "")
      : "";

    return `${href}${queryData}`;
  };

  console.log("sideMenuItems >>", sideMenuItems);

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
                    <Link href={link.href}>
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
                  <button
                    className={!isOnline ? "disabled" : ""}
                    onClick={!isOnline ? undefined : handleLogout}
                  >
                    {link.icon && <link.icon />}
                    <span>{link.name}</span>
                  </button>
                </li>
              );
            }
          })}

          {configuration && (
            <>
              <li
                className={
                  pathname.startsWith("/configuration/edit-profile")
                    ? styles.active
                    : undefined
                }
              >
                <Divider
                  sx={{ borderColor: "var(--grey7)", marginBottom: "16px" }}
                />

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
              <li>
                <button
                  style={{ textDecoration: "underline" }}
                  onClick={handleDeleteModel}
                >
                  Delete Model
                </button>
              </li>
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

      {offlineErrorDialog && (
        <OfflineErrorDialog
          onClose={() => {
            setOfflineErrorDialog(false);
          }}
        />
      )}
    </>
  );
}
