import { defineConfig } from 'vite';

import { getPlugin } from './build/plugin';

import * as path from 'path';
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    return {
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
                host: '127.0.0.1',
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
        },
    };
});
