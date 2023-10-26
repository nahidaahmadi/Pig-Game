"use strict";
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const current0 = document.getElementById("current--0");
const current1 = document.getElementById("current--1");
const score0 = document.getElementById("score--0");
const score1 = document.getElementById("score--1");
const btnHold = document.querySelector(".btn--hold");
const btnRoll = document.querySelector(".btn--roll");
const btnNew = document.querySelector(".btn--new");
const diceEl = document.querySelector(".dice");

let scores, crntScore, activePlayer, playing;

function init() {
  scores = [0, 0];
  crntScore = 0;
  activePlayer = 0;
  playing = true;

  current0.textContent = 0;
  current1.textContent = 0;
  score0.textContent = 0;
  score1.textContent = 0;

  diceEl.classList.add("hidden");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
}

init();

function switchPlayer() {
  document.querySelector("#current--" + activePlayer).textContent = 0;
  crntScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
}

//in order to stop the buttons from working after there is a winner use a case
btnRoll.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove("hidden");
    diceEl.src = "dices/dice-" + dice + ".png";

    if (dice !== 1) {
      crntScore += dice;
      document.getElementById("current--" + activePlayer).textContent =
        crntScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += crntScore;
    document.getElementById("score--" + activePlayer).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      document
        .querySelector(".player--" + activePlayer)
        .classList.add("player--winner");
      document
        .querySelector(".player--" + activePlayer)
        .classList.remove("player--active");
      diceEl.classList.add("hidden");
      playing = false;
    } else switchPlayer();
  }
});

btnNew.addEventListener("click", init);
