interface Card {
  code: string;
  image: string;
  value: string;
  suit: string;
}

interface Cards extends Array<Card> {}

// Input: cards array
// Output: total number

// initialize a variable aceCount to count the number of aces -- an incrementing number
// Iterate through the array of objects- use reduce
// need value at cards.value, will be a --string--
//   - if JQK assign number 10
//   - if A assign number 11 and increment aceCount
//   - else parseInt the value
//
// Handle ACE edge case
// while total is greater than 21 and aceCount is greater than 0
// - reassign total to total - 10 and reassign aceCount to aceCount -1
//

export const handTotal = (Cards: Cards) => {
  let aceCount: number = 0;
  const jqgPattern: RegExp = /[JQG]/;

  let total = Cards.reduce((acc: number, curr: Card) => {
    if (jqgPattern.test(curr.value)) {
      acc += 10;
    } else if (curr.value === 'ACE') {
      acc += 11;
      aceCount += 1;
    } else {
      acc += parseInt(curr.value);
    }
    return acc;
  }, 0);
  while (total > 21 && aceCount > 0) {
    total -= 10;
    aceCount -= 1;
  }

  return total;
};

// Input: player handTotal & house handTotal
// Output: string
// Player wins if playerHand is less than 21 and greater than houseHand total
// Player wins if playerHand is 21 and houseHand total is not
// House wins if playerHand is over 21 --Consider the Ace 1 or 11
// House wins if playerHand total is less than 21 and less than houseHand total
// House wins in the event of a tie

export const checkWinner = (playerTotal: number, houseTotal: number) => {
  if (playerTotal <= 21 && playerTotal > houseTotal) {
    return 'Player';
  } else if (playerTotal === 21 && houseTotal !== 21) {
    return 'Player';
  } else if (playerTotal > 21) {
    return 'House';
  } else if (playerTotal < houseTotal) {
    return 'House';
  } else if (playerTotal === houseTotal && playerTotal !== 0) {
    return 'House';
  } else {
    console.error('Need to check winning logic if this error came up'); // If we're here, I need to check my logic
    return `Something's Wrong`;
  }
};
