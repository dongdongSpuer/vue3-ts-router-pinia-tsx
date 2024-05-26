import type { PluginOption } from 'vite';
// 打包分析插件
import { visualizer } from 'rollup-plugin-visualizer';

// svg图标插件
import svgLoader from 'vite-svg-loader';

// vue插件
import vue from '@vitejs/plugin-vue';

// 移除打包上线后项目中的console
import removeConsole from 'vite-plugin-remove-console';

// 压缩插件
import { compress } from './compress';
export function getPlugin(mode: 'development' | 'production'): PluginOption[] {
    return [
        vue(),
        svgLoader(),
        mode === 'production'
            ? visualizer({
                  open: true,
                  brotliSize: true,
                  filename: 'report.html',
              })
            : null,
        mode == 'production'
            ? removeConsole({ external: ['src/assets/iconfont/iconfont.js'] })
            : null,
        compress(),
    ];
}

// import vueJsx from '@vitejs/plugin-vue-jsx';
