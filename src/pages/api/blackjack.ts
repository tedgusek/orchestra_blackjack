import type { NextApiRequest, NextApiResponse } from 'next';
// import { initDeck, dealCard } from '../../utils/blackjackLogic';
import axios, { AxiosResponse } from 'axios';

// interface BlackjackApiResponse {
//   deckId: string;
//   playerHand: string[];
//   houseHand: string[];
// }
interface DeckAPIResponse {
  deck_id: string;
}

interface Card {
  code: string;
  image: string;
  value: string;
  suit: string;
}

interface DealCardResponse {
  cards: Card[];
}

interface ShuffleCardResponse {
  success: boolean;
  deck_id: string;
  remaining: number;
  shuffled: boolean;
}

export const initDeck = async (): Promise<DeckAPIResponse> => {
  try {
    const response: AxiosResponse<DeckAPIResponse> = await axios.get(
      'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
    );
    console.log('Response.data: ', response.data);
    return response.data;
  } catch (error) {
    console.error('Error initializing the deck: ', error);
  }
};

export const dealCard = async (
  deck_id: string,
  numCards: number
): Promise<DealCardResponse> => {
  try {
    const response: AxiosResponse<DealCardResponse> = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=${numCards}`
    );
    return response.data;
  } catch (error) {
    console.error('Error dealing cards :', error);
  }
};

// Out of Commision for now
export const shuffleCards = async (
  deck_id: string | null
): Promise<ShuffleCardResponse> => {
  try {
    const response: AxiosResponse<ShuffleCardResponse> = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deck_id}/shuffle/`
    );
    console.log('deck_id 22:', deck_id);
    return response.data;
  } catch (error) {
    console.log('deck_id :', deck_id);
    console.error('Error Shuffling: ', error);
  }
};
