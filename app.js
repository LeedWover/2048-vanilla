const gridDisplay = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score');
const resultDisplay = document.querySelector('#result');
const width = 4;
const squares = [];
let score = 0;

function createBoard() {
  for(let i = 0; i < width * width; i++) {
    const square = document.createElement('div');
    square.innerHTML = 0;
    square.setAttribute("class", "0")
    gridDisplay.appendChild(square);
    squares.push(square)
  }
  generate()
  generate()
}
createBoard()

function generate() {
  const randomNumber = Math.floor(Math.random() * squares.length);
  if(squares[randomNumber].innerHTML == 0) {
    squares[randomNumber].innerHTML = 2;
    squares[randomNumber].setAttribute('class', 2)
    //checkForLose()
  } else generate()
}

function moveRight() {
  for(let i = 0; i < width * width; i++) {
    if(i % 4 === 0) {
      const totalOne = squares[i].innerHTML;
      const totalTwo = squares[i + 1].innerHTML;
      const totalThree = squares[i + 2].innerHTML;
      const totalFour = squares[i + 3].innerHTML;
      const row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
      
      const filteredRow = row.filter(num => num);
      const missing = 4 - filteredRow.length;
      zeros = Array(missing).fill(0);
      const newRow = zeros.concat(filteredRow)
      
      squares[i].innerHTML = newRow[0]
      squares[i + 1].innerHTML = newRow[1]
      squares[i + 2].innerHTML = newRow[2]
      squares[i + 3].innerHTML = newRow[3]
      squares[i].setAttribute("class", newRow[0])
      squares[i + 1].setAttribute("class", newRow[1])
      squares[i + 2].setAttribute("class", newRow[2])
      squares[i + 3].setAttribute("class", newRow[3])
    }
  }
}

function moveLeft() {
  for(let i = 0; i < width * width; i++) {
    if(i % 4 === 0) {
      const totalOne = squares[i].innerHTML;
      const totalTwo = squares[i + 1].innerHTML;
      const totalThree = squares[i + 2].innerHTML;
      const totalFour = squares[i + 3].innerHTML;
      const row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
      
      const filteredRow = row.filter(num => num);
      const missing = 4 - filteredRow.length;
      zeros = Array(missing).fill(0);
      const newRow = filteredRow.concat(zeros)
      
      squares[i].innerHTML = newRow[0]
      squares[i + 1].innerHTML = newRow[1]
      squares[i + 2].innerHTML = newRow[2]
      squares[i + 3].innerHTML = newRow[3]
      squares[i].setAttribute("class", newRow[0])
      squares[i + 1].setAttribute("class", newRow[1])
      squares[i + 2].setAttribute("class", newRow[2])
      squares[i + 3].setAttribute("class", newRow[3])
    }
  }
}

function moveDown() {
  for(let i = 0; i < 4; i++) {
    const totalOne = squares[i].innerHTML;
    const totalTwo = squares[i + width].innerHTML;
    const totalThree = squares[i + width * 2].innerHTML;
    const totalFour = squares[i + width * 3].innerHTML;

    const column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
      
    const filteredCol = column.filter(num => num);
    const missing = 4 - filteredCol.length;
    zeros = Array(missing).fill(0);
    const newCol = zeros.concat(filteredCol)
    
    squares[i].innerHTML = newCol[0]
    squares[i + width].innerHTML = newCol[1]
    squares[i + width * 2].innerHTML = newCol[2]
    squares[i + width * 3].innerHTML = newCol[3]
    squares[i].setAttribute("class", newCol[0])
    squares[i + width].setAttribute("class", newCol[1])
    squares[i + width * 2].setAttribute("class", newCol[2])
    squares[i + width * 3].setAttribute("class", newCol[3])
  }
}

function moveUp() {
  for(let i = 0; i < 4; i++) {
    const totalOne = squares[i].innerHTML;
    const totalTwo = squares[i + width].innerHTML;
    const totalThree = squares[i + width * 2].innerHTML;
    const totalFour = squares[i + width * 3].innerHTML;

    const column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
      
    const filteredCol = column.filter(num => num);
    const missing = 4 - filteredCol.length;
    zeros = Array(missing).fill(0);
    const newCol = filteredCol.concat(zeros)
    
    squares[i].innerHTML = newCol[0]
    squares[i + width].innerHTML = newCol[1]
    squares[i + width * 2].innerHTML = newCol[2]
    squares[i + width * 3].innerHTML = newCol[3]
    squares[i].setAttribute("class", newCol[0])
    squares[i + width].setAttribute("class", newCol[1])
    squares[i + width * 2].setAttribute("class", newCol[2])
    squares[i + width * 3].setAttribute("class", newCol[3])
  }
}

function mergeRow() {
  for(let i = 0; i < 15; i++) {
    if(squares[i].innerHTML === squares[i + 1].innerHTML) {
      const combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
      squares[i].innerHTML = combinedTotal;
      squares[i + 1].innerHTML = 0;
      score += combinedTotal;
      scoreDisplay.innerHTML = score;
    }
  }
  checkForWin()
}

function mergeCol() {
  for(let i = 0; i < 12; i++) {
    if(squares[i].innerHTML === squares[i + width].innerHTML) {
      const combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML);
      squares[i].innerHTML = combinedTotal;
      squares[i + width].innerHTML = 0;
      score += combinedTotal;
      scoreDisplay.innerHTML = score;
    }
  }
  checkForWin()
}

function control(e) {
  if(e.keyCode === 39) {
    moveRight();
    mergeRow();
    moveRight();
    generate();
  }
  if(e.keyCode === 37) {
    moveLeft();
    mergeRow();
    moveLeft();
    generate();
  }
  if(e.keyCode === 40) {
    moveDown();
    mergeCol();
    moveDown();
    generate();
  }
  if(e.keyCode === 38) {
    moveUp();
    mergeCol();
    moveUp();
    generate();
  }
}

function checkForWin() {
  for(let i = 0; i < squares.length; i++) {
    if(squares[i].innerHTML == 2048) {
      resultDisplay.innerHTML = 'You Win!';
      document.removeEventListener('keyup', control);
    }
  }
}

// function checkForLose() {
//   let zeros = 0;
//   for(let i = 0; i < squares.length; i++) {
//     if(squares[i].innerHTML == 0) {
//       zeros++
//     }
//   }
//   if(zeros === 0) {
//     resultDisplay.innerHTML = 'You Lose!';
//     document.removeEventListener('keyup', control);
//   }
// }

document.addEventListener('keyup', control)