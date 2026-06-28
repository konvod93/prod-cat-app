import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">О Нас</h1>
        <p className="text-lg text-gray-700 mb-6">
          Ми — команда, яка вірить, що покупки мають бути простими, приємними та
          доступними. У нас ви знайдете все - від повсякденних потреб до
          унікальних знахідок.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          Наша мета — зробити ваш шопінг максимально зручним та приємним. Ми
          постійно оновлюємо ассортимент, щоб ви могли знайти саме те, що
          шукаєте.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          Якщо у вас є питання або пропозиції, ми завжди раді допомогти! Ви
          можете зв'язатися з нами через розділ{" "}
          <Link to="/Contacts" className="text-blue-600 font-medium">
            Контакти
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default About;
