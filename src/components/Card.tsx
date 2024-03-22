interface CardProps {
  card: string;
  value: number;
  key: number;
}

const Card: React.FC<CardProps> = ({ card, value }) => (
  <img src={card} alt='Card' value={value} />
);

export default Card;
