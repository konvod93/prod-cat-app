import { Link } from "react-router-dom";

const AboutSection = () => {
    return (
        <section className="py-12 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">🛒 Хто ми?</h2>
        <p className="text-lg text-gray-700">
          Ми — команда, яка вірить, що покупки повинні бути простими,
          приємними і доступними. У нас ви знайдете все — від повсякденних потреб до
          унікальних знаходок. <Link to="/About" className="text-blue-600 font-medium">Дізнатися більше...</Link>
        </p>
      </section>
    )
}

export default AboutSection;