let pieceModalConstainer = [];
let boardSize= 700;

class PieceModal {
  constructor(name,xPos,yPos,playerOnPosition) {
    this.name = name;
    this.positionTaken = 'true';
    this.playerOnPosition = playerOnPosition;
    this.xPos = xPos;
    this.yPos = yPos;
  }
}

let xPos,yPos,playerOnPosition;

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
    playerOnPosition = 'player-1'
  }
  else {
    playerOnPosition = 'player-2'
  }

  pieceModalConstainer.push(new PieceModal(`b${i}`,xPos,yPos,playerOnPosition));
}

export default pieceModalConstainer;