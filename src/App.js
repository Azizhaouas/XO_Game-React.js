import './App.css';
import { useState } from 'react';


function Square({value, onSquareClick, isWinningSquare }){
  return( <button className={`square ${isWinningSquare ? 'winning-square' : ''}`}onClick={onSquareClick}>{value}</button>);
  }

function Board({ XisNext, squares, onPlay, }){
  
  function handleClick(i){
    if(squares[i] || calculateWinner(squares)){
      return;
    }
    const nextSquares=squares.slice();
    
    if(XisNext){
      nextSquares[i]="X";
    }
    else{
      nextSquares[i]="O";
    }
    onPlay(nextSquares);
  }
  
  const winner = calculateWinner(squares)
  let status;
  const winningSquares= winner ? winner.winningCells: [];

  if (winner){
    status= "WINNER : "+ winner.theWinner ;
        
  }
  else{
    status= "the next player is : "+ (XisNext ? "X" : "O");
  }

  return (
    <>
      <div className='status'> {status} </div>
      <div className='board-row'>
        <Square value={squares[0]} onSquareClick= {() =>handleClick(0)} isWinningSquare={winningSquares.includes(0)} />
        <Square value={squares[1]} onSquareClick= {() =>handleClick(1)} isWinningSquare={winningSquares.includes(1)} />
        <Square value={squares[2]} onSquareClick= {() =>handleClick(2)} isWinningSquare={winningSquares.includes(2)} />
      </div>

      <div className='board-row'>
        <Square value={squares[3]} onSquareClick= {() =>handleClick(3)} isWinningSquare={winningSquares.includes(3)} />
        <Square value={squares[4]} onSquareClick= {() =>handleClick(4)} isWinningSquare={winningSquares.includes(4)} />
        <Square value={squares[5]} onSquareClick= {() =>handleClick(5)} isWinningSquare={winningSquares.includes(5)} />
      </div>

      <div className='board-row'>
        <Square value={squares[6]} onSquareClick= {() =>handleClick(6)} isWinningSquare={winningSquares.includes(6)} />
        <Square value={squares[7]} onSquareClick= {() =>handleClick(7)} isWinningSquare={winningSquares.includes(7)} />
        <Square value={squares[8]} onSquareClick= {() =>handleClick(8)} isWinningSquare={winningSquares.includes(8)} />
      </div>
    </>
  );
}


function calculateWinner(squares){
  const lines= [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];
  for (let i = 0 ; i<lines.length ; i++){
    const [a, b, c]=lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a]=== squares[c] ){
      return {theWinner: squares[a] , winningCells: [a, b, c]};
    }
  }
  return null;
}

export default function Game(){
  
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove]= useState(0);
  const currentSquares = history[currentMove];
  const XisNext= currentMove % 2 === 0 ;
  

  function handlePlayed(nextSquares){
    const nextHistory= [...history.slice(0, currentMove +1 ), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length-1 );
   
  }
  function jumpTo(nextMove){
    setCurrentMove(nextMove);
  }
  const move= history.map((squares, move)=> {
    let description;
    if(move > 0 ){
      description = " Back to Move "+ move;
    }
    else{
      description= "Restart the Game";
    }
    return(
      <li key={move}>
        <button onClick={() => jumpTo(move)}> {description} </button>
      </li>
    );
  });


  return(
    <div className='game'>
      <div className='game-board'>
        <Board 
        
        XisNext={XisNext} squares={currentSquares} onPlay={handlePlayed} />
      </div>
      <div  className='game-info'>
        <ol>{move}</ol>
      </div>
    </div>
  );
}


