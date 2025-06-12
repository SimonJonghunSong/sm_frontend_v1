import StackedBarChartOutlinedIcon from "@mui/icons-material/StackedBarChartOutlined";
import WifiOutlinedIcon from "@mui/icons-material/WifiOutlined";
import SettingsApplicationsOutlinedIcon from "@mui/icons-material/SettingsApplicationsOutlined";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import FlareOutlinedIcon from "@mui/icons-material/FlareOutlined";
import CompareArrowsOutlinedIcon from "@mui/icons-material/CompareArrowsOutlined";
import HexagonOutlinedIcon from "@mui/icons-material/HexagonOutlined";
import PinDropOutlinedIcon from "@mui/icons-material/PinDropOutlined";
import BluetoothOutlinedIcon from "@mui/icons-material/BluetoothOutlined";
import PodcastsOutlinedIcon from "@mui/icons-material/PodcastsOutlined";
import { EditOutlined } from "@mui/icons-material";

export const sideMenuItems = ({
  onClick,
  tab,
  exclude = [],
  t
}: {
  onClick: (tab: string) => void;
  tab: string;
  exclude?: string[];
  t: (key: string) => string;
}) =>
  [
    {
      name: t("configuration.side_bar.device_status"),
      href: "#",
      isActive: tab === "DeviceStatus",
      icon: () => <StackedBarChartOutlinedIcon />,
      onClick: () => onClick("DeviceStatus"),
    },
    {
      name: t("configuration.side_bar.network"),
      href: "#",
      isActive: tab === "Network",
      icon: () => <WifiOutlinedIcon />,
      onClick: () => onClick("Network"),
    },
    {
      name: t("configuration.side_bar.system"),
      href: "#",
      isActive: tab === "System",
      icon: () => <SettingsApplicationsOutlinedIcon />,
      onClick: () => onClick("System"),
    },
    {
      name: t("configuration.side_bar.report"),
      href: "#",
      isActive: tab === "Report",
      icon: () => <InsertChartOutlinedIcon />,
      onClick: () => onClick("Report"),
    },
    {
      name: t("configuration.side_bar.accessories"),
      href: "#",
      isActive: tab === "Accessories",
      icon: () => <FlareOutlinedIcon />,
      onClick: () => onClick("Accessories"),
    },
    {
      name: t("configuration.side_bar.input_output_io"),
      href: "#",
      isActive: tab === "Input/Output(I/O)",
      icon: () => <CompareArrowsOutlinedIcon />,
      onClick: () => onClick("Input/Output(I/O)"),
    },
    {
      name: t("configuration.side_bar.geofence"),
      href: "#",
      isActive: tab === "Geofence",
      icon: () => <HexagonOutlinedIcon />,
      onClick: () => onClick("Geofence"),
    },
    {
      name: t("configuration.side_bar.tracking"),
      href: "#",
      isActive: tab === "Tracking",
      icon: () => <PinDropOutlinedIcon />,
      onClick: () => onClick("Tracking"),
    },
    // {
    //   name: "Driver",
    //   href: "#",
    //   isActive: tab === "Driver",
    //   icon: () => <Image src={DriverIcon} alt="DriverIcon" />,
    //   onClick: () => onClick("Driver"),
    // },
    {
        name: t("configuration.side_bar.bluetooth"),
      href: "#",
      isActive: tab === "Bluetooth",
      icon: () => <BluetoothOutlinedIcon />,
      onClick: () => onClick("Bluetooth"),
    },
    {
      name: t("configuration.side_bar.rf"),
      href: "#",
      isActive: tab === "RF",
      icon: () => <PodcastsOutlinedIcon />,
      onClick: () => onClick("RF"),
    },
    {
      name: t("configuration.side_bar.edit_profile"),
      href: "#",
      isActive: tab === "EditProfile",
      icon: () => <EditOutlined />,
      onClick: () => onClick("EditProfile"),
    },
    // {
    //   name: "Commands",
    //   href: "#",
    //   isActive: tab === "Commands",
    //   icon: () => <KeyboardCommandKeyOutlinedIcon />,
    //   onClick: () => onClick("Commands"),
    // },
    // {
    //   name: "CMD Tool",
    //   href: "#",
    //   isActive: tab === "CMD Tool",
    //   icon: () => <MonitorOutlinedIcon />,
    //   onClick: () => onClick("CMD Tool"),
    // },
  ].filter((item) => !exclude.includes(item.name));
