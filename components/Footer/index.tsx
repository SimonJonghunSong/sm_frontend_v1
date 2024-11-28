import { useState } from "react";
import Image from "next/image";
import logo from "/public/icons/Logo.svg";
import styles from "./styles.module.scss";
import Link from "next/link";
import useNetworkMonitor from "@/utils/useNetworkMonitorStore";
import OfflineErrorDialog from "@/components/OfflineErrorDialog";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";

export default function Footer() {
  const { isOnline } = useNetworkMonitor();
  const [offlineErrorDialog, setOfflineErrorDialog] = useState(false);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (!isOnline) {
      e.preventDefault();
      setOfflineErrorDialog(true);
    }
  };

  return (
    <>
      <footer className={styles.mainFooter}>
        <div className={styles.logoArea}>
          <Image width={200} height={40} src={logo} alt="synctrack" />
          <p>Copyright © 2024. ST SUNLAB Ltd. All rights reserved.</p>
        </div>
        <ul className={styles.navContainer}>
          <li>
            <h2>Support</h2>
            <ul className={styles.footerLinks}>
              <li>
                <Link href={"#"} onClick={handleLinkClick}>
                  Synctrack
                </Link>
              </li>
              <li>
                <Link href={"#"} onClick={handleLinkClick}>
                  Scuti
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <h2>Homepage</h2>
            <ul className={styles.footerLinks}>
              {[
                { label: "HQ", herf: "https://stsunlab.com/" },
                {
                  label: "Suntech Brazil",
                  herf: "https://www.suntechdobrasil.com.br/",
                },
                {
                  label: "Suntech Mexico",
                  herf: "https://www.suntechlatam.com/",
                },
                { label: "Suntech U.S.A", herf: "https://suntechus.com/" },
                { label: "Suntech STI", herf: "#" },
                { label: "Suntech FIN", herf: "#" },
              ].map(({ label, herf }) => {
                return (
                  <li key={label}>
                    <Link href={herf} target="_blank" onClick={handleLinkClick}>
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
                  href={"https://www.youtube.com/@STSUNLAB"}
                  target="_blank"
                  onClick={handleLinkClick}
                >
                  <YouTubeIcon />
                </Link>
              </li>
              <li>
                <Link
                  href={
                    "https://www.linkedin.com/in/stsunlab/recent-activity/all"
                  }
                  target="_blank"
                  onClick={handleLinkClick}
                >
                  <LinkedInIcon />
                </Link>
              </li>
              <li>
                <Link
                  href={"https://www.facebook.com/SuntechDoBrasil"}
                  target="_blank"
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
