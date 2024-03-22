import { useState } from 'react';
import { initDeck, dealCard } from '../api/blackjack'; // This needs to be built in respective folder
import {
  calculateHandValue,
  determineWinner,
} from '../../utils/blackjackLogic'; // This needs to be built in respective folder
import Hand from '../../components/Hand';
import Button from '../../components/Button';

const Game = () => {
  const [deckId, setDeckId] = useState<string | null>(null);
  const [playerHand, setPlayerHand] = useState<string[]>([]);
  const [houseHand, setHouseHand] = useState<string[]>([]);

  const startGame = async () => {
    const { deck_id } = await initDeck();
    setDeckId(deck_id);
    const initialHouseHand = await dealCard(deck_id, 2);
    const initialPlayerHand = await dealCard(deck_id, 2);

    setHouseHand(initialHouseHand.cards);
    setPlayerHand(initialPlayerHand.cards);
  };
  // Implement Hit and Stand Functionality

  return (
    <div>
      <h1> Blackjack Game </h1>
      <Button onclick={startGame}> Start Game </Button>
      <Hand cards={playerHand} />
      <Hand cards={houseHand} />
    </div>
  );
};

export default Game;
