
function startGame() {
  document.turn = "X";
}

function nextMove(square) {
  square.innerText = document.turn;
  switchTurn();
}

function switchTurn() {
  if (document.turn == "X") {
    document.turn = "O";
  } else {
    document.turn = "X";
  }
}

function reset() {
  var el = document.getElementsByClassName("square");
  // go through all elements and set the innerHTML to an empty string

  for (var i = 0; i < el.length; i++) {
    console.log(el[i])
    el[i].innerText = "";
  }

}
