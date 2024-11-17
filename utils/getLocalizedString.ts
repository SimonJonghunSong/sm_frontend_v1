export default function getLocalizedString(
  lang: "en" | "pt" | "es",
  enString: string,
  ptString: string,
  esString: string
) {
  switch (lang) {
    case "en":
      return enString;
    case "pt":
      return ptString;
    case "es":
      return esString;
  }
}
