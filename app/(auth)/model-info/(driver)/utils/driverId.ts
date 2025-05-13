import { CR } from "@/src/hooks/useSerial/constant";

type ParsedResult = {
  id: string; // "001", "002", ...
  value: string; // "NoData" or 다른 값
};

function parseMultiLineResponse(input: string): ParsedResult[] {
  // 각 줄로 나누기 (줄바꿈 문자 대응)
  const lines = input.split(CR);

  const groupBaseNumber: Record<number, number> = {
    18: 0,
    38: 100,
    39: 200,
  };

  const results: ParsedResult[] = [];

  lines.forEach((line) => {
    // "RRE;0000000000;" 제거
    const prefixEndIndex = line.indexOf(";", line.indexOf(";") + 1);

    if (prefixEndIndex === -1) {
      return;
    }

    const rest = line.substring(prefixEndIndex + 1);
    const parts = rest.split(";");

    const groupStr = parts[0];
    const pairs = parts.slice(1);

    const group = parseInt(groupStr, 10);
    const baseNumber = groupBaseNumber[group];

    if (baseNumber === undefined) {
      // throw new Error(`Unknown group number: ${group}`);
      return;
    }

    pairs.forEach((pair) => {
      const [indexStr, value] = pair.split("#");
      const index = parseInt(indexStr, 10);
      const number = baseNumber + index + 1;

      results.push({
        id: number.toString().padStart(3, "0"),
        value,
      });
    });
  });

  return results;
}

export default parseMultiLineResponse;
