import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "classic",
    }),
  ],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react")) {
              return "react-vendor";
            }
            if (id.includes("lodash")) {
              return "lodash-vendor";
            }
            return "vendor";
          }
        },
      },
    },
  },
  define: {
    "process.env": process.env,
  },
  server: {
    proxy: {
      "/backtest": {
        target: "http://43.202.241.180",
        changeOrigin: true,
        secure: false, // HTTPS일 경우에도 사용할 수 있음
        followRedirects: true, // 리디렉션 따르기
        rewrite: (path) => path.replace(/^\/backtest/, "/backtest"),
      },

      //   "/api/pickle-customer": {
      //     target: "http://13.125.137.98:8080",
      //     changeOrigin: true,
      //     secure: false, // HTTPS일 경우에도 사용할 수 있음
      //     followRedirects: true, // 리디렉션 따르기
      //     rewrite: (path) =>
      //       path.replace(/^\/pickle-customer/, "/pickle-customer"),
      //   },
      //   "/api/pickle-common": {
      //     target: "http://13.125.73.116:8080",
      //     changeOrigin: true,
      //     secure: false, // HTTPS일 경우에도 사용할 수 있음
      //     followRedirects: true, // 리디렉션 따르기
      //     rewrite: (path) =>
      //       path.replace(/^\/pickle-customer/, "/pickle-customer"),
      //   },
      //   "/api/pickle-pb": {
      //     target: "http://52.79.32.38:8080",
      //     changeOrigin: true,
      //     secure: false, // HTTPS일 경우에도 사용할 수 있음
      //     followRedirects: true, // 리디렉션 따르기
      //     rewrite: (path) => path.replace(/^\/pickle-pb/, "/pickle-pb"),
      //   },
      "/mydata": {
        target: "http://3.36.122.244:8080",
        changeOrigin: true,
        secure: false, // HTTPS일 경우에도 사용할 수 있음
        followRedirects: true, // 리디렉션 따르기
        rewrite: (path) => path.replace(/^\/api\/mydata/, "/api/mydata"),
      },
      "/api/": {
        target: "http://43.201.102.99:8080",
        changeOrigin: true,
        secure: false, // HTTPS일 경우에도 사용할 수 있음
        followRedirects: true, // 리디렉션 따르기
      },

      "/api/currentprice": {
        target: "http://3.34.126.55:8081",
        changeOrigin: true,
        secure: false, // HTTPS일 경우에도 사용할 수 있음
        followRedirects: true, // 리디렉션 따르기
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
});
