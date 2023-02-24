<script setup lang="ts">
import { ref } from 'vue';

interface ParsePlatform {
	name: string,
	url: string
}
const parserList: Array<ParsePlatform> = [
	{
		name: "M1907",
		url: "https://im1907.top/?jx="
	},
	{
		name: "JSONPlayer",
		url: "https://jx.jsonplayer.com/player/?url="
	},
	{
		name: "爱豆",
		url: "https://jx.aidouer.net/?url="
	},
	{
		name: "OK解析",
		url: "https://okjx.cc/?url="
	},
	{
		name: '人人迷',
		url: 'https://jx.blbo.cc:4433/?url='
	},
	{
		name: "思古3",
		url: "https://jsap.attakids.com/?url="
	}
]

const platformList = [
	{
		logo: 'tencent.svg',
		name: "腾讯视频",
		url: "https://v.qq.com/x/search/?q="
	},
	{
		logo: 'bilibili.png',
		name: '哔哩哔哩',
		url: 'https://m.bilibili.com/search?keyword='
	},
	{
		logo: 'iqiyi.svg',
		name: '爱奇艺',
		url: 'https://www.iq.com/search?query='
	},
	{
		logo: 'youku.svg',
		name: "优酷",
		url: "https://search.youku.com/search_video?keyword="
	},
	{
		logo: 'le.png',
		name: '乐视',
		url: 'https://m.le.com/search?wd='
	},
]

function openUrl(url: string): void {
	window.open(url, '_blank')
}

const key = ref('')
const url = ref('')
const clipUrl = ref('')
const messageShow = ref(false)
const dialogShow = ref(false)

/**
 * 使用剪切板中的url
 */
function readClipboard(): void {
	navigator.clipboard.readText().then(clipText => {
		try {
			new URL(clipText)
			if (clipUrl.value && clipUrl.value === clipText) {
				return
			}
			clipUrl.value = clipText
			dialogShow.value = true
		} catch {

		}
	}).catch(e => {
		messageShow.value = true
	})
}

</script>

<template>
	<div class="searchbox">
		<v-text-field label="输入关键字，在下方的视频网站进行搜索" variant="solo" v-model="key"></v-text-field>
	</div>
	<v-container fluid>
		<v-row dense>
			<v-col v-for="item of platformList" :key="item.name" cols="6" sm="4" md="2">
				<v-card @click="openUrl(item.url + encodeURIComponent(key))">
					<v-img :src="item.logo" height="90px" contain class="logo"></v-img>
					<v-card-title>
						{{ item.name }}
					</v-card-title>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
	<v-spacer></v-spacer>
	<div class="searchbox">
		<v-text-field label="输入地址或关键字" variant="solo" v-model="url"
			@update:focused="focused => { focused && readClipboard() }"></v-text-field>
	</div>
	<v-spacer></v-spacer>
	<v-container fluid>
		<v-row dense>
			<v-col v-for="item of parserList" :key="item.name" cols="6" sm="4" md="2">
				<v-card @click="openUrl(item.url + encodeURIComponent(url))">
					<v-card-title>
						{{ item.name }}
					</v-card-title>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
	<v-dialog v-model="dialogShow" persistent width="80%">
		<v-card>
			<v-card-title>是否使用复制的地址？</v-card-title>
			<v-card-text>
				{{ clipUrl }}
			</v-card-text>
			<v-card-actions>
				<v-btn variant="elevated" color="primary" @click="url = clipUrl; dialogShow = false">确定</v-btn>
				<v-spacer></v-spacer>
				<v-btn variant="elevated" @click="dialogShow = false">取消</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
	<v-snackbar v-model="messageShow" timeout="2000">读取剪切板失败</v-snackbar>
</template>

<style scoped>
.logo {
	background-color: black;
}

.searchbox {
	width: 80%;
	margin: auto;
	padding: 22px 22px 0 22px;
	border-radius: 4px;
}
</style>
