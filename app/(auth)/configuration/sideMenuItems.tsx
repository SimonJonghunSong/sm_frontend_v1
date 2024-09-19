import StorageIcon from "@mui/icons-material/Storage";
import StackedBarChartOutlinedIcon from '@mui/icons-material/StackedBarChartOutlined';
import WifiOutlinedIcon from '@mui/icons-material/WifiOutlined';
import SettingsApplicationsOutlinedIcon from '@mui/icons-material/SettingsApplicationsOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import FlareOutlinedIcon from '@mui/icons-material/FlareOutlined';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import HexagonOutlinedIcon from '@mui/icons-material/HexagonOutlined';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import DriverIcon from "/public/images/driver.svg"
import Image from "next/image";
import BluetoothOutlinedIcon from '@mui/icons-material/BluetoothOutlined';
import PodcastsOutlinedIcon from '@mui/icons-material/PodcastsOutlined';
import KeyboardCommandKeyOutlinedIcon from '@mui/icons-material/KeyboardCommandKeyOutlined';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';

export const sideMenuItems = [
  { name: "Device Status", href: "/configuration/device-status", icon: () => <StackedBarChartOutlinedIcon /> },
  { name: "Network", href: "/configuration/network", icon: () => <WifiOutlinedIcon /> },
  { name: "System", href: "/configuration/system", icon: () => <SettingsApplicationsOutlinedIcon /> },
  { name: "Report", href: "/configuration/report", icon: () => <InsertChartOutlinedIcon /> },
  { name: "Accessories", href: "/configuration/accessories", icon: () => <FlareOutlinedIcon /> },
  { name: "Input/Output(I/O)", href: "/configuration/input-output", icon: () => <CompareArrowsOutlinedIcon /> },
  { name: "Geofence", href: "/configuration/geofence", icon: () => <HexagonOutlinedIcon /> },
  { name: "Tracking", href: "/configuration/tracking", icon: () => <PinDropOutlinedIcon /> },
  { name: "Driver", href: "/configuration/driver", icon: () => <Image src={DriverIcon} alt="DriverIcon"/> },
  { name: "Bluetooth", href: "/configuration/bluetooth", icon: () => <BluetoothOutlinedIcon /> },
  { name: "RF", href: "/configuration/rf", icon: () => <PodcastsOutlinedIcon /> },
  { name: "Commands", href: "/configuration/commands", icon: () => <KeyboardCommandKeyOutlinedIcon /> },
  // { name: "Profile", href: "/configuration/profile", icon: () => <PendingOutlinedIcon /> },
];
