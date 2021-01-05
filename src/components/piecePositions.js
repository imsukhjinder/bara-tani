import React, {Component} from "react";
import {pieceModalContainer} from "./gamePieceModal";

class Pieces extends Component {

  state = { 
    modalState: JSON.parse(JSON.stringify(pieceModalContainer)), 
    playerPicked: 'null',
    goingTo: 'null',
    turn: 'player-1',
    playerOneDead: 0,
    playerTwoDead: 0,
    timerMin: 2,
    timerSec: 0
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

  checkDeath = (start,end) => {
    let dead = false;
    let positionValue = start - end;

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
      let newModal = this.state.modalState;
      let playerMoving = newModal.find(e => e.playerOnPosition === this.state.playerPicked && e.playerColor !== "dead-player" );
      newModal[playerMoving.name].xPos = xPos;
      newModal[playerMoving.name].yPos = yPos;
      newModal[playerMoving.name].playerOnPosition = name;

      let dead = this.checkDeath(this.state.playerPicked,name);
      if(dead) {
        //alert(dead + ' is dead');
        
        let deadPlayerIndex = newModal.find(e => (e.playerOnPosition === dead && e.playerColor !== "dead-player"));
        let playerDead = newModal[deadPlayerIndex.name].playerColor;

        if(playerDead === 'player-1') {
          this.setState({
            playerOneDead: this.state.playerOneDead + 1
          });
        }

        if(playerDead === 'player-2') {
          this.setState({
            playerTwoDead: this.state.playerTwoDead + 1
          });
        }

        newModal[deadPlayerIndex.name].playerColor = 'dead-player';
        this.setState({
          modalState: newModal
        });
      }
      this.playerPickedNull();
    }
  }

  // turnTimer = () => {
  //   let time = (this.state.timerMin * 60) + this.state.timerSec;

  //   setInterval(()=> {
  //     time--;
  //   },1000);
  // }

  render() {
    return(
      <>
        <div className="piece-modal-outer piece-modal-view" >
          {pieceModalContainer.map( (piece,index) =>
            <div 
            key={piece.name} 
            onClick={() => this.placePlayer(index,piece.xPos,piece.yPos)} 
            className={`player player-position`}
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
            />
          )}
        </div>
        <div className={`side-modal side-modal-1 ${this.state.turn === "player-2" ? 'disabled' : ''}`}>
          <div className="message-Modal" >
              Player 1 Board <br />
              Player Dead {this.state.playerOneDead}
          </div>
          <div className="game-timer" >
            {this.state.timerMin}:{this.state.timerSec}
          </div>
          <button className="" onClick={this.turnChange}>Turn Change</button>
        </div>
        <div className={`side-modal side-modal-2 ${this.state.turn === "player-1" ? 'disabled' : ''}`}>
          <div className="message-Modal" >
              Player 2 Board <br />
              Player Dead {this.state.playerTwoDead}
          </div>
          <button className="" onClick={this.turnChange}>Turn Change</button>
        </div>
      </>
    )
  }
}

export default Pieces;
