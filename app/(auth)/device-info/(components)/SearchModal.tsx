import { Button, IconButton, Stack, TextField } from "@mui/material";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { SearchField, SearchFields } from "constants/searchField";

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
          return key
            .toLowerCase()
            .replaceAll(" ", "")
            .includes(searchTerm.toLowerCase().replaceAll(" ", ""));
        }
      );

      paramResultsEntries.forEach(([key, value]) => {
        paramResults.push({
          key: value.field,
          searchText: value.searchText,
          tab: value.tab,
        });
      });
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
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          placeholder={t("gnb.pw_set.search")}
          InputProps={{
            endAdornment: (
              <Stack direction="row">
                {searchTerm && (
                  <IconButton
                    onClick={() => {
                      setSearchTerm("");
                      setShowAllParamResult(false);
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
