import crypto from "crypto";
import withSerwistInit from "@serwist/next";

const randomUUID = crypto.randomUUID();

const additionalPrecachePageList = [
  "/",

  "/configuration",
  "/configuration/geofence",
  "/configuration/geofence/add",
  "/configuration/geofence/edit/circular",
  "/configuration/geofence/edit/polygon",

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
  additionalPrecacheEntries: additionalPrecachePageList.map((url) => {
    return {
      url,
      revision: randomUUID,
    };
  }),
});

export default withSerwist({
  // Your Next.js config
  reactStrictMode: false,
});
