// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

// FLAT CONFIG — bez duplog definisanja plugina
export default tseslint.config([
  { ignores: ['dist', 'node_modules'] },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: globals.browser,
    },
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      // VAŽNO: samo jednom ubacujemo hookove i refresh
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    // NEMA "plugins: { 'react-hooks': reactHooks }" jer to duplira plugin 😉
  },
]);
