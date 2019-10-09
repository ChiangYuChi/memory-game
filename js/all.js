// Display 12 cards.
// Duplicate the cards to have 2 sets of 12.
// Randomize the display of cards.
// Add selected style for selected cards.
// Only allow two cards to be selected at a time.
// Determine if two selected cards are a match and hide them.
// Reset guess count after 2.
// Add delay to selections.
// Show back of card initially and flip on select
// Finished game!

// card data

const cardsArray = [{
        name: "spade",
        img: "img/spade.png"
    },
    {
        name: "two",
        img: "img/two.png"
    },
    {
        name: "three",
        img: "img/three.png"
    },
    {
        name: "four",
        img: "img/four.png"
    },
    {
        name: "five",
        img: "img/five.jpg"
    },
    {
        name: "ten",
        img: "img/ten.png"
    },
    {
        name: "knight",
        img: "img/knight.png"
    },
    {
        name: "queen",
        img: "img/queen.png"
    },
    {
        name: "king",
        img: "img/king.png"
    },
    {
        name: "joker",
        img: "img/joker.png"
    },
    {
        name: "heart",
        img: "img/heart3.png"
    }
];

var gameGrid = cardsArray.concat(cardsArray).sort(function () {
    return 0.5 - Math.random();
});

var firstGuess = "";
var secondGuess = "";
var count = 0;
var previousTarget = null;
var delay = 2200;

var game = document.getElementById("game");
var grid = document.createElement("section");
grid.setAttribute("class", "grid");
game.appendChild(grid);

gameGrid.forEach(function (item) {
    var name = item.name
    var img = item.img;

    var card = document.createElement("div");
    card.classList.add("card");
    card.dataset.name = name;

    var front = document.createElement("div");
    front.classList.add("front");

    var back = document.createElement("div");
    back.classList.add("back");
    back.style.backgroundImage = "url(" + img + ")";

    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
});

var match = function match() {
    var selected = document.querySelectorAll(".selected");
    selected.forEach(function (card) {
        card.classList.add("match");
    });
};

var resetGuesses = function resetGuesses() {
    firstGuess = "";
    secondGuess = "";
    count = 0;
    previousTarget = null;

    var selected = document.querySelectorAll(".selected");
    selected.forEach(function (card) {
        card.classList.remove("selected");
    });
};

grid.addEventListener("click", function (event) {
    var clicked = event.target;

    if (
        clicked.nodeName === "SECTION" ||
        clicked === previousTarget ||
        clicked.parentNode.classList.contains("selected") ||
        clicked.parentNode.classList.contains("match")
    ) {
        return;
    }

    if (count < 2) {
        count++;
        if (count === 1) {
            firstGuess = clicked.parentNode.dataset.name;
            console.log(firstGuess);
            clicked.parentNode.classList.add("selected");
        } else {
            secondGuess = clicked.parentNode.dataset.name;
            console.log(secondGuess);
            clicked.parentNode.classList.add("selected");
        }

        if (firstGuess && secondGuess) {
            if (firstGuess === secondGuess) {
                setTimeout(match, delay);
            }
            setTimeout(resetGuesses, delay);
        }
        previousTarget = clicked;
    }
});