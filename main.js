
function startGame() {
  document.turn = "X";
  document.gameOver = false;
  startTimer();
}

function nextMove(square) {
  if (document.gameOver === false) {
    if (taken(square)) {
      return message("That spot is taken.")
    } else {
      setPiece(square);
      document.counter = 0;
    }
  }

  if (playable()) {
    switchPlayers()
  } else {
    document.gameOver = true
    clearInterval(document.timer);
    if (hasWinner()) {
      message(`Player ${document.turn} wins!`)
    } else {
      message(`It's a draw!`)
    }
  }
}

function startTimer() {
  document.counter = 0
  var timeleft = 10;

  var timer = document.getElementsByClassName("timer")[0]
  timer.innerText = (timeleft - document.counter);

  function timeIt() {
    if (document.counter == 10) {
      switchPlayers();
      document.counter = 0;
    } else {
      document.counter++;
      timer.innerText = (timeleft - document.counter);
    }
  }

  document.timer = setInterval(timeIt, 1000);
}

function switchPlayers() {
  switchTurn();
  message(`Player ${document.turn} turn!`)
}

function setPiece(square) {
  square.innerText = document.turn;
}

function message(msg) {
  return document.getElementsByClassName("message")[0].innerText = msg
}

function taken(square) {
  return square.innerText != ""
}

function playable() {
  return hasWinner() === false && board_has_empty_slots()
}

function board_has_empty_slots() {
  const slots = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]

  return slots.some(num => {
    return document.getElementById(num).innerText === ""
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
  const sq_1 = document.getElementById("1").innerText
  const sq_2 = document.getElementById("2").innerText
  const sq_3 = document.getElementById("3").innerText

  const sq_4 = document.getElementById("4").innerText
  const sq_5 = document.getElementById("5").innerText
  const sq_6 = document.getElementById("6").innerText

  const sq_7 = document.getElementById("7").innerText
  const sq_8 = document.getElementById("8").innerText
  const sq_9 = document.getElementById("9").innerText


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
  startTimer()
}
