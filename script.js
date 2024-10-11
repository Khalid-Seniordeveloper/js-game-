const cardValues = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D'];
let gameBoard = document.getElementById('gameBoard');
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

function createCard(value) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    card.addEventListener('click', flipCard);
    return card;
}

function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('flipped');
    
    if (!firstCard) {
        firstCard = this;
        return;
    }
    
    secondCard = this;
    lockBoard = true;
    
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.value === secondCard.dataset.value;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    matchedPairs++;
    resetBoard();
    if (matchedPairs === cardValues.length / 2) {
        document.getElementById('message').textContent = 'You Win!';
    }
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function startGame() {
    matchedPairs = 0;
    gameBoard.innerHTML = '';
    const shuffledValues = cardValues.sort(() => 0.5 - Math.random());
    
    shuffledValues.forEach(value => {
        const card = createCard(value);
        gameBoard.appendChild(card);
    });

    document.getElementById('message').textContent = '';
}

document.getElementById('restartBtn').addEventListener('click', startGame);
startGame();
