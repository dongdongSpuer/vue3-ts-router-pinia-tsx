# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.



## vite配置

### 压缩 compress

**插件：vite-plugin-compression**

```
npm i vite-plugin-compression
```

```js
vitePluginCompress({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        deleteOriginFile: false,
        ext: '.gz',
        filter: () => true,
    });
```

### 优化

### 移除console

