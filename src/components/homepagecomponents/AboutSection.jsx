import { Link } from "react-router-dom";

const AboutSection = () => {
    return (
        <section className="py-12 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">🛒 Кто мы?</h2>
        <p className="text-lg text-gray-700">
          Мы — команда, которая верит, что покупки должны быть простыми,
          приятными и доступными. У нас вы найдете всё — от повседневных нужд до
          уникальных находок. <Link to="/About" className="text-blue-600 font-medium">Узнать больше...</Link>
        </p>
      </section>
    )
}

export default AboutSection;