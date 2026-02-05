import { defineConfig } from 'vite';
import {
  vitePlugin as remix,
  cloudflareDevProxyVitePlugin,
} from '@remix-run/dev';

import jsconfigPaths from 'vite-jsconfig-paths';

// ✅ IMPORT CERTO DO MDX
import mdx from '@mdx-js/rollup';

// remark / rehype
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import rehypeImgSize from 'rehype-img-size';
import rehypeSlug from 'rehype-slug';
import rehypePrism from '@mapbox/rehype-prism';

export default defineConfig({
  assetsInclude: ['**/*.glb', '**/*.hdr', '**/*.glsl'],

  server: {
    port: 7777,
  },

  build: {
    assetsInlineLimit: 1024,
  },

  plugins: [
    // ✅ MDX plugin (agora definido corretamente)
    mdx({
      providerImportSource: '@mdx-js/react',
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
      rehypePlugins: [
        [rehypeImgSize, { dir: 'public' }],
        rehypeSlug,
        rehypePrism,
      ],
    }),

    cloudflareDevProxyVitePlugin(),

    remix({
      routes(defineRoutes) {
        return defineRoutes(route => {
          route('/', 'routes/home/route.js', { index: true });
        });
      },
    }),

    jsconfigPaths(),
  ],
});
