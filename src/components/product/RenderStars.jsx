const RenderStars = ({ rating }) => {
  if (!rating) return null;
  const stars = [];
  const full = Math.floor(rating);
  const half = rating % 1 !== 0;

  for (let i = 0; i < full; i++)
    stars.push(<span key={i} className="text-yellow-400">★</span>);

  if (half)
    stars.push(<span key="half" className="text-yellow-400">☆</span>);

  for (let i = 0; i < 5 - Math.ceil(rating); i++)
    stars.push(<span key={`e${i}`} className="text-gray-300 dark:text-gray-500">★</span>);

  return stars;
};

export default RenderStars;