
const Home = () => {
  return (
    <div className="p-4">
      <div>
        {Array.from({ length: 50 }).map((_, i) => (
          <p key={i}>Строка {i + 1}</p>
        ))}
      </div>
    </div>
  );
};

export default Home;