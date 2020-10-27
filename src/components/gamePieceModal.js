let pieceModalConstainer = [];
let boardSize= 700;
// let  pieceSize = 15;

class PieceModal {
  constructor(name) {
    this.name = name;
    this.positionTaken = 'true';
    this.playerOnPosition = 'player-1';
    this.xPos = 0;
    this.yPos = 0;
  }
}

for (let i = 0; i <=25 ; i++) {
  pieceModalConstainer.push(new PieceModal(`b${i}`));
}

for (let i = 13; i <25 ; i++) {
  pieceModalConstainer[i].playerOnPosition = 'player-2';
}

//setting positons x position

pieceModalConstainer[0].xPos = 0;
pieceModalConstainer[1].xPos = boardSize/4;
pieceModalConstainer[2].xPos = boardSize/2;
pieceModalConstainer[3].xPos = boardSize/1.33;
pieceModalConstainer[4].xPos = boardSize;

pieceModalConstainer[5].xPos = 0;
pieceModalConstainer[6].xPos = boardSize/4;
pieceModalConstainer[7].xPos = boardSize/2;
pieceModalConstainer[8].xPos = boardSize/1.33;
pieceModalConstainer[9].xPos = boardSize;

pieceModalConstainer[10].xPos = 0;
pieceModalConstainer[11].xPos = boardSize/4;
pieceModalConstainer[12].xPos = boardSize/2;
pieceModalConstainer[13].xPos = boardSize/1.33;
pieceModalConstainer[14].xPos = boardSize;

pieceModalConstainer[15].xPos = 0;
pieceModalConstainer[16].xPos = boardSize/4;
pieceModalConstainer[17].xPos = boardSize/2;
pieceModalConstainer[18].xPos = boardSize/1.33;
pieceModalConstainer[19].xPos = boardSize;

pieceModalConstainer[20].xPos = 0;
pieceModalConstainer[21].xPos = boardSize/4;
pieceModalConstainer[22].xPos = boardSize/2;
pieceModalConstainer[23].xPos = boardSize/1.33;
pieceModalConstainer[24].xPos = boardSize;


//setting positons Y position

pieceModalConstainer[5].yPos = boardSize/4;
pieceModalConstainer[6].yPos = boardSize/4;
pieceModalConstainer[7].yPos = boardSize/4;
pieceModalConstainer[8].yPos = boardSize/4;
pieceModalConstainer[9].yPos = boardSize/4;

pieceModalConstainer[10].yPos = boardSize/2;
pieceModalConstainer[11].yPos = boardSize/2;
pieceModalConstainer[12].yPos = boardSize/2;
pieceModalConstainer[13].yPos = boardSize/2;
pieceModalConstainer[14].yPos = boardSize/2;

pieceModalConstainer[15].yPos = boardSize/1.33;
pieceModalConstainer[16].yPos = boardSize/1.33;
pieceModalConstainer[17].yPos = boardSize/1.33;
pieceModalConstainer[18].yPos = boardSize/1.33;
pieceModalConstainer[19].yPos = boardSize/1.33;

pieceModalConstainer[20].yPos = boardSize;
pieceModalConstainer[21].yPos = boardSize;
pieceModalConstainer[22].yPos = boardSize;
pieceModalConstainer[23].yPos = boardSize;
pieceModalConstainer[24].yPos = boardSize;


// pieceModalConstainer[2].yPos = (boardSize/4) - pieceSize
export default pieceModalConstainer;