import { useState, useEffect } from "react";

const DemoDisclaimer = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl border border-gray-100 shadow-lg p-8 max-w-md w-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
            ℹ️
          </div>
          <h2 className="text-lg font-semibold">Демонстраційний сайт</h2>
        </div>

        <p className="text-gray-500 text-sm mb-3 leading-relaxed">
          Це є навчальний проект для портфоліо. Товари и ціни вигадані, оплата не
          працює. Реєстрація та кошик функціонують у повному обсязі з метою
          тестування.
        </p>

        <button
          onClick={() => setVisible(false)}
          className="w-full py-2.5 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition"
        >
          Зрозуміло, продовжити
        </button>
      </div>
    </div>
  );
};

export default DemoDisclaimer;
