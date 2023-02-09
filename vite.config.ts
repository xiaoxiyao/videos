import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	build: {
		rollupOptions: {
			output: {
				freeze: false, // vuepg插件会对导入的模块进行assign，所以这里不能freeze
			}
		}
	}
})
