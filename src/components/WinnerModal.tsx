import React from 'react';

interface WinnerModalProps {
  winner: string;
  shuffle: () => void;
  onExit: () => void;
}

const WinnerModal: React.FC<WinnerModalProps> = ({
  winner,
  shuffle,
  onExit,
}) => {
  return (
    <div className='w-96 h-64 bg-green-700 text-xl text-white rounded-lg border-white border-4 drop-shadow-2xl z-50 fixed top-40 left-auto '>
      <h2 className='text-center mt-4'> {winner} Wins the Game!!</h2>
      <div id='button_container' className='w-full text-center mt-16'>
        <button
          className='px-4 bg-green-500 rounded-lg border-4 border-white hover:bg-green-200 hover:text-black m-4'
          onClick={shuffle}
        >
          Play Again
        </button>
        <button
          className='px-4 bg-green-500 rounded-lg border-4 border-white hover:bg-green-200 hover:text-black m-4'
          onClick={onExit}
        >
          Exit
        </button>
      </div>
    </div>
  );
};

export default WinnerModal;
