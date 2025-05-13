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
import {
  getModelConfig,
  getModelPkg,
  getModels,
} from "@/src/api/services/model";
import { useMutation, useQuery } from "@tanstack/react-query";
import useModelPkgStore from "@/src/stores/useModelPkgStore";
import useCustomPagination from "@/src/hooks/useCustomPagination";
import useLangStore from "@/utils/useLangStore";
import getLocalizedString from "@/utils/getLocalizedString";
import { featureTransition } from "./admin/page";
import OfflineErrorDialog from "@/components/OfflineErrorDialog";
import useNetworkMonitor from "@/utils/useNetworkMonitorStore";
import useConfirmDialog from "@/src/hooks/useConfirmDialog";
import { updateModelPkgDataByEmail } from "@/utils/idbLoginUtil";
import useAuthStore from "@/utils/useAuthStore";
import { getJsonDataFromIDB, saveJsonDataToIDB } from "@/utils/idbModelUtil";
import useModelInfoStore from "@/src/stores/useModelInfo";

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
  const { getIncludeUids, addDatas, data: pkgData } = useModelPkgStore();
  const { isOnline } = useNetworkMonitor();
  const { renderConfirmModal, toggle } = useConfirmDialog({
    onYes: () => {
      callbackRef.current();
    },
    description: t(
      "popup.home.mqtt_server.are_you_sure_you_want_to_load_all_the_models?_the_app_may_become_heavy"
    ),
  });
  const { userId } = useAuthStore();

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

  console.log("data :::", data);

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
            style={{ padding: "8px 0px" }}
            onNetworkError={() => {
              setOfflineErrorDialog(true);
            }}
            model={params.row.col2}
            model_version={params.row.col3}
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
    // // 로드된 모델만 필터링
    // .filter((item) => {
    //   if (showLoadedModels) {
    //     return item.loaded;
    //   }

    //   return true;
    // })
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

  console.log("filteredRowData ::::", filteredRowData);
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

          const dbData = {
            ...pkgData,
            ...records.reduce((acc, cur) => {
              return { ...acc, [cur.uid]: cur };
            }, {}),
          };

          updateModelPkgDataByEmail(userId, dbData);

          addDatas(records);

          setRowData((prev) => prev.map((item) => ({ ...item, loaded: true })));
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
    const filterLoadedModels = async () => {
      try {
        const rows = getRows(data?.data?.records);
        // Promise.all을 사용하여 모든 비동기 작업 완료 대기
        const loadedRows = await Promise.all(
          rows.map(async (item) => {
            try {
              const jsonData = await getJsonDataFromIDB(item.col2);
              return jsonData
                ? { ...item, idbData: jsonData, hide: false }
                : null;
            } catch (error) {
              console.error(`Error loading data for ${item.col2}:`, error);
              return null;
            }
          })
        );

        if (showLoadedModels) {
          // null 값을 제거하고 유효한 데이터만 필터링
          const filteredRows = loadedRows.filter(
            (item): item is NonNullable<typeof item> => item !== null
          );

          setRowData(filteredRows);
        } else {
          // showLoadedModels가 false일 때는 모든 행 표시
          console.log("loadedRows :::", loadedRows);
          console.log("rows :::", rows);

          setRowData(
            rows.map((row) => {
              if (loadedRows.find(({ id }) => id === row.id)) {
                return { ...row, hide: false };
              }

              return row;
            })
          );
        }
      } catch (error) {
        console.error("Error filtering loaded models:", error);
        // 에러 발생 시 빈 배열이나 기존 데이터 유지
        setRowData([]);
      }
    };

    // data가 있을 때만 실행
    if (data?.data?.records) {
      filterLoadedModels();
    }
  }, [showLoadedModels, data]);

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

            const dbData = {
              ...pkgData,
              ...records.reduce((acc, cur) => {
                return { ...acc, [cur.uid]: cur };
              }, {}),
            };

            updateModelPkgDataByEmail(userId, dbData);

            addDatas(records);

            setRowData((prev) =>
              prev.map((item) =>
                item.id === id ? { ...item, loaded: !item.loaded } : item
              )
            );
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
                noDataMessage={t("home.home.no_results_found")}
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

function GalleryView({ rows, onNetworkError }: DataTableProps) {
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
      <Stack alignItems={"center"} py={10} height={700} color="var(--grey5)">
        <span>{t("home.home.no_results_found")}</span>
      </Stack>
    );
  }

  return (
    <Stack>
      <Stack alignItems="center" style={{ overflow: "auto" }}>
        <ul className={styles.galleryWrap}>
          {paginatedRows.map((item, index) => (
            <li key={item.id}>
              <div className={styles.galleryThumbnail}>
                <Box>
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
                style={{ padding: "8px 0px" }}
                model={item.col2}
                model_version={item.col3}
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

function ModelButton({ onNetworkError, model, model_version, style }) {
  const t = useTranslations("home");
  const { setModelName, setFwVer } = useModelInfoStore();
  const router = useRouter();
  const { isOnline } = useNetworkMonitor();
  const [startLoaded, setStartLoaded] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const modelConfigMenuSectionListMutation = useMutation({
    mutationFn: () => getModelConfig(model, model_version),
    onSuccess: async (res) => {
      try {
        // await saveJsonDataToIDB("ST4505", res.data.result.records);
        await saveJsonDataToIDB(model, {
          jsonData: res.data.result.records.json_data,
          csvData: res.data.result.records.csv_data,
        });

        setIsLoaded(true);
      } catch (e) {
        console.log(e, "saveJsonDataToIDB Error");
      }
    },
  });

  const handleConfigurationClick = (e) => {
    e.stopPropagation();
    setModelName(model);
    setFwVer(model_version);
    router.push(`/model-info`);
  };

  const loadedEnd = () => {
    setStartLoaded(false);
  };

  useEffect(() => {
    const fetchJsonData = async () => {
      try {
        const jsonData = await getJsonDataFromIDB(model);
        if (jsonData) {
          setIsLoaded(true);
        }
      } catch (error) {
        console.error("Error fetching JSON data:", error);
      }
    };

    fetchJsonData();
  }, []);

  if (isLoaded) {
    return (
      <>
        <Button
          style={style}
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
          style={style}
          variant="outlined"
          sx={{ width: "100%" }}
          onClick={(e) => {
            e.stopPropagation();
            modelConfigMenuSectionListMutation.mutate();

            if (!isOnline) {
              onNetworkError?.();
              return;
            }
            setStartLoaded(true);
          }}
          endIcon={<FileDownloadOutlinedIcon />}
        >
          <span>{t("image_type.load_model")}</span>
          {startLoaded && !isLoaded && (
            <LinearDeterminate setEndLoaded={loadedEnd} />
          )}
        </Button>
      </>
    );
  }
}
