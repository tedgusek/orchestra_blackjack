import { useEffect, useState } from 'react';
import { initDeck, dealCard, shuffleCards } from '../api/blackjack'; // This needs to be built in respective folder
import {
  calculateHandValue,
  determineWinner,
} from '../../utils/blackjackLogic'; // This needs to be built in respective folder
import Hand from '../../components/Hand';
import Button from '../../components/Button';

const Game = () => {
  const [deck_id, setDeckId] = useState<string | null>(null);
  //   const [playerHand, setPlayerHand] = useState<DealCardResponse>();
  const [playerHand, setPlayerHand] = useState<string[]>([]);
  const [houseHand, setHouseHand] = useState<string[]>([]);

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

  useEffect(() => {
    startGame();
  }, []);

  const hitPlayer = async () => {
    if (deck_id) {
      try {
        const response = await dealCard(deck_id, 1);
        setPlayerHand([...playerHand, ...response.cards]);
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
        // setPlayerHand([...playerHand, ...response.cards]);
        const initialHouseHand = await dealCard(deck_id, 2);
        console.log('initialHouseHand: ', initialHouseHand);
        const initialPlayerHand = await dealCard(deck_id, 2);
        console.log('initialPlayerHand: ', initialPlayerHand);

        setHouseHand(initialHouseHand.cards);
        console.log('initialHouseHand.cards : ', initialHouseHand.cards);
        setPlayerHand(initialPlayerHand.cards);
      } catch (error) {
        console.error('Error shuffling deck : ', error);
      }
    } else {
      console.error('No Deck Available');
    }
  };

  // Implement current score calculator
  // use score calculator to determine winner
  // Implement Stand Functionality - essentially with the given parameters this will be a button
  // to ensure that the player has a winning hand and offers a way to exit the game as a winner

  return (
    <div className='flex flex-col items-center mt-4 text-5xl'>
      <h1 className='p-4'> Blackjack Game </h1>
      <div id='ButtonDiv' className='flex flex-row items-center'>
        <button
          onClick={hitPlayer}
          className='px-4 mr-4 bg-green-500 rounded-lg border-4 border-white text-lg'
        >
          Hit
        </button>
        <button
          onClick={shuffleDeck}
          className='px-4 ml-4 bg-green-500 rounded-lg border-4 border-white text-lg'
        >
          SHUFFLE
        </button>
      </div>
      <div className='bg-green-500 rounded-lg border-4 border-white p-4 h-64 w-9/12 m-4 w-auto'>
        <h1 className='text-3xl'>House Hand</h1>
        <Hand cards={houseHand} />
      </div>
      <div className='bg-green-500 rounded-lg border-4 border-white p-4 h-64 w-9/12 m-4'>
        <h1 className='text-3xl'>Player Hand</h1>
        <Hand cards={playerHand} />
      </div>
    </div>
  );
};

export default Game;
