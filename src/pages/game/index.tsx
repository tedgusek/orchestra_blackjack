import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { initDeck, dealCard, shuffleCards } from '../api/blackjack'; // This needs to be built in respective folder
import { handTotal, checkWinner } from '../../utils/blackjackLogic'; // This needs to be built in respective folder
import Hand from '../../components/Hand';
import WinnerModal from '@/components/WinnerModal';

interface Card {
  code: string;
  image: string;
  value: string;
  suit: string;
}

const Game = () => {
  const [deck_id, setDeckId] = useState<string | null>(null);
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [houseHand, setHouseHand] = useState<Card[]>([]);
  const [playerTotal, setPlayerTotal] = useState<number>(0);
  const [houseTotal, setHouseTotal] = useState<number>(0);
  const [winner, setWinner] = useState<string>('');

  const router = useRouter();

  const startGame = async () => {
    const { deck_id } = await initDeck();
    setDeckId(deck_id);

    setHouseTotal(0);
    setPlayerTotal(0);

    const initialHouseHand = await dealCard(deck_id, 2);
    const initialPlayerHand = await dealCard(deck_id, 2);

    setHouseHand(initialHouseHand.cards);
    setPlayerHand(initialPlayerHand.cards);
    const houseT = handTotal(initialHouseHand.cards);
    const playerT = handTotal(initialPlayerHand.cards);
    setHouseTotal(houseT);
    setPlayerTotal(playerT);

    // The following code snippet implements an auto check on the winner of the game
    // however, it was not conducive to the UX

    // if (
    //   (playerT <= 21 && playerT > houseT) ||
    //   (playerT === 21 && playerT === houseT)
    // ) {
    //   setTimeout(() => {
    //     checkWinnerAndUpdate(playerT, houseT);
    //   }, 500);
    // }
  };

  useEffect(() => {
    startGame();
  }, []);

  const hitPlayer = async () => {
    if (deck_id) {
      try {
        const response = await dealCard(deck_id, 1);

        const newPlayerHand = [...playerHand, ...response.cards];
        const newPlayerTotal = handTotal([...playerHand, ...response.cards]);
        setPlayerHand(newPlayerHand);
        setPlayerTotal(newPlayerTotal);

        if (newPlayerTotal > 21) {
          setTimeout(() => {
            checkWinnerAndUpdate(newPlayerTotal, houseTotal);
          }, 500);
        }
      } catch (error) {
        console.error('Error hitting Player : ', error);
      }
    } else {
      console.error('No Deck Available');
    }
  };

  // Shuffles deck but does not handle any scores yet
  const shuffleDeck = async () => {
    if (deck_id) {
      try {
        const response = await shuffleCards(deck_id);
        setHouseTotal(0);
        setPlayerTotal(0);

        const initialHouseHand = await dealCard(deck_id, 2);
        const initialPlayerHand = await dealCard(deck_id, 2);

        setHouseHand(initialHouseHand.cards);
        setPlayerHand(initialPlayerHand.cards);
        const houseT = handTotal(initialHouseHand.cards);
        const playerT = handTotal(initialPlayerHand.cards);
        setHouseTotal(houseT);
        setPlayerTotal(playerT);

        setWinner('');

        //  The following code snippet implemented an auto check for the winner
        //  However it was not condusive to tht UX

        // if (
        //   (playerT <= 21 && playerT > houseT) ||
        //   (playerT === 21 && playerT === houseT)
        // ) {
        //   setTimeout(() => {
        //     checkWinnerAndUpdate(playerT, houseT);
        //   }, 500);
        // }
      } catch (error) {
        console.error('Error shuffling deck : ', error);
      }
    } else {
      console.error('No Deck Available');
    }
  };

  const stand = (playerTotal: number, houseTotal: number) => {
    checkWinnerAndUpdate(playerTotal, houseTotal);
  };

  const checkWinnerAndUpdate = (playerTotal: number, houseTotal: number) => {
    const winner = checkWinner(playerTotal, houseTotal);
    setWinner(winner);
    setTimeout(() => {
      console.log('winner state is set');
    }, 0);
    //   if (winner === 'Player') {
    // Change logic to produce a modal that pops up and displays winner,
    // with options to either quit game back to main page, or to shuffle deck and play again
    //   alert('Player Wins!!');
    //   shuffleDeck();

    // } else if (winner === 'House') {
    //   alert('House Wins!');
    //   shuffleDeck();
    // }
  };

  const onExit = () => {
    router.push('/');
    setWinner('');
  };

  // Implement current score calculator
  // use score calculator to determine winner
  // Implement Stand Functionality - essentially with the given parameters this will be a button
  // to ensure that the player has a winning hand and offers a way to exit the game as a winner

  return (
    <div className='flex flex-col items-center mt-4 text-5xl'>
      <h1 className='p-4'> Blackjack Game </h1>
      {winner && (
        <WinnerModal winner={winner} shuffle={shuffleDeck} onExit={onExit} />
      )}
      <div id='ButtonDiv' className='flex flex-row items-center'>
        <button
          onClick={hitPlayer}
          className='px-4 mr-4 bg-green-500 rounded-lg border-4 border-white text-lg'
        >
          Hit
        </button>
        <button
          onClick={() => stand(playerTotal, houseTotal)}
          className='px-4 mr-4 bg-green-500 rounded-lg border-4 border-white text-lg'
        >
          Stand
        </button>
        <button
          onClick={shuffleDeck}
          className='px-4 ml-4 bg-green-500 rounded-lg border-4 border-white text-lg'
        >
          SHUFFLE
        </button>
      </div>
      <div className='bg-green-500 rounded-lg border-4 border-white p-4 h-64 w-9/12 m-4 w-auto'>
        <h1 className='text-3xl'>House Hand Total: {houseTotal}</h1>
        <Hand cards={houseHand} />
      </div>
      <div className='bg-green-500 rounded-lg border-4 border-white p-4 h-64 w-9/12 m-4'>
        <h1 className='text-3xl'>Player Hand Total: {playerTotal}</h1>
        <Hand cards={playerHand} />
      </div>
    </div>
  );
};

export default Game;
