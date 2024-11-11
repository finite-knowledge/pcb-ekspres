import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Upload,
  Calculator,
  Menu,
  X,
  Facebook,
  Twitter,
  Instagram,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <button
          className="text-white text-2xl font-bold"
          onClick={() => handleNavigation("/")}
        >
          PCB Експрес
        </button>
        <div className="hidden md:flex space-x-6">
          <button
            className="text-white hover:text-blue-200"
            onClick={() => handleNavigation("/")}
          >
            Дома
          </button>
          <button
            className="text-white hover:text-blue-200"
            onClick={() => handleNavigation("/about")}
          >
            За Нас
          </button>
          <button
            className="text-white hover:text-blue-200"
            onClick={() => handleNavigation("/documentation")}
          >
            Документација
          </button>
          <button
            className="text-white hover:text-blue-200"
            onClick={() => handleNavigation("/PCBDesignForm")}
          >
            Понуда
          </button>

          <button
            className="text-white hover:text-blue-200"
            onClick={() => handleNavigation("/products")}
          >
            Продукти
          </button>
          <button className="text-white hover:text-blue-200">
            <ShoppingCart className="inline-block" />
          </button>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="flex flex-col space-y-4 p-4">
            <button
              className="text-white"
              onClick={() => handleNavigation("/")}
            >
              Дома
            </button>
            <button
              className="text-white"
              onClick={() => handleNavigation("/about")}
            >
              За нас
            </button>
            <button
              className="text-white"
              onClick={() => handleNavigation("/about")}
            >
              Документација
            </button>
            <button
              className="text-white"
              onClick={() => handleNavigation("/PCBDesignForm")}
            >
              Понуда
            </button>
            <button
              className="text-white"
              onClick={() => handleNavigation("/PCBDesignForm")}
            >
              Продукти
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
