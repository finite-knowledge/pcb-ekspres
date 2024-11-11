// src/components/About.jsx
import React from "react";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">За PCBExpress</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Нашата Приказна</h2>
          <p className="text-gray-700 mb-4">
            PCB Експрес е водечка компанија за создравање на PCB не само во
            Битола туку и пошироко за креирање на компоненти за Хобиситите и
            фирмите на Балканот.
          </p>
          <p className="text-gray-700 mb-4">
            Нашиот најсовремен погон комбинира напредна технологија и
            мајсторство за изработка на PCB кои ги исполнува највисоките
            стандарди за квалитет и сигурност.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Нашата Мисија</h2>
          <p className="text-gray-700 mb-4">
            Се стремиме да им помогниме на иноваторите и инжињерите со
            обезбедување на сигурни, висококвалитетни PCB решенија кои ќе им
            помогнат да си ги реализираат своите идеи.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">
              Клучни Карактеристики
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Кратко време жза испорака и производство</li>
              <li>Големи производствени капацитети</li>
              <li>Гаранција за квалитет</li>
              <li>Експертска техничка поддршка</li>
              <li>Конкурентни цени</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
