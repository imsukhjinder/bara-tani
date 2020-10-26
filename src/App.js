import React from 'react';
import './styles/index.scss';
import GameBoard from './components/gameBord';
import pieceModalConstainer from './components/gamePieceModal';

function App() {
  console.log(pieceModalConstainer);
  return (
    <>
      <GameBoard />
    </>
  );
}

export default App;
