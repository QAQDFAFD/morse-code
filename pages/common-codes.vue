<template>
	<div>
		<div class="mb-8">
			<h1 class="text-3xl font-bold text-center mb-2">Common Morse Code Phrases & Signals</h1>
			<p class="text-center text-gray-600 max-w-3xl mx-auto">
				This page lists common Morse code phrases, signals, and abbreviations used in telecommunications. These
				standardized codes are essential for efficient communication, especially in emergency situations.
			</p>
		</div>

		<!-- Emergency Signals -->
		<div class="card mb-8">
			<h2 class="text-2xl font-semibold mb-4">Emergency Signals</h2>
			<p class="text-gray-600 mb-4">
				These are internationally recognized distress signals in Morse code that indicate emergency situations.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				<div class="p-4 border border-red-200 rounded-md bg-red-50">
					<div class="flex justify-between items-center mb-2">
						<span class="text-lg font-bold text-red-700">SOS</span>
						<span class="font-mono text-sm text-red-700">... --- ...</span>
					</div>
					<p class="text-sm text-gray-700">
						The international distress signal, universally recognized as a call for help. It was formally
						introduced in 1908 and remains the standard emergency signal in Morse code.
					</p>
					<button
						@click="playSignal('... --- ...')"
						class="mt-3 flex items-center text-xs bg-red-100 hover:bg-red-200 text-red-700 py-1 px-2 rounded">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4 mr-1"
							viewBox="0 0 20 20"
							fill="currentColor">
							<path
								fill-rule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
								clip-rule="evenodd" />
						</svg>
						Play Signal
					</button>
				</div>

				<div class="p-4 border border-orange-200 rounded-md bg-orange-50">
					<div class="flex justify-between items-center mb-2">
						<span class="text-lg font-bold text-orange-700">MAYDAY</span>
						<span class="font-mono text-sm text-orange-700">-- .- -.-- -.. .- -.--</span>
					</div>
					<p class="text-sm text-gray-700">
						Voice procedure word used as a distress signal in radio communications, derived from the French
						"m'aidez" (help me). Often used in aviation and maritime emergencies.
					</p>
					<button
						@click="playSignal('-- .- -.-- -.. .- -.--')"
						class="mt-3 flex items-center text-xs bg-orange-100 hover:bg-orange-200 text-orange-700 py-1 px-2 rounded">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4 mr-1"
							viewBox="0 0 20 20"
							fill="currentColor">
							<path
								fill-rule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
								clip-rule="evenodd" />
						</svg>
						Play Signal
					</button>
				</div>

				<div class="p-4 border border-yellow-200 rounded-md bg-yellow-50">
					<div class="flex justify-between items-center mb-2">
						<span class="text-lg font-bold text-yellow-700">PAN-PAN</span>
						<span class="font-mono text-sm text-yellow-700">.--. .- -. .--. .- -. .--. .- -.</span>
					</div>
					<p class="text-sm text-gray-700">
						International urgency signal, less urgent than MAYDAY but still indicates a situation requiring
						attention. It comes from the French word "panne" meaning breakdown.
					</p>
					<button
						@click="playSignal('.--.  .- -.  .--.  .- -.  .--.  .- -.')"
						class="mt-3 flex items-center text-xs bg-yellow-100 hover:bg-yellow-200 text-yellow-700 py-1 px-2 rounded">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4 mr-1"
							viewBox="0 0 20 20"
							fill="currentColor">
							<path
								fill-rule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
								clip-rule="evenodd" />
						</svg>
						Play Signal
					</button>
				</div>
			</div>
		</div>

		<!-- Common Procedural Signals -->
		<div class="card mb-8">
			<h2 class="text-2xl font-semibold mb-4">Common Procedural Signals</h2>
			<p class="text-gray-600 mb-4">These signals are used to coordinate communication between operators.</p>
			<div class="overflow-x-auto">
				<table class="min-w-full divide-y divide-gray-200">
					<thead class="bg-gray-50">
						<tr>
							<th
								scope="col"
								class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Signal
							</th>
							<th
								scope="col"
								class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Morse Code
							</th>
							<th
								scope="col"
								class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Meaning
							</th>
							<th
								scope="col"
								class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Action
							</th>
						</tr>
					</thead>
					<tbody class="bg-white divide-y divide-gray-200">
						<tr v-for="(signal, index) in proceduralSignals" :key="index">
							<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
								{{ signal.name }}
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
								{{ signal.code }}
							</td>
							<td class="px-6 py-4 text-sm text-gray-500">{{ signal.meaning }}</td>
							<td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
								<button
									@click="playSignal(signal.code)"
									class="inline-flex items-center text-indigo-600 hover:text-indigo-900">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-4 w-4 mr-1"
										viewBox="0 0 20 20"
										fill="currentColor">
										<path
											fill-rule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
											clip-rule="evenodd" />
									</svg>
									Play
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<!-- Common Abbreviations -->
		<div class="card mb-8">
			<h2 class="text-2xl font-semibold mb-4">Common Morse Code Abbreviations</h2>
			<p class="text-gray-600 mb-4">
				Morse code operators developed many abbreviations to speed up transmissions. These are known as
				"prosigns" (procedural signals) or "Q-codes" and "Z-codes".
			</p>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				<div v-for="(category, categoryName) in abbreviationCategories" :key="categoryName" class="col-span-1">
					<h3 class="text-lg font-medium mb-3 text-indigo-700">{{ categoryName }}</h3>
					<div class="space-y-3">
						<div v-for="(abbr, index) in category" :key="index" class="p-3 bg-gray-50 rounded-md">
							<div class="flex justify-between items-center">
								<span class="font-bold">{{ abbr.short }}</span>
								<span class="font-mono text-sm">{{ abbr.code }}</span>
							</div>
							<p class="text-sm text-gray-700 mt-1">{{ abbr.meaning }}</p>
							<button
								@click="playSignal(abbr.code)"
								class="mt-2 text-xs flex items-center text-indigo-600 hover:text-indigo-900">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-4 w-4 mr-1"
									viewBox="0 0 20 20"
									fill="currentColor">
									<path
										fill-rule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
										clip-rule="evenodd" />
								</svg>
								Play
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Popular Phrases -->
		<div class="card mb-8">
			<h2 class="text-2xl font-semibold mb-4">Famous Morse Code Messages</h2>
			<p class="text-gray-600 mb-4">
				Throughout history, several Morse code messages have become famous due to their historical significance.
			</p>
			<div class="space-y-6">
				<div
					v-for="(message, index) in famousMessages"
					:key="index"
					class="p-4 border border-indigo-100 rounded-md bg-indigo-50">
					<h3 class="text-lg font-semibold text-indigo-800 mb-2">{{ message.title }}</h3>
					<div class="flex items-center mb-3">
						<div class="font-mono text-sm bg-white px-3 py-2 rounded border border-indigo-200">
							{{ message.code }}
						</div>
						<button
							@click="playSignal(message.code)"
							class="ml-3 flex items-center text-xs bg-indigo-100 hover:bg-indigo-200 text-indigo-700 py-1 px-2 rounded">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-4 w-4 mr-1"
								viewBox="0 0 20 20"
								fill="currentColor">
								<path
									fill-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
									clip-rule="evenodd" />
							</svg>
							Play Signal
						</button>
					</div>
					<p class="text-sm text-gray-700">{{ message.description }}</p>
					<div class="mt-2 text-xs text-gray-500">{{ message.date }}</div>
				</div>
			</div>
		</div>

		<!-- Learning Resources -->
		<div class="card">
			<h2 class="text-2xl font-semibold mb-4">Further Learning Resources</h2>
			<p class="text-gray-600 mb-6">
				Want to learn more about Morse code phrases and signals? Check out these resources and practice using
				our Morse code translator.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div
					class="flex flex-col items-center text-center p-4 border border-gray-200 rounded-md hover:border-indigo-300 transition-colors">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-12 w-12 text-indigo-500 mb-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
					</svg>
					<h3 class="text-lg font-medium mb-2">Learn Basic Morse Code</h3>
					<p class="text-gray-600 mb-4">
						Visit our learning page to master the basic characters and prepare for using common phrases.
					</p>
					<nuxt-link to="/learn" class="mt-auto btn-primary text-sm">Go to Learning Page</nuxt-link>
				</div>
				<div
					class="flex flex-col items-center text-center p-4 border border-gray-200 rounded-md hover:border-indigo-300 transition-colors">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-12 w-12 text-indigo-500 mb-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
					</svg>
					<h3 class="text-lg font-medium mb-2">Practice Your Skills</h3>
					<p class="text-gray-600 mb-4">
						Test your knowledge of common Morse code signals with our interactive practice tool.
					</p>
					<nuxt-link to="/practice" class="mt-auto btn-primary text-sm">Go to Practice Page</nuxt-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue'
	import { playMorseSound } from '~/utils/morse'

	// SEO setup
	useHead({
		title: 'Common Morse Code Phrases & Signals | MorseTraduction',
		meta: [
			{
				name: 'description',
				content:
					'Learn common Morse code phrases, abbreviations and emergency signals like SOS. Complete reference with audio playback.'
			},
			{
				name: 'keywords',
				content:
					'morse code phrases, SOS morse code, morse code signals, common morse code, morse code abbreviations, morse traduction'
			}
		]
	})

	// Procedural signals data
	const proceduralSignals = [
		{
			name: 'CQ',
			code: '-.-. --.-',
			meaning: 'Calling any station (general call)'
		},
		{
			name: 'K',
			code: '-.-',
			meaning: 'Invitation to transmit'
		},
		{
			name: 'AR',
			code: '.- .-.',
			meaning: 'End of message'
		},
		{
			name: 'SK',
			code: '... -.-',
			meaning: 'End of contact'
		},
		{
			name: 'BT',
			code: '-...-',
			meaning: 'Break (new paragraph or section)'
		},
		{
			name: 'AS',
			code: '.- ...',
			meaning: 'Wait, stand by'
		},
		{
			name: 'KN',
			code: '-.- -.',
			meaning: 'Go ahead, specific named station only'
		},
		{
			name: 'BK',
			code: '-...-.-',
			meaning: 'Break in transmission'
		}
	]

	// Abbreviation categories
	const abbreviationCategories = {
		'Q-Codes': [
			{
				short: 'QTH',
				code: '--.- - ....',
				meaning: 'My location is...'
			},
			{
				short: 'QRZ',
				code: '--.- .-. --..',
				meaning: 'Who is calling me?'
			},
			{
				short: 'QSL',
				code: '--.- ... .-..',
				meaning: 'I confirm receipt'
			},
			{
				short: 'QRM',
				code: '--.- .-. --',
				meaning: 'I am being interfered with'
			},
			{
				short: 'QRN',
				code: '--.- .-. -.',
				meaning: 'I am troubled by static'
			}
		],
		'Common Abbreviations': [
			{
				short: 'GM',
				code: '--. --',
				meaning: 'Good morning'
			},
			{
				short: 'GA',
				code: '--. .-',
				meaning: 'Good afternoon'
			},
			{
				short: 'GE',
				code: '--. .',
				meaning: 'Good evening'
			},
			{
				short: 'TU',
				code: '- ..-',
				meaning: 'Thank you'
			},
			{
				short: '73',
				code: '-... ...--',
				meaning: 'Best regards (friendly goodbye)'
			}
		],
		'Amateur Radio': [
			{
				short: 'CW',
				code: '-.-. .--',
				meaning: 'Continuous Wave (Morse code)'
			},
			{
				short: 'DX',
				code: '-.. -..-',
				meaning: 'Distance (foreign countries)'
			},
			{
				short: 'OM',
				code: '--- --',
				meaning: 'Old Man (male operator)'
			},
			{
				short: 'YL',
				code: '-.-- .-..',
				meaning: 'Young Lady (female operator)'
			},
			{
				short: 'HI',
				code: '.... ..',
				meaning: 'Laughter (ha ha)'
			}
		]
	}

	// Famous Morse code messages
	const famousMessages = [
		{
			title: 'First Morse Telegraph Message',
			code: '.-- .... .- - / .... .- - .... / --. --- -.. / .-- .-. --- ..- --. .... -',
			description: "The first official Morse code message sent by Samuel Morse: 'What hath God wrought'",
			date: 'May 24, 1844'
		},
		{
			title: 'Titanic Distress Call',
			code: '-.-. --.- -.. / -.-. --.- -.. / ... --- ...',
			description:
				"The distress call sent by the Titanic: 'CQD CQD SOS' (CQD was an earlier distress signal, followed by the new SOS)",
			date: 'April 14, 1912'
		},
		{
			title: 'Pearl Harbor Attack',
			code: '.- .. .-. / .-. .- .. -.. / .--. . .- .-. .-.. / .... .- .-. -... --- .-. / - .... .. ... / .. ... / -. --- - / -.. .-. .. .-.. .-..',
			description: "Message sent during the attack on Pearl Harbor: 'Air raid Pearl Harbor. This is not drill.'",
			date: 'December 7, 1941'
		},
		{
			title: 'V for Victory',
			code: '...- ...- ...- ...-',
			description:
				"The 'V for Victory' signal (letter V in Morse), used in World War II as a rallying symbol, particularly by the BBC in broadcasts to occupied Europe.",
			date: 'World War II (1939-1945)'
		}
	]

	// Function to play Morse code signals
	async function playSignal(morseCode) {
		await playMorseSound(morseCode, 80) // Slightly faster speed for demonstration
	}
</script>

<style scoped>
	.card {
		@apply bg-white rounded-lg shadow-md p-6 mb-6;
	}

	.btn-primary {
		@apply bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded transition-colors;
	}
</style>
