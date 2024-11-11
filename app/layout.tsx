import "../styles/variable.css";
import "../styles/reset.css";
import "../styles/global.css";
import "react-toastify/dist/ReactToastify.css";
import { Noto_Sans } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material";
import theme from "../src/theme";
import Hydration from "../utils/hydration";
import { Metadata } from "next/types";
import ReactQueryProvider from "@/src/contexts/ReactQueryProvider";
import { ToastContainer } from "react-toastify";

/**적용하고자 하는 font*/
const notoSans = Noto_Sans({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const APP_NAME = "ST Sync Master";
const APP_DEFAULT_TITLE = "ST Sync Master";
const APP_TITLE_TEMPLATE = "%s - ST Sync Master";
const APP_DESCRIPTION = "ST Sync Master!";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={notoSans.className}
        style={{ backgroundColor: "#F3F3F3" }}
      >
        <ReactQueryProvider>
          {/* ? 정리 대상 1순위 */}
          <Hydration />
          {/* ? 정리 대상 1순위 */}
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
            <ToastContainer pauseOnFocusLoss={false} />
          </AppRouterCacheProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
