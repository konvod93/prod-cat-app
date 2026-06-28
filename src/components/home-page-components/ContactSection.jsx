import { Link } from "react-router-dom";

const ContactSection = () => {
    return (
        <section className="py-12 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">📞 Связаться с нами</h2>
        <p className="text-lg text-gray-700 mb-6">
          Є питання? Ми завжди готові допомогти. Перейдіть в розділ{" "}
          <span className="text-blue-600 font-medium">"Контакти"</span>.
        </p>
        <Link
          to="/Contacts"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
        >
          Зв’язатися з нами
        </Link>
      </section>    
    )
}

export default ContactSection;