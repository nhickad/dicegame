"use strict";

//getelementid for selecting ID elements
const score0 = document.getElementById("score--0");
const score1 = document.getElementById("score--1");
const current0 = document.getElementById("current--0");
const current1 = document.getElementById("current--1");
//dice image
const diceImg = document.querySelector(".dice");
//buttons
const btnRoll = document.querySelector(".btn--roll");
const btnNew = document.querySelector(".btn--new");
const btnHow = document.querySelector(".btn--how");
const btnHold = document.querySelector(".btn--hold");
//player active
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnShowmodal = document.querySelector(".btn--instruction");
const showHidden = document.querySelector(".showHidden");

score0.textContent = 0;
score1.textContent = 0;
diceImg.classList.add("hidden");

let scores, currentScore, activePlayer, playing;

const initialInt = function () {
  scores = [0, 0];

  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0.textContent = 0;
  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  diceImg.classList.add("hidden");

  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
};

btnCloseModal.addEventListener("click", function () {
  modal.classList.add("showHidden");
  overlay.classList.add("showHidden");
});

btnShowmodal.addEventListener("click", function () {
  modal.classList.remove("showHidden");
  overlay.classList.remove("showHidden");
});

initialInt();

const switchPlayer = function () {
  //switch to next player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  //toggle remove and add the existing class
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

btnRoll.addEventListener("click", function () {
  if (playing) {
    //roll funtionality
    const dice = Math.trunc(Math.random() * 6) + 1;

    //display hide
    diceImg.classList.remove("hidden");
    diceImg.src = `./assets/dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // Add current score to active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceImg.classList.add("hidden");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

//new game
btnNew.addEventListener("click", initialInt);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    if (!modal.classList.contains("showHidden")) {
      modal.classList.add("showHidden");
      overlay.classList.add("showHidden");
    }
  }
});
