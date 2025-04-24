import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import dayjs from "dayjs";
import { useMutation } from "@tanstack/react-query";
import { Button, Chip, IconButton, Radio, Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import DataTable from "@/components/dataTable";
import { deleteProfile, downloadProfile } from "@/src/api/services/profile";

interface ProfileRow {
  id: string;
  col0: { id: string };
  col1: string;
  col2: string;
  col3: string;
  col4: string;
  col6: { id: string };
  isLocal: boolean;
}

interface LoadProfileDialogProps {
  modelName: string;
  fwVer: string;
}

const formatDate = (dateString: string) =>
  dayjs(dateString).format("MMM/DD/YYYY HH:mm");

const parseProfileFile = (
  file: File
): Promise<{ model: string; version: string }> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const lines = content.split("\n");
      const modelLine = lines.find((line) => line.startsWith("MODEL="));
      const versionLine = lines.find((line) => line.startsWith("VERSION="));

      if (!modelLine || !versionLine)
        return reject(new Error("Invalid profile file format"));

      resolve({
        model: modelLine.split("=")[1].trim(),
        version: versionLine.split("=")[1].trim(),
      });
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsText(file);
  });

const LoadProfileDialog = ({ modelName, fwVer }: LoadProfileDialogProps) => {
  const t = useTranslations();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedValue, setSelectedValue] = useState<string>();
  const [selectedFiles, setSelectedFiles] = useState<ProfileRow[]>([]);

  const profileFromScutiMutation = useMutation({ mutationFn: downloadProfile });

  const deleteProfileMutation = useMutation({
    mutationFn: deleteProfile,
    onSuccess: () =>
      profileFromScutiMutation.mutate({
        model_name: modelName,
        model_version: fwVer,
      }),
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const handleLoadFromScuti = () => {
    profileFromScutiMutation.mutate({ model_name: modelName });
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const alreadyExists = selectedFiles.some((f) => f.id === file.name);
    if (alreadyExists) return;

    try {
      const { model, version } = await parseProfileFile(file);
      if (model !== modelName || version !== fwVer) return;

      const newFile: ProfileRow = {
        id: file.name,
        col0: { id: file.name },
        col1: model,
        col2: version,
        col3: file.name,
        col4: formatDate(new Date().toISOString()),
        col6: { id: file.name },
        isLocal: true,
      };

      setSelectedFiles((prev) => [...prev, newFile]);
    } catch (err) {
      console.error("Error parsing profile file:", err);
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemoveLocalFile = (fileName: string) => {
    setSelectedFiles((prev) => prev.filter((file) => file.id !== fileName));
    if (selectedValue === fileName) setSelectedValue(undefined);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const scutiRecords =
    profileFromScutiMutation.data?.data?.result?.records.map(
      ({ uid, model, fw_ver, file, date }) => ({
        id: uid,
        col0: { id: uid },
        col1: model,
        col2: fw_ver,
        col3: file,
        col4: formatDate(date),
        col6: { id: uid },
        isLocal: false,
      })
    ) || [];

  const combinedRows: ProfileRow[] = [...selectedFiles, ...scutiRecords];

  const columns: GridColDef[] = [
    {
      field: "col0",
      headerName: "",
      width: 80,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Radio
          checked={selectedValue === params.value.id}
          onChange={handleChange}
          value={params.value.id}
          name="profile-radio"
        />
      ),
    },
    {
      field: "col1",
      headerName: t("device.device_list.model_name"),
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "col2",
      headerName: t("device.device_list.f/w"),
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "source",
      headerName: "Source",
      width: 120,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Chip
          label={params.row.isLocal ? "Local" : "Scuti"}
          color={params.row.isLocal ? "default" : "primary"}
          size="small"
        />
      ),
    },
    {
      field: "col3",
      headerName: t(
        "device.configure_multi-device_pop_up_(profile_load).file_name"
      ),
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "col4",
      headerName: t("device.configure_multi-device_pop_up_(profile_load).date"),
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "col6",
      headerName: "Delete",
      width: 80,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            params.row.isLocal
              ? handleRemoveLocalFile(params.value.id)
              : deleteProfileMutation.mutate([params.value.id]);
          }}
        >
          <DeleteForeverOutlinedIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Stack gap="24px">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".profile"
        style={{ display: "none" }}
      />

      <Stack direction="row" justifyContent="flex-end" gap={1}>
        <Button
          variant="outlined"
          color="secondary"
          sx={{ width: 210 }}
          onClick={() => fileInputRef.current?.click()}
        >
          {t("configuration.load_profile_popup.load_from_pc")}
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          sx={{ width: 210 }}
          onClick={handleLoadFromScuti}
        >
          {t("configuration.load_profile_popup.load_from_scuti")}
        </Button>
      </Stack>

      <DataTable
        rows={combinedRows}
        columns={columns}
        checkbox={false}
        disablePagination
        minHeight={500}
      />

      <Stack alignItems="flex-end">
        <Button
          variant="contained"
          color="secondary"
          sx={{ width: 210 }}
          disabled={!selectedValue}
          onClick={() => {}}
        >
          {t("configuration.load_profile_popup.load")}
        </Button>
      </Stack>
    </Stack>
  );
};

export default LoadProfileDialog;
