export interface DownloadProfileResponse {
  response: {
    code: number;
    reason: string;
  };
  result: {
    record_count: number;
    records: {
      _id: string;
      uid: string;
      model: string;
      fw_ver: string;
      file_nickname: string;
      file: string;
    }[];
  };
}
