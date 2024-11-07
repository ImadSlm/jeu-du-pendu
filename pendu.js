class Pendu {
    constructor(word) {
        this.word = word
        this.guessedLetters = new Set()
        this.attempts = 6
    }

    guess(letter) {
        if (this.guessedLetters.has(letter)) {
            return false
        }
        this.guessedLetters.add(letter)
        if (!this.word.includes(letter)) {
            if (letter.length === 1) {
                this.attempts -= 1
            }
        }
        return true
    }

    getDisplayWord() {
        return this.word
            .split("")
            .map((letter) => (this.guessedLetters.has(letter) ? letter : "_"))
            .join("")
    }

    isWon() {
        return this.word
            .split("")
            .every((letter) => this.guessedLetters.has(letter))
    }

    isLost() {
        return this.attempts <= 0
    }
}

const readline = require("readline")

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

const game = new Pendu("abracadabrant")

function Jeu() {
    console.log(`Mot : ${game.getDisplayWord()}`)
    console.log(`Tentatives restantes : ${game.attempts}`)
    rl.question("Devinez une lettre: ", (letter) => {
        if (letter.length !== 1) {
            console.log("Une seule lettre requise.")
            // game.attempts -= 1
        } else {
            const result = game.guess(letter)
            if (!result) {
                console.log("Lettre deja entrée.")
            }
        }
        if (game.isWon()) {
            console.log(`Gagné ! Le mot était: ${game.word}`)
            rl.close()
        } else if (game.isLost()) {
            console.log(`Perdu. Le mot était: ${game.word}`)
            rl.close()
        } else {
            Jeu()
        }
    })
}

Jeu()

module.exports = Pendu
