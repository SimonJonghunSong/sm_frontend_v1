import Image from "next/image";
import logo from "/public/icons/Logo.svg";
import styles from "./styles.module.scss";

export default function FooterWithoutLink() {
  return (
    <footer className={styles.mainFooter}>
      <Image src={logo} alt="synctrack" />
      <p>Copyright © 2024. ST SUNLAB Ltd. All rights reserved.</p>
    </footer>
  );
}
