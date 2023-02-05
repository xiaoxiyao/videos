<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useVuEPG } from "vuepg";

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
]

const platformList = [
	{
		logo: './tencent.svg',
		name: "腾讯视频",
		url: "https://v.qq.com"
	}
];

function openUrl(url: string): void {
	window.open(url, '_blank');
}

const key = ref('');

/**
 * 使用剪切板中的url
 */
function readClipboard(): void {
	navigator.clipboard.readText().then(clipText => {
		try {
			new URL(clipText);
			key.value = clipText;
		} catch {

		}
	})
}

const epg = useVuEPG()

onMounted(() => {
	readClipboard()
	epg.moveToItem(epg.getItems()[0])
})

const focused = ref(false)

</script>

<template>
	<v-container fluid>
		<v-row dense v-epg-group>
			<v-col v-for="item of platformList" :key="item.name" cols="6" sm="4" md="2">
				<v-card @click="openUrl(item.url)" v-epg-item>
					<v-img :src="item.logo" height="120px" contain class="logo"></v-img>
					<v-card-title>
						{{ item.name }}
					</v-card-title>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
	<v-spacer></v-spacer>
	<div v-epg-item @focus="focused = true" @blur="focused = false" class="searchbox">
		<v-text-field label="输入地址或关键字" variant="solo" v-model="key" :focused="focused"></v-text-field>
	</div>
	<v-spacer></v-spacer>
	<v-container fluid>
		<v-row dense v-epg-group>
			<v-col v-for="item of parserList" :key="item.name" cols="6" sm="4" md="2">
				<v-card @click="openUrl(item.url + encodeURIComponent(key))" v-epg-item>
					<v-card-title>
						{{ item.name }}
					</v-card-title>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<style scoped>
.logo {
	background-color: black;
}

.vuepg-focus {
	outline: -webkit-focus-ring-color auto 1px;
}

.searchbox {
	width: 80%;
	margin: auto;
	padding: 22px 22px 0 22px;
	border-radius: 4px;

}
</style>
