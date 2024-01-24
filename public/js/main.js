let cards = document.querySelectorAll('.memory-card');
let topDiv = document.querySelector(".top")


let hasFlippedCard = false;
let firstCard;
let secondCard;
let lock = false

function flipCard() {  
    // this.classList.toggle('flip');
    if (lock) return;
    if (this === firstCard){
        this.classList.remove('flip'); // Remove the 'flip' class to revert the card back
        [hasFlippedCard, firstCard] = [false, null];
        return;
    }

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        console.log(this);
        return;
    }
    secondCard = this;
    console.log("this===>"+ this);
    checkMatch()
}

function checkEndGame() {
    let allCardsFlipped = Array.from(cards).every(card => card.classList.contains('flip'));

    if (allCardsFlipped) {
       
        setTimeout(() => {
       
            console.log("Congratulations! You Win!");
            topDiv.style.display = "none"
            resetDeck()
        }, 7300);
    }
}

function checkMatch() {
    if(firstCard.dataset.framework === secondCard.dataset.framework){
        disableCard()
        checkEndGame()
        return
    }
    unflipCard()
}
function disableCard() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetDeck()
}
function unflipCard() {
    lock = true
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
    
        resetDeck()
    }, 1300);
}

function resetDeck() {
    [hasFlippedCard, lock] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
      let randomPos = Math.floor(Math.random() * 12);
      card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));




