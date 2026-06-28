const Contacts = () => {
  return (
    <div className="container mx-auto px-4 py-8"><h1 className="text-2xl font-bold mb-4">Контакти</h1>
      <p className="mb-4">Якщо у вас є питання або пропозиції, будь ласка, зв’яжіться з нами за наступними контактами:</p>
      <ul className="list-disc pl-5">
        <li>Email: <a href="mailto:myemail@example.com" className="text-blue-600 hover:underline">myemail@example.com</a></li>
        <li>Телефон: <a href="tel:+1234567890" className="text-blue-600 hover:underline">+1 (234) 567-890</a></li>
        <li>Адреса: вул. Примірна, б. 1, г. Примір, 123456</li>
        </ul>
        <p className="mt-6">Ми завжди раді допомогти вам!</p>
    </div>
  );
};

export default Contacts;
