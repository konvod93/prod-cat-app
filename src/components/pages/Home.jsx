
const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div>
        {Array.from({ length: 50 }).map((_, i) => (
          <p key={i}>Строка {i + 1}</p>
        ))}
      </div>
    </div>
  );
};

export default Home;