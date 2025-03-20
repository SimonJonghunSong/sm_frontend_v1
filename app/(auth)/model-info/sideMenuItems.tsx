import StorageIcon from "@mui/icons-material/Storage";
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
import KeyboardCommandKeyOutlinedIcon from "@mui/icons-material/KeyboardCommandKeyOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import SyncOutlinedIcon from "@mui/icons-material/SyncOutlined";

export const getSideMenuIcon = (name: string) => {
  switch (name) {
    case "Device Status":
      return <StackedBarChartOutlinedIcon />;
    case "Network":
      return <WifiOutlinedIcon />;
    case "System":
      return <SettingsApplicationsOutlinedIcon />;
    case "Report":
      return <InsertChartOutlinedIcon />;
    case "Tracking":
      return <PinDropOutlinedIcon />;
    case "Input/Output(I/O)":
      return <CompareArrowsOutlinedIcon />;
    case "Geofence":
      return <HexagonOutlinedIcon />;
    case "BLE":
      return <BluetoothOutlinedIcon />;
    case "Accessories":
      return <FlareOutlinedIcon />;
    case "RF":
      return <PodcastsOutlinedIcon />;
    case "Commands":
      return <KeyboardCommandKeyOutlinedIcon />;
    case "Edit Profile":
      return <ModeEditOutlineOutlinedIcon />;
    case "F/W Update":
      return <SyncOutlinedIcon />;
    default:
      return null;
  }
};
