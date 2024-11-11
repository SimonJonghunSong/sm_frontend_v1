import { useMemo, useState } from "react";

interface Props {
  rows: any[];
  defaultPage?: number;
  limit?: number;
}

const DEFAULT_LIMIT = 10;

/**
 *
 * @param param0 rows: 데이터 배열, defaultPage: 초기 페이지, limit: 페이지 단위
 * @returns paginatedRows: 페이지네이션 된 데이터 배열, page: 현 페이지, handleChangePage: 페이지 변경, pageCount: 페이지 사이즈
 */
export default function useCustomPagination({
  rows,
  defaultPage = 1,
  limit = DEFAULT_LIMIT,
}: Props) {
  const [page, setPage] = useState(defaultPage);
  const pageCount = useMemo(
    () => rows.length / limit + (rows.length % limit ? 1 : 0),
    [rows]
  );

  const paginatedRows = useMemo(() => {
    return (rows || []).filter((item, index) => {
      const startIndex = limit * (page - 1);
      const endIndex = startIndex + limit;

      return startIndex <= index && index < endIndex;
    });
  }, [rows, page]);

  const handleChangePage = (value: number) => {
    setPage(value);
  };

  return { paginatedRows, page, handleChangePage, pageCount };
}
