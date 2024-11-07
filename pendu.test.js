const Pendu = require('./pendu');

test('initial display', () => {
    const game = new Pendu('abracadabrant');
    expect(game.getDisplayWord()).toBe('_____________');
    expect(game.guessedLetters.size).toBe(0);
});

test('correct guess', () => {
    const game = new Pendu('abracadabrant');
    game.guess('t');
    expect(game.getDisplayWord()).toBe('____________t');
    expect(game.attempts).toBe(6);
});

test('incorrect guess', () => {
    const game = new Pendu('abracadabrant');
    game.guess('x');
    expect(game.getDisplayWord()).toBe('_____________');
    expect(game.attempts).toBe(5);
});

test('repeated guess', () => {
    const game = new Pendu('abracadabrant');
    game.guess('z');
    game.guess('z');
    expect(game.getDisplayWord()).toBe('_____________');
    expect(game.attempts).toBe(5);
});

test('one letter', () => {
    const game = new Pendu('abracadabrant');
    game.guess('zuw');
    expect(game.getDisplayWord()).toBe('_____________');
    expect(game.attempts).toBe(6);
});

test('win game', () => {
    const game = new Pendu('abracadabrant');
    for (const letter of 'abracadabrant') {
        game.guess(letter);
    }
    expect(game.isWon()).toBe(true);
    expect(game.isLost()).toBe(false);
});

test('lose game', () => {
    const game = new Pendu('abracadabrant');
    for (const letter of 'xuzwym') {
        game.guess(letter);
    }
    expect(game.isWon()).toBe(false);
    expect(game.isLost()).toBe(true);
});