import React from 'react'
import DataTable from '../../../components/dataTable';
import { GridColDef } from '@mui/x-data-grid';


const columns: GridColDef[] = [
    {
      field: "col1",
      headerName: "No",
        width: 60,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "col2",
      headerName: "Data",
        flex:1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "col3",
      headerName: "User",
        flex:1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "col4",
      headerName: "Date",
        flex:1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "col5",
      headerName: "Result",
        flex:1,
      headerAlign: "center",
      align: "center",
    },

  ];
  
  const rows = [
    {
      id: 0,
      col1: "01",
      col2: "Read IMEI Version",
      col3: "SUN123",
      col4: "Jan/19/2024 18:08",
      col5: "Executing",
    },
    {
      id: 1,
      col1: "02",
      col2: "Read IMEI Version",
      col3: "SUN123",
      col4: "Jan/19/2024 18:08",
      col5: "Executing",
    },
    {
      id: 2,
      col1: "03",
      col2: "Read IMEI Version",
      col3: "SUN123",
      col4: "Jan/19/2024 18:08",
      col5: "Executing",
    },
    {
      id: 3,
      col1: "04",
      col2: "Read IMEI Version",
      col3: "SUN123",
      col4: "Jan/19/2024 18:08",
      col5: "Executing",
    },
    {
      id: 4,
      col1: "05",
      col2: "Read IMEI Version",
      col3: "SUN123",
      col4: "Jan/19/2024 18:08",
      col5: "Executing",
    },
    {
      id: 5,
      col1: "06",
      col2: "Read IMEI Version",
      col3: "SUN123",
      col4: "Jan/19/2024 18:08",
      col5: "Executing",
    },
    {
      id: 6,
      col1: "07",
      col2: "Read IMEI Version",
      col3: "SUN123",
      col4: "Jan/19/2024 18:08",
      col5: "Executing",
    },
    {
      id: 7,
      col1: "08",
      col2: "Read IMEI Version",
      col3: "SUN123",
      col4: "Jan/19/2024 18:08",
      col5: "Executing",
    },
    {
      id: 8,
      col1: "09",
      col2: "Read IMEI Version",
      col3: "SUN123",
      col4: "Jan/19/2024 18:08",
      col5: "Executing",
    },
    {
      id: 9,
      col1: "10",
      col2: "Read IMEI Version",
      col3: "SUN123",
      col4: "Jan/19/2024 18:08",
      col5: "Executing",
    },
    {
      id: 10,
      col1: "11",
      col2: "Read IMEI Version",
      col3: "SUN123",
      col4: "Jan/19/2024 18:08",
      col5: "Executing",
    },
    {
      id: 11,
      col1: "12",
      col2: "Read IMEI Version",
      col3: "SUN123",
      col4: "Jan/19/2024 18:08",
      col5: "Executing",
    },
    {
      id: 12,
      col1: "13",
      col2: "Read IMEI Version",
      col3: "SUN123",
      col4: "Jan/19/2024 18:08",
      col5: "Executing",
    },
    {
      id: 13,
      col1: "14",
      col2: "Read IMEI Version",
      col3: "SUN123",
      col4: "Jan/19/2024 18:08",
      col5: "Executing",
    },
    {
      id: 14,
      col1: "15",
      col2: "Read IMEI Version",
      col3: "SUN123",
      col4: "Jan/19/2024 18:08",
      col5: "Executing",
    },
    {
      id: 14,
      col1: "15",
      col2: "Read IMEI Version",
      col3: "SUN123",
      col4: "Jan/19/2024 18:08",
      col5: "Executing",
    },
  ];

export default function OperationLog() {
  return (
    <div style={{width: "100%"}}>
        <DataTable rows={rows} columns={columns} rowHeight={52} disablePagination disableRowClick checkbox={false}/>
    </div>
  )
}
