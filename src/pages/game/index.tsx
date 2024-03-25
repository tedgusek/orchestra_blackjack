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
  };

  const hitPlayer = async () => {
    if (deck_id && winner === '') {
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
  };

  const onExit = () => {
    router.push('/');
    setWinner('');
  };

  useEffect(() => {
    if (!deck_id) {
      startGame();
    }
  }, []);

  return (
    <div className='flex flex-col items-center mt-4 text-5xl'>
      <h1 className='p-4'> Blackjack Game </h1>
      {winner && (
        <WinnerModal winner={winner} shuffle={shuffleDeck} onExit={onExit} />
      )}
      <div id='ButtonDiv' className='flex flex-row items-center'>
        <button
          onClick={hitPlayer}
          className='px-4 mx-4 bg-green-500 rounded-lg border-4 border-white text-lg'
        >
          Hit
        </button>
        <button
          onClick={() => stand(playerTotal, houseTotal)}
          className='px-4 mx-4 bg-green-500 rounded-lg border-4 border-white text-lg'
        >
          Stand
        </button>
        <button
          onClick={shuffleDeck}
          className='px-4 mx-4 bg-green-500 rounded-lg border-4 border-white text-lg'
        >
          SHUFFLE
        </button>
        <button
          onClick={onExit}
          className='px-4 mx-4 bg-green-500 rounded-lg border-4 border-white text-lg'
        >
          Exit
        </button>
      </div>
      <div
        id='HouseHnadDiv'
        className='bg-green-500 rounded-lg border-4 border-white p-4 h-64 m-4 w-auto'
      >
        <h1 className='text-3xl text-center'>House Hand Total: {houseTotal}</h1>
        <Hand cards={houseHand} />
      </div>
      <div
        id='PlayerHandDiv'
        className='bg-green-500 rounded-lg border-4 border-white p-4 h-64 w-9/12 m-4 max-w-screen-md mx-auto overflow-auto'
      >
        <h1 className='text-3xl text-center'>
          Player Hand Total: {playerTotal}
        </h1>
        <Hand cards={playerHand} />
      </div>
    </div>
  );
};

export default Game;
