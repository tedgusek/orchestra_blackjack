import axios, { AxiosResponse } from 'axios';

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
    return response.data;
  } catch (error) {
    console.error('Error initializing the deck: ', error);
    throw error;
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
    throw error;
  }
};

export const shuffleCards = async (
  deck_id: string | null
): Promise<ShuffleCardResponse> => {
  if (!deck_id) throw new Error('Deck ID is required');
  try {
    const response: AxiosResponse<ShuffleCardResponse> = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deck_id}/shuffle/`
    );
    return response.data;
  } catch (error) {
    console.error('Error Shuffling: ', error);
    throw error;
  }
};
