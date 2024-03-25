interface Card {
  code: string;
  image: string;
  value: string;
  suit: string;
}

interface Cards extends Array<Card> {}

// Input is the cards array
// Output total  -- handle edge case of ace here?
export const handTotal = (Cards: Cards) => {
  // initialize a variable aceCount to count the number of aces -- an array, or maybe just an incrementing number>?
  let aceCount: number = 0;
  const jqgPattern: RegExp = /[JQG]/;
  // Iterate through the array of objects- use reduce?
  let total = Cards.reduce((acc: number, curr: Card) => {
    if (jqgPattern.test(curr.value)) {
      //add 10
      //   console.log('curr.val ', curr.value);
      acc += 10;
    } else if (curr.value === 'ACE') {
      // add 11
      acc += 11;
      aceCount += 1;
    } else {
      acc += parseInt(curr.value);
    }
    return acc;
  }, 0);
  // need value at cards.value, will be a string
  //   - if JQK assign number 10
  //   - if A assign number 11 and increment aceCount
  //   - else parseInt the value
  //
  // while total is greater than 21 and aceCount is greater than 0
  // - reassign total to total - 10 and reassign aceCount to aceCount -1
  //
  while (total > 21 && aceCount > 0) {
    total -= 10;
    aceCount -= 1;
  }

  return total;
};

// Input player handTotal & house handTotal
// Output string
export const checkWinner = (playerTotal: number, houseTotal: number) => {
  // Player wins if playerHand is less than 21 and greater than houseHand total
  if (playerTotal <= 21 && playerTotal > houseTotal) {
    // alert(`The Player Wins!!`);
    return 'Player'; // Player Wins
  } else if (playerTotal === 21 && houseTotal !== 21) {
    // Player wins if playerHand is 21 and houseHand total is not
    // Player wins
    // alert(`The Player Wins!!`);
    return 'Player';
  } else if (playerTotal > 21) {
    // House wins if playerHand is over 21 --Consider the Ace 1 or 11
    // House wins
    // alert(`The House Wins!!`);
    return 'House';
  } else if (playerTotal < houseTotal) {
    // House wins if playerHand total is less than 21 and less than houseHand total
    // House wins
    // alert(`The House Wins!!`);
    return 'House';
  } else if (playerTotal === houseTotal && playerTotal !== 0) {
    // House wins in the event of a tie
    // House wins by rules defined
    // alert(`The House Wins!!`);
    return 'House';
  } else {
    console.error('Need to check winning logic if this error came up'); // If we're here, I need to check my logic
    // alert(`Somethings broken!!`);
    return `Something's Wrong`;
  }
};
