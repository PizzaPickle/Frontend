import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
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
                output: {
                    chunkSizeWarningLimit: 4096,
                    // manualChunks(id) {
                    //     if (id.includes('node_modules')) {
                    //         if (id.includes('react')) {
                    //             return 'react-vendor';
                    //         }
                    //         if (id.includes('lodash')) {
                    //             return 'lodash-vendor';
                    //         }
                    //         return 'vendor';
                    //     }
                    // },
                },
            },
        },
        define: {
            'import.meta.env': env,
        },
        server: {
            proxy: {
                '/backtest': {
                    target: env.VITE_PICKLE_BACKTEST_URL,
                    changeOrigin: true,
                    secure: false,
                    followRedirects: true,
                    rewrite: (path) => path.replace(/^\/backtest/, '/backtest'),
                },
                '/api': {
                    target: env.VITE_PICKLE_MAIN_SERVER_URL,
                    changeOrigin: true,
                    secure: false,
                    followRedirects: true,
                    rewrite: (path) => path.replace(/^\/api/, '/api'),
                },
                '/mydata': {
                    target: env.VITE_PICKLE_MYDATA_URL,
                    changeOrigin: true,
                    secure: false,
                    followRedirects: true,
                    rewrite: (path) => path.replace(/^\/mydata/, '/mydata'),
                },
                '/consulting-room': {
                    target: env.VITE_PICKLE_REALTIME_URL,
                    changeOrigin: true,
                    secure: false,
                    followRedirects: true,
                },
            },
        },
    };
});
