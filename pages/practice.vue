<template>
	<div>
		<div class="mb-8">
			<h1 class="text-3xl font-bold text-center mb-2">Morse Code Practice</h1>
			<p class="text-center text-gray-600 max-w-2xl mx-auto">
				Deepen your understanding and memory of Morse code through practice. Choose a practice mode and start
				the challenge!
			</p>
		</div>

		<!-- Practice Settings -->
		<div v-if="!practiceStarted" class="card mb-8">
			<h2 class="text-xl font-semibold mb-4">Practice Settings</h2>

			<div class="mb-4">
				<label class="block text-sm font-medium text-gray-700 mb-1">Practice Mode</label>
				<div class="flex space-x-4">
					<label class="inline-flex items-center">
						<input
							type="radio"
							v-model="practiceMode"
							value="decode"
							class="form-radio h-4 w-4 text-indigo-600" />
						<span class="ml-2">Decode Mode (See Morse code, enter the character)</span>
					</label>
					<label class="inline-flex items-center">
						<input
							type="radio"
							v-model="practiceMode"
							value="encode"
							class="form-radio h-4 w-4 text-indigo-600" />
						<span class="ml-2">Encode Mode (See character, enter Morse code)</span>
					</label>
				</div>
			</div>

			<div class="mb-4">
				<label class="block text-sm font-medium text-gray-700 mb-1">Number of Questions</label>
				<select
					v-model="questionCount"
					class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
					<option value="4">4 questions</option>
					<option value="8">8 questions</option>
					<option value="12">12 questions</option>
				</select>
			</div>

			<button @click="startPractice" class="btn-primary">Start Practice</button>
		</div>

		<!-- Practice Content -->
		<div v-else>
			<!-- Timer -->
			<div v-if="!practiceCompleted" class="card mb-8 flex justify-between items-center">
				<h2 class="text-xl font-semibold">Practice in Progress</h2>
				<div class="text-lg font-mono" :class="{ 'text-indigo-600 animate-pulse-slow': timerRunning }">
					Time: {{ formatTime(elapsedTime) }}
				</div>
			</div>
			<div v-else class="card mb-8 flex justify-between items-center bg-indigo-50">
				<h2 class="text-xl font-semibold">Practice Completed</h2>
				<div class="text-lg font-mono text-indigo-700 font-bold">Total Time: {{ formatTime(elapsedTime) }}</div>
			</div>

			<!-- Practice Results -->
			<div v-if="practiceCompleted" class="card mb-8">
				<h2 class="text-xl font-semibold mb-4">Practice Results</h2>
				<div class="text-center mb-4">
					<div class="text-4xl font-bold mb-2">{{ Math.round(practiceAccuracy) }}%</div>
					<p class="text-gray-600">Accuracy</p>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
					<div
						v-for="(char, index) in practiceChars"
						:key="index"
						class="p-4 rounded-lg"
						:class="practiceResults[index] ? 'bg-green-50' : 'bg-red-50'">
						<div class="flex justify-between items-center">
							<div>
								<div class="font-semibold">Question {{ index + 1 }}</div>
								<div v-if="practiceMode === 'decode'">
									<div class="font-mono">{{ MORSE_CODE[char] }}</div>
									<div>Correct answer: {{ char }}</div>
								</div>
								<div v-else>
									<div>{{ char }}</div>
									<div>Correct answer: {{ MORSE_CODE[char] }}</div>
								</div>
							</div>
							<div>
								<div>Your answer:</div>
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
					<button @click="startPractice" class="btn-primary">Practice Again</button>
					<button @click="resetPractice" class="btn-secondary">Return to Settings</button>
				</div>
			</div>

			<!-- Practice Questions -->
			<div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
				<div
					v-for="(char, index) in practiceChars"
					:key="index"
					class="card"
					:class="{
						'border-2 border-green-500': isAnswered(index) && practiceResults[index],
						'border-2 border-red-500': isAnswered(index) && !practiceResults[index]
					}">
					<div class="mb-2 font-semibold flex justify-between items-center">
						<span>Question {{ index + 1 }}</span>
						<span v-if="isAnswered(index)">
							<svg
								v-if="practiceResults[index]"
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5 text-green-500"
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
								class="h-5 w-5 text-red-500"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M6 18L18 6M6 6l12 12" />
							</svg>
						</span>
					</div>

					<!-- Decode Mode -->
					<div v-if="practiceMode === 'decode'" class="mb-4">
						<div class="morse-display">
							<template v-for="(symbol, symbolIndex) in MORSE_CODE[char].split('')" :key="symbolIndex">
								<span v-if="symbol === '.'" class="morse-dot"></span>
								<span v-else-if="symbol === '-'" class="morse-dash"></span>
								<span v-else class="morse-space"></span>
							</template>
						</div>
						<div class="font-mono text-center mb-2">{{ MORSE_CODE[char] }}</div>
						<button @click="playCharSound(char)" class="btn-secondary w-full mb-2 text-sm">
							Play Sound
						</button>
					</div>

					<!-- Encode Mode -->
					<div v-else class="mb-4">
						<div class="text-4xl font-bold text-center mb-2">{{ char }}</div>
					</div>

					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">Your Answer</label>
						<input
							type="text"
							v-model="answers[index]"
							@keyup.enter="submitAnswer(index)"
							class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							:placeholder="practiceMode === 'decode' ? 'Enter character' : 'Enter Morse code'"
							:disabled="isAnswered(index)"
							:class="{
								'bg-green-50': isAnswered(index) && practiceResults[index],
								'bg-red-50': isAnswered(index) && !practiceResults[index]
							}" />
						<div v-if="isAnswered(index) && !practiceResults[index]" class="text-sm text-red-600 mt-1">
							Correct answer: {{ practiceMode === 'decode' ? char : MORSE_CODE[char] }}
						</div>
						<button
							@click="submitAnswer(index)"
							class="btn-primary w-full mt-2"
							:disabled="isAnswered(index)"
							:class="{ 'opacity-50 cursor-not-allowed': isAnswered(index) }">
							Submit
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, computed, reactive, watch, onUnmounted } from 'vue'
	import { MORSE_CODE, playMorseSound } from '~/utils/morse'
	import { useMorseStore } from '~/stores/morse'

	const morseStore = useMorseStore()

	// Practice settings
	const practiceMode = ref('decode')
	const questionCount = ref(8)
	const practiceStarted = ref(false)

	// Practice state
	const answers = reactive({})

	// Timer related
	const elapsedTime = ref(0)
	const timerInterval = ref(null)
	const timerRunning = ref(false)

	// Data from store
	const practiceChars = computed(() => morseStore.practiceChars)
	const userAnswers = computed(() => morseStore.userAnswers)
	const practiceResults = computed(() => morseStore.practiceResults)
	const practiceCompleted = computed(() => morseStore.practiceCompleted)
	const practiceAccuracy = computed(() => morseStore.practiceAccuracy)

	// Start timer
	function startTimer() {
		timerRunning.value = true
		elapsedTime.value = 0
		clearInterval(timerInterval.value)
		timerInterval.value = setInterval(() => {
			elapsedTime.value += 1
		}, 1000)
	}

	// Stop timer
	function stopTimer() {
		timerRunning.value = false
		clearInterval(timerInterval.value)
	}

	// Format time (seconds -> mm:ss)
	function formatTime(seconds) {
		const minutes = Math.floor(seconds / 60)
		const remainingSeconds = seconds % 60
		return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
	}

	// Check if a question has been answered
	function isAnswered(index) {
		return index in practiceResults.value
	}

	// Start practice
	function startPractice() {
		morseStore.startNewPractice(practiceMode.value, parseInt(questionCount.value))
		practiceStarted.value = true
		Object.keys(answers).forEach(key => delete answers[key])
		startTimer()
	}

	// Reset practice
	function resetPractice() {
		practiceStarted.value = false
		stopTimer()
	}

	// Submit answer
	function submitAnswer(index) {
		if (!answers[index] || isAnswered(index)) return

		morseStore.submitAnswer(index, answers[index])

		// If all questions are completed, stop the timer
		if (practiceCompleted.value) {
			stopTimer()
		}
	}

	// Play character's Morse code sound
	async function playCharSound(char) {
		try {
			await playMorseSound(MORSE_CODE[char], morseStore.soundSpeed)
		} catch (error) {
			console.error('Failed to play sound:', error)
		}
	}

	// Watch for changes in answers from store, sync to local state
	watch(userAnswers, newAnswers => {
		Object.entries(newAnswers).forEach(([index, answer]) => {
			answers[index] = answer
		})
	})

	// Clean up timer when component is unmounted
	onUnmounted(() => {
		stopTimer()
	})
</script>
