import React, {Component} from "react";
import pieceModalConstainer from "./gamePieceModal";
import {destroyPiece} from './gameFunctions';

class Pieces extends Component {

  state = { pieceModalConstainer: pieceModalConstainer, firstClick: -1 }

  gamePlay = (piece,index) => {
    let newModal = this.state.pieceModalConstainer;
    
    if(this.state.firstClick === -1) {
      this.setState({firstClick: index});
      // alert('player picked ' + this.state.firstClick);
    }
    else {
      alert('player picked ' + this.state.firstClick);
      newModal[this.state.firstClick].xPos = pieceModalConstainer[index].xPos;
      newModal[this.state.firstClick].yPos = pieceModalConstainer[index].yPos;
      this.setState({firstClick: -1});
      // alert('player picked ' + this.state.firstClick);
    }

    this.setState({pieceModalConstainer: newModal});
  }

  render() {
    destroyPiece(12);
    
    return(
      <>
        <div className="piece-modal-outer" >
          {this.state.pieceModalConstainer.map( (piece,index) =>
            <div key={piece.name} onClick={() => this.gamePlay(piece,index)} className={`player player-position`}>{index}</div>
          )}
        </div>
        <div className="piece-modal-outer piece-modal-view" >
          {this.state.pieceModalConstainer.map( (piece) =>
            <div 
              key={piece.name} 
              className={`player player-on-view ${piece.playerOnPosition} ${piece.name}`} 
              style={{transform: `translate(${piece.xPos}px,${piece.yPos}px)`}}
            />
          )}
        </div>
      </>
    )
  }
}

export default Pieces;
