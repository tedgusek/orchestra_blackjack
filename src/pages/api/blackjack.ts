import type { NextApiRequest, NextApiResponse } from 'next';
import { initDeck, dealCard } from '../../utils/blackjackLogic';

interface BlackjackApiResponse {
  deckId: string;
  playerHand: string[];
  houseHand: string[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BlackjackApiResponse>
) {
  if (req.method === 'GET') {
    try {
      const { deck_id } = await initDeck();
      const initialHouseHand = await dealCard(deck_id, 2);
      const initialPlayerHand = await dealCard(deck_id, 2);
      const response: BlackjackApiResponse = {
        deckId: deck_id,
        playerHand: initialPlayerHand.cards,
        houseHand: initialHouseHand.cards,
      };
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
