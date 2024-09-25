import crypto from "crypto";
import withSerwistInit from "@serwist/next";

const randomUUID = crypto.randomUUID();

const pageList = [
  "/",

  "/account",

  "/configuration",
  "/configuration/accessories",
  "/configuration/bluetooth",
  "/configuration/commands",
  "/configuration/device-status",
  "/configuration/driver",
  "/configuration/edit-profile",
  "/configuration/fw-update",
  "/configuration/geofence",
  "/configuration/geofence/add",
  "/configuration/geofence/edit",
  "/configuration/input-output",
  "/configuration/network",
  "/configuration/profile",
  "/configuration/report",
  "/configuration/rf",
  "/configuration/system",
  "/configuration/tracking",

  "/device",
  "/device/list",

  "/model",
  "/model/admin",

  "/server",
  "/server/mqtt",
  "/server/scuti",

  "/settings",
  "/settings/languages",
  "/settings/my-info",
  "/settings/privacy-policy",

  "/find-id",
  "/find-id/result",

  "/find-password",
  "/find-password/result",
  "/find-password/set-password",
  "/find-password/success",

  "/login",
];

const withSerwist = withSerwistInit({
  swSrc: "src/worker/sw.ts",
  swDest: "public/sw.js",
  cacheOnNavigation: true,
  reloadOnOnline: false,
  additionalPrecacheEntries: pageList.map((url) => ({
    url,
    revision: randomUUID,
  })),
});

export default withSerwist({
  // Your Next.js config
  reactStrictMode: false,
});
