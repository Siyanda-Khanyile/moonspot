import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // Allow Math.random in useMemo for skeleton components
      'react-hooks/exhaustive-deps': 'warn',
      // Allow setState in effects with proper conditions
      'react-hooks/set-state-in-effect': 'warn',
      // Relax fast refresh rules for utility components and UI libraries
      'react-refresh/only-export-components': [
        'warn',
        { 
          allowConstantExport: true, 
          allowExportNames: ['loader', 'action'],
          // Allow exporting variants and utility functions from UI components
          checkJS: false
        }
      ],
      // Allow unused variables with underscore prefix
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
      ],
    },
  },
  // Special rules for UI components
  {
    files: ['src/components/ui/**/*.{ts,tsx}'],
    rules: {
      // Disable fast refresh warnings for UI components that export variants
      'react-refresh/only-export-components': 'off',
    },
  },
  // Special rules for context files
  {
    files: ['src/contexts/**/*.{ts,tsx}'],
    rules: {
      // Allow exporting hooks from context files
      'react-refresh/only-export-components': 'off',
    },
  },
])
