import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-16 px-6 text-center">
        <h1 className="text-5xl font-extrabold mb-4">
          Ласкаво просимо до нашого магазину!
        </h1>
        <p className="text-xl mb-6">
          Товари, які вдохновлюють. Ціни, які радують.
        </p>
        <Link 
          to="/Products"
          className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition"
        >
          Перейти до покупок
        </Link>
      </section>

    );
}

export default Hero;