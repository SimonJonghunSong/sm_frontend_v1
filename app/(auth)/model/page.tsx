"use client";

import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import styles from "./styles.module.scss";
import {
  Box,
  Button,
  FormControlLabel,
  LinearProgress,
  MenuItem,
  Pagination,
  PaginationItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../../components/dataTable";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import DownloadingOutlinedIcon from "@mui/icons-material/DownloadingOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import { SwitchPrimary } from "../../../components/switches";
import { useRouter } from "next/navigation";
import { getRows } from "./tableData";
import { getModelPkg, getModels } from "@/src/api/services/model";
import { useMutation, useQuery } from "@tanstack/react-query";
import useModelPkgStore from "@/src/stores/useModelPkgStore";
import useCustomPagination from "@/src/hooks/useCustomPagination";
import useLangStore from "@/utils/useLangStore";
import getLocalizedString from "@/utils/getLocalizedString";
import { featureTransition } from "./admin/page";
import OfflineErrorDialog from "@/components/OfflineErrorDialog";
import useNetworkMonitor from "@/utils/useNetworkMonitorStore";
import useConfirmDialog from "@/src/hooks/useConfirmDialog";

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

export default function Model() {
  const t = useTranslations();
  const callbackRef = useRef<() => Promise<void>>();
  const { lang } = useLangStore();
  const { getIncludeUids, addDatas } = useModelPkgStore();
  const { isOnline } = useNetworkMonitor();
  const { renderConfirmModal, toggle } = useConfirmDialog({
    onYes: () => {
      callbackRef.current();
    },
    description: t(
      "popup.home.mqtt_server.are_you_sure_you_want_to_load_all_the_models?_the_app_may_become_heavy"
    ),
  });

  const [offlineErrorDialog, setOfflineErrorDialog] = useState(false);
  const [search, setSearch] = useState("");
  const [filterSearch, setFilterSearch] = useState("");

  const { data } = useQuery({
    queryKey: ["model"],
    queryFn: getModels,
    select: (data) => {
      return {
        ...data,
        data: {
          ...data.data,
          records: data.data.records.map((item) => ({
            ...item,
            loaded: getIncludeUids().includes(item.uid),
          })),
        },
      };
    },
  });

  const getColumns: () => GridColDef[] = () => [
    {
      field: "col1",
      headerName: t("home.list_type.image"),
      minWidth: 200,
      headerAlign: "center",
      align: "center",
      renderCell: (params) =>
        params.value && (
          <Stack
            direction="row"
            gap="4px"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <Box sx={{ objectFit: "cover" }} width={96} height={96}>
              <img
                src={params.value}
                alt="thumbnail"
                style={{ width: "100%", height: "100%" }}
              />
            </Box>
          </Stack>
        ),
    },
    {
      field: "col2",
      headerName: t("home.list_type.model_name"),
      minWidth: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "col3",
      headerName: t("list_type.f/w"),
      width: 80,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "col4",
      headerName: t("home.list_type.features"),
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Stack
          direction="row"
          gap="4px"
          justifyContent="center"
          alignItems="center"
          height="100%"
          flexWrap="wrap"
        >
          {params?.value.split(",").map((item) => (
            <span key={item} className="chip">
              {item}
            </span>
          ))}
        </Stack>
      ),
    },
    {
      field: "col5",
      headerName: t("home.list_type.configuration"),
      width: 180,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <ModelButton
            loaded={params.row.loaded}
            toggleLoaded={() => {
              toggleLoaded(params.row.id);
            }}
            onNetworkError={() => {
              setOfflineErrorDialog(true);
            }}
          />
        );
      },
    },
    {
      field: "col7",
      headerName: t("home.list_type.date"),
      minWidth: 180,
      headerAlign: "center",
      align: "center",
    },
  ];

  // Filter
  const [filter, setFilter] = useState<string>("Newest");
  const [showLoadedModels, setShowLoadedModels] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState("");

  const [rowData, setRowData] = useState(getRows(data?.data?.records));
  const filteredRowData = rowData
    // text field search 필터 추가
    .filter((item) => {
      return item.col2.toLowerCase().includes(filterSearch.toLowerCase());
    })
    // Hide 숨기기
    .filter((item) => {
      return !item.hide;
    })
    // 로드된 모델만 필터링
    .filter((item) => {
      if (showLoadedModels) {
        return item.loaded;
      }

      return true;
    })
    // features 탭 필터링
    .filter((item) => {
      if (selectedTab) {
        const features = item.col4.split(",");

        return features
          .map((ft) => featureTransition(lang, ft))
          .includes(selectedTab);
      }

      return true;
    })
    // 정렬 필터링
    .toSorted((a, b) => {
      switch (filter) {
        case "A-Z":
          return a.col2.localeCompare(b.col2);
        case "Oldest":
          return (
            dayjs(a.col7).toDate().getTime() - dayjs(b.col7).toDate().getTime()
          );
        case "Newest":
        default:
          return (
            dayjs(b.col7).toDate().getTime() - dayjs(a.col7).toDate().getTime()
          );
      }
    });

  const [columnData, setColumnData] = useState(getColumns());

  const [viewType, setViewType] = React.useState<string | null>("galleryType");

  const getModelPkgRequest = useMutation({
    mutationFn: getModelPkg,
  });

  const handleViewType = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string | null
  ) => {
    if (newValue !== null) {
      setViewType(newValue);
    }
  };

  const handleSelectChange = (
    e: SelectChangeEvent,
    setState: Dispatch<SetStateAction<string>>
  ) => {
    setState(e.target.value);
  };

  const handleLoadAllModel = async () => {
    if (!isOnline) {
      setOfflineErrorDialog(true);

      return;
    }

    getModelPkgRequest.mutate(
      { uid_list: ["all"] },
      {
        onSuccess: (res) => {
          const records = res.data.records;
          addDatas(records);

          setRowData((prev) => prev.map((item) => ({ ...item, loaded: true })));

          toast("Successfully loaded!", {
            type: "success",
          });
        },
      }
    );
  };

  const toggleShowLoadedModels = () => {
    setShowLoadedModels(!showLoadedModels);
  };

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
    setRowData(getRows(data?.data?.records));
  }, [data]);

  useEffect(() => {
    setColumnData(getColumns());
  }, [rowData]);

  const toggleLoaded = useCallback(
    (id: string) => {
      getModelPkgRequest.mutate(
        { uid_list: [id] },
        {
          onSuccess: (res) => {
            const records = res.data.records;
            addDatas(records);

            setRowData((prev) =>
              prev.map((item) =>
                item.id === id ? { ...item, loaded: !item.loaded } : item
              )
            );

            toast("Successfully loaded!", {
              type: "success",
            });
          },
        }
      );
    },
    [data]
  );

  return (
    <>
      <div className="pageWrap">
        <article className="contentWrap" style={{ width: "100%" }}>
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
                <Stack alignItems={"center"} gap={1} flexDirection="row">
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

                  <Stack gap={1} flexDirection="row">
                    <TextField
                      onChange={({ target }) => setSearch(target.value)}
                      value={search}
                      placeholder={t("home.list_type.model_name")}
                      sx={{ width: 160 }}
                    />
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={() => setFilterSearch(search)}
                    >
                      {t("home.home.search")}
                    </Button>
                  </Stack>
                </Stack>
              </Stack>

              <Stack direction="row" gap="24px" alignItems="center">
                <Button
                  color="secondary"
                  onClick={() => {
                    toggle();
                    callbackRef.current = handleLoadAllModel;
                  }}
                  startIcon={
                    <DownloadingOutlinedIcon sx={{ color: "var(--grey5)" }} />
                  }
                >
                  {t("home.home.load_all_models")}
                </Button>

                <FormControlLabel
                  sx={{ marginLeft: 0 }}
                  control={
                    <SwitchPrimary
                      checked={showLoadedModels}
                      onChange={toggleShowLoadedModels}
                    />
                  }
                  label={
                    <span style={{ marginLeft: "8px" }}>
                      {t("home.home.show_only_loaded_models")}
                    </span>
                  }
                />
                <ToggleButtonGroup
                  value={viewType}
                  exclusive
                  onChange={handleViewType}
                  aria-label="viewType"
                >
                  <ToggleButton
                    value="listType"
                    aria-label="listType"
                    size="small"
                  >
                    <FormatListBulletedOutlinedIcon />
                  </ToggleButton>
                  <ToggleButton
                    value="galleryType"
                    aria-label="galleryType"
                    size="small"
                  >
                    <GridViewOutlinedIcon />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Stack>
            </Stack>

            {viewType === "listType" ? (
              <DataTable
                checkbox={false}
                rows={filteredRowData}
                columns={columnData}
                rowHeight={120}
                noDataMessage={t("home.home.no_loaded_models")}
              />
            ) : (
              <GalleryView
                rows={filteredRowData}
                setRows={setRowData}
                toggleLoaded={toggleLoaded}
                onNetworkError={() => {
                  setOfflineErrorDialog(true);
                }}
              />
            )}
          </Stack>
        </article>
      </div>

      {renderConfirmModal()}

      {offlineErrorDialog && (
        <OfflineErrorDialog
          onClose={() => {
            setOfflineErrorDialog(false);
          }}
        />
      )}
    </>
  );
}

type DataTableProps = {
  rows: any;
  setRows: any;
  toggleLoaded: any;
  onNetworkError?: () => void;
};

function GalleryView({ rows, toggleLoaded, onNetworkError }: DataTableProps) {
  const t = useTranslations();
  const { paginatedRows, page, pageCount, handleChangePage } =
    useCustomPagination({ rows, limit: 30 });

  useEffect(() => {
    if (page > pageCount) {
      handleChangePage(1);
    }
  }, [page, pageCount]);

  if (paginatedRows.length === 0) {
    return (
      <Stack alignItems={"center"} py={5}>
        {t("home.home.no_loaded_models")}
      </Stack>
    );
  }

  return (
    <Stack>
      <Stack alignItems="center" style={{ overflow: "auto" }}>
        <ul style={{ width: "1740px" }} className={styles.galleryWrap}>
          {paginatedRows.map((item, index) => (
            <li key={item.id}>
              <div className={styles.galleryThumbnail}>
                <Box width={195} height={172}>
                  <img
                    src={item.col1}
                    alt="model"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              </div>
              <div className={styles.galleryTitle}>{item.col2}</div>
              <ModelButton
                loaded={rows[index].loaded}
                toggleLoaded={() => toggleLoaded(item.id)}
                onNetworkError={onNetworkError}
              />
            </li>
          ))}
        </ul>
      </Stack>

      <Stack spacing={2} justifyContent="center" mt="40px" alignItems="center">
        <Pagination
          page={Math.floor(page)}
          count={Math.floor(pageCount)}
          color="primary"
          variant="outlined"
          shape="rounded"
          onChange={(event: React.ChangeEvent<unknown>, value: number) => {
            handleChangePage(value);
          }}
          renderItem={(props2) => (
            <PaginationItem
              {...props2}
              sx={{
                minWidth: 21,
                width: 21,
                height: 21,
                padding: 0,
                fontSize: 12,
              }}
            />
          )}
        />
      </Stack>
    </Stack>
  );
}

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

function ModelButton({ loaded, toggleLoaded, onNetworkError }) {
  const t = useTranslations("home");
  const [startLoaded, setStartLoaded] = useState<boolean>(false);
  const { isOnline } = useNetworkMonitor();

  const router = useRouter();
  const handleConfigurationClick = (e) => {
    e.stopPropagation();
    router.push("/configuration");
  };

  const loadedEnd = () => {
    toggleLoaded();
    setStartLoaded(false);
  };

  if (loaded) {
    return (
      <>
        <Button
          variant="contained"
          sx={{ width: "100%" }}
          onClick={(e) => handleConfigurationClick(e)}
          endIcon={<KeyboardArrowRightOutlinedIcon />}
        >
          {t("image_type.configure")}
        </Button>
      </>
    );
  } else {
    return (
      <>
        <Button
          variant="outlined"
          sx={{ width: "100%" }}
          onClick={(e) => {
            e.stopPropagation();
            if (!isOnline) {
              onNetworkError?.();
              return;
            }
            setStartLoaded(true);
          }}
          endIcon={<FileDownloadOutlinedIcon />}
        >
          <span>{t("image_type.load_model")}</span>
          {startLoaded && !loaded && (
            <LinearDeterminate setEndLoaded={loadedEnd} />
          )}
        </Button>
      </>
    );
  }
}
