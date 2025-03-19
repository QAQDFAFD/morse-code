<template>
	<div class="min-h-screen bg-gray-50">
		<nav class="bg-white shadow-sm">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div class="flex justify-between h-16">
					<div class="flex">
						<div class="flex-shrink-0 flex items-center">
							<h1 class="text-xl font-bold text-gray-900">摩斯电码学习</h1>
						</div>
						<div class="hidden sm:ml-6 sm:flex sm:space-x-8">
							<NuxtLink
								to="/"
								class="inline-flex items-center px-1 pt-1 border-b-2"
								:class="[
									$route.path === '/'
										? 'border-indigo-500 text-gray-900'
										: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
								]">
								学习
							</NuxtLink>
							<NuxtLink
								to="/practice"
								class="inline-flex items-center px-1 pt-1 border-b-2"
								:class="[
									$route.path === '/practice'
										? 'border-indigo-500 text-gray-900'
										: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
								]">
								练习
							</NuxtLink>
						</div>
					</div>
				</div>
			</div>
		</nav>

		<main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
			<slot />
		</main>
	</div>
</template>

<script setup>
	const route = useRoute()
</script>
