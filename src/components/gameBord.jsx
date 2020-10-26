import React, { Component } from 'react';

class GameBoard extends Component {
    render() {
        return (
          <div className="game-board">
            <div className="game-board-outer" />
            <div className="game-board-outer game-board-outer-2" />
          </div>
        );
    }    
}

export default GameBoard;