import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  dynamicImport: {
  },
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
});
