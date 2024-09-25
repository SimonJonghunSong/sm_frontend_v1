import { Stack, TextField, Checkbox } from "@mui/material";
import React from "react";
import InputBox from "../../../../components/inputbox/InputBox";

export default function AlertConfig2() {
  return (
    <>
      <div className="pageTitle">AlertConfig1</div>
      <Stack direction="row" alignItems="center" gap="8px">
        <Stack
          direction="row"
          alignItems="center"
          gap="8px"
          sx={{ marginBottom: "12px" }}
        >
          <Checkbox />
          <span>All</span>
        </Stack>
      </Stack>
      <Stack direction="row" gap="40px" mb="40px">
        <Stack sx={{ width: "50%" }}>
          <Stack direction="row" alignItems="center" gap="8px">
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              sx={{ marginBottom: "12px" }}
            >
              <Checkbox />
              <TextField sx={{ width: 50 }} defaultValue="00" />
            </Stack>
            <InputBox.Head>
              <InputBox.Title>Temp High (75)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1400</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
          </Stack>
          <Stack direction="row" alignItems="center" gap="8px">
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              sx={{ marginBottom: "12px" }}
            >
              <Checkbox />
              <TextField sx={{ width: 50 }} defaultValue="00" />
            </Stack>
            <InputBox.Head>
              <InputBox.Title>Temp Low (76)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1401</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
          </Stack>
          <Stack direction="row" alignItems="center" gap="8px">
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              sx={{ marginBottom: "12px" }}
            >
              <Checkbox />
              <TextField sx={{ width: 50 }} defaultValue="00" />
            </Stack>
            <InputBox.Head>
              <InputBox.Title>Temp Return (77)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1402</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
          </Stack>
          <Stack direction="row" alignItems="center" gap="8px">
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              sx={{ marginBottom: "12px" }}
            >
              <Checkbox />
              <TextField sx={{ width: 50 }} defaultValue="00" />
            </Stack>
            <InputBox.Head>
              <InputBox.Title>I-button Inserted/Read (59)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1403</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
          </Stack>
          <Stack direction="row" alignItems="center" gap="8px">
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              sx={{ marginBottom: "12px" }}
            >
              <Checkbox />
              <TextField sx={{ width: 50 }} defaultValue="00" />
            </Stack>
            <InputBox.Head>
              <InputBox.Title>I-button Removed (60)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1404</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
          </Stack>
          <Stack direction="row" alignItems="center" gap="8px">
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              sx={{ marginBottom: "12px" }}
            >
              <Checkbox />
              <TextField sx={{ width: 50 }} defaultValue="00" />
            </Stack>
            <InputBox.Head>
              <InputBox.Title>RFID Tag Detection (93)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1405</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
          </Stack>
          <Stack direction="row" alignItems="center" gap="8px">
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              sx={{ marginBottom: "12px" }}
            >
              <Checkbox />
              <TextField sx={{ width: 50 }} defaultValue="00" />
            </Stack>
            <InputBox.Head>
              <InputBox.Title>Voice Call (67)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1406</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
          </Stack>
          <Stack direction="row" alignItems="center" gap="8px">
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              sx={{ marginBottom: "12px" }}
            >
              <Checkbox />
              <TextField sx={{ width: 50 }} defaultValue="00" />
            </Stack>
            <InputBox.Head>
              <InputBox.Title>
                RS232 Connection/Disconnection (69)
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1407</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
          </Stack>
          <Stack direction="row" alignItems="center" gap="8px">
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              sx={{ marginBottom: "12px" }}
            >
              <Checkbox />
              <TextField sx={{ width: 50 }} defaultValue="00" />
            </Stack>
            <InputBox.Head>
              <InputBox.Title>GPS Fix (97)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1417</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
          </Stack>
          <Stack direction="row" alignItems="center" gap="8px">
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              sx={{ marginBottom: "12px" }}
            >
              <Checkbox />
              <TextField sx={{ width: 50 }} defaultValue="00" />
            </Stack>
            <InputBox.Head>
              <InputBox.Title>ST25T Connect (85)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1418</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
          </Stack>
          <Stack direction="row" alignItems="center" gap="8px">
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              sx={{ marginBottom: "12px" }}
            >
              <Checkbox />
              <TextField sx={{ width: 50 }} defaultValue="00" />
            </Stack>
            <InputBox.Head>
              <InputBox.Title>ST25T Disconnect (86)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1419</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
          </Stack>
          <Stack direction="row" alignItems="center" gap="8px">
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              sx={{ marginBottom: "12px" }}
            >
              <Checkbox />
              <TextField sx={{ width: 50 }} defaultValue="00" />
            </Stack>
            <InputBox.Head>
              <InputBox.Title>
                RS232 Fuel Net Address Scan Fail (87)
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1420</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
          </Stack>
          <Stack direction="row" alignItems="center" gap="8px">
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              sx={{ marginBottom: "12px" }}
            >
              <Checkbox />
              <TextField sx={{ width: 50 }} defaultValue="00" />
            </Stack>
            <InputBox.Head>
              <InputBox.Title>RS232 Fuel Max Level Excess (88)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1421</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
          </Stack>
          <Stack direction="row" alignItems="center" gap="8px">
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              sx={{ marginBottom: "12px" }}
            >
              <Checkbox />
              <TextField sx={{ width: 50 }} defaultValue="00" />
            </Stack>
            <InputBox.Head>
              <InputBox.Title>Fuel Connect (89)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1422</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
          </Stack>
          <Stack direction="row" alignItems="center" gap="8px">
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              sx={{ marginBottom: "12px" }}
            >
              <Checkbox />
              <TextField sx={{ width: 50 }} defaultValue="00" />
            </Stack>
            <InputBox.Head>
              <InputBox.Title>Fuel Disconnect (90)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1423</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
          </Stack>
          <Stack direction="row" alignItems="center" gap="8px">
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              sx={{ marginBottom: "12px" }}
            >
              <Checkbox />
              <TextField sx={{ width: 50 }} defaultValue="00" />
            </Stack>
            <InputBox.Head>
              <InputBox.Title>Fuel Level Lower (91)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1424</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
          </Stack>
          <Stack direction="row" alignItems="center" gap="8px">
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              sx={{ marginBottom: "12px" }}
            >
              <Checkbox />
              <TextField sx={{ width: 50 }} defaultValue="00" />
            </Stack>
            <InputBox.Head>
              <InputBox.Title>Fuel Level Upper (92)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1425</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
          </Stack>
          <Stack direction="row" alignItems="center" gap="8px">
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              sx={{ marginBottom: "12px" }}
            >
              <Checkbox />
              <TextField sx={{ width: 50 }} defaultValue="00" />
            </Stack>
            <InputBox.Head>
              <InputBox.Title>Engine: Exceed Speed (61)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1426</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
          </Stack>
          <Stack direction="row" alignItems="center" gap="8px">
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              sx={{ marginBottom: "12px" }}
            >
              <Checkbox />
              <TextField sx={{ width: 50 }} defaultValue="00" />
            </Stack>
            <InputBox.Head>
              <InputBox.Title>
                Engine: Vehicle Speed Violation (62)
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1427</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
          </Stack>
          <Stack direction="row" alignItems="center" gap="8px">
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              sx={{ marginBottom: "12px" }}
            >
              <Checkbox />
              <TextField sx={{ width: 50 }} defaultValue="00" />
            </Stack>
            <InputBox.Head>
              <InputBox.Title>
                Engine: Coolant Temperature Violation (63)
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1428</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
          </Stack>
          <Stack direction="row" alignItems="center" gap="8px">
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              sx={{ marginBottom: "12px" }}
            >
              <Checkbox />
              <TextField sx={{ width: 50 }} defaultValue="00" />
            </Stack>
            <InputBox.Head>
              <InputBox.Title>
                Engine: Oil Pressure Violation (64)
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1429</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
          </Stack>
        </Stack>

        <Stack sx={{ width: "50%" }}>
          <Stack direction="row" alignItems="center" gap="8px">
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              sx={{ marginBottom: "12px" }}
            >
              <Checkbox />
              <TextField sx={{ width: 50 }} defaultValue="00" />
            </Stack>
            <InputBox.Head>
              <InputBox.Title>Engine: RPM Violation (65)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1430</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
          </Stack>
          <Stack direction="row" alignItems="center" gap="8px">
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              sx={{ marginBottom: "12px" }}
            >
              <Checkbox />
              <TextField sx={{ width: 50 }} defaultValue="00" />
            </Stack>
            <InputBox.Head>
              <InputBox.Title>Engine: Error Code - DTC (66)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1431</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
          </Stack>
          <Stack direction="row" alignItems="center" gap="8px">
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              sx={{ marginBottom: "12px" }}
            >
              <Checkbox />
              <TextField sx={{ width: 50 }} defaultValue="00" />
            </Stack>
            <InputBox.Head>
              <InputBox.Title>ST20U Connect (70)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1432</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
          </Stack>
          <Stack direction="row" alignItems="center" gap="8px">
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              sx={{ marginBottom: "12px" }}
            >
              <Checkbox />
              <TextField sx={{ width: 50 }} defaultValue="00" />
            </Stack>
            <InputBox.Head>
              <InputBox.Title>ST20U Disconnect (71)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1433</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
          </Stack>
          <Stack direction="row" alignItems="center" gap="8px">
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              sx={{ marginBottom: "12px" }}
            >
              <Checkbox />
              <TextField sx={{ width: 50 }} defaultValue="00" />
            </Stack>
            <InputBox.Head>
              <InputBox.Title>Over Speed in Polygon (100)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1434</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
          </Stack>
          <Stack direction="row" alignItems="center" gap="8px">
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              sx={{ marginBottom: "12px" }}
            >
              <Checkbox />
              <TextField sx={{ width: 50 }} defaultValue="00" />
            </Stack>
            <InputBox.Head>
              <InputBox.Title>Under Speed in Polygon (101)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1435</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
          </Stack>
          <Stack direction="row" alignItems="center" gap="8px">
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              sx={{ marginBottom: "12px" }}
            >
              <Checkbox />
              <TextField sx={{ width: 50 }} defaultValue="00" />
            </Stack>
            <InputBox.Head>
              <InputBox.Title>Magnet Detected (56)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1437</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
          </Stack>
          <Stack direction="row" alignItems="center" gap="8px">
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              sx={{ marginBottom: "12px" }}
            >
              <Checkbox />
              <TextField sx={{ width: 50 }} defaultValue="00" />
            </Stack>
            <InputBox.Head>
              <InputBox.Title>Magnet Released (57)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1438</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
          </Stack>
          <Stack direction="row" alignItems="center" gap="8px">
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              sx={{ marginBottom: "12px" }}
            >
              <Checkbox />
              <TextField sx={{ width: 50 }} defaultValue="00" />
            </Stack>
            <InputBox.Head>
              <InputBox.Title>
                Power Key Pressed from low-battery (55)
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1355</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
          </Stack>
          <Stack direction="row" alignItems="center" gap="8px">
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              sx={{ marginBottom: "12px" }}
            >
              <Checkbox />
              <TextField sx={{ width: 50 }} defaultValue="00" />
            </Stack>
            <InputBox.Head>
              <InputBox.Title>Alert by Panic Button (42)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1344</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
          </Stack>
          <Stack direction="row" alignItems="center" gap="8px">
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              sx={{ marginBottom: "12px" }}
            >
              <Checkbox />
              <TextField sx={{ width: 50 }} defaultValue="00" />
            </Stack>
            <InputBox.Head>
              <InputBox.Title>Violation by Anti-theft (73)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1444</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
          </Stack>
          <Stack direction="row" alignItems="center" gap="8px">
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              sx={{ marginBottom: "12px" }}
            >
              <Checkbox />
              <TextField sx={{ width: 50 }} defaultValue="00" />
            </Stack>
            <InputBox.Head>
              <InputBox.Title>
                OBD Parameter Setting Completed (82)
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1445</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
          </Stack>
          <Stack direction="row" alignItems="center" gap="8px">
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              sx={{ marginBottom: "12px" }}
            >
              <Checkbox />
              <TextField sx={{ width: 50 }} defaultValue="00" />
            </Stack>
            <InputBox.Head>
              <InputBox.Title>MDSM-7 Event (103)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1446</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
          </Stack>
          <Stack direction="row" alignItems="center" gap="8px">
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              sx={{ marginBottom: "12px" }}
            >
              <Checkbox />
              <TextField sx={{ width: 50 }} defaultValue="00" />
            </Stack>
            <InputBox.Head>
              <InputBox.Title>MDAS-9 Event (104)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1447</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
          </Stack>
          <Stack direction="row" alignItems="center" gap="8px">
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              sx={{ marginBottom: "12px" }}
            >
              <Checkbox />
              <TextField sx={{ width: 50 }} defaultValue="00" />
            </Stack>
            <InputBox.Head>
              <InputBox.Title>Over Speed in Circular (129)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1453</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
          </Stack>
          <Stack direction="row" alignItems="center" gap="8px">
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              sx={{ marginBottom: "12px" }}
            >
              <Checkbox />
              <TextField sx={{ width: 50 }} defaultValue="00" />
            </Stack>
            <InputBox.Head>
              <InputBox.Title>Under Speed in Circular (130)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1454</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
          </Stack>
          <Stack direction="row" alignItems="center" gap="8px">
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              sx={{ marginBottom: "12px" }}
            >
              <Checkbox />
              <TextField sx={{ width: 50 }} defaultValue="00" />
            </Stack>
            <InputBox.Head>
              <InputBox.Title>Disconnected from Trailer (131)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1455</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
          </Stack>
          <Stack direction="row" alignItems="center" gap="8px">
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              sx={{ marginBottom: "12px" }}
            >
              <Checkbox />
              <TextField sx={{ width: 50 }} defaultValue="00" />
            </Stack>
            <InputBox.Head>
              <InputBox.Title>Lose Network Connection (141)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1471</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
          </Stack>
          <Stack direction="row" alignItems="center" gap="8px">
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              sx={{ marginBottom: "12px" }}
            >
              <Checkbox />
              <TextField sx={{ width: 50 }} defaultValue="00" />
            </Stack>
            <InputBox.Head>
              <InputBox.Title>
                Bank Trunk Active by Polygon (142)
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1472</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
          </Stack>
          <Stack direction="row" alignItems="center" gap="8px">
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              sx={{ marginBottom: "12px" }}
            >
              <Checkbox />
              <TextField sx={{ width: 50 }} defaultValue="00" />
            </Stack>
            <InputBox.Head>
              <InputBox.Title>
                Bank Trunk Active by Circular (143)
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1473</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
          </Stack>
          <Stack direction="row" alignItems="center" gap="8px">
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              sx={{ marginBottom: "12px" }}
            >
              <Checkbox />
              <TextField sx={{ width: 50 }} defaultValue="00" />
            </Stack>
            <InputBox.Head>
              <InputBox.Title>Buzzer Active by overspeed (152)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1481</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
