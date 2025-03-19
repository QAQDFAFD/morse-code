// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],

  app: {
									head: {
																	title: '摩斯电码学习',
																	meta: [
																									{ charset: 'utf-8' },
																									{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
																									{ key: 'description', name: 'description', content: '学习和练习摩斯电码的现代化网站' }
																	],
																	link: [
																									{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
																									{
																																	rel: 'stylesheet',
																																	href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
																									}
																	]
									}
	},

  css: ['~/assets/css/main.css'],
  compatibilityDate: '2025-03-19'
})