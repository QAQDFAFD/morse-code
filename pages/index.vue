<template>
	<div>
		<div class="mb-8">
			<h1 class="text-3xl font-bold text-center mb-2">摩斯电码学习</h1>
			<p class="text-center text-gray-600 max-w-2xl mx-auto">
				摩斯电码是一种通过点（.）和划（-）的组合来表示字母、数字和标点符号的编码方式。
				点击下方字符卡片学习对应的摩斯电码。
			</p>
		</div>

		<div class="card mb-8">
			<div class="flex flex-col items-center justify-center p-8">
				<div class="text-6xl font-bold mb-4">{{ currentChar }}</div>
				<div class="morse-display">
					<template v-for="(symbol, index) in morseArray" :key="index">
						<span v-if="symbol === '.'" class="morse-dot"></span>
						<span v-else-if="symbol === '-'" class="morse-dash"></span>
						<span v-else class="morse-space"></span>
					</template>
				</div>
				<div class="text-2xl font-mono mb-6">{{ currentMorseCode }}</div>
				<button @click="playSound" class="btn-primary flex items-center">
					<span class="mr-2">播放声音</span>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
							clip-rule="evenodd" />
					</svg>
				</button>
			</div>
		</div>

		<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
			<div
				v-for="char in availableChars"
				:key="char"
				@click="selectChar(char)"
				class="morse-card"
				:class="{ active: char === currentChar }">
				<div class="text-2xl font-bold">{{ char }}</div>
				<div class="text-sm font-mono mt-2">{{ MORSE_CODE[char] }}</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, computed, onMounted } from 'vue'
	import { MORSE_CODE, playMorseSound } from '~/utils/morse'
	import { useMorseStore } from '~/stores/morse'

	const morseStore = useMorseStore()

	// 可用的字符（字母和数字）
	const availableChars = computed(() => {
		return Object.keys(MORSE_CODE).filter(char => (char >= 'A' && char <= 'Z') || (char >= '0' && char <= '9'))
	})

	// 当前选中的字符
	const currentChar = computed(() => morseStore.currentChar)

	// 当前字符的摩斯电码
	const currentMorseCode = computed(() => morseStore.currentMorseCode)

	// 将摩斯电码转换为数组，方便渲染
	const morseArray = computed(() => {
		return currentMorseCode.value.split('')
	})

	// 选择字符
	function selectChar(char) {
		morseStore.setCurrentChar(char)
	}

	// 播放声音
	async function playSound() {
		try {
			await playMorseSound(currentMorseCode.value, morseStore.soundSpeed)
		} catch (error) {
			console.error('播放声音失败:', error)
		}
	}

	// 页面加载时默认选择字符 A
	onMounted(() => {
		morseStore.setCurrentChar('A')
	})
</script>
