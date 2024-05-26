import { defineConfig } from 'vite';

import { getPlugin } from './build/plugin';

import * as path from 'path';
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    return {
        base: '/',
        resolve: {
            //设置别名
            alias: {
                '@': path.resolve(__dirname, 'src'),
            },
        },
        plugins: getPlugin(mode as 'development' | 'production'),
        server: {
            port: 8080, //启动端口
            hmr: {
                host: 'localhost',
                port: 8080,
            },
            // 设置 https 代理
            // proxy: {
            //   "/api": {
            //     target: "your https address",
            //     changeOrigin: true,
            //     rewrite: (path: string) => path.replace(/^\/api/, ""),
            //   },
            // },
            // 预热文件以提前转换和缓存结果，降低启动期间的初始页面加载时长并防止转换瀑布
            warmup: {
                clientFiles: ['./index.html', './src/{views,components}/*'],
            },
        },
        build: {
            target: 'es2015',
            sourcemap: false,
            // 消除打包大小超过500kb警告
            chunkSizeWarningLimit: 4000,
            rollupOptions: {
                input: {
                    index: path.resolve(__dirname, 'index.html'),
                },
                // 静态资源分类打包
                output: {
                    chunkFileNames: 'static/js/[name]-[hash].js',
                    entryFileNames: 'static/js/[name]-[hash].js',
                    assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
                },
            },
        },
    };
});
