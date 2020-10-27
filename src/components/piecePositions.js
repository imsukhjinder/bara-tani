import React, {Component} from "react";
import pieceModalConstainer from "./gamePieceModal";
import {destroyPiece, gamePlay} from './gameFunctions';

class Pieces extends Component {
  
  render() {
    destroyPiece(12);
    
    return(
      <>
        <div className="piece-modal-outer" >
          {pieceModalConstainer.map( (piece,index) =>
            <div key={piece.name} onClick={() => gamePlay(piece,index)} className={`player player-position`} />
          )}
        </div>
          <div className="piece-modal-outer piece-modal-view" >
          {pieceModalConstainer.map( (piece,index) =>
            <div 
              key={piece.name} 
              className={`player player-on-view ${piece.playerOnPosition} ${piece.name}`} 
              // data-x-position={piece.xPos}
              // data-y-position={piece.yPos}
              style={{transform: `translate(${piece.xPos}px,${piece.yPos}px)`}}
            />
          )}
        </div>
      </>
    )
  }
}

export default Pieces;
