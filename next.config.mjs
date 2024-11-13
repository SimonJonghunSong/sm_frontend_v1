import path from "path";
import { fileURLToPath } from "url";
import CopyWebpackPlugin from "copy-webpack-plugin";
import ts from "typescript";

const buildTimestamp = new Date().getTime().toString();

// __dirname을 에뮬레이트하는 코드
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.module.rules.push({
        test: /sw\.ts$/,
        include: path.resolve(__dirname, "src/worker"),
        use: {
          loader: "ts-loader",
          options: {
            configFile: path.resolve(__dirname, "tsconfig.json"),
          },
        },
      });

      // 컴파일된 파일을 public/sw.js로 복사
      config.plugins.push(
        new CopyWebpackPlugin({
          patterns: [
            {
              from: path.resolve(__dirname, "src/worker/sw.ts"),
              to: path.resolve(__dirname, "public/sw.js"),
              async transform(content) {
                const transpiled = ts.transpileModule(content.toString(), {
                  compilerOptions: {
                    module: "ESNext",
                  },
                });
                return transpiled.outputText;
              },
            },
          ],
        })
      );
    }
    return config;
  },
  env: {
    BUILD_TIMESTAMP: buildTimestamp,
  },
};
