// 摩斯电码映射表
export const MORSE_CODE = {
	A: '.-',
	B: '-...',
	C: '-.-.',
	D: '-..',
	E: '.',
	F: '..-.',
	G: '--.',
	H: '....',
	I: '..',
	J: '.---',
	K: '-.-',
	L: '.-..',
	M: '--',
	N: '-.',
	O: '---',
	P: '.--.',
	Q: '--.-',
	R: '.-.',
	S: '...',
	T: '-',
	U: '..-',
	V: '...-',
	W: '.--',
	X: '-..-',
	Y: '-.--',
	Z: '--..',
	0: '-----',
	1: '.----',
	2: '..---',
	3: '...--',
	4: '....-',
	5: '.....',
	6: '-....',
	7: '--...',
	8: '---..',
	9: '----.',
	'.': '.-.-.-',
	',': '--..--',
	'?': '..--..',
	"'": '.----.',
	'!': '-.-.--',
	'/': '-..-.',
	'(': '-.--.',
	')': '-.--.-',
	'&': '.-...',
	':': '---...',
	';': '-.-.-.',
	'=': '-...-',
	'+': '.-.-.',
	'-': '-....-',
	_: '..--.-',
	'"': '.-..-.',
	$: '...-..-',
	'@': '.--.-.',
	' ': '/'
}

// 反向映射表（摩斯电码到字符）
export const REVERSE_MORSE_CODE = Object.entries(MORSE_CODE).reduce((acc, [key, value]) => {
	acc[value] = key
	return acc
}, {})

// 将文本转换为摩斯电码
export function textToMorse(text) {
	return text
		.toUpperCase()
		.split('')
		.map(char => {
			return MORSE_CODE[char] || char
		})
		.join(' ')
}

// 将摩斯电码转换为文本
export function morseToText(morse) {
	return morse
		.split(' ')
		.map(code => {
			return REVERSE_MORSE_CODE[code] || code
		})
		.join('')
}

// 获取随机字符（用于练习）
export function getRandomChar() {
	const chars = Object.keys(MORSE_CODE).filter(char => char !== ' ')
	return chars[Math.floor(Math.random() * chars.length)]
}

// 获取随机字符集（用于练习）
export function getRandomChars(count = 8) {
	const result = []
	for (let i = 0; i < count; i++) {
		result.push(getRandomChar())
	}
	return result
}

// 播放摩斯电码声音
export function playMorseSound(morseCode, speed = 100) {
	return new Promise(async resolve => {
		const audioContext = new (window.AudioContext || window.webkitAudioContext)()

		for (const char of morseCode) {
			if (char === '.') {
				await playBeep(audioContext, speed)
				await sleep(speed)
			} else if (char === '-') {
				await playBeep(audioContext, speed * 3)
				await sleep(speed)
			} else if (char === ' ') {
				await sleep(speed * 3)
			} else if (char === '/') {
				await sleep(speed * 7)
			}
		}

		resolve()
	})
}

function playBeep(audioContext, duration) {
	return new Promise(resolve => {
		const oscillator = audioContext.createOscillator()
		const gainNode = audioContext.createGain()

		oscillator.connect(gainNode)
		gainNode.connect(audioContext.destination)

		oscillator.type = 'sine'
		oscillator.frequency.value = 700

		gainNode.gain.value = 0.5

		oscillator.start()

		setTimeout(() => {
			oscillator.stop()
			resolve()
		}, duration)
	})
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
}
