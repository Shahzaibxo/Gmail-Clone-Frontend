import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
    return {
    define: {
      'process.env.REACT_APP_USERNAME': JSON.stringify(env.REACT_APP_USERNAME),
      'process.env.REACT_APP_PASSWORD': JSON.stringify(env.REACT_APP_PASSWORD)
    },
    server: {
      host: '0.0.0.0' // Set the server host to listen on all network interfaces
    },
    plugins: [react()],
  }
})