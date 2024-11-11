"use client";

import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import styles from "../styles.module.scss";
import {
  Button,
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
import { AxiosError } from "axios";

const selectSortData = [
  { label: "Newest", value: "Newest" },
  { label: "Oldest", value: "Oldest" },
  { label: "A-Z", value: "A-Z" },
];

export interface FormState {
  devName: string;
  country: string;
  imageFile: string;
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
  | { type: "SET_SUPPORTED_NETWORK_TYPE"; value: string[] }
  | { type: "SET_SUPPORTED_FEATURES"; value: string[] }
  | { type: "SET_SETTING_FILE"; value: string }
  | { type: "SET_HIDE"; value: boolean };

const initialState: FormState = {
  devName: "",
  country: "",
  imageFile: "",
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
    const targetData = (data?.data?.records || []).find(
      (item) => item.uid === id
    );
    if (targetData) {
      const {
        dev_name,
        country,
        hide,
        supported_network_type,
        supported_features,
        uid,
      } = targetData;
      const formData = new FormData();

      formData.append(
        "json",
        JSON.stringify({
          uid,
          dev_name,
          fw_ver: "1.1.0",
          country: country.name,
          supported_network_type,
          supported_features,
          hide: !hide,
          model_pkg: "model_pkg",
        })
      );

      editModelRequest.mutate(formData);
    }
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
