export default defineConfig({
    plugins: [
        react({
            jsxRuntime: 'classic',
        }),
    ],
    build: {
        outDir: 'build/dist',
        chunkSizeWarningLimit: 1000,
    },
    define: {
        'process.env': process.env,
    },
    server: {
        proxy: {
            '/backtest': {
                target: 'http://43.201.102.99:8080',
                changeOrigin: true,
                secure: false, // HTTPS일 경우에도 사용할 수 있음
                followRedirects: true, // 리디렉션 따르기
                rewrite: (path) => path.replace(/^\/backtest/, '/backtest'),
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
            '/mydata/': {
                target: 'http://pickle.my/mydata/',
                changeOrigin: true,
                secure: false, // HTTPS일 경우에도 사용할 수 있음
                followRedirects: true, // 리디렉션 따르기
                rewrite: (path) => path.replace(/^\/mydata/, '/mydata'),
            },
        },
        '/api/currentprice/': {
            target: 'https://pickle.my',
            changeOrigin: true,
            secure: false,
            followRedirects: true,
        },

        '/api/': {
            target: 'http://43.201.102.99:8080',
            changeOrigin: true,
            secure: false, // HTTPS일 경우에도 사용할 수 있음
            followRedirects: true, // 리디렉션 따르기
        },
    },
});
