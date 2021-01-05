import React, {Component} from "react";
import {pieceModalContainer} from "./gamePieceModal";

class Pieces extends Component {

  state = { 
    modalState: JSON.parse(JSON.stringify(pieceModalContainer)), 
    playerPicked: 'null',
    goingTo: 'null',
    turn: 'player-1' 
  }

  playerPickedNull = () => {
    this.setState({
      playerPicked: 'null'
    });
  }

  turnChange = () => {
    if(this.state.turn === 'player-1') {
      this.setState({
        turn: 'player-2' 
      });
    }
    else {
      this.setState({
        turn: 'player-1'
      });
    }
  }

  pickingPlayer = (playerPlaying,playerGoing) => {
    if(playerPlaying === this.state.turn) {
      if(this.state.playerPicked === 'null') {
        this.setState({
          playerPicked: playerGoing
        });
        // alert('player picked ' + playerGoing);
      }
      else {
        alert('Move not allowed');
        this.playerPickedNull();
      } 
    }
    else {
      alert('Not your player' + playerPlaying);
    }
  }

  checkDeath(start,end) {
    let dead = false;
    let positionValue = start - end;
    // alert(positionValue+','+start+','+end);

    if(positionValue === 2) {
      dead = end + 1;
    }
    if(positionValue === -2) {
      dead = end - 1;
    }
    if(positionValue === 8) {
      dead = end + 4;
    }
    if(positionValue === -8) {
      dead = end - 4;
    }
    if(positionValue === 9) {
      dead = end + 5;
    }
    if(positionValue === -9) {
      dead = end - 5;
    }
    if(positionValue === 10) {
      dead = end + 5;
    }
    if(positionValue === -10) {
      dead = end - 5;
    }
    if(positionValue === 12) {
      dead = end + 6;
    }
    if(positionValue === -12) {
      dead = end - 6;
    }
    if(positionValue === 16) {
      dead = end + 5;
    }
    if(positionValue === -16) {
      dead = end - 5;
    }

    return dead;
  }

  placePlayer = (name,xPos,yPos) => {
    if(this.state.playerPicked === 'null') {
      alert('no player picked') 
    }
    else {
      // alert('player going to '+ name);
      let newModal = this.state.modalState;
      // console.log(newModal);

      // console.log(newModal.find(e => e.playerOnPosition === this.state.playerPicked ));
      let playerMoving = newModal.find(e => e.playerOnPosition === this.state.playerPicked && e.playerColor !== "dead-player" );
      newModal[playerMoving.name].xPos = xPos;
      newModal[playerMoving.name].yPos = yPos;
      newModal[playerMoving.name].playerOnPosition = name;

      let dead = this.checkDeath(this.state.playerPicked,name);
      if(dead) {
        alert(dead + ' is dead');
        
        let deadPlayerIndex = newModal.find(e => (e.playerOnPosition === dead && e.playerColor !== "dead-player"));
        console.log(deadPlayerIndex)
        newModal[deadPlayerIndex.name].playerColor = 'dead-player';
        this.setState({
          modalState: newModal
        });
      }
      this.playerPickedNull();
      this.turnChange();
    }
  }

  render() {
    return(
      <>
        <div className="piece-modal-outer piece-modal-view" >
          {pieceModalContainer.map( (piece,index) =>
            <div 
            key={piece.name} 
            onClick={() => this.placePlayer(index,piece.xPos,piece.yPos)} 
            className={`player player-position`}
            // data-x={piece.xPos} 
            // data-y={piece.yPos} 
            >
              {index}
            </div>
          )}
          {this.state.modalState.map( (piece,index) =>
            <div 
              key={`p${index}`} 
              className={`player player-on-view ${piece.playerColor} p${piece.playerOnPosition}`} 
              style={{transform: `translate(${piece.xPos}px,${piece.yPos}px)`}}
              onClick={() => this.pickingPlayer(piece.playerColor,parseInt(piece.playerOnPosition))} 
              data-on-position={piece.playerOnPosition}
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
