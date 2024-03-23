interface CardProps {
  key: number;
  img: string;
  value: number;
}

const Card: React.FC<CardProps> = ({ img }) => (
  <img src={img} alt='Card' className='h-24' />
);

export default Card;
