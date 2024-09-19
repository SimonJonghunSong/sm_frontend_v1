"use client";
import styles from "./styles.module.scss";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  LinearProgress,
  MenuItem,
  Pagination,
  PaginationItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import DataTable from "../../../components/dataTable";
import Modal from "../../../components/Modal";
import useModal from "../../../utils/useModal";
import InputBox from "../../../components/inputbox/InputBox";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import DownloadingOutlinedIcon from "@mui/icons-material/DownloadingOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import { SwitchPrimary } from "../../../components/switches";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useAuthStore from "../../../utils/useAuthStore";
import { adminColumns, adminRows, rows } from "./tableData";

const selectNetworkData = [
  { label: "network1", value: "network1" },
  { label: "network2", value: "network2" },
  { label: "network3", value: "network3" },
];

const selectCompanyData = [
  { label: "company1", value: "company1" },
  { label: "company2", value: "company2" },
  { label: "company3", value: "company3" },
];

const selectSortData = [
  { label: "Newest", value: "Newest" },
  { label: "Oldest", value: "Oldest" },
  { label: "A-Z", value: "A-Z" },
];

export default function Model() {
  const columns: GridColDef[] = [
    {
      field: "col1",
      headerName: "Image",
      minWidth: 200,
      headerAlign: "center",
      align: "center",
      renderCell: (params) =>
        params.value && (
          <Stack
            direction="row"
            gap="4px"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <Image src={params.value} alt="thumbnail" width={96} height={96} />
          </Stack>
        ),
    },
    {
      field: "col2",
      headerName: "Model Name",
      minWidth: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "col3",
      headerName: "F/W",
      width: 80,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "col4",
      headerName: "Features",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Stack
          direction="row"
          gap="4px"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          {params?.value.split(",").map((item) => (
            <span key={item} className="chip">
              {item}
            </span>
          ))}
        </Stack>
      ),
    },
    {
      field: "col5",
      headerName: "Configuration",
      width: 180,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <ModelButton
          setRows={setRowData}
          index={rowData.findIndex((item) => item.id === params.row.id)}
          loaded={params.row.loaded}
          toggleLoaded={toggleLoaded}
        />
      ),
    },
    {
      field: "col7",
      headerName: "Date",
      minWidth: 180,
      headerAlign: "center",
      align: "center",
    },
  ];

  const [rowData, setRowData] = useState(rows);
  const [columnData, setColumnData] = useState(columns);

  const [filter, setFilter] = useState<string>("Newest");

  const [viewType, setViewType] = React.useState<string | null>("galleryType");

  const handleViewType = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string | null
  ) => {
    if (newValue !== null) {
      setViewType(newValue);
    }
  };

  const [modal, modalToggle] = useModal();

  const handleSelectChange = (
    e: SelectChangeEvent,
    setState: Dispatch<SetStateAction<string>>
  ) => {
    setState(e.target.value);
  };

  const handleLoadAllModel = () => {
    alert("load all models");
  };

  const handleAddModel = () => {
    modalToggle();
  };

  const [showLoadedModels, setShowLoadedModels] = useState<boolean>(false);

  const toggleShowLoadedModels = () => {
    setShowLoadedModels(!showLoadedModels);
  };

  useEffect(() => {
    if (showLoadedModels) {
      const copyRows = rowData.filter((item) => item.loaded === true);
      console.log("copyRows");
      console.log(copyRows);
      setRowData(copyRows as any);
    } else {
      setRowData(rows);
    }
  }, [showLoadedModels]);

  const toggleLoaded = (index) => {
    const copyRows = [...rowData];
    copyRows[index].loaded = !copyRows[index].loaded;
    setRowData(copyRows as any);
  };

  return (
    <div className="pageWrap">
      <article className="contentWrap">
        <Stack className={styles.head} direction="row">
          <span className={styles.active}>All(31)</span>
          <span>LTE(10)</span>
          <span>BLE(10)</span>
          <span>ADVANCED(7)</span>
          <span>2G(7)</span>
          <span>OBD(7)</span>
          <span>RF(7)</span>
        </Stack>
        <Stack>
          <Stack
            direction="row"
            gap="8px"
            justifyContent="space-between"
            mb="40px"
          >
            <Stack
              direction="row"
              gap="8px"
              justifyContent="space-between"
              alignItems="center"
            >
              <Select
                value={filter}
                onChange={(e) => handleSelectChange(e, setFilter)}
                sx={{ minWidth: 160 }}
              >
                {selectSortData.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </Stack>

            <Stack direction="row" gap="24px" alignItems="center">
              <Button
                color="secondary"
                onClick={handleLoadAllModel}
                startIcon={
                  <DownloadingOutlinedIcon sx={{ color: "var(--grey5)" }} />
                }
              >
                Load All Models
              </Button>

              <FormControlLabel
                sx={{ marginLeft: 0 }}
                control={
                  <SwitchPrimary
                    checked={showLoadedModels}
                    onChange={toggleShowLoadedModels}
                  />
                }
                label={
                  <span style={{ marginLeft: "8px" }}>
                    Show Only Loaded Models
                  </span>
                }
              />
              <ToggleButtonGroup
                value={viewType}
                exclusive
                onChange={handleViewType}
                aria-label="viewType"
              >
                <ToggleButton
                  value="listType"
                  aria-label="listType"
                  size="small"
                >
                  <FormatListBulletedOutlinedIcon />
                </ToggleButton>
                <ToggleButton
                  value="galleryType"
                  aria-label="galleryType"
                  size="small"
                >
                  <GridViewOutlinedIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            </Stack>
          </Stack>

          {viewType === "listType" ? (
            <DataTable
              checkbox={false}
              rows={rowData}
              columns={columnData}
              rowHeight={120}
            />
          ) : (
            <GalleryView
              rows={rowData}
              setRows={setRowData}
              toggleLoaded={toggleLoaded}
            />
          )}
        </Stack>
      </article>

      <Modal
        open={modal}
        toggleOpen={modalToggle}
        title="Add Model"
        confirm={() => {}}
        confirmButtonText="Add"
        width="720px"
      >
        <AddAcountModal />
      </Modal>
    </div>
  );
}

function AddAcountModal() {
  const [role, setRole] = useState<string>("");
  const [company, setCompany] = useState<string>("");

  const handleSelectChange = (
    e: SelectChangeEvent,
    setState: Dispatch<SetStateAction<string>>
  ) => {
    setState(e.target.value);
  };

  const [file, setFile] = useState<File>(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const [imagePreview, setThumbnailPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Stack>
      <InputBox>
        <InputBox.Head>
          <InputBox.Title>
            Image<i>*</i>
          </InputBox.Title>
        </InputBox.Head>
        <InputBox.Body>
          <Stack gap="12px">
            <Stack direction="row" gap="16px" alignItems="flex-end">
              <div className={styles.thumbnail}>
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="preview"
                    width={160}
                    height={160}
                  />
                ) : (
                  <ImageOutlinedIcon
                    sx={{ color: "var(--grey4)", fontSize: 62 }}
                  />
                )}
              </div>
              <Button variant="contained" color="secondary" component="label">
                <input
                  style={{ display: "none" }}
                  type="file"
                  hidden
                  accept=".jpg, .jpeg, .png"
                  onChange={handleImageChange}
                />
                Upload
              </Button>
            </Stack>
            <span className="text-grey-5">
              PNG or JPG only, 1000x1000px recommended, max 5MB
            </span>
          </Stack>
        </InputBox.Body>
      </InputBox>

      <InputBox>
        <InputBox.Head>
          <InputBox.Title>
            Model Name<i>*</i>
          </InputBox.Title>
        </InputBox.Head>
        <InputBox.Body>
          <TextField fullWidth />
        </InputBox.Body>
      </InputBox>

      <InputBox>
        <InputBox.Head>
          <InputBox.Title>
            Country<i>*</i>
          </InputBox.Title>
        </InputBox.Head>
        <InputBox.Body>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue=""
              name="radio-buttons-group"
              row
              sx={{ gap: "24px" }}
            >
              <FormControlLabel value="USA" control={<Radio />} label="USA" />
              <FormControlLabel
                value="LATAM"
                control={<Radio />}
                label="LATAM"
              />
            </RadioGroup>
          </FormControl>
        </InputBox.Body>
      </InputBox>

      <InputBox>
        <InputBox.Head>
          <InputBox.Title>
            Network<i>*</i>
          </InputBox.Title>
        </InputBox.Head>
        <InputBox.Body>
          <FormControl sx={{ width: "100%" }} size="small">
            <Select
              displayEmpty
              renderValue={(v) =>
                v?.length ? (
                  selectNetworkData.find((item) => item.value === v).label
                ) : (
                  <span className="text-grey-5">Select</span>
                )
              }
              value={role}
              onChange={(e) => handleSelectChange(e, setRole)}
            >
              {selectNetworkData.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </InputBox.Body>
      </InputBox>

      <InputBox>
        <InputBox.Head>
          <InputBox.Title>Wireless Technology</InputBox.Title>
        </InputBox.Head>
        <InputBox.Body>
          <FormControl
            sx={{ flexDirection: "row", gap: "10px", flexWrap: "wrap" }}
          >
            <FormControlLabel
              value="Wi-Fi"
              control={<Checkbox />}
              label="Wi-Fi"
            />
            <FormControlLabel value="BLE" control={<Checkbox />} label="BLE" />
            <FormControlLabel value="RF" control={<Checkbox />} label="RF" />
            <FormControlLabel
              value="NB-IoT"
              control={<Checkbox />}
              label="NB-IoT"
            />
          </FormControl>
        </InputBox.Body>
      </InputBox>

      <InputBox>
        <InputBox.Head>
          <InputBox.Title>Features</InputBox.Title>
        </InputBox.Head>
        <InputBox.Body>
          <FormControl
            sx={{ flexDirection: "row", gap: "10px", flexWrap: "wrap" }}
          >
            <FormControlLabel
              value="Advanced"
              control={<Checkbox />}
              label="Advanced"
            />
            <FormControlLabel
              value="Low-cost"
              control={<Checkbox />}
              label="Low-cost"
            />
            <FormControlLabel
              value="Low-power consumption"
              control={<Checkbox />}
              label="Low-power consumption"
            />
            <FormControlLabel
              value="Compact-size"
              control={<Checkbox />}
              label="Compact-size"
            />
            <FormControlLabel
              value="BoxTracker"
              control={<Checkbox />}
              label="BoxTracker"
            />
            <FormControlLabel
              value="Waterproof"
              control={<Checkbox />}
              label="Waterproof"
            />
            <FormControlLabel
              value="Geofence"
              control={<Checkbox />}
              label="Geofence"
            />
            <FormControlLabel
              value="Jamming Detection"
              control={<Checkbox />}
              label="Jamming Detection"
            />
            <FormControlLabel
              value="Accelerometer"
              control={<Checkbox />}
              label="Accelerometer"
            />
            <FormControlLabel
              value="Ignition"
              control={<Checkbox />}
              label="Ignition"
            />
            <FormControlLabel
              value="Solar"
              control={<Checkbox />}
              label="Solar"
            />
            <FormControlLabel value="OBD" control={<Checkbox />} label="OBD" />
          </FormControl>
        </InputBox.Body>
      </InputBox>

      <InputBox>
        <InputBox.Head>
          <InputBox.Title>
            Setting File<i>*</i>
          </InputBox.Title>
        </InputBox.Head>
        <InputBox.Body>
          <Stack direction="row" gap="8px">
            <TextField
              placeholder="Choose file to upload"
              fullWidth
              value={file?.name || ""}
              inputProps={{ readOnly: true }}
            />
            <Button variant="contained" color="secondary" component="label">
              <input
                style={{ display: "none" }}
                type="file"
                hidden
                onChange={handleFileChange}
              />
              Upload
            </Button>
          </Stack>
        </InputBox.Body>
      </InputBox>

      <InputBox>
        <InputBox.Head>
          <InputBox.Title>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <span>Hide from List</span>
              <SwitchPrimary />
            </Stack>
          </InputBox.Title>
        </InputBox.Head>
      </InputBox>
    </Stack>
  );
}

type DataTableProps = {
  rows: any;
  setRows: any;
  toggleLoaded: any;
};

function GalleryView({ rows, setRows, toggleLoaded }: DataTableProps) {
  return (
    <Stack alignItems="center">
      <ul className={styles.galleryWrap}>
        {rows.map((item, index) => (
          <li key={item.id}>
            <div className={styles.galleryThumbnail}>
              <Image src={item.col1} alt="model" fill />
            </div>
            <div className={styles.galleryTitle}>{item.col2}</div>
            <ModelButton
              setRows={setRows}
              index={index}
              loaded={rows[index].loaded}
              toggleLoaded={toggleLoaded}
            />
          </li>
        ))}
      </ul>
      <Stack spacing={2} justifyContent="center" mt="40px">
        <Pagination
          count={3}
          color="primary"
          variant="outlined"
          shape="rounded"
          renderItem={(props2) => (
            <PaginationItem
              {...props2}
              sx={{
                minWidth: 21,
                width: 21,
                height: 21,
                padding: 0,
                fontSize: 12,
              }}
            />
          )}
        />
      </Stack>
    </Stack>
  );
}

function LinearDeterminate({ setEndLoaded }) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(timer);
          setTimeout(setEndLoaded, 0); // 비동기적으로 상태 업데이트를 처리합니다.
          return 100;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, [setEndLoaded]);

  return (
    <Box
      sx={{ width: "100%", position: "absolute", bottom: "-3px", left: "4px" }}
    >
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{ width: "calc(100% - 8px)", height: "2px" }}
      />
    </Box>
  );
}

function ModelButton({ setRows, index, loaded, toggleLoaded }) {
  const [startLoaded, setStartLoaded] = useState<boolean>(false);

  const router = useRouter();
  const handleConfigurationClick = (e) => {
    e.stopPropagation();
    router.push("/configuration");
  };

  const loadedEnd = () => {
    toggleLoaded(index);
  };

  if (loaded) {
    return (
      <>
        <Button
          variant="contained"
          sx={{ width: "100%" }}
          onClick={(e) => handleConfigurationClick(e)}
          endIcon={<KeyboardArrowRightOutlinedIcon />}
        >
          Configure
        </Button>
      </>
    );
  } else {
    return (
      <>
        <Button
          variant="outlined"
          sx={{ width: "100%" }}
          onClick={(e) => {
            e.stopPropagation();
            setStartLoaded(true);
          }}
          endIcon={<FileDownloadOutlinedIcon />}
        >
          <span>Load Model</span>
          {startLoaded && !loaded && (
            <LinearDeterminate setEndLoaded={loadedEnd} />
          )}
        </Button>
      </>
    );
  }
}
