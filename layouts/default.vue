<template>
	<div class="min-h-screen flex flex-col">
		<header class="bg-indigo-600 shadow-md">
			<div class="container mx-auto px-4 py-3">
				<div class="flex items-center justify-between">
					<nuxt-link to="/" class="text-white text-2xl font-bold flex items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-8 w-8 mr-2"
							viewBox="0 0 20 20"
							fill="currentColor">
							<path
								fill-rule="evenodd"
								d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
								clip-rule="evenodd" />
						</svg>
						Morse Traduction
					</nuxt-link>

					<nav class="hidden md:flex space-x-4 text-white">
						<nuxt-link
							to="/"
							class="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500 transition-colors">
							Translator
						</nuxt-link>
						<nuxt-link
							to="/learn"
							class="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500 transition-colors">
							Learn Morse Code
						</nuxt-link>
						<nuxt-link
							to="/practice"
							class="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500 transition-colors">
							Practice
						</nuxt-link>
						<nuxt-link
							to="/common-codes"
							class="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500 transition-colors">
							Common Codes
						</nuxt-link>
					</nav>

					<button @click="isOpen = !isOpen" class="block md:hidden focus:outline-none">
						<svg
							class="h-6 w-6 text-white"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								v-if="isOpen"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12" />
							<path
								v-else
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h16" />
						</svg>
					</button>
				</div>

				<!-- Mobile menu, show/hide based on menu state. -->
				<div class="md:hidden" v-if="isOpen">
					<div class="px-2 pt-2 pb-3 space-y-1 bg-indigo-500 mt-2 rounded-md">
						<nuxt-link
							to="/"
							class="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-400 transition-colors"
							active-class="bg-indigo-700">
							Translator
						</nuxt-link>
						<nuxt-link
							to="/learn"
							class="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-400 transition-colors"
							active-class="bg-indigo-700">
							Learn Morse Code
						</nuxt-link>
						<nuxt-link
							to="/practice"
							class="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-400 transition-colors"
							active-class="bg-indigo-700">
							Practice
						</nuxt-link>
						<nuxt-link
							to="/common-codes"
							class="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-400 transition-colors"
							active-class="bg-indigo-700">
							Common Codes
						</nuxt-link>
					</div>
				</div>
			</div>
		</header>

		<main class="flex-grow container mx-auto px-4 py-6">
			<slot />
		</main>

		<footer class="bg-gray-100 border-t">
			<div class="container mx-auto px-4 py-6">
				<div class="flex flex-col md:flex-row justify-between items-center">
					<div class="mb-4 md:mb-0">
						<div class="text-gray-700 text-sm">
							© 2025 <span class="font-semibold">morsetraduction.online</span> - The Free Morse Code
							Translation Tool
						</div>
						<div class="text-gray-500 text-xs mt-1">
							All rights reserved. No registration or email required.
						</div>
					</div>
					<div class="flex space-x-4 text-sm text-gray-600">
						<nuxt-link to="/" class="hover:text-indigo-600 transition-colors">Translator</nuxt-link>
						<nuxt-link to="/learn" class="hover:text-indigo-600 transition-colors">Learn</nuxt-link>
						<nuxt-link to="/practice" class="hover:text-indigo-600 transition-colors">Practice</nuxt-link>
						<nuxt-link to="/common-codes" class="hover:text-indigo-600 transition-colors"
							>Common Codes</nuxt-link
						>
					</div>
				</div>
				<div class="mt-6 text-center text-xs text-gray-500">
					<p>
						Morse code is a method used in telecommunication to encode text characters as standardized
						sequences of two different signal durations, called dots and dashes.
					</p>
					<p class="mt-2">
						morsetraduction.online provides free, instant Morse code translation (morse traduction) without
						requiring registration.
					</p>
				</div>
			</div>
		</footer>
	</div>
</template>

<script setup>
	import { ref } from 'vue'

	const isOpen = ref(false)
</script>

<style scoped>
	/* Active link styles */
	.router-link-active {
		@apply bg-indigo-700;
	}
</style>
