import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Markdown, { PipelineStage } from 'vite-plugin-md'
import { createBuilder } from '@yankeeinlondon/builder-api'
import link from '@yankeeinlondon/link-builder'
import MdAnchor from 'markdown-it-anchor'
//import MdPrism from 'markdown-it-prism'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({ include: [/\.vue$/, /\.md$/] }),
    Markdown({
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true,
      },
      markdownItUses: [MdAnchor],
      builders: [link()],
    })],
})
