interface CardProps {
  key: number;
  img: string;
  value: number;
  className: string;
}

const Card: React.FC<CardProps> = ({ img }) => (
  <img src={img} alt='Card' className='h-24 m-2' />
);

export default Card;
