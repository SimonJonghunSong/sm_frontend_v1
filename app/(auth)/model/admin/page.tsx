"use client";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import styles from "../styles.module.scss";
import {
  Box,
  Button,
  LinearProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import DataTable from "../../../../components/dataTable";
import useModal from "../../../../utils/useModal";
import { useRouter } from "next/navigation";
import { getAdminColumns, getAdminRows } from "../tableData";
import useAuthStore from "../../../../utils/useAuthStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { delModel, editModel, getModels } from "@/src/api/services/model";
import AddModal from "app/(auth)/model/admin/AddModal";
import { Model as ModelType } from "@/src/api/services/model/type";
import EditModal from "app/(auth)/model/admin/EditModal";

const selectSortData = [
  { label: "Newest", value: "Newest" },
  { label: "Oldest", value: "Oldest" },
  { label: "A-Z", value: "A-Z" },
];

export interface FormState {
  devName: string;
  country: string;
  imageFile: string;
  imageFileSmall: string;
  supportedNetworkType: string[];
  supportedFeatures: string[];
  settingFile: string;
  hide: boolean;
}

// 액션 타입 정의
type FormAction =
  | { type: "RESET" }
  | { type: "SET_DATA"; value: FormState }
  | { type: "SET_DEV_NAME"; value: string }
  | { type: "SET_COUNTRY"; value: string }
  | { type: "SET_IMAGE_FILE"; value: string }
  | { type: "SET_IMAGE_FILE_SMALL"; value: string }
  | { type: "SET_SUPPORTED_NETWORK_TYPE"; value: string[] }
  | { type: "SET_SUPPORTED_FEATURES"; value: string[] }
  | { type: "SET_SETTING_FILE"; value: string }
  | { type: "SET_HIDE"; value: boolean };

const initialState: FormState = {
  devName: "",
  country: "",
  imageFile: "",
  imageFileSmall: "",
  supportedNetworkType: [],
  supportedFeatures: [],
  settingFile: "",
  hide: false,
};

export default function Model() {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["model"],
    queryFn: getModels,
  });
  const deleteRequest = useMutation({
    mutationFn: delModel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["model"] });
      toast("Successfully deleted!", {
        type: "success",
        position: "top-center",
      });
    },
  });
  const editModelRequest = useMutation({
    mutationFn: editModel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["model"] });
      toast("Successfully edited!", {
        type: "success",
        position: "top-center",
      });
    },
  });

  const [selectedData, setSelectedData] = useState<ModelType | null>(null);

  const router = useRouter();
  const { userRole } = useAuthStore();

  useEffect(() => {
    if (userRole !== "ADMIN") {
      router.replace("/model");
    }
  }, []);

  if (userRole !== "ADMIN") {
    return <></>;
  }

  const handleClickEdit = (id: string) => {
    const targetData = (data?.data?.records || []).find(
      (item) => item.uid === id
    );

    if (targetData) {
      setSelectedData(targetData);
    }
    editModalToggle();
  };
  const handleClickDelete = (id: string) => {
    deleteRequest.mutate([id]);
  };
  const handleClickHide = (id: string) => {
    // TODO 이미지 업로드 변경에 의한 재작업 필요
    // 1. EditModal 파일 180번째 줄 handleEditConfirm 참고 하셔서 작업 부탁드립니다 ! 😃😁😄😀😆🥹😅
    toast("... is fixing");
    // const targetData = (data?.data?.records || []).find(
    //   (item) => item.uid === id
    // );
    // if (targetData) {
    //   const {
    //     uid,
    //     country,
    //     hide,
    //     image_file,
    //     image_file_small,
    //     setting_file,
    //     supported_network_type,
    //     supported_features,
    //     model_pkg,
    //   } = targetData;
    //   editModelRequest.mutate({
    //     uid,
    //     country: country.name,
    //     hide: !hide,
    //     image_file,
    //     setting_file,
    //     supported_network_type,
    //     supported_features,
    //     model_pkg: model_pkg || "model_pkg",
    //   });
    // }
  };

  const [selectedRowIdList, setSelectedRowIdList] = useState<string[]>();

  const [rowData, setRowData] = useState(getAdminRows(data?.data?.records));
  const [columnData, setColumnData] = useState(
    getAdminColumns(handleClickEdit, handleClickDelete, handleClickHide)
  );
  const [filter, setFilter] = useState<string>("Newest");

  const [modal, modalToggle] = useModal();
  const [editModal, editModalToggle] = useModal();

  const handleSelectChange = (
    e: SelectChangeEvent,
    setState: (value: string) => void
  ) => {
    setState(e.target.value);
  };

  const handleAddModel = () => {
    modalToggle();
  };

  const handleCloseModal = () => {
    modalToggle();
  };
  const handleCloseEditModal = () => {
    editModalToggle();
  };

  const handleDeleteModels = () => {
    if (!selectedRowIdList || !selectedRowIdList.length) return;
    deleteRequest.mutate(selectedRowIdList);
  };

  const [selectedTab, setSelectedTab] = useState("");

  const renderTabs = () => {
    const records = data?.data?.records || [];

    const tabs = records.reduce((acc, cur) => {
      const supportedFeatures = cur.supported_features;

      supportedFeatures.forEach((item) => {
        if (acc[item]) {
          acc[item] += 1;
        } else {
          acc[item] = 1;
        }
      });

      return acc;
    }, {} as Record<string, number>);

    return (
      <Stack className={styles.head} direction="row" flexWrap={"wrap"}>
        <span
          className={selectedTab === "" ? styles.active : undefined}
          onClick={() => {
            setSelectedTab("");
          }}
        >
          All({records.length})
        </span>
        {Object.entries(tabs).map(([key, value]) => (
          <span
            className={selectedTab === key ? styles.active : undefined}
            onClick={() => {
              setSelectedTab(key);
            }}
          >
            {key}({value})
          </span>
        ))}
      </Stack>
    );
  };

  useEffect(() => {
    setRowData(getAdminRows(data?.data?.records));
    setColumnData(
      getAdminColumns(handleClickEdit, handleClickDelete, handleClickHide)
    );
  }, [data]);

  return (
    <div className="pageWrap">
      <article className="contentWrap">
        {renderTabs()}
        <Stack>
          <Stack
            direction="row"
            gap="8px"
            justifyContent="space-between"
            mb="40px"
          >
            <Stack
              direction="row"
              gap="8px"
              justifyContent="space-between"
              alignItems="center"
            >
              <Select
                value={filter}
                onChange={(e) => handleSelectChange(e, setFilter)}
                sx={{ minWidth: 160 }}
              >
                {selectSortData.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </Stack>

            <Stack direction="row" gap="24px" alignItems="center">
              <Button
                variant="contained"
                color="secondary"
                onClick={handleAddModel}
              >
                Add
              </Button>
            </Stack>
          </Stack>
          <DataTable
            rows={rowData
              .filter((item) => {
                if (selectedTab) {
                  const features = item.col4.split(",");

                  return features.includes(selectedTab);
                }

                return true;
              })
              .toSorted((a, b) => {
                switch (filter) {
                  case "A-Z":
                    return a.col2.localeCompare(b.col2);
                  case "Oldest":
                    return (
                      dayjs(a.col7).toDate().getTime() -
                      dayjs(b.col7).toDate().getTime()
                    );
                  case "Newest":
                  default:
                    return (
                      dayjs(b.col7).toDate().getTime() -
                      dayjs(a.col7).toDate().getTime()
                    );
                }
              })}
            columns={columnData}
            rowHeight={120}
            onRowSelectionModelChange={(list) => {
              setSelectedRowIdList(list as string[]);
            }}
            footerButton={
              <Button variant="text" color="info" onClick={handleDeleteModels}>
                Delete
              </Button>
            }
          />
        </Stack>
      </article>
      {modal && <AddModal handleCloseModal={handleCloseModal} />}
      {editModal && selectedData && (
        <EditModal
          selectedData={selectedData}
          handleCloseModal={handleCloseEditModal}
        />
      )}
    </div>
  );
}

type DataTableProps = {
  rows: any;
  setRows: any;
  toggleLoaded: any;
};

function LinearDeterminate({ setEndLoaded }) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(timer);
          setTimeout(setEndLoaded, 0); // 비동기적으로 상태 업데이트를 처리합니다.
          return 100;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, [setEndLoaded]);

  return (
    <Box
      sx={{ width: "100%", position: "absolute", bottom: "-3px", left: "4px" }}
    >
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{ width: "calc(100% - 8px)", height: "2px" }}
      />
    </Box>
  );
}
