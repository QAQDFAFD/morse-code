<template>
	<div>
		<div class="mb-8">
			<h1 class="text-3xl font-bold text-center mb-2">Morse Code Translator & Decoder</h1>
			<p class="text-center text-gray-600 max-w-3xl mx-auto">
				Welcome to <span class="font-semibold">morsetraduction.online</span> - the free online Morse code
				translator (morse traduction) tool. Easily convert text to Morse code and translate Morse code to text
				in real-time with our interactive tool. Originally invented by Samuel Morse in 1836 for telegraph
				communication, Morse code remains relevant today.
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
			<!-- Morse Code Introduction -->
			<div class="card">
				<h2 class="text-xl font-semibold mb-4">About Morse Code Translation</h2>
				<p class="mb-4 text-gray-700">
					Morse code is a character encoding scheme that uses dots (.) and dashes (-) to represent letters,
					numbers, and punctuation. Our morse traduction tool provides instant translation between text and
					Morse code.
				</p>
				<p class="mb-4 text-gray-700">
					In Morse code, frequently-used letters have shorter codes, while less common ones have longer codes.
					For example, the letter "E" (the most common letter in English) is represented by a single dot (.),
					while the letter "Q" is represented by "--.-".
				</p>
				<p class="text-gray-700">
					Though originally used for telegraph communications, Morse code translation (traduction) remains
					important in maritime, aviation, military, and amateur radio communications today. Our online
					translator makes learning and using Morse code accessible to everyone.
				</p>
			</div>

			<!-- Morse Code Conventions -->
			<div class="card">
				<h2 class="text-xl font-semibold mb-4">Morse Traduction Conventions</h2>
				<ul class="list-disc pl-5 space-y-2 text-gray-700">
					<li>Dots (.) represent short signals or "dits"</li>
					<li>Dashes (-) represent long signals or "dahs"</li>
					<li>Letters are separated by one space in morse traduction</li>
					<li>Words are separated by three spaces or a slash (/)</li>
					<li>All letters will be converted to uppercase for translation</li>
					<li>Unsupported characters will remain unchanged</li>
				</ul>
				<div class="mt-4 p-3 bg-indigo-50 rounded-md">
					<p class="text-sm text-indigo-700">
						For example, "SOS" in Morse code is "... --- ...", representing the international distress
						signal. Try our morse traduction tool below to translate more phrases instantly.
					</p>
				</div>
			</div>
		</div>

		<!-- Translation Tool -->
		<div class="card mb-8" id="translator">
			<h2 class="text-2xl font-semibold mb-4 text-center">Free Online Morse Code Translator</h2>
			<div class="flex flex-wrap md:flex-nowrap gap-4 items-center mb-6">
				<div class="w-full md:w-1/2">
					<h3 class="text-xl font-semibold mb-2">Text</h3>
					<div class="relative">
						<textarea
							v-model="textInput"
							@input="textToMorseTranslate"
							class="w-full h-40 p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
							placeholder="Enter text to translate to Morse code..."></textarea>
						<div class="absolute right-2 top-2 flex space-x-1">
							<button
								@click="copyToClipboard(textInput)"
								class="text-gray-400 hover:text-gray-600 p-1"
								v-if="textInput"
								title="Copy text">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
								</svg>
							</button>
							<button
								@click="clearTextInput"
								class="text-gray-400 hover:text-gray-600 p-1"
								v-if="textInput"
								title="Clear text">
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
					</div>
					<div class="flex justify-end mt-2">
						<span class="text-xs text-gray-500">{{ textCharCount }} characters</span>
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
					<h3 class="text-xl font-semibold mb-2">Morse Code</h3>
					<div class="relative">
						<textarea
							v-model="morseInput"
							@input="morseToTextTranslate"
							class="w-full h-40 p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 font-mono"
							placeholder="Enter Morse code to translate to text..."></textarea>
						<div class="absolute right-2 top-2 flex space-x-1">
							<button
								@click="copyToClipboard(morseInput)"
								class="text-gray-400 hover:text-gray-600 p-1"
								v-if="morseInput"
								title="Copy Morse code">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
								</svg>
							</button>
							<button
								@click="clearMorseInput"
								class="text-gray-400 hover:text-gray-600 p-1"
								v-if="morseInput"
								title="Clear Morse code">
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
					</div>
					<div class="flex justify-between mt-2">
						<button
							@click="playMorseSound"
							class="btn-secondary text-sm flex items-center"
							:disabled="!morseInput">
							<span class="mr-1">Play Sound</span>
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
						<span class="text-xs text-gray-500">{{ morseCharCount }} characters</span>
					</div>
				</div>
			</div>

			<!-- Morse Code Keyboard -->
			<div>
				<h3 class="text-lg font-medium mb-3">Morse Code Keyboard</h3>
				<div class="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-9 lg:grid-cols-13 gap-2 mb-4">
					<button v-for="char in availableChars" :key="char" @click="insertChar(char)" class="morse-key-btn">
						<div class="text-lg font-bold">{{ char }}</div>
						<div class="text-xs font-mono">{{ MORSE_CODE[char] }}</div>
					</button>
				</div>
				<div class="flex flex-wrap gap-2">
					<button @click="insertMorseChar('.')" class="morse-special-btn">
						<span class="morse-dot"></span> Dot
					</button>
					<button @click="insertMorseChar('-')" class="morse-special-btn">
						<span class="morse-dash"></span> Dash
					</button>
					<button @click="insertMorseChar(' ')" class="morse-special-btn">Letter Space</button>
					<button @click="insertMorseChar('/')" class="morse-special-btn">Word Space</button>
					<button @click="insertMorseChar('\n')" class="morse-special-btn">Line Break</button>
				</div>
			</div>
		</div>

		<!-- Morse Code Table -->
		<div class="card">
			<h2 class="text-2xl font-semibold mb-4 text-center">Complete Morse Code Reference Table</h2>
			<p class="text-center text-gray-600 max-w-3xl mx-auto mb-6">
				Use this comprehensive Morse code chart for translation (traduction) reference. Our translator above
				supports all these characters.
			</p>

			<!-- Letters -->
			<h3 class="text-lg font-medium mb-2">Letters</h3>
			<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-3 mb-6">
				<div
					v-for="char in letterChars"
					:key="char"
					class="p-3 bg-gray-50 rounded-md flex justify-between items-center">
					<div class="text-lg font-bold">{{ char }}</div>
					<div class="font-mono text-sm">{{ MORSE_CODE[char] }}</div>
				</div>
			</div>

			<!-- Numbers -->
			<h3 class="text-lg font-medium mb-2">Numbers</h3>
			<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-3 mb-6">
				<div
					v-for="char in numberChars"
					:key="char"
					class="p-3 bg-gray-50 rounded-md flex justify-between items-center">
					<div class="text-lg font-bold">{{ char }}</div>
					<div class="font-mono text-sm">{{ MORSE_CODE[char] }}</div>
				</div>
			</div>

			<!-- Punctuation -->
			<h3 class="text-lg font-medium mb-2">Punctuation</h3>
			<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
				<div
					v-for="char in punctuationChars"
					:key="char"
					class="p-3 bg-gray-50 rounded-md flex justify-between items-center">
					<div class="text-lg font-bold">{{ char }}</div>
					<div class="font-mono text-sm">{{ MORSE_CODE[char] }}</div>
				</div>
			</div>

			<!-- Special Characters -->
			<h3 class="text-lg font-medium mb-2">Special Characters</h3>
			<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
				<div
					v-for="char in specialChars"
					:key="char"
					class="p-3 bg-gray-50 rounded-md flex justify-between items-center">
					<div class="text-lg font-bold">{{ char }}</div>
					<div class="font-mono text-sm">{{ MORSE_CODE[char] }}</div>
				</div>
			</div>
		</div>

		<!-- SEO Content Section -->
		<div class="mt-8 prose prose-indigo max-w-none">
			<h2 class="text-2xl font-semibold mb-4">Why Use Our Morse Code Translator?</h2>
			<p>
				At <strong>morsetraduction.online</strong>, we offer a free, fast, and accurate Morse code translator
				(morse traduction) that works in both directions. Whether you need to convert text to Morse code or
				decode Morse code back to text, our tool makes the process simple and intuitive.
			</p>
			<h3 class="text-xl font-semibold mt-6 mb-2">Features of Our Morse Traduction Tool:</h3>
			<ul class="list-disc pl-5 space-y-2">
				<li><strong>Real-time translation</strong> - See results instantly as you type</li>
				<li><strong>Two-way conversion</strong> - Text to Morse code and Morse code to text</li>
				<li><strong>Audio playback</strong> - Hear how the Morse code sounds</li>
				<li><strong>Easy copying</strong> - Copy translations to clipboard with one click</li>
				<li><strong>Comprehensive reference</strong> - Complete Morse code chart for all characters</li>
				<li><strong>Interactive keyboard</strong> - Click to insert characters or Morse symbols</li>
				<li><strong>Common Morse codes</strong> - Learn popular signals like SOS and more</li>
			</ul>
			<p class="mt-4">
				Whether you're learning Morse code, teaching it to others, or need it for practical applications, our
				translator provides the perfect solution. Bookmark <strong>morsetraduction.online</strong> for all your
				Morse code translation needs!
			</p>

			<!-- New section to promote Common Codes page -->
			<div
				class="mt-8 p-4 border border-indigo-200 bg-indigo-50 rounded-lg flex flex-col md:flex-row items-center justify-between">
				<div class="mb-4 md:mb-0 md:mr-6">
					<h3 class="text-lg font-semibold text-indigo-700">Discover Common Morse Code Signals</h3>
					<p class="text-sm text-gray-700 mt-1">
						Learn important Morse code signals like SOS, emergency codes, and standard abbreviations used in
						professional communications.
					</p>
				</div>
				<nuxt-link to="/common-codes" class="btn-primary whitespace-nowrap"> View Common Codes </nuxt-link>
			</div>
		</div>

		<!-- FAQ Section for SEO -->
		<div class="mt-8 card">
			<h2 class="text-2xl font-semibold mb-6 text-center">Frequently Asked Questions About Morse Code</h2>

			<div class="space-y-6">
				<div>
					<h3 class="text-lg font-semibold">What is Morse code and who invented it?</h3>
					<p class="text-gray-700 mt-2">
						Morse code is a method of encoding text characters as sequences of dots and dashes (or short and
						long signals). It was developed by Samuel Morse and Alfred Vail in the 1830s and 1840s for use
						with the telegraph, the first widely used electrical telecommunications system.
					</p>
				</div>

				<div>
					<h3 class="text-lg font-semibold">How does Morse code work?</h3>
					<p class="text-gray-700 mt-2">
						Morse code assigns a unique combination of dots and dashes to each letter, number, and some
						punctuation marks. These can be transmitted as electrical pulses, sound tones, light flashes, or
						even physical taps. Our morse traduction tool converts between text and these dot-dash patterns.
					</p>
				</div>

				<div>
					<h3 class="text-lg font-semibold">Is Morse code still used today?</h3>
					<p class="text-gray-700 mt-2">
						Yes, Morse code is still used in several fields including aviation, amateur radio, and some
						military and maritime communications. It's valued for its simplicity and ability to be
						transmitted in adverse conditions where other forms of communication might fail.
					</p>
				</div>

				<div>
					<h3 class="text-lg font-semibold">What does "SOS" mean in Morse code?</h3>
					<p class="text-gray-700 mt-2">
						SOS (... --- ...) is the international distress signal in Morse code. Contrary to popular
						belief, it doesn't stand for "Save Our Souls" or "Save Our Ship" - it was chosen because it's
						easy to transmit and unmistakable: three dots, three dashes, three dots.
					</p>
				</div>

				<div>
					<h3 class="text-lg font-semibold">How can I learn Morse code?</h3>
					<p class="text-gray-700 mt-2">
						Learning Morse code involves memorizing the dot-dash patterns for each character and practicing
						sending and receiving. Our translator at morsetraduction.online is a great tool for practice,
						and our learning and practice sections provide structured exercises to help you master Morse
						code.
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, computed, reactive, onMounted } from 'vue'
	import {
		MORSE_CODE,
		REVERSE_MORSE_CODE,
		textToMorse,
		morseToText,
		playMorseSound as playMorse
	} from '~/utils/morse'

	// SEO setup
	useHead({
		title: 'Morse Code Translator | Free Online Morse Traduction Tool',
		meta: [
			{
				name: 'description',
				content:
					'Free online Morse code translator (morse traduction). Convert text to Morse code and decode Morse code to text with our interactive translation tool.'
			}
		]
	})

	// Input fields content
	const textInput = ref('')
	const morseInput = ref('')

	// Copy status notifications
	const copyStatus = reactive({
		text: false,
		morse: false
	})

	// Character count
	const textCharCount = computed(() => textInput.value.length)
	const morseCharCount = computed(() => morseInput.value.length)

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

	// Available characters (letters and numbers)
	const availableChars = computed(() => {
		return Object.keys(MORSE_CODE).filter(char => (char >= 'A' && char <= 'Z') || (char >= '0' && char <= '9'))
	})

	// Text to Morse code translation
	function textToMorseTranslate() {
		if (textInput.value.trim() === '') {
			morseInput.value = ''
			return
		}

		morseInput.value = textToMorse(textInput.value)
	}

	// Morse code to text translation
	function morseToTextTranslate() {
		if (morseInput.value.trim() === '') {
			textInput.value = ''
			return
		}

		textInput.value = morseToText(morseInput.value)
	}

	// Clear input fields
	function clearTextInput() {
		textInput.value = ''
		morseInput.value = ''
	}

	function clearMorseInput() {
		morseInput.value = ''
		textInput.value = ''
	}

	// Copy to clipboard
	async function copyToClipboard(text) {
		if (!text) return

		try {
			await navigator.clipboard.writeText(text)

			// Show copy success notification
			if (text === textInput.value) {
				copyStatus.text = true
				setTimeout(() => {
					copyStatus.text = false
				}, 2000)
			} else {
				copyStatus.morse = true
				setTimeout(() => {
					copyStatus.morse = false
				}, 2000)
			}
		} catch (err) {
			console.error('Copy failed:', err)
		}
	}

	// Play Morse code sound
	async function playMorseSound() {
		if (!morseInput.value) return

		await playMorse(morseInput.value, 100)
	}

	// Insert character to text input
	function insertChar(char) {
		textInput.value += char
		textToMorseTranslate()
	}

	// Insert Morse character to Morse code input
	function insertMorseChar(char) {
		morseInput.value += char
		morseToTextTranslate()
	}

	// Set example text when page loads
	onMounted(() => {
		if (!textInput.value) {
			textInput.value = 'MORSE TRADUCTION'
			textToMorseTranslate()
		}
	})
</script>

<style scoped>
	.morse-key-btn {
		@apply p-2 border border-gray-300 rounded-md hover:bg-indigo-50 hover:border-indigo-300 transition-colors flex flex-col items-center justify-center;
	}

	.morse-special-btn {
		@apply px-3 py-2 border border-gray-300 rounded-md hover:bg-indigo-50 hover:border-indigo-300 transition-colors flex items-center justify-center;
	}
</style>
