"use client";

import { useState } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import useNetworkMonitor from "@/utils/useNetworkMonitorStore";
import OfflineErrorDialog from "@/components/OfflineErrorDialog";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import FooterWithoutLink from "../FooterWithoutLink";

export default function Footer() {
  const { isOnline } = useNetworkMonitor();
  const [offlineErrorDialog, setOfflineErrorDialog] = useState(false);

  const pathName = usePathname();

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (!isOnline) {
      e.preventDefault();
      setOfflineErrorDialog(true);
    }
  };

  const renderFooter = () => {
    const longFooterAllowedPathnameList = ["/server/scuti", "/model"];

    if (longFooterAllowedPathnameList.includes(pathName)) {
      return (
        <>
          <footer className={styles.mainFooter}>
            <div className={styles.logoArea}>
              <Image
                width={173}
                height={57}
                src={"/icons/footer_logo.png"}
                alt="synctrack"
              />
              <p>Copyright © 2025. ST SUNLAB Ltd. All rights reserved.</p>
            </div>
            <ul className={styles.navContainer}>
              <li>
                <h2>Support</h2>
                <ul className={styles.footerLinks}>
                  <li>
                    <Link
                      target="_blank"
                      href={
                        "https://stsunlab.com/html?path01=support&path02=02"
                      }
                      onClick={handleLinkClick}
                    >
                      Synctrack
                    </Link>
                  </li>
                  <li>
                    <Link
                      target="_blank"
                      href={
                        "https://stsunlab.com/html?path01=support&path02=03"
                      }
                      onClick={handleLinkClick}
                    >
                      Scuti
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <h2>Homepage</h2>
                <ul className={styles.footerLinks}>
                  {[
                    { label: "ST SUNLAB Ltd.", herf: "https://stsunlab.com/" },
                    { label: "Suntech US", herf: "https://suntechus.com/" },
                    {
                      label: "Suntech do Brasil",
                      herf: "https://www.suntechdobrasil.com.br/",
                    },
                    {
                      label: "STGPS Mexico",
                      herf: "https://www.suntechlatam.com/",
                    },
                    { label: "ST SUNLAB EU", herf: "#" },
                    {
                      label: "STI Soulutions",
                      herf: "https://stisolutions.com.mx/",
                    },
                  ].map(({ label, herf }) => {
                    return (
                      <li key={label}>
                        <Link
                          href={herf}
                          target="_blank"
                          onClick={handleLinkClick}
                        >
                          {label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
              <li>
                <h2>Follow us</h2>
                <ul className={styles.snsLinks}>
                  <li>
                    <Link
                      target="_blank"
                      href={"https://www.youtube.com/@STSUNLAB"}
                      onClick={handleLinkClick}
                    >
                      <YouTubeIcon />
                    </Link>
                  </li>
                  <li>
                    <Link
                      target="_blank"
                      href={
                        "https://www.linkedin.com/in/stsunlab/recent-activity/all"
                      }
                      onClick={handleLinkClick}
                    >
                      <LinkedInIcon />
                    </Link>
                  </li>
                  <li>
                    <Link
                      target="_blank"
                      href={"https://www.facebook.com/SuntechDoBrasil"}
                      onClick={handleLinkClick}
                    >
                      <FacebookIcon />
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </footer>
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
    return <FooterWithoutLink />;
  };

  return <>{renderFooter()}</>;
}
