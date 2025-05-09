import { defineConfig, presetWind3, presetAttributify, transformerDirectives } from 'unocss'

export default defineConfig({
  presets: [presetWind3(), presetAttributify()],
  transformers: [transformerDirectives()],
  // ...UnoCSS options
})
