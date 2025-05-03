import { Stack, TextField, Checkbox } from "@mui/material";
import React from "react";
import InputBox from "../../../../components/inputbox/InputBox";

export default function AlertConfig1() {
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
              <InputBox.Title>Ignition On (33)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1301</InputBox.Number>
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
              <InputBox.Title>Ignition Off (34)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1302</InputBox.Number>
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
              <InputBox.Title>Enter Drive Mode (29)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1303</InputBox.Number>
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
              <InputBox.Title>Enter Park Mode (31)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1304</InputBox.Number>
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
              <InputBox.Title>Enter Idle Mode (68)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1306</InputBox.Number>
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
              <InputBox.Title>Excess Idle (35)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1308</InputBox.Number>
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
              <InputBox.Title>Enter Speeding Mode (36)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1311</InputBox.Number>
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
              <InputBox.Title>Over Speed (1)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1313</InputBox.Number>
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
              <InputBox.Title>Under Speed (2)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1314</InputBox.Number>
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
              <InputBox.Title>Enter Speeding Mode (36)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1321</InputBox.Number>
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
              <InputBox.Title>Enter Sleep (9)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1325</InputBox.Number>
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
              <InputBox.Title>Exit Sleep (10)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1326</InputBox.Number>
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
              <InputBox.Title>Back-Up Battery Low (43)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1328</InputBox.Number>
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
              <InputBox.Title>Power Up (99)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1329</InputBox.Number>
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
              <InputBox.Title>Main Power Connected (40)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1330</InputBox.Number>
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
              <InputBox.Title>Main Power Disconnected (41)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1331</InputBox.Number>
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
              <InputBox.Title>Connected to Back-up Battery (44)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1332</InputBox.Number>
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
                Disconnected from Back-Up Battery (45)
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1333</InputBox.Number>
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
              <InputBox.Title>Battery Error (13)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1334</InputBox.Number>
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
              <InputBox.Title>Battery Low (14)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1335</InputBox.Number>
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
              <InputBox.Title>GPS Antenna Disconnected (3)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1336</InputBox.Number>
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
              <InputBox.Title>GPS Antenna Connected (4)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1337</InputBox.Number>
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
              <InputBox.Title>GPS Antenna Shorted (8)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1338</InputBox.Number>
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
              <InputBox.Title>Sim Card Removed (72)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1339</InputBox.Number>
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
              <InputBox.Title>Jamming Detected (50)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1340</InputBox.Number>
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
              <InputBox.Title>Shocked (15)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1350</InputBox.Number>
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
                Collision has occurred to vehicle (16)
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1351</InputBox.Number>
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
              <InputBox.Title>Motion Detected (17)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1352</InputBox.Number>
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
                Alert of Fast Acceleration: Driver Pattern (46)
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1354</InputBox.Number>
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
                Alert of Harsh Brake: Driver Pattern (47)
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
              <InputBox.Title>
                Sharp turn left alert: Driver Pattern (48)
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>4356</InputBox.Number>
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
                Sharp turn right alert: Driver Pattern (49)
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>4357</InputBox.Number>
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
              <InputBox.Title>Driver Pattern Calibrated (21)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1360</InputBox.Number>
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
                Vehicle Exit Circular Geo-Fence (5)
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1365</InputBox.Number>
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
                Vehicle Enter Circular Geo-Fence (6)
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1366</InputBox.Number>
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
              <InputBox.Title>Vehicle Exit Poly Geo-Fence (74)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1367</InputBox.Number>
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
              <InputBox.Title>Vehicle Enter Poly Geo-Fence (79)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1368</InputBox.Number>
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
                Alert Input goes to Open status (11)
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1371</InputBox.Number>
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
              <InputBox.Title>Alert Input goes to Ground (12)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1372</InputBox.Number>
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
              <InputBox.Title>Alert Enter Disconnect Mode (144)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1373</InputBox.Number>
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
              <InputBox.Title>Alert Enter Normal Mode (3)</InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1377</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
