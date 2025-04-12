import { useState, useRef, useEffect } from "react";
import styles from "./styles.module.scss";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { Stack, IconButton, Tabs, Tab } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { getNoti, readNoti } from "@/src/api/services/notification";

interface NotificationModalProps {
  onClose: () => void;
}

interface NotificationItem {
  uid: string;
  noti: {
    title: string;
    message: string;
    link?: string;
  };
  received_at: string;
  is_read: boolean;
  is_deleted: boolean;
}

const NotificationList = ({
  items,
  onItemClick,
}: {
  items: NotificationItem[];
  onItemClick: (id: string, link?: string) => void;
}) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <Stack width="100%" className={styles.notificationListWrap}>
      <ul className={styles.list}>
        {items.map(({ uid, noti, received_at, is_read }) => (
          <li
            key={uid}
            className={!is_read ? styles.active : undefined}
            onClick={() => onItemClick(uid, noti.link)}
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
              <Stack flexDirection="row" alignItems="center" gap={2}>
                <span className={styles.date}>
                  {dayjs(received_at).format("MMM/DD/YYYY HH:mm")}
                </span>
              </Stack>
            </Stack>
          </li>
        ))}
      </ul>
    </Stack>
  );
};

const NotificationModal = ({ onClose }: NotificationModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("notifications");
  const [tabs, setTabs] = useState<"new" | "all">("new");
  const queryClient = useQueryClient();

  const notificationQuery = useQuery({
    queryKey: ["notification"],
    queryFn: getNoti,
    refetchOnMount: true,
    select: ({ data }) => ({
      count: data.count || 0,
      records: data.records || [],
    }),
  });

  const rows =
    notificationQuery?.data?.records.filter((item) => !item.is_deleted) || [];

  const newNotifications = rows.filter(({ is_read }) => !is_read);
  const allNotifications = rows;

  const readNotification = useMutation({
    mutationFn: readNoti,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notification"] });
    },
  });

  const handleNotiClick = (notiId: string, link?: string) => {
    if (!readNotification.isPending) {
      readNotification.mutate([notiId]);
      if (link) {
        window.location.href = link;
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleCloseOnEscPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleCloseOnEscPress);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleCloseOnEscPress);
    };
  }, [onClose]);

  const renderTabContent = () => {
    if (tabs === "new") {
      if (newNotifications.length === 0) {
        return (
          <Stack textAlign="center" height="100%" justifyContent="center">
            {t("privacy_policy.no_new_notifications")}
          </Stack>
        );
      }

      return (
        <NotificationList
          items={newNotifications}
          onItemClick={handleNotiClick}
        />
      );
    } else {
      if (allNotifications.length === 0) {
        return (
          <Stack justifyContent="center" height="100%" textAlign="center">
            {t("privacy_policy.no_notifications_yet")}
          </Stack>
        );
      }

      return (
        <NotificationList
          items={allNotifications}
          onItemClick={(uid, link) => {
            const item = allNotifications.find((item) => item.uid === uid);
            if (item && !item.is_read) {
              handleNotiClick(uid, link);
            } else if (link) {
              window.location.href = link;
            }
          }}
        />
      );
    }
  };

  return (
    <div className={styles.notificationModal} ref={modalRef}>
      <div className={styles.notiTitle}>
        {t("privacy_policy.notifications")}
      </div>
      <IconButton
        onClick={onClose}
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
          onChange={(_event, value) => setTabs(value)}
          aria-label="notification"
          sx={{
            borderBottom: "1px solid var(--grey4)",
          }}
        >
          <Tab
            value="new"
            label={`${t("privacy_policy.new")} (${newNotifications.length})`}
            sx={{ width: "50%" }}
          />
          <Tab
            value="all"
            label={`${t("privacy_policy.all")} (${
              notificationQuery?.data?.count || 0
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
