import { DownloadProfileResponse } from "@/src/api/services/profile/type";
import { del, put, post } from "../../apiClient";

const uploadProfile = (formData: FormData) => {
  return post<void, FormData>("/api/v1/my/profile_upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const downloadProfile = ({
  model_name,
  model_version,
  nickname,
}: {
  model_name?: string;
  model_version?: string;
  nickname?: string;
}) => {
  console.log("model_version ::::::::", model_version);

  return post<
    DownloadProfileResponse,
    { model_name?: string; model_version?: string; nickname?: string }
  >("/api/v1/my/profile_download", {
    model_name,
    model_version,
    nickname,
  });
};

const deleteProfile = (body: string[]) => {
  return del("/api/v1/my/profile_remove", { uid_list: body });
};

const updateProfile = ({ json, profile }: { json: string; profile: File }) => {
  return put<void, { json: string; profile: File }>(
    "/api/v1/my/profile_update",
    {
      json,
      profile,
    }
  );
};

export { deleteProfile, updateProfile, uploadProfile, downloadProfile };
