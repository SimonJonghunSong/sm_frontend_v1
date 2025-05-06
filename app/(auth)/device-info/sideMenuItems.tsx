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
import MonitorOutlinedIcon from "@mui/icons-material/MonitorOutlined";

export const sideMenuItems = ({
  onClick,
  tab,
}: {
  onClick: (tab: string) => void;
  tab: string;
}) => [
  {
    name: "Device Status",
    href: "/device-info/device-status",
    isActive: tab === "Device Status",
    icon: () => <StackedBarChartOutlinedIcon />,
  },
  {
    name: "Network",
    href: "#",
    isActive: tab === "Network",
    icon: () => <WifiOutlinedIcon />,
    onClick: () => onClick("Network"),
  },
  {
    name: "System",
    href: "#",
    isActive: tab === "System",
    icon: () => <SettingsApplicationsOutlinedIcon />,
    onClick: () => onClick("System"),
  },
  {
    name: "Report",
    href: "#",
    isActive: tab === "Report",
    icon: () => <InsertChartOutlinedIcon />,
    onClick: () => onClick("Report"),
  },
  {
    name: "Accessories",
    href: "#",
    isActive: tab === "Accessories",
    icon: () => <FlareOutlinedIcon />,
    onClick: () => onClick("Accessories"),
  },
  {
    name: "Input/Output(I/O)",
    href: "#",
    isActive: tab === "Input/Output(I/O)",
    icon: () => <CompareArrowsOutlinedIcon />,
    onClick: () => onClick("Input/Output(I/O)"),
  },
  {
    name: "Geofence",
    href: "/device-info/geofence",
    isActive: tab === "Geofence",
    icon: () => <HexagonOutlinedIcon />,
  },
  {
    name: "Tracking",
    href: "#",
    isActive: tab === "Tracking",
    icon: () => <PinDropOutlinedIcon />,
    onClick: () => onClick("Tracking"),
  },
  {
    name: "Driver",
    href: "#",
    isActive: tab === "Driver",
    icon: () => <Image src={DriverIcon} alt="DriverIcon" />,
    onClick: () => onClick("Driver"),
  },
  {
    name: "Bluetooth",
    href: "#",
    isActive: tab === "Bluetooth",
    icon: () => <BluetoothOutlinedIcon />,
    onClick: () => onClick("Bluetooth"),
  },
  {
    name: "RF",
    href: "#",
    isActive: tab === "RF",
    icon: () => <PodcastsOutlinedIcon />,
    onClick: () => onClick("RF"),
  },
  {
    name: "Commands",
    href: "#",
    isActive: tab === "Commands",
    icon: () => <KeyboardCommandKeyOutlinedIcon />,
    onClick: () => onClick("Commands"),
  },
  {
    name: "CMD Tool",
    href: "#",
    isActive: tab === "CMD Tool",
    icon: () => <MonitorOutlinedIcon />,
    onClick: () => onClick("CMD Tool"),
  },
];
