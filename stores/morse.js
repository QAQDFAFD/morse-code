import { defineStore } from 'pinia'
import { getRandomChars, MORSE_CODE } from '~/utils/morse'

export const useMorseStore = defineStore('morse', {
	state: () => ({
		// 当前学习的字符
		currentChar: 'A',
		// 练习模式
		practiceMode: 'decode', // 'decode' 或 'encode'
		// 练习字符
		practiceChars: [],
		// 用户答案
		userAnswers: {},
		// 练习结果
		practiceResults: {},
		// 练习是否完成
		practiceCompleted: false,
		// 声音速度 (ms)
		soundSpeed: 100
	}),

	getters: {
		// 获取当前字符的摩斯电码
		currentMorseCode: state => MORSE_CODE[state.currentChar] || '',

		// 获取练习正确率
		practiceAccuracy: state => {
			if (Object.keys(state.practiceResults).length === 0) return 0

			const correct = Object.values(state.practiceResults).filter(result => result).length
			return (correct / Object.keys(state.practiceResults).length) * 100
		}
	},

	actions: {
		// 设置当前学习的字符
		setCurrentChar(char) {
			this.currentChar = char.toUpperCase()
		},

		// 开始新的练习
		startNewPractice(mode = 'decode', count = 8) {
			this.practiceMode = mode
			this.practiceChars = getRandomChars(count)
			this.userAnswers = {}
			this.practiceResults = {}
			this.practiceCompleted = false
		},

		// 提交练习答案
		submitAnswer(index, answer) {
			const char = this.practiceChars[index]
			this.userAnswers[index] = answer

			if (this.practiceMode === 'decode') {
				// 解码模式：比较用户输入的字符与实际字符
				this.practiceResults[index] = answer.toUpperCase() === char
			} else {
				// 编码模式：比较用户输入的摩斯电码与实际摩斯电码
				this.practiceResults[index] = answer === MORSE_CODE[char]
			}

			// 检查是否所有题目都已回答
			if (Object.keys(this.userAnswers).length === this.practiceChars.length) {
				this.practiceCompleted = true
			}
		},

		// 设置声音速度
		setSoundSpeed(speed) {
			this.soundSpeed = speed
		}
	}
})
