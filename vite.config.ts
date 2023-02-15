import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Markdown, { PipelineStage } from 'vite-plugin-md'
import { createBuilder } from '@yankeeinlondon/builder-api'

//import MdAnchor from 'markdown-it-anchor'
//import MdPrism from 'markdown-it-prism'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({ include: [/\.vue$/, /\.md$/] }),
    Markdown({
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true
      },
      /*markdownItUses: [
        (md: markdownit) => {
          let default_render = md.renderer.rules.image || function (tokens, idx, options, env, self) {
            return self.renderToken(tokens, idx, options);
          };

          md.renderer.rules.image = function (tokens, idx, options, env, self) {
            tokens[idx].attrPush(['tabIndex', '-1']); // add new attribute

            // pass token to default renderer.
            return default_render(tokens, idx, options, env, self);
          };
        }
      ]*/
    })],
})
