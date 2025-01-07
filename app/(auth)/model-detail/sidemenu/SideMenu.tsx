"use client";

import React from "react";

import styles from "./styles.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SyncOutlinedIcon from "@mui/icons-material/SyncOutlined";
import { Divider } from "@mui/material";
import useParameterStore from "@/utils/useParameterStore";

import { SwitchSecondary } from "@/components/switches";
import useConfirmDialog from "@/src/hooks/useConfirmDialog";

type sideMenuItem = {
  name: string;
  href?: string;
  icon: () => React.ReactNode;
};

type SideMenuProps = {
  sideMenuItems: sideMenuItem[];
  configuration?: boolean;
};

export default function SideMenu({
  sideMenuItems,
  configuration = false,
}: SideMenuProps) {
  const pathname = usePathname();
  const { toggle, renderConfirmModal } = useConfirmDialog({
    onYes: () => {
      toggle();
    },
    description:
      "Are you sure you want to delete this model from loaded model list?",
  });

  const { hiddenParameter, toggleHiddenParameter } = useParameterStore();

  return (
    <aside className={styles.sideMenuWrap}>
      <ul className={styles.sideMenu}>
        {sideMenuItems.map((link) => {
          if (link.href) {
            return (
              <li
                key={link.name}
                className={
                  pathname.startsWith(link.href) ? styles.active : undefined
                }
              >
                <Link href={link.href}>
                  <link.icon />
                  <span>{link.name}</span>
                </Link>
              </li>
            );
          }
        })}

        {configuration && (
          <>
            <li
              className={
                pathname.startsWith("/model-detail/edit-profile")
                  ? styles.active
                  : undefined
              }
            >
              <Divider
                sx={{ borderColor: "var(--grey7)", marginBottom: "16px" }}
              />

              <Link href="/model-detail/edit-profile">
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
              <button style={{ textDecoration: "underline" }} onClick={toggle}>
                Delete Model
              </button>
            </li>
            <li
              className={
                pathname.startsWith("/model-detail/fw-update")
                  ? styles.active
                  : undefined
              }
            >
              <Divider
                sx={{ borderColor: "var(--grey7)", marginBottom: "16px" }}
              />
              <Link href="/model-detail/fw-update">
                <SyncOutlinedIcon />
                <span>F/W Update</span>
              </Link>
            </li>
          </>
        )}
      </ul>
      {renderConfirmModal()}
    </aside>
  );
}
