import React from 'react';
import './styles/index.scss';
import GameBoard from './components/gameBord';
import Pieces from './components/piecePositions';

function App() {  
  return (
    <>
      <GameBoard />
      <Pieces />
    </>
  );
}

export default App;
