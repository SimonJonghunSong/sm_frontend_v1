"use client";

import React from "react";
import { Button, Stack } from "@mui/material";

export default function Page() {
  return (
    <div className="pageWrap" style={{ width: "100%" }}>
      <article className="contentWrap">
        <div className="pageTitle">F/W Update</div>
        {/* // TODO: 업데이트 가능 분기 (true: 업데이트 가능 / false: 업데이트 없음 레이아웃) */}
        {true ? (
          <>
            <Stack
              sx={{
                width: "100%",
                height: "120px",
                marginBottom: "16px",
                fontSize: 16,
                fontWeight: 500,
                backgroundColor: "#F2F2F2",
                borderRadius: "8px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* No update available */}
              Firmware v.1.0.1 update available
            </Stack>
            <Stack direction="row" gap="8px" justifyContent="flex-end">
              <Button
                variant="outlined"
                color="secondary"
                sx={{ marginTop: "20px !important", width: 200 }}
              >
                Download
              </Button>
              <Button
                variant="contained"
                color="secondary"
                sx={{ marginTop: "20px !important", width: 200 }}
              >
                Update
              </Button>
            </Stack>
          </>
        ) : (
          <Stack
            sx={{
              width: "100%",
              height: "120px",
              marginBottom: "16px",
              fontSize: 16,
              fontWeight: 500,
              borderRadius: "8px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            No update available
          </Stack>
        )}
      </article>
    </div>
  );
}
