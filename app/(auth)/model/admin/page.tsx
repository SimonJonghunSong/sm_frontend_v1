"use client";

import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import styles from "../styles.module.scss";
import {
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import DataTable from "@/components/dataTable";
import useModal from "@/utils/useModal";
import { getAdminColumns, getAdminRows } from "../tableData";
import useAuthStore from "@/utils/useAuthStore";
import { delModel, editModel, getModels } from "@/src/api/services/model";
import AddModal from "app/(auth)/model/admin/AddModal";
import { Model as ModelType } from "@/src/api/services/model/type";
import EditModal from "app/(auth)/model/admin/EditModal";
import getLocalizedString from "@/utils/getLocalizedString";
import useLangStore from "@/utils/useLangStore";
import useModelPkgStore from "@/src/stores/useModelPkgStore";
import Modal from "@/components/Modal";

export const featureTransition = (
  lang: "en" | "pt" | "es",
  feature: string
) => {
  const features = {
    "2G": {
      en: "2G",
      pt: "2G",
      es: "2G",
    },
    "3G": {
      en: "3G",
      pt: "3G",
      es: "3G",
    },
    Advanced: {
      en: "Advanced",
      pt: "Avançado",
      es: "Avanzado",
    },
    "Low-cost": {
      en: "Low-cost",
      pt: "Baixo-custo",
      es: "Bajo costo",
    },
    "Low-power consumption": {
      en: "Low-power consumption",
      pt: "Baixo-consumo",
      es: "Bajo consumo",
    },
    "Compact-size": {
      en: "Compact-size",
      pt: "Compacto",
      es: "Tamaño compacto",
    },
    BoxTracker: {
      en: "BoxTracker",
      pt: "BoxTracker",
      es: "BoxTracker",
    },
    Waterproof: {
      en: "Waterproof",
      pt: "Impermeável",
      es: "Impermeable",
    },
    Geofence: {
      en: "Geofence",
      pt: "Geofence",
      es: "Geocerca",
    },
    "Jamming Detection": {
      en: "Jamming Detection",
      pt: "Detecção de Jamming",
      es: "Detección de jamming",
    },
    Accelerometer: {
      en: "Accelerometer",
      pt: "Acelerômetro",
      es: "Acelerómetro",
    },
    Ignition: {
      en: "Ignition",
      pt: "Ignição",
      es: "Ignición",
    },
    Solar: {
      en: "Solar",
      pt: "Solar",
      es: "Solar",
    },
    OBD: {
      en: "OBD",
      pt: "OBD",
      es: "OBD",
    },
    Indoor: {
      en: "Indoor",
      pt: "Interno",
      es: "Interior",
    },
    "Motorcycle Tracker": {
      en: "Motorcycle Tracker",
      pt: "Rastreador de Motocicletas",
      es: "Rastreador de Motocicletas",
    },
  };

  return features[feature]?.[lang] || feature;
};

const selectSortData = (lang: "en" | "pt" | "es") => [
  {
    label: getLocalizedString(lang, "Newest", "Mais recente", "Más reciente"),
    value: "Newest",
  },
  {
    label: getLocalizedString(lang, "Oldest", "Mais antigo", "Más antiguo"),
    value: "Oldest",
  },
  {
    label: "A-Z",
    value: "A-Z",
  },
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

export default function Model() {
  const queryClient = useQueryClient();
  const { lang } = useLangStore();
  const t = useTranslations();
  const { data } = useQuery({
    queryKey: ["model"],
    queryFn: getModels,
  });
  const deleteRequest = useMutation({
    mutationFn: delModel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["model"] });
      // toast(t("common.message.delete-success"), {
      //   type: "success",
      // });
    },
  });
  const editModelRequest = useMutation({
    mutationFn: editModel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["model"] });
      // toast(t("common.message.edit-success"), {
      //   type: "success",
      // });
    },
  });
  const { getIncludeUids } = useModelPkgStore();

  const errorTitle = useRef("");
  const errorMessage = useRef("");
  const confirmButtonText = useRef("");
  const handleErrorPopupOk = useRef<() => void | null>(null);
  const [isOpenErrorPopup, setIsOpenErrorPopup] = useState(false);

  const openErrorPopup = (
    message: string,
    options?: {
      title?: string;
      confirmText?: string;
      onErrorPopupOk?: () => void;
    }
  ) => {
    errorTitle.current = options?.title || t("common.popup.error");
    errorMessage.current = message;
    confirmButtonText.current = options?.confirmText || t("common.popup.ok");
    handleErrorPopupOk.current = options?.onErrorPopupOk;
    setIsOpenErrorPopup(true);
  };
  const closeErrorPopup = () => {
    errorMessage.current = "";
    handleErrorPopupOk.current = null;
    setIsOpenErrorPopup(false);
  };

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
    const targetData = (data?.data?.records || []).find(
      (item) => item.uid === id
    );

    if (getIncludeUids().includes(targetData.uid)) {
      openErrorPopup(
        t("popup.model.model.models_loaded_by_the_user_cannot_be_deleted")
      );
      return;
    }

    openErrorPopup(t("popup.model.model.delete"), {
      title: t("common.popup.confrim"),
      confirmText: t("common.popup.yes"),
      onErrorPopupOk: () => {
        deleteRequest.mutate([id]);
      },
    });
  };

  const handleClickHide = (id: string) => {
    const targetData = (data?.data?.records || []).find(
      (item) => item.uid === id
    );

    if (getIncludeUids().includes(targetData.uid)) {
      openErrorPopup(
        t("popup.model.model.models_loaded_by_the_user_cannot_be_hidden")
      );
      return;
    }

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
  const [searchFilter, setSearchFilter] = useState<string>("ModelName");
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");

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

    for (const id of selectedRowIdList) {
      const targetData = (data?.data?.records || []).find(
        (item) => item.uid === id
      );

      if (getIncludeUids().includes(targetData.uid)) {
        openErrorPopup(
          t("popup.model.model.models_loaded_by_the_user_cannot_be_deleted")
        );
        return;
      }
    }

    openErrorPopup(t("popup.model.model.delete"), {
      title: t("common.popup.confrim"),
      confirmText: t("common.popup.yes"),
      onErrorPopupOk: () => {
        deleteRequest.mutate(selectedRowIdList);
      },
    });
  };

  const [selectedTab, setSelectedTab] = useState("");

  const renderTabs = () => {
    const records = data?.data?.records || [];

    const tabs = records.reduce((acc, cur) => {
      const supportedFeatures = cur.supported_features;

      supportedFeatures.forEach((item) => {
        if (acc[featureTransition(lang, item)]) {
          acc[featureTransition(lang, item)] += 1;
        } else {
          acc[featureTransition(lang, item)] = 1;
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
    <>
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
                  {selectSortData(lang).map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
                <TextField
                  name="searchValue"
                  value={searchInputValue}
                  onChange={(e) => setSearchInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSearchValue(searchInputValue);
                    }
                  }}
                  placeholder={getLocalizedString(
                    lang,
                    "Model Name",
                    "Nome do Modelo",
                    "Nombre del Modelo"
                  )}
                  sx={{ width: 160 }}
                />

                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    setSearchValue(searchInputValue);
                  }}
                >
                  {t("account.account.search")}
                </Button>
              </Stack>

              <Stack direction="row" gap="24px" alignItems="center">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleAddModel}
                >
                  {t("model.model.add")}
                </Button>
              </Stack>
            </Stack>
            <DataTable
              noDataMessage={t("account.account.no_results_found")}
              rows={rowData
                .filter((item) => {
                  if (selectedTab) {
                    const features = item.col4.split(",");

                    return features
                      .map((ft) => featureTransition(lang, ft))
                      .includes(selectedTab);
                  }

                  return true;
                })
                .filter((item) => {
                  if (!searchValue) return true;

                  return item.col2.includes(searchValue);
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
                <Button
                  variant="text"
                  color="info"
                  onClick={handleDeleteModels}
                  disabled={!selectedRowIdList || !selectedRowIdList.length}
                >
                  {t("model.model.delete")}
                </Button>
              }
            />
          </Stack>
        </article>
        {modal && (
          <AddModal
            handleCloseModal={handleCloseModal}
            openErrorPopup={openErrorPopup}
          />
        )}
        {editModal && selectedData && (
          <EditModal
            selectedData={selectedData}
            handleCloseModal={handleCloseEditModal}
            openErrorPopup={openErrorPopup}
          />
        )}
      </div>
      {isOpenErrorPopup && (
        <Modal
          open
          width={"357px"}
          toggleOpen={closeErrorPopup}
          cancelButtonText={t("common.popup.cancel")}
          confirmButtonText={confirmButtonText.current}
          title={errorTitle.current}
          confirm={handleErrorPopupOk.current}
        >
          <Stack>
            <span style={{ wordBreak: "keep-all" }}>
              {errorMessage.current}
            </span>
          </Stack>
        </Modal>
      )}
    </>
  );
}
