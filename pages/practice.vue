<template>
	<div>
		<div class="mb-8">
			<h1 class="text-3xl font-bold text-center mb-2">摩斯电码练习</h1>
			<p class="text-center text-gray-600 max-w-2xl mx-auto">
				通过练习加深对摩斯电码的理解和记忆。选择练习模式，然后开始挑战！
			</p>
		</div>

		<!-- 练习设置 -->
		<div v-if="!practiceStarted" class="card mb-8">
			<h2 class="text-xl font-semibold mb-4">练习设置</h2>

			<div class="mb-4">
				<label class="block text-sm font-medium text-gray-700 mb-1">练习模式</label>
				<div class="flex space-x-4">
					<label class="inline-flex items-center">
						<input
							type="radio"
							v-model="practiceMode"
							value="decode"
							class="form-radio h-4 w-4 text-indigo-600" />
						<span class="ml-2">解码模式（看到摩斯电码，输入对应字符）</span>
					</label>
					<label class="inline-flex items-center">
						<input
							type="radio"
							v-model="practiceMode"
							value="encode"
							class="form-radio h-4 w-4 text-indigo-600" />
						<span class="ml-2">编码模式（看到字符，输入摩斯电码）</span>
					</label>
				</div>
			</div>

			<div class="mb-4">
				<label class="block text-sm font-medium text-gray-700 mb-1">题目数量</label>
				<select
					v-model="questionCount"
					class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
					<option value="4">4题</option>
					<option value="8">8题</option>
					<option value="12">12题</option>
				</select>
			</div>

			<button @click="startPractice" class="btn-primary">开始练习</button>
		</div>

		<!-- 练习内容 -->
		<div v-else>
			<!-- 练习结果 -->
			<div v-if="practiceCompleted" class="card mb-8">
				<h2 class="text-xl font-semibold mb-4">练习结果</h2>
				<div class="text-center mb-4">
					<div class="text-4xl font-bold mb-2">{{ Math.round(practiceAccuracy) }}%</div>
					<p class="text-gray-600">正确率</p>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
					<div
						v-for="(char, index) in practiceChars"
						:key="index"
						class="p-4 rounded-lg"
						:class="practiceResults[index] ? 'bg-green-50' : 'bg-red-50'">
						<div class="flex justify-between items-center">
							<div>
								<div class="font-semibold">题目 {{ index + 1 }}</div>
								<div v-if="practiceMode === 'decode'">
									<div class="font-mono">{{ MORSE_CODE[char] }}</div>
									<div>正确答案: {{ char }}</div>
								</div>
								<div v-else>
									<div>{{ char }}</div>
									<div>正确答案: {{ MORSE_CODE[char] }}</div>
								</div>
							</div>
							<div>
								<div>你的答案:</div>
								<div class="font-mono">{{ userAnswers[index] || '-' }}</div>
							</div>
							<div>
								<svg
									v-if="practiceResults[index]"
									xmlns="http://www.w3.org/2000/svg"
									class="h-6 w-6 text-green-500"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M5 13l4 4L19 7" />
								</svg>
								<svg
									v-else
									xmlns="http://www.w3.org/2000/svg"
									class="h-6 w-6 text-red-500"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M6 18L18 6M6 6l12 12" />
								</svg>
							</div>
						</div>
					</div>
				</div>

				<div class="flex space-x-4">
					<button @click="startPractice" class="btn-primary">再次练习</button>
					<button @click="resetPractice" class="btn-secondary">返回设置</button>
				</div>
			</div>

			<!-- 练习题目 -->
			<div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
				<div v-for="(char, index) in practiceChars" :key="index" class="card">
					<div class="mb-2 font-semibold">题目 {{ index + 1 }}</div>

					<!-- 解码模式 -->
					<div v-if="practiceMode === 'decode'" class="mb-4">
						<div class="morse-display">
							<template v-for="(symbol, symbolIndex) in MORSE_CODE[char].split('')" :key="symbolIndex">
								<span v-if="symbol === '.'" class="morse-dot"></span>
								<span v-else-if="symbol === '-'" class="morse-dash"></span>
								<span v-else class="morse-space"></span>
							</template>
						</div>
						<div class="font-mono text-center mb-2">{{ MORSE_CODE[char] }}</div>
						<button @click="playCharSound(char)" class="btn-secondary w-full mb-2 text-sm">播放声音</button>
					</div>

					<!-- 编码模式 -->
					<div v-else class="mb-4">
						<div class="text-4xl font-bold text-center mb-2">{{ char }}</div>
					</div>

					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">你的答案</label>
						<input
							type="text"
							v-model="answers[index]"
							@keyup.enter="submitAnswer(index)"
							class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							:placeholder="practiceMode === 'decode' ? '输入字符' : '输入摩斯电码'" />
						<button @click="submitAnswer(index)" class="btn-primary w-full mt-2">提交</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, computed, reactive, watch } from 'vue'
	import { MORSE_CODE, playMorseSound } from '~/utils/morse'
	import { useMorseStore } from '~/stores/morse'

	const morseStore = useMorseStore()

	// 练习设置
	const practiceMode = ref('decode')
	const questionCount = ref(8)
	const practiceStarted = ref(false)

	// 练习状态
	const answers = reactive({})

	// 从 store 获取数据
	const practiceChars = computed(() => morseStore.practiceChars)
	const userAnswers = computed(() => morseStore.userAnswers)
	const practiceResults = computed(() => morseStore.practiceResults)
	const practiceCompleted = computed(() => morseStore.practiceCompleted)
	const practiceAccuracy = computed(() => morseStore.practiceAccuracy)

	// 开始练习
	function startPractice() {
		morseStore.startNewPractice(practiceMode.value, parseInt(questionCount.value))
		practiceStarted.value = true
		Object.keys(answers).forEach(key => delete answers[key])
	}

	// 重置练习
	function resetPractice() {
		practiceStarted.value = false
	}

	// 提交答案
	function submitAnswer(index) {
		if (!answers[index]) return

		morseStore.submitAnswer(index, answers[index])
	}

	// 播放字符的摩斯电码声音
	async function playCharSound(char) {
		try {
			await playMorseSound(MORSE_CODE[char], morseStore.soundSpeed)
		} catch (error) {
			console.error('播放声音失败:', error)
		}
	}

	// 监听 store 中的答案变化，同步到本地状态
	watch(userAnswers, newAnswers => {
		Object.entries(newAnswers).forEach(([index, answer]) => {
			answers[index] = answer
		})
	})
</script>
