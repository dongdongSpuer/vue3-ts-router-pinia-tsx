import type { PluginOption } from 'vite';

import vitePluginCompress from 'vite-plugin-compression';

export const compress = (): PluginOption => {
    return vitePluginCompress({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        deleteOriginFile: false,
        ext: '.gz',
        filter: () => true,
    });
};
