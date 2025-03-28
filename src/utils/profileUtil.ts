import { ModelConfig } from "@/src/api/services/model/type";

interface ProfileEntry {
  hdr: string;
  prefix: string;
  entries: {
    suffix: string;
    value: string;
  }[];
}

const MAX_PARAMETERS_PER_LINE = 20;

export const convertModelConfigToProfile = (
  configs: (ModelConfig & { data?: string })[]
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

    acc[config.hdr].entries.push({
      suffix,
      value: config.data || config.DEFAULT_VALUE || "",
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

  return profileLines.join("\n");
};
