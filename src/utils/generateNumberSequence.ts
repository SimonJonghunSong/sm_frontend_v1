/**
 * 숫자 시퀀스를 생성하는 함수
 * @param totalCount 생성할 총 숫자 개수
 * @returns 20개씩 묶인 숫자 배열의 배열 (각 숫자는 2자리 문자열 형식)
 */
export const generateNumberSequence = (totalCount: number): string[][] => {
  const result: string[][] = [];
  let currentBatch: string[] = [];

  for (let i = 0; i < totalCount; i++) {
    // 2자리 숫자 문자열로 변환 (00, 01, 02, ...)
    const numberStr = i.toString().padStart(2, "0");
    currentBatch.push(numberStr);

    // 20개가 모이면 새로운 배치 시작
    if (currentBatch.length === 20) {
      result.push(currentBatch);
      currentBatch = [];
    }
  }

  // 마지막 배치에 남은 숫자들 추가
  if (currentBatch.length > 0) {
    result.push(currentBatch);
  }

  return result;
};

// 사용 예시:
// const sequences = generateNumberSequence(45);
// 결과:
// [
//   ['00', '01', '02', ..., '19'],
//   ['20', '21', '22', ..., '39'],
//   ['40', '41', '42', '43', '44']
// ]
