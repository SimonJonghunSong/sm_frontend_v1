type CommandsSection =
  | "networkCommands"
  | "systemCommands"
  | "jammingDetectionCommands"
  | "reportCommands"
  | "trackingCommands"
  | "ioCommands"
  | "geofenceCommands"
  | "bleCommands"
  | "accessoryCommands"
  | "rfCommands";

type CommandsUIType =
  | "normal"
  | "select"
  | "text-input"
  | "number-input"
  | "time-range"
  | "Automati-APN-List"
  | "PIN-Lock"
  | "PIN-Unlock"
  | "Main-Server"
  | "LTE-Band"
  | "Detection-Control-Speed";

export const commands: Record<
  CommandsSection,
  { id: string; uiType: CommandsUIType }[]
> = {
  networkCommands: [
    {
      id: "0101",
      uiType: "normal",
    },
    {
      id: "0102",
      uiType: "normal",
    },
    {
      id: "0103",
      uiType: "normal",
    },
    {
      id: "0104",
      uiType: "normal",
    },
    {
      id: "0901",
      uiType: "normal",
    },
    {
      id: "0902",
      uiType: "normal",
    },
    {
      id: "0903",
      uiType: "normal",
    },
    {
      id: "0904",
      uiType: "normal",
    },
    {
      id: "0905",
      uiType: "normal",
    },
    {
      id: "0907",
      uiType: "normal",
    },
    {
      id: "0105",
      uiType: "normal",
    },
    {
      id: "0121",
      uiType: "Automati-APN-List",
    },
    {
      id: "0121-01", // Delete APN List 중복 ID 입니다....
      uiType: "normal",
    },
    {
      id: "0201",
      uiType: "normal",
    },
    {
      id: "0202",
      uiType: "text-input",
    },
    {
      id: "0203",
      uiType: "normal",
    },
    {
      id: "0107",
      uiType: "normal",
    },
    {
      id: "0108",
      uiType: "text-input",
    },
    {
      id: "0109",
      uiType: "normal",
    },
    {
      id: "0113",
      uiType: "PIN-Lock",
    },
    {
      id: "0114",
      uiType: "PIN-Unlock",
    },
    {
      id: "0114-1",
      uiType: "normal", // 0114 PIN Lock Status 중복..
    },
    {
      id: "0115",
      uiType: "number-input",
    },
    {
      id: "0116",
      uiType: "number-input",
    },
    {
      id: "0117",
      uiType: "normal",
    },
    {
      id: "0118",
      uiType: "Main-Server",
    },
    {
      id: "0119",
      uiType: "number-input",
    },
    {
      id: "0204",
      uiType: "select",
    },
    {
      id: "0205",
      uiType: "normal",
    },
    {
      id: "0504",
      uiType: "normal",
    },
    {
      id: "0714",
      uiType: "select",
    },
    {
      id: "0715",
      uiType: "normal",
    },
    {
      id: "0122",
      uiType: "LTE-Band",
    },
    {
      id: "0735",
      uiType: "select",
    },
    {
      id: "0736",
      uiType: "normal",
    },
    {
      id: "0521",
      uiType: "select",
    },
    {
      id: "0522",
      uiType: "number-input",
    },
    {
      id: "0922",
      uiType: "select",
    },
  ],
  systemCommands: [
    { id: "0721", uiType: "normal" },
    { id: "0302", uiType: "normal" },
    { id: "0731", uiType: "select" },
    { id: "0732", uiType: "normal" },
    { id: "0771", uiType: "select" },
    { id: "0772", uiType: "normal" },
    { id: "0509", uiType: "select" },
    { id: "0510", uiType: "normal" },
    { id: "0511", uiType: "select" },
    { id: "0512", uiType: "normal" },
    { id: "0724", uiType: "select" },
    { id: "0530", uiType: "number-input" },
    { id: "0533", uiType: "normal" },
    { id: "0584", uiType: "select" },
    { id: "0584-1", uiType: "normal" },
    { id: "0700", uiType: "select" },

    { id: "0712", uiType: "normal" },
    { id: "0713", uiType: "normal" },
    { id: "0753", uiType: "number-input" },
    { id: "0754", uiType: "normal" },
    { id: "0580", uiType: "normal" },
    { id: "0581", uiType: "normal" },
    { id: "0582", uiType: "normal" },
    { id: "0583", uiType: "normal" },
    { id: "0110", uiType: "text-input" },
    { id: "0111", uiType: "text-input" },
    { id: "0908", uiType: "number-input" },
    { id: "0909", uiType: "normal" },
    { id: "0916", uiType: "select" },
    { id: "0921", uiType: "select" },
  ],
  jammingDetectionCommands: [
    { id: "0740", uiType: "number-input" },
    { id: "0741", uiType: "number-input" },
    { id: "0742", uiType: "number-input" },
    { id: "0743", uiType: "number-input" },
    { id: "0744", uiType: "number-input" },
    { id: "0745", uiType: "number-input" },
    { id: "0746", uiType: "number-input" },
    { id: "0769", uiType: "number-input" },
    { id: "0906", uiType: "normal" },
    { id: "0777", uiType: "number-input" },
    { id: "0779", uiType: "select" },
    { id: "0793", uiType: "number-input" },
    { id: "0794", uiType: "number-input" },
    { id: "0795", uiType: "number-input" },
    { id: "0796", uiType: "number-input" },
    { id: "0798", uiType: "number-input" },
  ],
  reportCommands: [
    { id: "0301", uiType: "normal" },
    { id: "0305", uiType: "normal" },
    { id: "0306", uiType: "text-input" },
    { id: "0426", uiType: "Detection-Control-Speed" },
    { id: "0502", uiType: "normal" },
    { id: "0503", uiType: "number-input" },
    { id: "0505", uiType: "number-input" },
    { id: "0791", uiType: "normal" },
    { id: "0792", uiType: "normal" },
    { id: "0507", uiType: "normal" },
    { id: "0508", uiType: "normal" },
    { id: "0910-1", uiType: "select" },
    { id: "0912", uiType: "normal" },
    { id: "0913", uiType: "normal" },
  ],
  trackingCommands: [
    { id: "0514", uiType: "normal" },
    { id: "0534", uiType: "normal" },
    { id: "0585", uiType: "normal" },
    { id: "0733", uiType: "normal" },
    { id: "0516", uiType: "normal" },
    { id: "0529", uiType: "normal" },
  ],
  ioCommands: [
    { id: "0411", uiType: "select" },
    { id: "0412", uiType: "normal" },
    { id: "0420", uiType: "select" },
    { id: "0427", uiType: "normal" },
    { id: "0429", uiType: "normal" },
    { id: "0430", uiType: "normal" },
    { id: "0738", uiType: "select" },
    { id: "0739", uiType: "normal" },
    { id: "0729", uiType: "time-range" },
    { id: "0730", uiType: "normal" },
    { id: "0755", uiType: "select" },
    { id: "0425", uiType: "select" },
    { id: "0425-1", uiType: "normal" },
    { id: "0428", uiType: "select" },
    { id: "0749", uiType: "select" },
    { id: "0750", uiType: "number-input" },
    { id: "0422", uiType: "number-input" },
    { id: "0423", uiType: "number-input" },
    { id: "0424", uiType: "select" },
    { id: "0716", uiType: "select" },
    { id: "0717", uiType: "normal" },
    { id: "0751", uiType: "select" },
    { id: "0752", uiType: "normal" },
    { id: "1046", uiType: "select" },
    { id: "1047", uiType: "number-input" },
    { id: "1048", uiType: "number-input" },
    { id: "1049", uiType: "number-input" },
  ],
  geofenceCommands: [
    { id: "0596", uiType: "normal" },
    { id: "0517", uiType: "normal" },
    { id: "0519", uiType: "text-input" },
    { id: "0518", uiType: "text-input" },
    { id: "0727", uiType: "select" },
    { id: "0734", uiType: "select" },
  ],
  bleCommands: [{ id: "0513", uiType: "normal" }],
  accessoryCommands: [
    { id: "0610", uiType: "select" },
    { id: "0620", uiType: "normal" },
    { id: "0621", uiType: "normal" },
    { id: "0622", uiType: "normal" },
    { id: "0623", uiType: "normal" },
    { id: "0624", uiType: "normal" },
    { id: "0501", uiType: "normal" },
    { id: "0758", uiType: "text-input" },
    { id: "0759-62", uiType: "normal" },
    { id: "0763-66", uiType: "normal" },
    { id: "0772", uiType: "select" },
    { id: "0797", uiType: "select" },
  ],
  rfCommands: [
    { id: "0718", uiType: "normal" },
    { id: "0710", uiType: "number-input" },
    { id: "0711", uiType: "normal" },
    { id: "0719", uiType: "normal" },
    { id: "0773", uiType: "normal" },
    { id: "0774", uiType: "normal" },
    { id: "0775", uiType: "normal" },
    { id: "0776", uiType: "text-input" },
    { id: "0782", uiType: "normal" },
    { id: "0789", uiType: "select" },
    { id: "0790", uiType: "normal" },
    { id: "0783", uiType: "select" },
    { id: "0784", uiType: "normal" },
    { id: "0785", uiType: "select" },
    { id: "0786", uiType: "select" },
    { id: "0788", uiType: "normal" },
  ],
};
