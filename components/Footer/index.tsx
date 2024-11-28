import Image from "next/image";
import logo from "/public/icons/Logo.svg";
import styles from "./styles.module.scss";
import Link from "next/link";
import useNetworkMonitor from "@/utils/useNetworkMonitorStore";
import { useState } from "react";
import OfflineErrorDialog from "@/components/OfflineErrorDialog";

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
              <li>
                <Link href={"#"} onClick={handleLinkClick}>
                  HQ
                </Link>
              </li>
              <li>
                <Link href={"#"} onClick={handleLinkClick}>
                  Suntech Brazil
                </Link>
              </li>
              <li>
                <Link href={"#"} onClick={handleLinkClick}>
                  Suntech Mexico
                </Link>
              </li>
              <li>
                <Link href={"#"} onClick={handleLinkClick}>
                  Suntech U.S.A
                </Link>
              </li>
              <li>
                <Link href={"#"} onClick={handleLinkClick}>
                  Suntech STI
                </Link>
              </li>
              <li>
                <Link href={"#"} onClick={handleLinkClick}>
                  Suntech FIN
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <h2>Follow us</h2>
            <ul className={styles.snsLinks}>
              <li>
                <Link href={"#"} onClick={handleLinkClick}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.4893 6.63607H15.9386V4.11179C15.6886 4.0774 14.8287 4 13.8271 4C11.7375 4 10.306 5.3144 10.306 7.73019V9.95349H8V12.7754H10.306V19.876H13.1332V12.7761H15.3459L15.6972 9.95415H13.1326V8.01C13.1332 7.19438 13.3528 6.63607 14.4893 6.63607Z"
                      fill="currentColor"
                    />
                  </svg>
                </Link>
              </li>
              <li>
                <Link href={"#"} onClick={handleLinkClick}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.5556 5.881C20.8283 6.2 20.0534 6.41144 19.2456 6.51411C20.0767 6.01789 20.711 5.23811 21.0092 4.29822C20.2343 4.76022 19.3788 5.08656 18.467 5.26867C17.7312 4.48522 16.6826 4 15.5386 4C13.319 4 11.5321 5.80156 11.5321 8.01011C11.5321 8.32789 11.559 8.63344 11.625 8.92433C8.292 8.76178 5.34278 7.16433 3.36156 4.73089C3.01567 5.331 2.81278 6.01789 2.81278 6.75733C2.81278 8.14578 3.52778 9.37656 4.59356 10.0891C3.94944 10.0769 3.31756 9.88989 2.78222 9.59533C2.78222 9.60756 2.78222 9.62344 2.78222 9.63933C2.78222 11.5876 4.17189 13.2058 5.99422 13.5786C5.66789 13.6678 5.31222 13.7106 4.94311 13.7106C4.68644 13.7106 4.42733 13.6959 4.18411 13.6421C4.70356 15.2298 6.17756 16.397 7.93022 16.4349C6.56622 17.5019 4.83433 18.1448 2.95944 18.1448C2.63067 18.1448 2.31533 18.1301 2 18.0898C3.77589 19.235 5.88056 19.8889 8.15022 19.8889C15.5276 19.8889 19.5609 13.7778 19.5609 8.48067C19.5609 8.30344 19.5548 8.13233 19.5462 7.96244C20.3419 7.39778 21.0104 6.69256 21.5556 5.881Z"
                      fill="currentColor"
                    />
                  </svg>
                </Link>
              </li>
              <li>
                <Link href={"#"} onClick={handleLinkClick}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9 4H15C17.761 4 20 6.239 20 9V15C20 17.761 17.761 20 15 20H9C6.239 20 4 17.761 4 15V9C4 6.239 6.239 4 9 4ZM15 18.5C16.93 18.5 18.5 16.93 18.5 15V9C18.5 7.07 16.93 5.5 15 5.5H9C7.07 5.5 5.5 7.07 5.5 9V15C5.5 16.93 7.07 18.5 9 18.5H15Z"
                      fill="currentColor"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8 12C8 9.791 9.791 8 12 8C14.209 8 16 9.791 16 12C16 14.209 14.209 16 12 16C9.791 16 8 14.209 8 12ZM9.5 12C9.5 13.378 10.622 14.5 12 14.5C13.378 14.5 14.5 13.378 14.5 12C14.5 10.621 13.378 9.5 12 9.5C10.622 9.5 9.5 10.621 9.5 12Z"
                      fill="currentColor"
                    />
                    <circle
                      cx="16.3006"
                      cy="7.69999"
                      r="0.533"
                      fill="currentColor"
                    />
                  </svg>
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
