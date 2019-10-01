
function startGame() {
  document.turn = "X";
  document.gameOver = false;
  let timer = document.getElementsByClassName("timer")[0];
  document.counter = new Counter(5, 0, timer, gameOver);
  document.counter.start();
}

function nextMove(square) {
  // if game over true, don't allow them to make any more moves
  if (document.gameOver === false) {
    if (taken(square)) {
      return message("That spot is taken.")
    } else {
      document.counter.reset(-1);
      setPiece(square);
    }


    if (playable()) {
      switchTurn();
      message(`Player ${document.turn} turn!`)
    } else {
      document.gameOver = true
      document.counter.clear();
      if (hasWinner()) {
        message(`Player ${document.turn} wins!`)
      } else {
        message(`It's a draw!`)
      }
    }
  }
}

function gameOver() {
  document.gameOver = true;
  message(`You ran out of time. Player ${document.turn} loses!`);
  document.counter.clear();
}

function setPiece(square) {
  square.innerText = document.turn;
}

function message(msg) {
  return document.getElementsByClassName("message")[0].innerText = msg;
}

function taken(square) {
  return square.innerText != "";
}

function playable() {
  return hasWinner() === false && board_has_empty_slots();
}

function board_has_empty_slots() {
  const slots = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]

  return slots.some(num => {
    return document.getElementById(num).innerText === "";
  })
}

function switchTurn() {
  if (document.turn == "X") {
    document.turn = "O";
  } else {
    document.turn = "X";
  }
}

function hasWinner() {
  const [sq_1,
        sq_2,
        sq_3,
        sq_4,
        sq_5,
        sq_6,
        sq_7,
        sq_8,
        sq_9] = ["1", "2", "3", "4", "5", "6", "7", "8", "9"].map(num => {
          return document.getElementById(num).innerText;
        })


  return checkRow(sq_1, sq_2, sq_3) ||
         checkRow(sq_4, sq_5, sq_6) ||
         checkRow(sq_7, sq_8, sq_9) ||

         // horizontal check

         checkRow(sq_1, sq_4, sq_7) ||
         checkRow(sq_2, sq_5, sq_8) ||
         checkRow(sq_3, sq_6, sq_9) ||


         //diagonal checkRow
         checkRow(sq_1, sq_5, sq_9) ||
         checkRow(sq_3, sq_5, sq_7);
}


function checkRow(a, b, c) {
  return a === b && b === c && a == document.turn;
}

function reset() {
  var squares = document.getElementsByClassName("square");
  for (var i = 0; i < squares.length; i++) {
    squares[i].innerText = "";
  }

  document.gameOver = false
  document.getElementsByClassName("message")[0].innerText = `Player ${document.turn} turn!`
  document.counter.clear();
  document.counter.reset();
  document.counter.start();
}
