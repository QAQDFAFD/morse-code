<template>
	<div>
		<div class="mb-8">
			<h1 class="text-3xl font-bold text-center mb-2">摩斯电码翻译</h1>
			<p class="text-center text-gray-600 max-w-3xl mx-auto">
				摩斯电码是一种由点(.)和划(-)组成的编码方式，最初由美国发明家萨缪尔·摩尔斯在1836年发明，用于电报通信。
				本工具可以帮助您在普通文本和摩斯电码之间进行双向翻译。
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
			<!-- 摩斯电码简介 -->
			<div class="card">
				<h2 class="text-xl font-semibold mb-4">摩斯电码介绍</h2>
				<p class="mb-4 text-gray-700">
					摩斯电码是一种使用点（.）和划（-）表示字母、数字和标点符号的编码形式。它被广泛应用于电报通信，也是早期无线电通信的基础。
				</p>
				<p class="mb-4 text-gray-700">
					在摩斯电码中，常用的字母使用较短的编码，而不常用的字母则使用较长的编码。例如，字母"E"（最常用的英文字母）用一个点（.）表示，而字母"Q"则用"--.-"表示。
				</p>
				<p class="text-gray-700">
					摩斯电码仍然在航海、航空、军事和业余无线电爱好者中使用，也是一种有趣的学习内容，可以锻炼记忆力和专注力。
				</p>
			</div>

			<!-- 摩斯电码约定 -->
			<div class="card">
				<h2 class="text-xl font-semibold mb-4">使用约定</h2>
				<ul class="list-disc pl-5 space-y-2 text-gray-700">
					<li>点（.）表示短信号</li>
					<li>划（-）表示长信号</li>
					<li>字母之间用一个空格分隔</li>
					<li>单词之间用三个空格或斜杠（/）分隔</li>
					<li>所有字母会被转换为大写</li>
					<li>不支持的字符将保持原样</li>
				</ul>
				<div class="mt-4 p-3 bg-indigo-50 rounded-md">
					<p class="text-sm text-indigo-700">
						例如，"SOS"在摩斯电码中是"... --- ..."，表示国际通用的求救信号。
					</p>
				</div>
			</div>
		</div>

		<!-- 翻译工具 -->
		<div class="card mb-8">
			<div class="flex flex-wrap md:flex-nowrap gap-4 items-center mb-6">
				<div class="w-full md:w-1/2">
					<h2 class="text-xl font-semibold mb-2">文本</h2>
					<div class="relative">
						<textarea
							v-model="textInput"
							@input="textToMorseTranslate"
							class="w-full h-40 p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
							placeholder="输入文本进行翻译..."></textarea>
						<button
							@click="clearTextInput"
							class="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
							v-if="textInput">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor">
								<path
									fill-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
									clip-rule="evenodd" />
							</svg>
						</button>
					</div>
					<div class="flex justify-between mt-2">
						<button
							@click="playTextAsMorse"
							class="btn-secondary text-sm flex items-center"
							:disabled="!textInput">
							<span class="mr-1">播放声音</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-4 w-4"
								viewBox="0 0 20 20"
								fill="currentColor">
								<path
									fill-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
									clip-rule="evenodd" />
							</svg>
						</button>
						<span class="text-xs text-gray-500">{{ textCharCount }} 个字符</span>
					</div>
				</div>

				<div class="hidden md:flex flex-col items-center justify-center">
					<div class="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-100">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6 text-indigo-600"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
						</svg>
					</div>
				</div>

				<div class="w-full md:w-1/2">
					<h2 class="text-xl font-semibold mb-2">摩斯电码</h2>
					<div class="relative">
						<textarea
							v-model="morseInput"
							@input="morseToTextTranslate"
							class="w-full h-40 p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 font-mono"
							placeholder="输入摩斯电码进行翻译..."></textarea>
						<button
							@click="clearMorseInput"
							class="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
							v-if="morseInput">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor">
								<path
									fill-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
									clip-rule="evenodd" />
							</svg>
						</button>
					</div>
					<div class="flex justify-between mt-2">
						<button
							@click="playMorseSound"
							class="btn-secondary text-sm flex items-center"
							:disabled="!morseInput">
							<span class="mr-1">播放声音</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-4 w-4"
								viewBox="0 0 20 20"
								fill="currentColor">
								<path
									fill-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
									clip-rule="evenodd" />
							</svg>
						</button>
						<span class="text-xs text-gray-500">{{ morseCharCount }} 个字符</span>
					</div>
				</div>
			</div>

			<!-- 摩斯电码键盘 -->
			<div>
				<h3 class="text-lg font-medium mb-3">摩斯电码键盘</h3>
				<div class="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-9 lg:grid-cols-13 gap-2 mb-4">
					<button v-for="char in availableChars" :key="char" @click="insertChar(char)" class="morse-key-btn">
						<div class="text-lg font-bold">{{ char }}</div>
						<div class="text-xs font-mono">{{ MORSE_CODE[char] }}</div>
					</button>
				</div>
				<div class="flex flex-wrap gap-2">
					<button @click="insertMorseChar('.')" class="morse-special-btn">
						<span class="morse-dot"></span> 点
					</button>
					<button @click="insertMorseChar('-')" class="morse-special-btn">
						<span class="morse-dash"></span> 划
					</button>
					<button @click="insertMorseChar(' ')" class="morse-special-btn">字母间隔</button>
					<button @click="insertMorseChar('/')" class="morse-special-btn">单词间隔</button>
					<button @click="insertMorseChar('\n')" class="morse-special-btn">换行</button>
				</div>
			</div>
		</div>

		<!-- 摩斯电码表 -->
		<div class="card">
			<h2 class="text-xl font-semibold mb-4">摩斯电码对照表</h2>
			<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
				<div
					v-for="char in Object.keys(MORSE_CODE)"
					:key="char"
					class="p-3 bg-gray-50 rounded-md flex justify-between items-center">
					<div class="text-lg font-bold">{{ char }}</div>
					<div class="font-mono text-sm">{{ MORSE_CODE[char] }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, computed, onUnmounted } from 'vue'
	import {
		MORSE_CODE,
		REVERSE_MORSE_CODE,
		textToMorse,
		morseToText,
		playMorseSound as playMorse
	} from '~/utils/morse'

	// 输入框的内容
	const textInput = ref('')
	const morseInput = ref('')

	// 计算字符数
	const textCharCount = computed(() => textInput.value.length)
	const morseCharCount = computed(() => morseInput.value.length)

	// 可用的字符（字母和数字）
	const availableChars = computed(() => {
		return Object.keys(MORSE_CODE).filter(char => (char >= 'A' && char <= 'Z') || (char >= '0' && char <= '9'))
	})

	// 文本转摩斯电码
	function textToMorseTranslate() {
		if (textInput.value.trim() === '') {
			morseInput.value = ''
			return
		}

		morseInput.value = textToMorse(textInput.value)
	}

	// 摩斯电码转文本
	function morseToTextTranslate() {
		if (morseInput.value.trim() === '') {
			textInput.value = ''
			return
		}

		textInput.value = morseToText(morseInput.value)
	}

	// 清空输入框
	function clearTextInput() {
		textInput.value = ''
		morseInput.value = ''
	}

	function clearMorseInput() {
		morseInput.value = ''
		textInput.value = ''
	}

	// 播放文本对应的摩斯电码声音
	async function playTextAsMorse() {
		if (!textInput.value) return

		const morseCode = textToMorse(textInput.value)
		await playMorse(morseCode, 100)
	}

	// 播放摩斯电码声音
	async function playMorseSound() {
		if (!morseInput.value) return

		await playMorse(morseInput.value, 100)
	}

	// 插入字符到文本框
	function insertChar(char) {
		textInput.value += char
		textToMorseTranslate()
	}

	// 插入摩斯字符到摩斯电码框
	function insertMorseChar(char) {
		morseInput.value += char
		morseToTextTranslate()
	}
</script>

<style scoped>
	.morse-key-btn {
		@apply p-2 border border-gray-300 rounded-md hover:bg-indigo-50 hover:border-indigo-300 transition-colors flex flex-col items-center justify-center;
	}

	.morse-special-btn {
		@apply px-3 py-2 border border-gray-300 rounded-md hover:bg-indigo-50 hover:border-indigo-300 transition-colors flex items-center justify-center;
	}
</style>
