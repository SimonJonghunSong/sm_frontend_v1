export function hexToBinaryStringGrouped(hex: string): string {
  // 1. 전체 16진수 문자열을 2진수 문자열로 변환
  const binary = hex
    .split("")
    .map((char) => parseInt(char, 16).toString(2).padStart(4, "0")) // 각 16진수 문자 -> 4자리 2진수
    .join("");

  // 2. 8자리씩 끊어서 그룹화, 마지막 그룹이 부족하면 0으로 패딩
  const paddedBinary = binary.padEnd(Math.ceil(binary.length / 8) * 8, "0");

  const chunks: string[] = [];
  for (let i = 0; i < paddedBinary.length; i += 8) {
    chunks.push(paddedBinary.slice(i, i + 8));
  }

  return chunks.join(" ");
}

export function padZerosWithSpaces(totalLength: number): string {
  if (totalLength <= 0) return "00000000";

  // 전체 길이만큼 0 채움
  const zeros = "0".repeat(totalLength);

  // 8자리씩 잘라서 배열에 담음
  const chunks = [];
  for (let i = 0; i < totalLength; i += 8) {
    chunks.push(zeros.slice(i, i + 8));
  }

  for (let i = chunks[chunks.length - 1].length; i < 8; i++) {
    chunks[chunks.length - 1] += "0";
  }

  return chunks.join(" ");
}

export function binaryStringGroupedToHex(binaryGrouped: string): string {
  // 1. 공백 제거하여 하나의 이진 문자열로 만듦
  const binary = binaryGrouped.replace(/\s+/g, "");

  // 2. 4자리씩 끊어서 16진수로 변환
  const hexChunks: string[] = [];
  for (let i = 0; i < binary.length; i += 4) {
    const nibble = binary.slice(i, i + 4);
    const hexDigit = parseInt(nibble, 2).toString(16);
    hexChunks.push(hexDigit);
  }

  return hexChunks.join("");
}

// DeviceForm 데이터 형태를 { [number]: value } 형태의 객체로 변환
export function extractKeyValueMap(a: any): Record<string, string> {
  const result: Record<string, string> = {};

  a.forEach((tab) => {
    tab.fields.forEach((field) => {
      switch (field.type) {
        case "combo":
          const target = field.options.find(
            (option) => option.value === field.value
          );

          result[field.number] =
            Number(target?.realValue) < 10
              ? `0${target?.realValue}`
              : target?.realValue;
          break;
        case "edit+button":
          console.log("field TTT ::::", field);
          result[field.number] = hexToBinaryStringGrouped(field.value);
          break;
        default:
          result[field.number] = field.value;
          break;
      }
    });
  });

  return result;
}

// DeviceForm 데이터 형태를 ModleInfo 데이터 형태로 오버라이딩
export function extractJsonIdValueMap(b: any, a: Record<string, string>) {
  return b.map((field) => {
    if (a[field.JSON_ID]) {
      return {
        ...field,
        DEFAULT_VALUE: a[field.JSON_ID],
        value: a[field.JSON_ID],
      };
    }
    return field;
  });
}
