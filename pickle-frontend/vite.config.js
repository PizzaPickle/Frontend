import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
// import ENV from "./config.js";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    // 환경 변수를 mode에 따라 불러오기
    const env = loadEnv(mode, process.cwd());

    return {
        plugins: [
            react({
                jsxRuntime: 'classic',
            }),
        ],
        build: {
            outDir: 'build/dist',
            rollupOptions: {
                input: '/src/main.jsx',
            },
        },
        define: {
            //   "process.env": process.env,
            'import.meta.env': {
                VITE_PICKLE_BACKTEST_URL: env.VITE_PICKLE_BACKTEST_URL,
                VITE_PICKLE_MAIN_URL: env.VITE_PICKLE_MAIN_URL,
                VITE_PICKLE_MYDATA_URL: env.VITE_PICKLE_MYDATA_URL,
                VITE_PICKLE_REALTIME_URL: env.VITE_PICKLE_REALTIME_URL,
            },
        },
        server: {
            proxy: {
                '/backtest': {
                    target: env.VITE_PICKLE_BACKTEST_URL, // loadEnv로 가져온 값 사용
                    changeOrigin: true,
                    secure: false, // HTTPS일 경우에도 사용할 수 있음
                    followRedirects: true, // 리디렉션 따르기
                    rewrite: (path) => path.replace(/^\/backtest/, '/backtest'),
                },
                '/api': {
                    target: env.VITE_PICKLE_MAIN_SERVER_URL,
                    changeOrigin: true,
                    secure: false, // HTTPS일 경우에도 사용할 수 있음
                    followRedirects: true, // 리디렉션 따르기
                    rewrite: (path) => path.replace(/^\/api/, '/api'),
                },
                '/api/mydata': {
                    target: env.VITE_PICKLE_MYDATA_URL,
                    changeOrigin: true,
                    secure: false, // HTTPS일 경우에도 사용할 수 있음
                    followRedirects: true, // 리디렉션 따르기
                    rewrite: (path) =>
                        path.replace(/^\/api\/mydata/, '/api/mydata'),
                },
                '/consulting-room': {
                    target: env.VITE_PICKLE_REALTIME_URL,
                    changeOrigin: true,
                    secure: false, // HTTPS일 경우에도 사용할 수 있음
                    followRedirects: true, // 리디렉션 따르기
                },
            },
        },
    };
});

// export default defineConfig({
//   plugins: [
//     react({
//       jsxRuntime: "classic",
//     }),
//   ],
//   define: {
//     "process.env": import.meta.env,
//   },
//   server: {
//     proxy: {
//       "/backtest": {
//         target: ENV.VITE_PICKLE_BACKTEST_URL,
//         changeOrigin: true,
//         secure: false, // HTTPS일 경우에도 사용할 수 있음
//         followRedirects: true, // 리디렉션 따르기
//         rewrite: (path) => path.replace(/^\/backtest/, "/backtest"),
//       },
//       //   "/api/pickle-pb": {
//       //     target: ENV.VITE_PICKLE_MAIN_SERVER_URL,
//       //     changeOrigin: true,
//       //     secure: false, // HTTPS일 경우에도 사용할 수 있음
//       //     followRedirects: true, // 리디렉션 따르기
//       //   },
//       "/api": {
//         target: ENV.VITE_PICKLE_MAIN_SERVER_URL,
//         changeOrigin: true,
//         secure: false, // HTTPS일 경우에도 사용할 수 있음
//         followRedirects: true, // 리디렉션 따르기
//         rewrite: (path) => path.replace(/^\/api/, "/api"),
//       },
//       //   "/api/pickle-common": {
//       //     target: "https://localhost:8081",
//       //     changeOrigin: true,
//       //     secure: false, // HTTPS일 경우에도 사용할 수 있음
//       //     followRedirects: true, // 리디렉션 따르기
//       //   },
//       "/api/mydata": {
//         target: ENV.VITE_PICKLE_MYDATA_URL,
//         changeOrigin: true,
//         secure: false, // HTTPS일 경우에도 사용할 수 있음
//         followRedirects: true, // 리디렉션 따르기
//         rewrite: (path) => path.replace(/^\/api\/mydata/, "/api/mydata"),
//       },
//       "/consulting-room": {
//         target: ENV.VITE_PICKLE_REALTIME_URL,
//         changeOrigin: true,
//         secure: false, // HTTPS일 경우에도 사용할 수 있음
//         followRedirects: true, // 리디렉션 따르기
//       },
//       //   "/api/pickle-customer": {
//       //     target: "http://localhost:8080",
//       //     changeOrigin: true,
//       //     secure: false, // HTTPS일 경우에도 사용할 수 있음
//       //     followRedirects: true, // 리디렉션 따르기
//       //     rewrite: (path) =>
//       //       path.replace(/^\/api\/pickle-customer/, "/api/pickle-customer"),
//       //   },
//     },
//   },
// });
