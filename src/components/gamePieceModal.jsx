let pieceModalConstainer = [];

function PieceModal(name) {
  this.name = name;
  this.positioTaken = true;
  this.playerOnPosition = 'player1';
};

for (let i = 1; i <=25 ; i++) {
   pieceModalConstainer.push(new PieceModal(`b${i}`));
}

pieceModalConstainer[13].positioTaken = false;
pieceModalConstainer[13].playerOnPosition = " ";

for (let i = 14; i <= 26; i++) {
  pieceModalConstainer[13].playerOnPosition = "player2";
}

export default pieceModalConstainer;