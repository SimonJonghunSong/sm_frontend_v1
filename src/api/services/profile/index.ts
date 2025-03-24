import { del, put, post } from "../../apiClient";

const uploadProfile = ({ json, profile }: { json: string; profile: File }) => {
  return post<void, { json: string; profile: File }>(
    "/api/v1/my/profile_upload",
    {
      json,
      profile,
    }
  );
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
  return post<
    void,
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
