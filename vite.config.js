import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.REACT_APP_USERNAME': JSON.stringify(env.REACT_APP_USERNAME),
      'process.env.REACT_APP_PASSWORD': JSON.stringify(env.REACT_APP_PASSWORD)
    },
    plugins: [react()],
  }
})