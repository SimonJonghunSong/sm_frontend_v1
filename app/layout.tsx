import "../styles/variable.css";
import "../styles/reset.css";
import "../styles/global.css";
import "react-toastify/dist/ReactToastify.css";
import { Metadata } from "next/types";
import { Noto_Sans } from "next/font/google";
import { ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import theme from "../src/theme";
import Hydration from "../utils/hydration";
import ReactQueryProvider from "@/src/contexts/ReactQueryProvider";
import GlobalLoading from "@/components/GlobalLoading";
import ServiceWorkerRegister from "@/src/worker/ServiceWorkerRegister";
import NetworkStatusCheck from "@/components/NetworkStatusCheck";
import NextIntlProvider from "@/src/contexts/NextIntlProvider";

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextIntlProvider>
      <body
        className={notoSans.className}
        style={{ backgroundColor: "#F3F3F3" }}
      >
        <ReactQueryProvider>
          {/* ? 정리 대상 1순위 */}
          <Hydration />
          {/* ? 정리 대상 1순위 */}
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              {children}
              <ServiceWorkerRegister />
              <NetworkStatusCheck />
            </ThemeProvider>
            <ToastContainer pauseOnFocusLoss={false} />
          </AppRouterCacheProvider>
        </ReactQueryProvider>
      </body>
    </NextIntlProvider>
  );
}
