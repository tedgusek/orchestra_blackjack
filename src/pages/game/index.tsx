import { useEffect, useState } from 'react';
import { initDeck, dealCard, shuffleCards } from '../api/blackjack'; // This needs to be built in respective folder
import {
  calculateHandValue,
  determineWinner,
} from '../../utils/blackjackLogic'; // This needs to be built in respective folder
import Hand from '../../components/Hand';
import Button from '../../components/Button';

// interface Card {
//   code: string;
//   image: string;
//   value: string;
//   suit: string;
// }

// interface DealCardResponse {
//   cards: Card[];
// }

const Game = () => {
  const [deck_id, setDeckId] = useState<string | null>(null);
  //   const [playerHand, setPlayerHand] = useState<DealCardResponse>();
  const [playerHand, setPlayerHand] = useState<string[]>([]);
  const [houseHand, setHouseHand] = useState<string[]>([]);

  //   const startGame = async () => {
  useEffect(() => {
    const startGame = async () => {
      const { deck_id } = await initDeck();
      setDeckId(deck_id);
      console.log('deck_id: ', deck_id);
      const initialHouseHand = await dealCard(deck_id, 2);
      console.log('initialHouseHand: ', initialHouseHand);
      const initialPlayerHand = await dealCard(deck_id, 2);
      console.log('initialPlayerHand: ', initialPlayerHand);

      setHouseHand(initialHouseHand.cards);
      console.log('initialHouseHand.cards : ', initialHouseHand.cards);
      setPlayerHand(initialPlayerHand.cards);
    };
    startGame();
  }, []);

  // Implement Hit and Stand Functionality
  // Have Start game only render before first game, after that it shouldn't be visible
  // Need to implement a shuffle button, that will take all cards, and shufflle them back into the deck

  // useEffect(startGame)
  return (
    <div className='flex flex-col items-center mt-4 text-5xl'>
      <h1 className='p-4'> Blackjack Game </h1>
      {/* <button
        onClick={startGame}
        className='border-rounded m-4 p-4 border-white border-4 bg-green-500 rounded-full text-lg'
      >
        Start Game
      </button> */}
      <div className='bg-green-500 rounded-lg border-4 border-white p-4 h-64 w-9/12 m-4'>
        <Hand cards={playerHand} />
      </div>
      <div className='bg-green-500 rounded-lg border-4 border-white p-4 h-64 w-9/12 m-4'>
        <Hand cards={houseHand} />
      </div>
    </div>
  );
};

export default Game;
