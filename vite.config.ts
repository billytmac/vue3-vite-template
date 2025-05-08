import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// 自动导入
import AutoImport from 'unplugin-auto-import/vite'
// 可给带setup的script标签内给组件命名
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
// 自动导入图片
import ViteImages from 'vite-plugin-vue-images'
// 打包体积分析插件
import { visualizer } from 'rollup-plugin-visualizer'
// 按需加载组件，不用手动引入
import Components from 'unplugin-vue-components/vite'
// 自带各个UI库的解析器
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    AutoImport({
      imports: ['vue', 'pinia'],
      dts: '.src/type/auto-imports.d.ts',
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json',
        // provide path ending with `.mjs` or `.cjs` to generate the file with the respective format
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
    }),
    Components({
      // 指定组件所在文件夹的位置，默认是 src/components
      dirs: ['src/components'],
      // UI 库解析器
      resolvers: [
        // ElementPlusResolver(),
      ],
      // 配置 type 文件生成位置
      dts: 'src/type/components.d.ts',
    }),
    ViteImages({
      // dirs: ['src/assets/images'], // 指定图片存放目录（可多个）
      // extensions: ['jpg', 'png', 'jpeg', 'svg', 'webp'], // 支持的图片格式
      // customResolvers: [], // 自定义路径解析规则（可选）
    }),
    visualizer(),
    vue(),
    VueSetupExtend(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
})
