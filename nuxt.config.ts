// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
	app: {
		head: {
			title: 'Morse Traduction | Free Online Morse Code Translator',
			meta: [
				{ charset: 'utf-8' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
				{
					key: 'description',
					name: 'description',
					content:
						'Free online tool for Morse code translation (morse traduction). Convert text to Morse code and decode Morse code to text instantly with our easy-to-use translator.'
				},
				{
					key: 'keywords',
					name: 'keywords',
					content:
						'morse traduction, morse code translator, morse code decoder, morse code converter, learn morse code, morse code practice, text to morse, morse to text, common morse codes, sos'
				},
				{ name: 'format-detection', content: 'telephone=no' },
				{ name: 'robots', content: 'index, follow' },
				{ property: 'og:title', content: 'Morse Traduction | Free Online Morse Code Translator' },
				{
					property: 'og:description',
					content:
						'Free online tool for Morse code translation (morse traduction). Convert text to Morse code and decode Morse code to text instantly.'
				},
				{ property: 'og:type', content: 'website' },
				{ property: 'og:url', content: 'https://morsetraduction.online' },
				{ property: 'og:site_name', content: 'Morse Traduction' },
				{ name: 'twitter:card', content: 'summary_large_image' },
				{ name: 'twitter:title', content: 'Morse Traduction | Free Online Morse Code Translator' },
				{
					name: 'twitter:description',
					content:
						'Free online tool for Morse code translation. Convert text to Morse code and decode Morse code to text instantly.'
				}
			],
			link: [
				{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
				{ rel: 'canonical', href: 'https://morsetraduction.online' }
			]
		}
	},
	css: ['~/assets/css/main.css'],
	typescript: {
		strict: true
	},
	experimental: {
		payloadExtraction: false
	}
})
