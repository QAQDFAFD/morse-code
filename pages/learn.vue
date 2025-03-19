<template>
	<div>
		<div class="mb-8">
			<h1 class="text-3xl font-bold text-center mb-2">Morse Code Learning</h1>
			<p class="text-center text-gray-600 max-w-2xl mx-auto">
				Morse code is a method of encoding text characters using sequences of dots (.) and dashes (-). Click on
				the character cards below to learn their corresponding Morse code.
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
					<span class="mr-2">Play Sound</span>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
							clip-rule="evenodd" />
					</svg>
				</button>
			</div>
		</div>

		<!-- Category-based learning area -->
		<div class="mb-8">
			<div class="flex justify-between items-center mb-4">
				<h2 class="text-xl font-semibold">Learn by Category</h2>
				<div>
					<select
						v-model="currentCategory"
						class="rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
						<option value="letters">Letters (A-Z)</option>
						<option value="numbers">Numbers (0-9)</option>
						<option value="punctuation">Punctuation</option>
						<option value="special">Special Characters</option>
					</select>
				</div>
			</div>

			<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
				<div
					v-for="char in filteredChars"
					:key="char"
					@click="selectChar(char)"
					class="morse-card"
					:class="{ active: char === currentChar }">
					<div class="text-2xl font-bold">{{ char }}</div>
					<div class="text-sm font-mono mt-2">{{ MORSE_CODE[char] }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, computed, onMounted } from 'vue'
	import { MORSE_CODE, playMorseSound } from '~/utils/morse'
	import { useMorseStore } from '~/stores/morse'

	const morseStore = useMorseStore()

	// Current category
	const currentCategory = ref('letters')

	// Classify all available characters
	const letterChars = computed(() => {
		return Object.keys(MORSE_CODE).filter(char => char >= 'A' && char <= 'Z')
	})

	const numberChars = computed(() => {
		return Object.keys(MORSE_CODE).filter(char => char >= '0' && char <= '9')
	})

	const punctuationChars = computed(() => {
		return Object.keys(MORSE_CODE).filter(char => ['.', ',', '?', "'", '!', ':', ';', '/'].includes(char))
	})

	const specialChars = computed(() => {
		return Object.keys(MORSE_CODE).filter(char =>
			['(', ')', '&', '=', '+', '-', '_', '"', '$', '@', ' '].includes(char)
		)
	})

	// Filter characters based on selected category
	const filteredChars = computed(() => {
		switch (currentCategory.value) {
			case 'letters':
				return letterChars.value
			case 'numbers':
				return numberChars.value
			case 'punctuation':
				return punctuationChars.value
			case 'special':
				return specialChars.value
			default:
				return letterChars.value
		}
	})

	// Currently selected character
	const currentChar = computed(() => morseStore.currentChar)

	// Morse code of the current character
	const currentMorseCode = computed(() => morseStore.currentMorseCode)

	// Convert Morse code to array for rendering
	const morseArray = computed(() => {
		return currentMorseCode.value.split('')
	})

	// Select a character
	function selectChar(char) {
		morseStore.setCurrentChar(char)
	}

	// Play sound
	async function playSound() {
		try {
			await playMorseSound(currentMorseCode.value, morseStore.soundSpeed)
		} catch (error) {
			console.error('Failed to play sound:', error)
		}
	}

	// Select character A when page loads
	onMounted(() => {
		morseStore.setCurrentChar('A')
	})
</script>
