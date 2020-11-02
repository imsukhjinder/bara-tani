import {pieceModalContainer} from './gamePieceModal';

export function destroyPiece(pieceNum) {
    pieceModalContainer[pieceNum].positionTaken = 'false';
    pieceModalContainer[pieceNum].playerOnPosition = "no-player";
}

export function setPlayer (playerPosition,playerName) {
    pieceModalContainer[playerPosition].positionTaken = 'true';
    pieceModalContainer[playerPosition].playerOnPosition = playerName;
}
