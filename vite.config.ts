import path from "path";
import { getPluginsList } from "./build/plugin";
import { ConfigEnv, loadEnv, UserConfigExport } from "vite";
import { root, wrapperEnv } from "./build/utils";
// https://vite.dev/config/
export default ({ mode }: ConfigEnv): UserConfigExport => {
  const env = loadEnv(mode, process.cwd());
  const { VITE_CDN, VITE_PORT, VITE_COMPRESSION, VITE_PUBLIC_PATH } =
    wrapperEnv(loadEnv(mode, root));
  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./"),
        "@": path.resolve(__dirname, "./src")
      },
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"]
    },
    // 服务端渲染
    server: {
      // 端口号
      port: VITE_PORT,
      host: "0.0.0.0",
      // 本地跨域代理 https://cn.vitejs.dev/config/server-options.html#server-proxy
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: "http://localhost:8080",
          changeOrigin: true,
          ws: true,
          rewrite: path =>
            path.replace(new RegExp("^" + env.VITE_APP_BASE_API), "")
        }
      },
      // 预热文件以提前转换和缓存结果，降低启动期间的初始页面加载时长并防止转换瀑布
      warmup: {
        clientFiles: ["./index.html", "./src/{views,pages,components}/*"]
      }
    },
    plugins: getPluginsList(VITE_CDN, VITE_COMPRESSION),
    // https://cn.vitejs.dev/config/dep-optimization-options.html#dep-optimization-options
    optimizeDeps: {
      // include,
      // exclude
    }
  };
};
