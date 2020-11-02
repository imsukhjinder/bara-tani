import React, {Component} from "react";
import {pieceModalContainer} from "./gamePieceModal";

class Pieces extends Component {

  state = { 
    modalState: JSON.parse(JSON.stringify(pieceModalContainer)), 
    playerPicked: 'null',
    goingTo: 'null', 
  }

  setPosition = (playerPicked,goingTo) => {
    debugger;
    let newModal = this.state.modalState;
    newModal[playerPicked].xPos = pieceModalContainer[goingTo].xPos;
    newModal[playerPicked].yPos = pieceModalContainer[goingTo].yPos;
    pieceModalContainer[goingTo].playerOnPosition = playerPicked;
 

    this.setState({
      modalState: newModal,
      playerPicked: 'null'
    });
  }

  gamePlay = (index) => {
    if(this.state.playerPicked === 'null') {
      debugger
      this.setState({playerPicked: index});
    }
    else {
      this.setState({goingTo: parseInt(index)});
      this.setPosition(this.state.playerPicked,index);
    }

  }

  render() {
    return(
      <>
        <div className="piece-modal-outer" >
          {pieceModalContainer.map( (piece,index) =>
            <div 
            key={piece.name} 
            onClick={() => this.gamePlay(piece.playerOnPosition)} 
            className={`player player-position`}
            // data-x={piece.xPos} 
            // data-y={piece.yPos} 
            >
              {index}
            </div>
          )}
        </div>
        <div className="piece-modal-outer piece-modal-view" >
          {this.state.modalState.map( (piece) =>
            <div 
              key={`p${piece.name}`} 
              className={`player player-on-view ${piece.playerColor} p${piece.name}`} 
              style={{transform: `translate(${piece.xPos}px,${piece.yPos}px)`}}
              // data-x={piece.xPos} 
              // data-y={piece.yPos}
            />
          )}
        </div>
        <div className="message-Modal" >
            Player Picked {this.state.playerPicked} <br />
            Going To {this.state.goingTo}
        </div>
      </>
    )
  }
}

export default Pieces;
