export interface GetNotificationRes {
  is_deleted: boolean;
  is_read: boolean;
  noti: {
    link: string;
    message: string;
    title: string;
  };
  received_at: string;
  smuser_id: string;
  uid: string;
}
