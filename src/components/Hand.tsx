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
  <div className='flex flex-row items-center p-4 m-4'>
    {cards.map((card, index) => (
      <Card
        key={index}
        img={card.image}
        value={parseInt(card.value)}
        className='m-4'
      />
    ))}
  </div>
);

export default Hand;
