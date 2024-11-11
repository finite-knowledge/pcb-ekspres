// src/components/ServiceCards.jsx
import React from "react";
import { Upload, Calculator, ShoppingCart } from "lucide-react";

// Service Cards Component
const ServiceCards = () => (
  <div className="container mx-auto py-16 px-4">
    <div className="grid md:grid-cols-3 gap-8">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <Upload className="text-blue-600 w-8 h-8" />
        </div>
        <h3 className="text-xl font-semibold mb-4">Прикачи Дизајн</h3>
        <p className="text-gray-600">
          Прикачете го вашиот PCB дизајн фајл во кој било формат!
        </p>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <Calculator className="text-blue-600 w-8 h-8" />
        </div>
        <h3 className="text-xl font-semibold mb-4">Понуда</h3>
        <p className="text-gray-600">
          Инстантно ќе ви понудиме цена за изработка базирана на вашите
          спецификации и потреби, дали било за хоби или масовна продукција
        </p>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <ShoppingCart className="text-blue-600 w-8 h-8" />
        </div>
        <h3 className="text-xl font-semibold mb-4">Порачај</h3>
        <p className="text-gray-600">
          Безбедно, Брзо и Лесно со брза испорака до вашиот дом, магацин или
          Канцеларија
        </p>
      </div>
    </div>
  </div>
);

export default ServiceCards;
