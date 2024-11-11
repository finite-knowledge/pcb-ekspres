// src/components/Footer.jsx
import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

// Footer Component
const Footer = () => (
  <footer className="bg-gray-800 text-white py-12">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-xl font-semibold mb-4">Контактирај Не</h4>
          <div className="space-y-2">
            <p className="flex items-center">
              <MapPin className="mr-2" /> ул: 123 PCB Street, 7000 Bitola
            </p>
            <p className="flex items-center">
              <Phone className="mr-2" /> +389 077 123
            </p>
            <p className="flex items-center">
              <Mail className="mr-2" /> contact@pcbexpress.com
            </p>
          </div>
        </div>
        <div>
          <h4 className="text-xl font-semibold mb-4">Брзи Линкови:</h4>
          <ul className="space-y-2">
            <li>
              <button className="hover:text-blue-300">За Нас</button>
            </li>
            <li>
              <button className="hover:text-blue-300">Документација</button>
            </li>
            <li>
              <button className="hover:text-blue-300">Get Quote</button>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-xl font-semibold mb-4">Социјални Медиуми</h4>
          <div className="flex space-x-4">
            <button className="hover:text-blue-300">
              <Facebook />
            </button>
            <button className="hover:text-blue-300">
              <Twitter />
            </button>
            <button className="hover:text-blue-300">
              <Instagram />
            </button>
            <button className="hover:text-blue-300">
              <Mail />
            </button>
          </div>
        </div>
        <div>
          <h4 className="text-xl font-semibold mb-4">Вести:</h4>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-l-lg w-full text-gray-800"
            />
            <button className="bg-blue-600 px-4 py-2 rounded-r-lg hover:bg-blue-700">
              Претплати се
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-gray-700 text-center">
        <p>&copy; 2024 PCBЕкспрес. Сите права задржани.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
