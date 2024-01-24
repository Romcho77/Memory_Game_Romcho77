let cards = document.querySelectorAll('.memory-card');
let topDiv = document.querySelector(".top")
let lastSection = document.querySelector(".bottom")
let lastImage = document.querySelector(".lastImage")

let hasFlippedCard = false;
let firstCard;
let secondCard;
let lock = false

function flipCard() {  
    // this.classList.toggle('flip');
    if (lock){
        return;
    } 
    if (this === firstCard){ // ( this ) is here for the element in addEventListener
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
    console.log("this ===>  "+ this);
    checkMatch()
}

function checkEndGame() {
    let allCardsFlipped = Array.from(cards).every(card => card.classList.contains('flip')); // verifie si aumoins une carte nest pas bonne renvoi false

    if (allCardsFlipped) {
       
        setTimeout(() => {
       
            console.log("Congratulations! You Win!");
            topDiv.style.display = "none"
            lastSection.style.width = "100%"
            lastSection.style.height = "100%"
            
            lastImage.style.width = "500px"
            lastImage.style.height = "500px"
            lastImage.style.marginBottom = "100px"
            let winP = document.createElement("p")
            winP.innerText = "CONGRATULATIONS! YOU WIN *_*"
            winP.style.color = "bisque" 
            winP.style.fontSize = "30px"
            
            lastSection.appendChild(winP)

            resetDeck()
        }, 5300);
    }
}

function checkMatch() {
    if(firstCard.dataset.framework === secondCard.dataset.framework){ //verifie le data framework propriete de div parent de la carte to find matches 
        disableCard()
        checkEndGame()
        return
    }
    unflipCard()
}
function disableCard() {
    firstCard.removeEventListener('click', flipCard); //enlever le event listener
    secondCard.removeEventListener('click', flipCard); //enlever le event listener

    resetDeck()
}
function unflipCard() {
    lock = true
    setTimeout(() => { // flip la card a l'envers pour cacher les images
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
    
        resetDeck()
    }, 1300);
}

function resetDeck() {
    [hasFlippedCard, lock] = [false, false]; //mettre les flag a false
    [firstCard, secondCard] = [null, null]; //mettre les choix a null
}

(function shuffle() { // fonction anonyme (qui se lance directement apres sa creation)
    cards.forEach(card => { // choisir aleatoirement la position des divs dans le style.order grace a display flex
      let randomPos = Math.floor(Math.random() * 12);
      card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));


