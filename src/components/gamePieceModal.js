export let pieceModalContainer = [];
let boardSize= 570;

class PieceModal {
  constructor(name,xPos,yPos,playerColor) {
    this.name = name;
    this.positionTaken = 'true';
    this.playerOnPosition = name;
    this.playerColor = playerColor;
    this.xPos = xPos;
    this.yPos = yPos;
  }
}

let xPos,yPos,playerColor;

for (let i = 0; i <25 ; i++) {
  if((i%5) === 0) {
    xPos = 0;
  }
  else if((i%5) === 1) {
    xPos = boardSize/4;
  }
  else if((i%5) === 2) {
    xPos = boardSize/2;
  }
  else if((i%5) === 3) {
    xPos = boardSize/1.33;
  }
  else if((i%5) === 4) {
    xPos = boardSize;
  }

  if(i <= 4 ) {
    yPos = 0;
  }
  else if(i <= 9) {
    yPos = boardSize/4;
  }
  else if(i <= 14) {
    yPos = boardSize/2;
  }
  else if(i <= 19) {
    yPos =  boardSize/1.33;
  }
  else if (i <= 24) {
    yPos =  boardSize;
  }

  if(i < 13) {
    playerColor = 'player-1'
  }
  else {
    playerColor = 'player-2'
  }

  pieceModalContainer.push(new PieceModal(i,xPos,yPos,playerColor));
}

pieceModalContainer[12].positionTaken = 'false';
pieceModalContainer[12].playerColor = "dead-player";