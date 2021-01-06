import React, {Component} from "react";
import {pieceModalContainer} from "./gamePieceModal";

class Pieces extends Component {

  state = { 
    modalState: JSON.parse(JSON.stringify(pieceModalContainer)), 
    playerPicked: 'null',
    goingTo: 'null',
    turn: 'no-one',
    playerOneDead: 0,
    playerTwoDead: 0,
    timerMin: 0,
    timerSec: 0,
    turnTime: 20,
    paused: false,
    pausedTime: 0
  }

  playerPickedNull = () => {
    this.setState({
      playerPicked: 'null'
    });
  }

  turnChange = () => {
    clearInterval(this.ts);

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
    this.setState({
      timerMin: 0,
      timerSec: 0
    });
    this.turnTimerOn();
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
    else if(playerPlaying !== this.state.turn && this.state.playerPicked !== 'null') {
      alert('Wrong Move');
      this.playerPickedNull();
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

  checkLegalMove = (start,end) => {
    let move = false;
    let moveValue = start - end;
    let moveCondition = 
    moveValue === -1 || 
    moveValue === 1  || 
    moveValue === 5 || 
    moveValue === -5 || 
    moveValue === 6 || 
    moveValue === -6 || 
    (moveValue === 4 && start%2 === 0 && end%2 === 0) || 
    (moveValue === -4 && start%2 === 0 && end%2 === 0) ;

    if(moveCondition) {
      move = true;
    }

    return move;
  }

  placePlayer = (name,xPos,yPos) => {
    if(this.state.playerPicked === 'null') {
      alert('no player picked') 
    }
    else {

      let legalMove = this.checkLegalMove(this.state.playerPicked,name);
      let dead = this.checkDeath(this.state.playerPicked,name);
      let newModal = this.state.modalState;
      let playerMoving = newModal.find(e => e.playerOnPosition === this.state.playerPicked && e.playerColor !== "dead-player" );
      
      if(legalMove || dead) {
        newModal[playerMoving.name].xPos = xPos;
        newModal[playerMoving.name].yPos = yPos;
        newModal[playerMoving.name].playerOnPosition = name;
      }
      else {
        alert('wrong Move');
      }

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
      
        if(this.state.playerTwoDead === 11) {
          alert("Player 1 wins");
          this.gameStop();
        }

        if(this.state.playerOneDead === 11) {
          alert("Player 2 wins");
          this.gameStop();
        }
      }
      this.playerPickedNull();
    }
  }

  turnTimerOn = (timerTime = this.state.turnTime) => {
      let time = timerTime;
      
      this.ts = setInterval(()=> {
        let mints = Math.floor(time/60);
        let sec = time % 60;
        sec = sec < 10 ? '0' + sec : sec;

        this.setState({
          timerMin: mints,
          timerSec: sec
        })

        time--;

        if(time === 0) {
          
          let newModal = this.state.modalState;
          let deadPlayerIndex;

          if(this.state.turn === "player-1") {
            deadPlayerIndex = newModal.find(e => (e.playerColor === "player-1"));
            this.setState({
              playerOneDead: this.state.playerOneDead + 1
            });
          }
          else {
            deadPlayerIndex = newModal.find(e => (e.playerColor === "player-2"));
            this.setState({
              playerTwoDead: this.state.playerTwoDead + 1
            });
          }

          newModal[deadPlayerIndex.name].playerColor = 'dead-player';
          this.setState({
            modalState: newModal
          });
          alert("player died");
          this.turnChange();
        }

      },1000);
  }

  gameStart = () => {
    this.setState({
      turn: 'player-1'
    })
    this.turnTimerOn();
  }

  gameStop = () => {
    clearInterval(this.ts);
    clearInterval(this.ts2);
    this.setState({
      modalState: JSON.parse(JSON.stringify(pieceModalContainer)), 
      playerPicked: 'null',
      goingTo: 'null',
      turn: 'no-one',
      playerOneDead: 0,
      playerTwoDead: 0,
      timerMin: 0,
      timerSec: 0,
      paused: false,
      pausedTime: 0
    })
  }

  gamePause = () => {
    let pauseTime =  (this.state.timerMin*60) + this.state.timerSec;
    clearInterval(this.ts);

    this.setState({
      paused: true,
      pausedTime: pauseTime - 1
    })
  }

  gamePlay = () => {
    this.turnTimerOn(this.state.pausedTime);

    this.setState({
      paused: false,
      pausedTime: this.state.turnTime
    })
  }

  render() {
    return(
      <>
        <div className="nav-top">
          <button onClick={this.gameStart}>Start Game</button>
          <button onClick={this.gamePause}>Pause Game</button>
          <button onClick={this.gamePlay} disabled={!this.state.paused}>Play Game</button>
          <button onClick={this.gameStop}>Quit Game</button>
        </div>
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
        <div className={`side-modal side-modal-1 ${this.state.turn !== "player-1" ? 'disabled' : ''}`}>
          <div className="message-Modal" >
              Player 1 Board <br />
              Player Dead {this.state.playerOneDead}
          </div>
          <div className="game-timer" >
            {this.state.turn === "player-1" ? `${this.state.timerMin}:${this.state.timerSec}` : '0:00'}
          </div>
          <button className="" onClick={this.turnChange}>Turn Change</button>
        </div>
        <div className={`side-modal side-modal-2 ${this.state.turn !== "player-2" ? 'disabled' : ''}`}>
          <div className="message-Modal" >
              Player 2 Board <br />
              Player Dead {this.state.playerTwoDead}
          </div>
           <div className="game-timer" >
            {this.state.turn === "player-2" ? `${this.state.timerMin}:${this.state.timerSec}` : '0:00'}
          </div>
          <button className="" onClick={this.turnChange}>Turn Change</button>
        </div>
      </>
    )
  }
}

export default Pieces;
