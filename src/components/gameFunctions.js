import pieceModalConstainer from './gamePieceModal';

let playerPicked;

export function destroyPiece(pieceNum) {
    pieceModalConstainer[pieceNum].positionTaken = 'false';
    pieceModalConstainer[pieceNum].playerOnPosition = "no-player";
}

export function setPlayer (playerPosition,playerName) {
    pieceModalConstainer[playerPosition].positionTaken = 'true';
    pieceModalConstainer[playerPosition].playerOnPosition = playerName;
}

export function movePlayer (pieceIndex) {
    // pieceModalConstainer[pieceIndex].xPos = pieceModalConstainer[pieceIndex].xPos + 
    // document.querySelector(`.${playerName}`).classList.add('move-left');
}

export function gamePlay (piece,index) {

    if(playerPicked) {
        setPlayer(index,piece.playerOnPosition);
        movePlayer(playerPicked);
        destroyPiece(index)
        console.log("second Click")
        console.log(pieceModalConstainer)
    }
    else{
        playerPicked = index;
        // console.log(playerPicked);
        // console.log(pieceModalConstainer)
    }
}
