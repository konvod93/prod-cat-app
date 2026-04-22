import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">О Нас</h1>
        <p className="text-lg text-gray-700 mb-6">
          Мы — команда, которая верит, что покупки должны быть простыми,
          приятными и доступными. У нас вы найдете всё — от повседневных нужд до
          уникальных находок.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          Наша цель — сделать ваш шопинг максимально удобным и приятным. Мы
          постоянно обновляем ассортимент, чтобы вы могли найти именно то, что
          ищете.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          Если у вас есть вопросы или предложения, мы всегда рады помочь! Вы
          можете связаться с нами через раздел{" "}
          <Link to="/Contacts" className="text-blue-600 font-medium">
            Контакты
          </Link>
          .
        </p>
      </div>
    </div>
  );
};


export default About;