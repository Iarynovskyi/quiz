import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import nextPlugin from '@next/eslint-plugin-next';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  {
    ignores: ['**/node_modules/', '**/dist/', '**/.next/'],
  },

  ...tseslint.configs.recommended,
  prettierConfig,
  {
    files: ['frontend/**/*.{ts,tsx}'],
    ...pluginReactConfig,
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...pluginReactConfig.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
  },
  {
    files: ['frontend/**/*.{ts,tsx}'],
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  {
    files: ['backend/**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  }
);
