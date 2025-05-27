import { ModelConfigWithData } from "@/src/api/services/model/type";

interface ProfileEntry {
  hdr: string;
  prefix: string;
  entries: {
    suffix: string;
    value: string;
  }[];
}

const MAX_PARAMETERS_PER_LINE = 20;

const formatValue = (value: string | number): string => {
  if (!value) return "";
  // 줄 바꿈을 공백으로 변환하고 연속된 공백을 하나로 통일
  const formattedValue = value
    .toString()
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  // 숫자인 경우에만 처리 (음수 부호가 있는 경우도 고려)
  if (/^-?\d+$/.test(formattedValue)) {
    // 음수 부호가 있는 경우 처리
    if (formattedValue.startsWith("-")) {
      return "-" + formattedValue.slice(1).padStart(2, "0");
    }
    return formattedValue.padStart(2, "0");
  }

  return formattedValue;
};

const formatSuffix = (suffix: string): string => {
  // 숫자인 경우에만 처리
  if (/^\d+$/.test(suffix)) {
    // 한 자리 숫자인 경우 앞에 0 추가
    return suffix.padStart(2, "0");
  }
  return suffix;
};

export const convertModelConfigToProfile = (
  configs: ModelConfigWithData[],
  modelName: string,
  version: string
): string => {
  // hdr이 있는 항목들만 필터링
  const hdrConfigs = configs.filter((config) => config.hdr && config.JSON_ID);

  // hdr별로 그룹화
  const groupedConfigs = hdrConfigs.reduce((acc, config) => {
    if (!config.hdr) return acc;

    const prefix = config.JSON_ID?.slice(0, 2) || "";
    const suffix = config.JSON_ID?.slice(2) || "";

    if (!acc[config.hdr]) {
      acc[config.hdr] = {
        hdr: config.hdr,
        prefix,
        entries: [],
      };
    }

    const value = config.value || "";
    acc[config.hdr].entries.push({
      suffix: formatSuffix(suffix),
      value: formatValue(value),
    });

    return acc;
  }, {} as Record<string, ProfileEntry>);

  // 프로파일 형식으로 변환
  const profileLines = Object.values(groupedConfigs).flatMap((group) => {
    const lines: string[] = [];
    const entries = [...group.entries];

    while (entries.length > 0) {
      const currentEntries = entries.splice(0, MAX_PARAMETERS_PER_LINE);
      const firstEntry = currentEntries[0];

      const baseLine = `${group.hdr},PRG;;${group.prefix};${firstEntry.suffix}#${firstEntry.value}`;

      if (currentEntries.length === 1) {
        lines.push(baseLine);
      } else {
        const additionalEntries = currentEntries
          .slice(1)
          .map((entry) => `${entry.suffix}#${entry.value}`)
          .join(";");

        lines.push(`${baseLine};${additionalEntries}`);
      }
    }

    return lines;
  });

  // MODEL과 VERSION 정보를 파일 시작 부분에 추가
  const header = `MODEL=${modelName}\nVERSION=${version}\n`;
  return header + profileLines.join("\n");
};

function getFormattedTimestamp() {
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, "0");
  return (
    now.getFullYear().toString() +
    pad(now.getMonth() + 1) +
    pad(now.getDate()) +
    pad(now.getHours()) +
    pad(now.getMinutes()) +
    pad(now.getSeconds())
  );
}

function calculateCRC16(buffer: Uint8Array): string {
  let crc = 0xffff;
  for (let i = 0; i < buffer.length; i++) {
    crc ^= buffer[i] << 8;
    for (let j = 0; j < 8; j++) {
      crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
      crc &= 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

export async function generateFilename(
  file: File,
  model: string,
  version: string
) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  const timestamp = getFormattedTimestamp();
  const crc16 = calculateCRC16(buffer);

  return `${model}_${version}_${timestamp}_${crc16}.profile`;
}
