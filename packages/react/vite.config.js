import { fileURLToPath } from 'node:url'
import { resolve, dirname } from 'node:path'
import react from '@vitejs/plugin-react'
import TranslationsLoader from './rollup/translations-loader-plugin'
import { extractMarketplaceTranslation } from './rollup/modifiers/translations'
import StaticCopy from './rollup/static-copy-plugin'
import { defineConfig, loadEnv } from 'vite'
import { changeLocation } from './rollup/modifiers/manifest'
import process from 'node:process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
  return defineConfig({
    base: './',
    plugins: [
      react(),
      TranslationsLoader(),
      StaticCopy({
        targets: [
          { src: resolve(__dirname, 'src/assets/*'), dest: './' },
          { src: resolve(__dirname, 'src/manifest.json'), dest: '../', modifier: changeLocation },
          {
            src: resolve(__dirname, 'src/translations/en.json'),
            dest: '../translations',
            modifier: extractMarketplaceTranslation
          }
        ]
      })
    ],
    root: 'src',
    test: {
      include: ['../{test,spec}/**/*.{test,spec}.{js,ts,jsx}'],
      exclude: ['**/node_modules/**', '**/dist/**'],
      globals: true,
      environment: 'jsdom'
    },
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'src/index.html')
        },
        output: {
          entryFileNames: `[name].js`,
          chunkFileNames: `[name].js`,
          assetFileNames: `[name].[ext]`
        },
        watch: {
          include: 'src/**'
        }
      },
      outDir: resolve(__dirname, 'dist/assets'),
      emptyOutDir: true
    }
  })
}
