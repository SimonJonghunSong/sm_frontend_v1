export const generateFormattedIndexesUpperTo30 = (
  count: number,
  defaultIndex: number
): string[] => {
  return Array.from({ length: count }, (_, index) =>
    (index + defaultIndex).toString().padStart(4, "0")
  );
};
export const generateFormattedIndexes = (count: number): string[] => {
  return Array.from({ length: count }, (_, index) =>
    index.toString().padStart(2, "0")
  );
};

// 각 대표 인덱스와 서브 인덱스 개수
const indexData: {
  mainIndex: number;
  subIndexCount: number;
  startSubIndex: number;
}[] = [
  { mainIndex: 50, subIndexCount: 75, startSubIndex: 25 },
  { mainIndex: 51, subIndexCount: 100, startSubIndex: 0 },
  { mainIndex: 52, subIndexCount: 80, startSubIndex: 0 },
  { mainIndex: 91, subIndexCount: 100, startSubIndex: 0 },
  { mainIndex: 92, subIndexCount: 100, startSubIndex: 0 },
  { mainIndex: 93, subIndexCount: 100, startSubIndex: 0 },
  { mainIndex: 94, subIndexCount: 100, startSubIndex: 0 },
  { mainIndex: 95, subIndexCount: 100, startSubIndex: 0 },
  { mainIndex: 96, subIndexCount: 100, startSubIndex: 0 },
  { mainIndex: 97, subIndexCount: 100, startSubIndex: 0 },
  { mainIndex: 98, subIndexCount: 44, startSubIndex: 0 },
];

// 숫자를 넣으면 해당하는 대표 인덱스와 서브 인덱스를 반환하는 함수
export const findCircleIndexByNumber = (num: number): string | null => {
  let accumulatedCount = 0;

  for (const data of indexData) {
    // 현재 대표 인덱스가 포함하는 서브 인덱스 범위에 속하는지 확인
    if (num < accumulatedCount + data.subIndexCount) {
      const subIndex = num - accumulatedCount + data.startSubIndex;
      return `${data.mainIndex};${subIndex.toString().padStart(2, "0")}`;
    }
    accumulatedCount += data.subIndexCount;
  }

  return null; // 숫자가 범위를 벗어난 경우
};
