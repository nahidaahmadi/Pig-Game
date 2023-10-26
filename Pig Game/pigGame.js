"use strict";
//selecting elements
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1"); //select by id
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const current0 = document.querySelector("#current--0");
const current1 = document.querySelector("#current--1");

let crntScore, activePlayer, playing, scores;
function init() {
  scores = [0, 0];
  crntScore = 0;
  activePlayer = 0;
  playing = true; //to finish the game when it is false!
  //starting conditions
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  //two players
  diceEl.classList.add("hidden"); //always have a way that should be appeared when one is hidden
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
}
init();
//switch players
function switchPlayer() {
  document.querySelector("#current--" + activePlayer).textContent = 0;
  crntScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
}
//roll a dice
btnRoll.addEventListener("click", function () {
  if (playing) {
    //1.random roll
    const dice = Math.trunc(Math.random() * 6) + 1; //1-6
    console.log(dice);
    //2.display dice
    diceEl.classList.remove("hidden");
    diceEl.src = "dices/dice-" + dice + ".png"; //important!!!

    //3.check the rule for dice 1,
    if (dice !== 1) {
      crntScore += dice;
      document.querySelector("#current--" + activePlayer).textContent =
        crntScore;
    } else {
      //if true switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //1.add current score to active player score
    scores[activePlayer] += crntScore;

    document.getElementById("score--" + activePlayer).textContent =
      scores[activePlayer];

    //if >=100
    if (scores[activePlayer] >= 100) {
      document
        .querySelector(".player--" + activePlayer)
        .classList.add("player--winner");
      document
        .querySelector(".player--" + activePlayer)
        .classList.remove("player--active");
      playing = false;
      diceEl.classList.add("hidden");
    } else {
      //3.switch
      switchPlayer();
    }
  }
});
btnNew.addEventListener(
  "click",
  init
  //remove player--winner class,
  /*for (let i = 0; i <= 1; i++) {
    document.querySelector("#score--" + i).textContent = 0;
    document.querySelector("#current--" + i).textContent = 0;
    scores[i] = 0;
  }*/
);
