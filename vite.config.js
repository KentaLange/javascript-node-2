import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      
      {
        name: 'sanitize-react-babel',
        api: {
          reactBabel(babelOptions) {
            // remove commonly problematic keys
            delete babelOptions.base;
            delete babelOptions.root;
          }
        }
      },
      // Use default plugin-react behavior.
      react(),
  ],
})
