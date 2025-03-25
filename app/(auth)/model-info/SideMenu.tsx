"use client";

import React from "react";
import styles from "./styles.module.scss";
import useConfirmDialog from "@/src/hooks/useConfirmDialog";
import useLangStore from "@/utils/useLangStore";
import { getSideMenuIcon } from "./sideMenuItems";
import { Stack } from "@mui/material";
import { SwitchSecondary } from "@/components/switches";

type SideMenuItem = {
  textEn: string;
  textEs: string;
  textPt: string;
};

interface SideMenuProps {
  sideMenuItems: SideMenuItem[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  showHiddenParameters: boolean;
  setShowHiddenParameters: (showHiddenParameters: boolean) => void;
}
export default function SideMenu({
  sideMenuItems,
  activeTab,
  onTabChange,
  showHiddenParameters,
  setShowHiddenParameters,
}: SideMenuProps) {
  const { lang } = useLangStore();
  const { toggle, renderConfirmModal } = useConfirmDialog({
    onYes: () => {
      toggle();
    },
    description:
      "Are you sure you want to delete this model from loaded model list?",
  });

  return (
    <aside className={styles.sideMenuWrap}>
      <ul className={styles.sideMenu}>
        {sideMenuItems.map(({ textEn, textEs, textPt }) => {
          if (textEn === "Show Hidden Parameters") {
            return (
              <li key={textEn}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems={"center"}
                  padding="16px 16px 8px"
                  borderTop="1px solid #4D4D56"
                >
                  {lang === "en" ? textEn : lang === "es" ? textEs : textPt}
                  <SwitchSecondary
                    checked={showHiddenParameters}
                    onChange={() =>
                      setShowHiddenParameters(!showHiddenParameters)
                    }
                  />
                </Stack>
              </li>
            );
          }
          if (textEn === "F/W Update") {
            return (
              <li
                key={textEn}
                className={activeTab === textEn ? styles.active : undefined}
                onClick={() => onTabChange(textEn)}
              >
                <Stack
                  direction="row"
                  gap="8px"
                  alignItems="center"
                  padding="8px 0 8px"
                  borderTop="1px solid #4D4D56"
                >
                  <button>
                    {getSideMenuIcon(textEn)}
                    {lang === "en" ? textEn : lang === "es" ? textEs : textPt}
                  </button>
                </Stack>
              </li>
            );
          }
          return (
            <li
              key={textEn}
              className={activeTab === textEn ? styles.active : undefined}
              onClick={() => onTabChange(textEn)}
            >
              <button>
                <Stack direction="row" gap="8px" alignItems="center">
                  {getSideMenuIcon(textEn)}
                  {lang === "en" ? textEn : lang === "es" ? textEs : textPt}
                </Stack>
              </button>
            </li>
          );
        })}
      </ul>
      {renderConfirmModal()}
    </aside>
  );
}
