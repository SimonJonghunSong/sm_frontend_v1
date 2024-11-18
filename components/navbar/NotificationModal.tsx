import { useState, useRef, useEffect } from "react";
import styles from "./styles.module.scss";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { Stack, IconButton, Tabs, Tab, Box } from "@mui/material";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { getNoti, readNoti } from "@/src/api/services/notification";

interface NotificationModalProps {
  onClose: () => void;
}

const NotificationModal = ({ onClose }: NotificationModalProps) => {
  const t = useTranslations("notifications");
  const [tabs, setTabs] = useState<"new" | "all">("new");

  const queryClient = useQueryClient();

  const notificationQuery = useQuery({
    queryKey: ["notification"],
    queryFn: getNoti,
    refetchOnMount: true,
    select: ({ data }) => {
      return {
        count: data.count || 0,
        records: data.records || [],
      };
    },
  });

  const readNotification = useMutation({
    mutationFn: readNoti,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notification"] });
    },
  });

  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  const handleCloseOnEscPress = (event: KeyboardEvent) => {
    console.log(event);
    if (event.key === "Escape") {
      onClose();
    }
  };

  const handleChange = (newValue: "new" | "all") => {
    setTabs(newValue);
  };

  const handleNotiClick = (notiId: string) => {
    readNotification.mutate([notiId]);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleCloseOnEscPress);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleCloseOnEscPress);
    };
  }, []);

  if (!notificationQuery.data) {
    return <></>;
  }

  const renderTabContent = () => {
    if (tabs === "new") {
      if (
        notificationQuery.data.records.filter(({ is_read }) => !is_read)
          .length === 0
      ) {
        return (
          <Box textAlign={"center"} paddingTop={10}>
            {t("privacy_policy.no_new_notifications")}
          </Box>
        );
      }

      return (
        <Stack width="100%" className={styles.notificationListWrap}>
          <ul className={styles.list}>
            {notificationQuery.data.records
              .filter(({ is_read }) => !is_read)
              .map(({ uid, noti, received_at }) => {
                return (
                  <li
                    key={uid}
                    className={styles.active}
                    onClick={() => {
                      handleNotiClick(uid);
                      // window.location.href = noti.link;
                    }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Stack>
                        <div className={styles.subTitle}>{noti.title}</div>
                        <div className={styles.description}>{noti.message}</div>
                      </Stack>
                      <Stack>
                        <span className={styles.date}>
                          {dayjs(received_at).format("MMM/DD/YYYY HH:mm")}
                        </span>
                      </Stack>
                    </Stack>
                  </li>
                );
              })}
          </ul>
        </Stack>
      );
    } else {
      if (notificationQuery.data.count === 0) {
        return (
          <Box textAlign={"center"} paddingTop={10}>
            {t("privacy_policy.no_notifications_yet")}
          </Box>
        );
      }

      return (
        <Stack width="100%" className={styles.notificationListWrap}>
          <ul className={styles.list}>
            {notificationQuery.data.records.map(
              ({ uid, noti, received_at, is_read }) => {
                return (
                  <li
                    key={uid}
                    className={!is_read ? styles.active : undefined}
                    onClick={() => {
                      if (!is_read) {
                        handleNotiClick(uid);
                      }
                      window.location.href = noti.link;
                    }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Stack>
                        <div className={styles.subTitle}>{noti.title}</div>
                        <div className={styles.description}>{noti.message}</div>
                      </Stack>
                      <Stack>
                        <span className={styles.date}>
                          {dayjs(received_at).format("MMM/DD/YYYY HH:mm")}
                        </span>
                      </Stack>
                    </Stack>
                  </li>
                );
              }
            )}
          </ul>
        </Stack>
      );
    }
  };

  return (
    <div className={styles.notificationModal} ref={modalRef}>
      <div className={styles.notiTitle}>
        {t("privacy_policy.notifications")}
      </div>
      <IconButton
        onClick={() => onClose()}
        sx={{
          position: "absolute",
          right: "6px",
          top: "6px",
          zIndex: 30,
        }}
      >
        <CloseOutlinedIcon sx={{ color: "var(--black)" }} />
      </IconButton>
      <Stack className={styles.notification}>
        <Tabs
          value={tabs}
          onChange={(_event, value) => handleChange(value)}
          aria-label="notification"
          sx={{
            borderBottom: "1px solid var(--grey4)",
          }}
        >
          <Tab
            value="new"
            label={`${t("privacy_policy.new")} (${
              notificationQuery.data.records.filter(({ is_read }) => !is_read)
                .length || 0
            })`}
            sx={{ width: "50%" }}
          />
          <Tab
            value="all"
            label={`${t("privacy_policy.all")} (${
              notificationQuery.data.count || 0
            })`}
            sx={{ width: "50%" }}
          />
        </Tabs>
        {renderTabContent()}
      </Stack>
    </div>
  );
};

export default NotificationModal;
