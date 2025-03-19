"use client";

import React from "react";
import styles from "./styles.module.scss";
import useConfirmDialog from "@/src/hooks/useConfirmDialog";
import useLangStore from "@/utils/useLangStore";

type SideMenuItem = {
  textEn: string;
  textEs: string;
  textPt: string;
};

interface SideMenuProps {
  sideMenuItems: SideMenuItem[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}
export default function SideMenu({
  sideMenuItems,
  activeTab,
  onTabChange,
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
          return (
            <li
              key={textEn}
              className={activeTab === textEn ? styles.active : undefined}
              onClick={() => onTabChange(textEn)}
            >
              <button>
                <span>
                  {lang === "en" ? textEn : lang === "es" ? textEs : textPt}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      {renderConfirmModal()}
    </aside>
  );
}
