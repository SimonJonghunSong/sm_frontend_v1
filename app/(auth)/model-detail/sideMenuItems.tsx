import StorageIcon from "@mui/icons-material/Storage";
import StackedBarChartOutlinedIcon from "@mui/icons-material/StackedBarChartOutlined";
import WifiOutlinedIcon from "@mui/icons-material/WifiOutlined";
import SettingsApplicationsOutlinedIcon from "@mui/icons-material/SettingsApplicationsOutlined";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import FlareOutlinedIcon from "@mui/icons-material/FlareOutlined";
import CompareArrowsOutlinedIcon from "@mui/icons-material/CompareArrowsOutlined";
import HexagonOutlinedIcon from "@mui/icons-material/HexagonOutlined";
import PinDropOutlinedIcon from "@mui/icons-material/PinDropOutlined";
import DriverIcon from "/public/images/driver.svg";
import Image from "next/image";
import BluetoothOutlinedIcon from "@mui/icons-material/BluetoothOutlined";
import PodcastsOutlinedIcon from "@mui/icons-material/PodcastsOutlined";
import KeyboardCommandKeyOutlinedIcon from "@mui/icons-material/KeyboardCommandKeyOutlined";
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined";

export const sideMenuItems = [
  {
    name: "Device Status",
    href: "/model-detail/device-status",
    icon: () => <StackedBarChartOutlinedIcon />,
  },
  {
    name: "Network",
    href: "/model-detail/network",
    icon: () => <WifiOutlinedIcon />,
  },
  {
    name: "System",
    href: "/model-detail/system",
    icon: () => <SettingsApplicationsOutlinedIcon />,
  },
  {
    name: "Report",
    href: "/model-detail/report",
    icon: () => <InsertChartOutlinedIcon />,
  },
  {
    name: "Tracking",
    href: "/model-detail/tracking",
    icon: () => <PinDropOutlinedIcon />,
  },
  {
    name: "Input/Output(I/O)",
    href: "/model-detail/input-output",
    icon: () => <CompareArrowsOutlinedIcon />,
  },
  {
    name: "Geofence",
    href: "/model-detail/geofence",
    icon: () => <HexagonOutlinedIcon />,
  },
  {
    name: "Bluetooth",
    href: "/model-detail/bluetooth",
    icon: () => <BluetoothOutlinedIcon />,
  },
  {
    name: "Accessories",
    href: "/model-detail/accessories",
    icon: () => <FlareOutlinedIcon />,
  },
  {
    name: "RF",
    href: "/model-detail/rf",
    icon: () => <PodcastsOutlinedIcon />,
  },
  {
    name: "Commands",
    href: "/model-detail/commands",
    icon: () => <KeyboardCommandKeyOutlinedIcon />,
  },
];
