import React, {Component} from "react";
import {pieceModalContainer} from "./gamePieceModal";
import { CloseIcon,StartIcon,ChangeIcon } from './icons';

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
    turnTime: 120,
    paused: false,
    pausedTime: 0,
    currentActive: 12,
    errorMsg: false,
    menuOpen: false
  }

  playerPickedNull = () => {
    this.setState({
      playerPicked: 'null'
    });
  }

  unsetActivePlayer = () => {
    let newModal = this.state.modalState;
    newModal[this.state.currentActive].active = false;

    this.setState({
      modalState: newModal
    });
  }

  turnChange = () => {
    this.playerPickedNull();
    clearInterval(this.ts);
    let newModal = this.state.modalState;
    newModal[this.state.currentActive].active = false;

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
      timerSec: 0,
      modalState: newModal
    });
    this.turnTimerOn();
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


    if(dead) {
      let deadPlayerIndex = this.state.modalState.find(e => (e.playerOnPosition === dead && e.playerColor !== "dead-player"));
      let playerDead = this.state.modalState[deadPlayerIndex.name].playerColor;

      if(this.state.turn === playerDead) {
        dead = false;
      }
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
    (moveValue === 6 && start%2 === 0 && end%2 === 0) || 
    (moveValue === -6 && start%2 === 0 && end%2 === 0) || 
    (moveValue === 4 && start%2 === 0 && end%2 === 0) || 
    (moveValue === -4 && start%2 === 0 && end%2 === 0) ;

    if(moveCondition) {
      move = true;
    }

    return move;
  }

  pickingPlayer = (playerPlaying,playerGoing,index) => {
    if(playerPlaying === this.state.turn) {
      if(this.state.playerPicked === 'null') {
        let newModal = this.state.modalState;
        newModal[index].active = true;

        this.setState({
          playerPicked: playerGoing,
          currentActive: index,
          modalState: newModal
        });
      }
      else {
        this.raiseError('Move not allowed');
      } 
    }
    else if(playerPlaying !== this.state.turn && this.state.playerPicked !== 'null') {
      this.raiseError('Wrong Move');
    }
    else {
      this.raiseError('Not your player');
    }
  }

  placePlayer = (name,xPos,yPos) => {
    if(this.state.playerPicked === 'null') {
      this.raiseError('no player picked');
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
        this.playerPickedNull();
      }
      else {
        this.raiseError('wrong Move');
      }

      if(dead) {
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
      this.setState({
        playerPicked: name
      });
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
          this.raiseError('player died');
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
      pausedTime: 0,
      currentActive: 12,
      errorMsg: false
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

  undoMove = () => {
    alert("Will be working Shortly");
  }

  raiseError = msg => {
    this.setState({
      errorMsg: msg
    });
    document.querySelector('#root').classList.add('show-error');
  }

  closeError = () => {
    this.setState({
      errorMsg: false
    });
    document.querySelector('#root').classList.remove('show-error');
  }

  changePlayer = () => {
    this.playerPickedNull();
    this.unsetActivePlayer();
  }

  showMenus = () => {
    document.querySelector('#root').classList.toggle('show-menus');

    if(this.state.menuOpen) {
      this.setState({
        menuOpen: false
      })
    }
    else {
      this.setState({
        menuOpen: true
      })
    }
  }

  render() {
    return(
      <>
        <div className={`nav-top ${this.state.turn === 'no-one' ? 'game-btns-view' : 'hide-start-btn'}`}>
          <button className={`btn btn-neon btn-play-pause ${this.state.paused ? 'd-none': ''}`} onClick={this.gamePause}>
            <span></span>  
            <span></span>  
            <span></span>  
            <span></span> 
            Pause</button>
          <button className={`btn btn-neon btn-play-pause ${!this.state.paused ? 'd-none': ''}`} onClick={this.gamePlay}>
            <span></span>  
            <span></span>  
            <span></span>  
            <span></span> 
            Play</button>
          <button className="btn btn-neon d-none" onClick={this.undoMove}>
            <span></span>  
            <span></span>  
            <span></span>  
            <span></span> 
            Undo</button>
          <button className="btn btn-neon turn-change" onClick={this.changePlayer}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>Change Player
          </button>
          <button className="btn btn-neon mr-0" onClick={this.gameStop}>
            <span></span>  
            <span></span>  
            <span></span>  
            <span></span> 
            Quit</button>
        </div>
        <div className={`piece-modal-outer piece-modal-view ${this.state.turn === 'no-one' ? 'disabled' : 'game-started'}`} >
          {pieceModalContainer.map( (piece,index) =>
            <div 
            key={piece.name} 
            onClick={() => this.placePlayer(index,piece.xPos,piece.yPos)} 
            className={`player player-position`}
            ></div>
          )}
          {this.state.modalState.map( (piece,index) =>
            <div 
              key={`p${index}`} 
              className={`player player-on-view ${piece.playerColor} p${piece.playerOnPosition} ${piece.active ? 'active-player': ''}`} 
              style={{transform: `translate(${piece.xPos}px,${piece.yPos}px)`}}
              onClick={() => this.pickingPlayer(piece.playerColor,parseInt(piece.playerOnPosition),piece.name)} 
              data-on-position={piece.playerOnPosition}
            />
          )}
        </div>
        <div className="side-modal-outer" >
          <div className={`side-modal side-modal-1 ${this.state.turn !== "player-1" ? 'disabled' : ''}`}>
            <div className="message-Modal" >
                <h1 className="board-heading">Player 1</h1>
                <h2>Kills {this.state.playerTwoDead}</h2>
                <h3>Dead {this.state.playerOneDead}</h3>
                <div className="game-timer" >
                  {this.state.turn === "player-1" ? `${this.state.timerMin}:${this.state.timerSec}` : '0:00'}
                </div>
              </div>
          </div>
        </div>
        <div className={`side-modal side-modal-2 ${this.state.turn !== "player-2" ? 'disabled' : ''}`}>
          <div className="message-Modal" >
              <h1 className="board-heading">Player 2</h1>
              <h2> Kills {this.state.playerOneDead}</h2>
              <h3>Dead {this.state.playerTwoDead}</h3>
              <div className="game-timer" >
                {this.state.turn === "player-2" ? `${this.state.timerMin}:${this.state.timerSec}` : '0:00'}
              </div>
          </div>
        </div>
        <div className="menu-toggle" onClick={this.showMenus}>
          <div class={`navToggle ${this.state.menuOpen? 'open' : ''}`}>
            <div class="icon-left"></div>
            <div class="icon-right"></div>
          </div>
        </div>
        <div className="menu-toggle menu-toggle-right" onClick={this.turnChange}>
          <ChangeIcon mainClass={`change-icon ${this.state.turn === "player-1" ? 'change-icon-1' : 'change-icon-2'}`} />
        </div>
        <div className={`menu-toggle menu-toggle-right ${this.state.turn === 'no-one' ? '' : 'd-none'}`} onClick={this.gameStart}>
          <StartIcon mainClass="start-icon" />
        </div>
        <div className="error-msg">
            {this.state.errorMsg}
            <button className="close-icon-outer" onClick={this.closeError}>
              <CloseIcon mainClass="close-icon" />
            </button>
        </div>
      </>
    )
  }
}

export default Pieces;
