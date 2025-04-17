import { useRef, useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";
import useSerial from "@/src/hooks/useSerial";
import { useTranslations } from "next-intl";
import useSerialConfigurationStore from "@/src/stores/useSerialConfigurationStore";
import { Stack, TextField, IconButton, Button } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

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

function SearchConfigurationModal({ onClose }: { onClose: () => void }) {
  const t = useTranslations();
  const router = useRouter();
  const searchRef = useRef<HTMLInputElement>();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const { getCurrentImei, setTab } = useSerialConfigurationStore();
  const currentImei = getCurrentImei();
  const [showAllResult, setShowAllResult] = useState(false);

  // categorizedParams는 이전에 만든 데이터
  useEffect(() => {
    if (searchTerm.trim()) {
      const results = searchParameters(searchTerm, categorizedParams[0]);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const {
    state: { portList },
  } = useSerial();

  const categorizedParams = portList
    .filter(({ imei }) => imei === currentImei)
    .map(({ packageToJson }) => {
      const synctrakData = packageToJson.synctrak;

      return Object.entries(synctrakData).reduce((acc, [_, value]) => {
        if (value && typeof value === "object") {
          Object.entries(value).forEach(([category, params]) => {
            if (params && typeof params === "object" && category !== "info") {
              // params가 배열인 경우 각 객체의 키 값을 가져옴

              const paramKeys = Array.isArray(params)
                ? params
                    .filter((param) => !param.info) // info 객체 제외
                    .map((param) => Object.keys(param)[0]) // 각 객체의 첫 번째 키를 가져옴
                    .map((key) => key.split("(")[0].trim()) // 괄호 이전의 텍스트만 사용
                : [];

              if (paramKeys.length > 0) {
                acc[category] = paramKeys;
              }
            }
          });
        }
        return acc;
      }, {});
    });

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
                  setTab("geofence");
                  router.push("/configuration/geofence");
                } else {
                  router.push("/configuration");
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

export default SearchConfigurationModal;

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
