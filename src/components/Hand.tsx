import Card from './Card';

interface HandProps {
  cards: string[]; // array of card image urls.
  values: number[]; // array of card values
}

const Hand: React.FC<HandProps> = ({ cards, values }) => (
  <div>
    {cards.map((card, index) => (
      <Card key={index} card={card} value={value} />
    ))}
  </div>
);

export default Hand;
