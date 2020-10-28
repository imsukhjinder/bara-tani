import pieceModalConstainer from './gamePieceModal';

export function destroyPiece(pieceNum) {
    pieceModalConstainer[pieceNum].positionTaken = 'false';
    pieceModalConstainer[pieceNum].playerOnPosition = "no-player";
}

export function setPlayer (playerPosition,playerName) {
    pieceModalConstainer[playerPosition].positionTaken = 'true';
    pieceModalConstainer[playerPosition].playerOnPosition = playerName;
}
