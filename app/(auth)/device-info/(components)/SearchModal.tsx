import { Button, IconButton, Stack, TextField } from "@mui/material";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { SearchField, SearchFields, MENUS, SECTIONS } from "constants/searchField";
import { commands } from "app/(auth)/device-info/(commands)/@index";
import { FIELD_VALIDATIONS } from "constants/field";
import useParameterStore from "@/utils/useParameterStore";
import { hiddenParameterId } from "app/(auth)/device-info/(tabs)/CommandTab";

type SearchResult = {
  key: string;
  searchText: string;
  tab: string;
};

interface Props {
  onClose: (value: {
    key: string;
    tab: string;
    type: "section" | "param";
  }) => void;
  sectionData: { [key: string]: SearchFields };
  paramData: { [key: string]: SearchField };
}

export default function SearchModal({
  sectionData,
  paramData,
  onClose,
}: Props) {
  console.log("searchParamData :::", paramData);

  // uitls
  const t = useTranslations();
  const { hiddenParameter } = useParameterStore();

  // states
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllParamResult, setShowAllParamResult] = useState(false);
  const [showAllSectionResult, setShowAllSectionResult] = useState(false);
  const [searchSectionResults, setSearchSectionResults] = useState<
    SearchResult[]
  >([]);
  const [searchParamResults, setSearchParamResults] = useState<SearchResult[]>(
    []
  );

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowAllParamResult(false);
    setShowAllSectionResult(false);
    setSearchTerm(e.target.value);
  };

  const renderSearchResults = () => {
    if (searchSectionResults.length === 0 && searchParamResults.length === 0)
      return <EmptyResults />;

    const displayedParamResults = searchParamResults.slice(
      0,
      showAllParamResult ? searchParamResults.length : 3
    );
    const displayedSectionResults = searchSectionResults.slice(
      0,
      showAllSectionResult ? searchSectionResults.length : 3
    );

    return (
      <Stack direction="column" gap="20px">
        {searchSectionResults.length !== 0 && (
          <Stack direction="column" gap="8px">
            <div>
              <div className={styles.title}>Sections</div>
              <ul className={styles.list}>
                {displayedSectionResults.map((result, index) => (
                  <SearchResultItem
                    key={index}
                    result={result}
                    onSelect={(result) => {
                      onClose({
                        key: result.key,
                        tab: result.tab,
                        type: "section",
                      });
                    }}
                  />
                ))}
              </ul>
            </div>

            {searchSectionResults.length > 3 && (
              <Button
                color="secondary"
                sx={{ textDecoration: "underline", alignSelf: "flex-end" }}
                onClick={() => setShowAllSectionResult(!showAllSectionResult)}
              >
                {showAllSectionResult
                  ? t("configuration.search_bar.show_less")
                  : t("configuration.search_bar.show_all_result")}
              </Button>
            )}
          </Stack>
        )}
        {searchParamResults.length !== 0 && (
          <Stack direction="column" gap="8px">
            <div className={styles.title}>Parameters</div>
            <ul className={styles.list}>
              {displayedParamResults.map((result, index) => (
                <SearchResultItem
                  key={index}
                  result={result}
                  onSelect={(result) => {
                    onClose({
                      key: result.key,
                      tab: result.tab,
                      type: "param",
                    });
                  }}
                />
              ))}
            </ul>
            {searchParamResults.length > 3 && (
              <Button
                color="secondary"
                sx={{ textDecoration: "underline", alignSelf: "flex-end" }}
                onClick={() => setShowAllParamResult(!showAllParamResult)}
              >
                {showAllParamResult
                  ? t("configuration.search_bar.show_less")
                  : t("configuration.search_bar.show_all_result")}
              </Button>
            )}
          </Stack>
        )}
      </Stack>
    );
  };

  useEffect(() => {
    if (searchTerm) {
      const sectionResultsEntries = Object.entries(sectionData).filter(
        ([key, value]) => {
          return value.key
            .toLowerCase()
            .replaceAll(" ", "")
            .includes(searchTerm.toLowerCase().replaceAll(" ", ""));
        }
      );

      const sectionResults = [];
      sectionResultsEntries.forEach(([key, value]) => {
        if (value.fields.length > 0) {
          sectionResults.push({
            key: value.key,
            searchText: value.searchText,
            tab: value.tab,
          });
        }
      });
      setSearchSectionResults(sectionResults);

      const paramResults = [];
      const paramResultsEntries = Object.entries(paramData).filter(
        ([key, value]) => {
          return (
            key
              .toLowerCase()
              .replaceAll(" ", "")
              .includes(searchTerm.toLowerCase().replaceAll(" ", "")) ||
            value.field.includes(searchTerm)
          );
        }
      );

      paramResultsEntries.forEach(([key, value]) => {
        paramResults.push({
          key: value.field,
          searchText: `${value.searchText} (${value.field})`,
          tab: value.tab,
        });
      });

      // Input/Output/Command 모두에 대해 1046~1049를 검색 결과에 추가
      const ioAndCommandIds = ["1046", "1047", "1048", "1049"];
      ioAndCommandIds.forEach((id) => {
        if (
          id === searchTerm.trim()
        ) {
          const paramTitle = FIELD_VALIDATIONS[id]?.title?.en || id;
          // Input/Output(I/O) 메뉴 결과 추가
          if (!paramResults.some((r) => r.key === id && r.tab === "Input/Output(I/O)")) {
            paramResults.push({
              key: id,
              searchText: `${MENUS["Input/Output(I/O)"].en} > ${paramTitle} (${id})`,
              tab: "Input/Output(I/O)",
            });
          }
          // Command 메뉴 결과 추가
          if (!paramResults.some((r) => r.key === id && r.tab === "Commands")) {
            paramResults.push({
              key: id,
              searchText: `Commands > ${paramTitle} (${id})`,
              tab: "Commands",
            });
          }
        }
      });

      // Maintenance Server 숨김 파라미터 강제 추가 (Show Hidden Parameters ON일 때만)
      if (!hiddenParameter) {
        const maintenanceIds = ["1020", "1021", "1022", "1023"];
        maintenanceIds.forEach((id) => {
          if (
            id === searchTerm.trim() &&
            !paramResults.some((r) => r.key === id) &&
            !paramResultsEntries.some(([key]) => key === id)
          ) {
            const paramTitle = FIELD_VALIDATIONS[id]?.title?.en || id;
            paramResults.push({
              key: id,
              searchText: `${MENUS.Network.en} > ${SECTIONS.MaintenanceServer.en} > ${paramTitle} (${id}) [Hidden]`,
              tab: "Network",
            });
          }
        });
      }

      // Commands 검색 결과 추가 (1020~1023, 1046~1049은 제외)
      const normalizedSearchTerm = searchTerm.toLowerCase().trim();
      Object.entries(commands).forEach(([sectionKey, commandList]) => {
        const matchingCommands = commandList.filter((command) => {
          if (["1020", "1021", "1022", "1023", "1046", "1047", "1048", "1049"].includes(command.id)) return false;
          const fieldValidation = FIELD_VALIDATIONS[command.id];
          if (command.id.toLowerCase().includes(normalizedSearchTerm)) {
            return true;
          }
          if (!fieldValidation) {
            return false;
          }
          const title = fieldValidation.title?.en || "";
          return title.toLowerCase().includes(normalizedSearchTerm);
        });
        matchingCommands.forEach((command) => {
          const fieldValidation = FIELD_VALIDATIONS[command.id];
          if (fieldValidation) {
            const isHidden = hiddenParameterId.includes(command.id);
            if (isHidden && hiddenParameter) {
              return;
            }
            // sectionKey 예: 'geofenceCommands' → SECTIONS.GeofenceCommands.en
            const sectionName = SECTIONS[
              sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1)
            ]?.en || sectionKey;
            paramResults.push({
              key: command.id,
              searchText: `Commands > ${sectionName} > ${fieldValidation.title?.en || command.id} (${command.id})${isHidden ? ' [Hidden]' : ''}`,
              tab: "Commands",
            });
          }
        });
      });

      // Geofence 메뉴에 9000~9002 강제 추가
      const geofenceIds = ["9000", "9001", "9002"];
      geofenceIds.forEach((id) => {
        if (
          id === searchTerm.trim()
        ) {
          const paramTitle = FIELD_VALIDATIONS[id]?.title?.en || id;
          if (!paramResults.some((r) => r.key === id && r.tab === "Geofence")) {
            paramResults.push({
              key: id,
              searchText: `${MENUS.Geofence.en} > ${paramTitle} (${id})`,
              tab: "Geofence",
            });
          }
        }
      });

      console.log("Final param results:", paramResults);
      setSearchParamResults(paramResults);
    }
  }, [searchTerm]);

  return (
    <Stack className={styles.search}>
      <Stack
        direction="row"
        sx={{
          width: "calc(100% + 40px)",
          padding: "20px 60px 20px 20px",
          transform: "translate(-20px, 0)",
          borderBottom: "1px solid var(--grey4)",
        }}
      >
        <TextField
          autoFocus
          value={searchTerm}
          onChange={handleSearchTermChange}
          fullWidth
          placeholder={t("gnb.pw_set.search")}
          InputProps={{
            endAdornment: (
              <Stack direction="row">
                {searchTerm && (
                  <IconButton
                    onClick={() => {
                      handleSearchTermChange({
                        target: { value: "" },
                      } as React.ChangeEvent<HTMLInputElement>);
                    }}
                    sx={{ width: 28, height: 28 }}
                  >
                    <CancelOutlinedIcon />
                  </IconButton>
                )}
                <IconButton sx={{ width: 28, height: 28 }}>
                  <SearchOutlinedIcon />
                </IconButton>
              </Stack>
            ),
          }}
        />
      </Stack>
      {/* 고정 height 값 500 + 서치하는 텍스트 영역은 상단으로 고정 */}
      <Stack height={500} overflow="auto">
        {searchTerm && (
          <>
            {searchTerm && (
              <Stack py={2} alignItems="flex-end" gap="16px">
                <Stack width="100%">{renderSearchResults()}</Stack>
              </Stack>
            )}
          </>
        )}
      </Stack>
    </Stack>
  );
}

// 검색 결과 아이템 컴포넌트
const SearchResultItem = ({ result, onSelect }) => (
  <li onClick={() => onSelect(result)}>
    <div className={styles.subTitle}>{result.searchText}</div>
  </li>
);

// 빈 결과 컴포넌트
const EmptyResults = () => {
  const t = useTranslations("configuration");
  return (
    <Stack
      height="100%"
      alignItems="center"
      justifyContent="center"
      color="var(--grey5)"
      py={10}
    >
      {t("search_bar.no_results_found")}
    </Stack>
  );
};
