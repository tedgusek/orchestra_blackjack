import Card from './Card';

interface Card {
  code: string;
  image: string;
  value: string;
  suit: string;
}

interface HandProps {
  cards: Card[];
}

const Hand: React.FC<HandProps> = ({ cards }) => (
  <div>
    {cards.map((card, index) => (
      <Card key={index} img={card.image} value={parseInt(card.value)} />
    ))}
  </div>
);

export default Hand;
