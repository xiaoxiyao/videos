import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		VitePWA({
			registerType: 'autoUpdate',
			includeAssets: ['*.png', '*.svg'],
			manifest: {
				name: '免费视频解析',
				short_name: '视频解析',
				description: '解析全网视频免费播放',
				icons: [{
					src: 'favicon.svg',
					sizes: '48x48 72x72 96x96 128x128 256x256',
					type: 'image/svg+xml'
				}],
				background_color: '#FFFFFF',
				theme_color: '#50CC79'
			}
		})
	]
})
