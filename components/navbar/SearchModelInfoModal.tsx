import { useRef, useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { useTranslations } from "next-intl";
import { Stack, TextField, IconButton, Button } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import useModelInfoStore from "@/src/stores/useModelInfo";
import useModelInfoTabStore from "@/src/stores/useModelInfoTabStore";
import { getJsonDataFromIDB } from "@/utils/idbModelUtil";
import { ModelConfigWithData } from "@/src/api/services/model/type";

type SearchResult = {
  category: string;
  parameter: string;
};

// 검색 함수
const searchParameters = (
  searchTerm: string,
  data: Record<string, string[]>
): SearchResult[] => {
  const results: SearchResult[] = [];

  // 대소문자 구분 없이 검색하기 위해 소문자로 변환
  const normalizedSearchTerm = searchTerm.toLowerCase().trim();

  if (!normalizedSearchTerm) return results;

  Object.entries(data).forEach(([category, parameters]) => {
    // 파라미터만 검색
    const matchedParams = parameters.filter((param) =>
      param.toLowerCase().includes(normalizedSearchTerm)
    );

    // 매칭된 파라미터가 있으면 결과에 추가
    matchedParams.forEach((param) => {
      results.push({
        category,
        parameter: param,
      });
    });
  });

  return results;
};

// 디바이스 연결 없이 모델 정보 검색 모달
function SearchModelInfoModal({ onClose }: { onClose: () => void }) {
  const t = useTranslations();
  const searchRef = useRef<HTMLInputElement>();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const { modelName } = useModelInfoStore();
  const { setTab } = useModelInfoTabStore();
  const [showAllResult, setShowAllResult] = useState(false);
  const [categorizedParams, setCategorizedParams] = useState<
    Record<string, string[]>
  >({});

  // IndexedDB에서 모델 데이터 가져오기
  useEffect(() => {
    const fetchModelData = async () => {
      if (!modelName) return;

      try {
        const modelData = (await getJsonDataFromIDB(
          modelName
        )) as ModelConfigWithData[];
        if (!modelData || !Array.isArray(modelData)) return;

        // 데이터를 카테고리별로 분류
        const categorized: Record<string, string[]> = {};

        modelData.forEach((item) => {
          if (item.Depth2 && item.Depth2 !== "Side Bar") {
            const category = item.Depth2;
            const parameter =
              item.TEXT_EN || item.TEXT_ES || item.TEXT_PT || "";

            if (!categorized[category]) {
              categorized[category] = [];
            }

            if (parameter && !categorized[category].includes(parameter)) {
              categorized[category].push(parameter);
            }
          }
        });

        setCategorizedParams(categorized);
      } catch (error) {
        console.error("Error fetching model data from IndexedDB:", error);
      }
    };

    fetchModelData();
  }, [modelName]);

  // 검색어가 변경될 때마다 검색 결과 업데이트
  useEffect(() => {
    if (searchTerm.trim() && Object.keys(categorizedParams).length > 0) {
      const results = searchParameters(searchTerm, categorizedParams);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, categorizedParams]);

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, []);

  // SearchResults 컴포넌트
  const renderSearchResults = () => {
    if (searchResults.length === 0) return <EmptyResults />;

    const displayedResults = searchResults.slice(
      0,
      showAllResult ? searchResults.length : 3
    );

    return (
      <>
        <div className={styles.title}>Parameters</div>
        <ul className={styles.list}>
          {displayedResults.map((result, index) => (
            <SearchResultItem
              key={index}
              result={result}
              onSelect={(result) => {
                if (
                  ["Circular Geofence", "Polygon Geofence"].includes(
                    result.category
                  )
                ) {
                  setTab("Geofence");
                } else {
                  setTab(result.category);
                }
                onClose();
              }}
            />
          ))}
        </ul>
      </>
    );
  };

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
          inputRef={searchRef}
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
                      setShowAllResult(false);
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
                {searchResults.length > 3 && (
                  <Button
                    color="secondary"
                    sx={{ textDecoration: "underline" }}
                    onClick={() => setShowAllResult(!showAllResult)}
                  >
                    {showAllResult
                      ? t("configuration.search_bar.show_less")
                      : t("configuration.search_bar.show_all_result")}
                  </Button>
                )}
              </Stack>
            )}
          </>
        )}
      </Stack>
    </Stack>
  );
}

export default SearchModelInfoModal;

// 검색 결과 아이템 컴포넌트
const SearchResultItem = ({ result, onSelect }) => (
  <li onClick={() => onSelect(result)}>
    <div className={styles.subTitle}>
      {result.category} &gt; {result.parameter}
    </div>
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
