import Image from "next/image";
import logo from "/public/icons/Logo.svg";
import styles from "./styles.module.scss";
import { Button, Stack } from "@mui/material";
import { useTranslations } from "next-intl";

export default function FooterWithoutLink() {
  const t = useTranslations();
  return (
    <footer className={styles.mainFooter}>
      <Stack alignItems="=center" justifyContent="center" gap={1.5}>
        <Stack
          direction={"row"}
          alignItems="=center"
          justifyContent="center"
          gap={6}
        >
          <Image
            src={"/icons/footer_logo.png"}
            width={173}
            height={57}
            alt="synctrack"
          />
          <p style={{ display: "flex", alignItems: "center" }}>
            {t(
              "footer.pw_set.copyright_©_2025_st_sunlab_ltd_all_rights_reserved"
            )}
          </p>
        </Stack>

        <p>
          {t(
            "footer.pw_set.syncmaster_supports_4g_or_higher_models_only_for_the_2g_and_3g_models_please_download_and_use_synctrak"
          )}{" "}
          <span
            style={{ textDecoration: "underline", cursor: "pointer" }}
            onClick={() => {
              const url = "https://stsunlab.com/html?path01=support&path02=02";
              window.open(url, "_blank");
            }}
          >
            Synctrack.
          </span>
        </p>
      </Stack>
    </footer>
  );
}
