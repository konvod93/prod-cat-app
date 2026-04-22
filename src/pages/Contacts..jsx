const Contacts = () => {
  return (
    <div className="container mx-auto px-4 py-8"><h1 className="text-2xl font-bold mb-4">Контакты</h1>
      <p className="mb-4">Если у вас есть вопросы или предложения, пожалуйста, свяжитесь с нами по следующим контактам:</p>
      <ul className="list-disc pl-5">
        <li>Email: <a href="mailto: myemail@example.com" className="text-blue-600 hover:underline"></a></li>
        <li>Телефон: <a href="tel:+1234567890" className="text-blue-600 hover:underline">+1 (234) 567-890</a></li>
        <li>Адрес: ул. Примерная, д. 1, г. Пример, 123456</li>
        </ul>
        <p className="mt-6">Мы всегда рады помочь вам!</p>
    </div>
  );
};

export default Contacts;
