import { defineConfig } from 'vite';
import { getBaseConfig } from '@ovh-ux/manager-vite-config';

const config = getBaseConfig({});

export default defineConfig({
  ...config,
  resolve: {
    ...config.resolve,
    dedupe: [
      '@ovh-ux/manager-react-shell-client',
      '@ovhcloud/ods-common-core',
      '@ovhcloud/ods-common-testing',
      '@ovhcloud/ods-common-theming',
      '@ovhcloud/ods-components',
      '@ovhcloud/ods-theme-blue-jeans',
      'i18next',
      'react',
      'react-dom',
      'react-i18next',
      'react-router-dom',
      'zustand',
    ],
  },
});
