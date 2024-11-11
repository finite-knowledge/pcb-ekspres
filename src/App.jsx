// src/App.jsx
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ServiceCards from "./components/ServiceCards";
import Footer from "./components/Footer";
import Products from "./components/Products";
import About from "./components/About";
import Documentation from "./components/Documentation";
import GridProducts from "./components/GridProducts";
import PCBDesignForm from "./components/PCBDesignForm";
// Home Page Component
const HomePage = () => (
  <div>
    <HeroSection />
    <ServiceCards />
    <Products />
  </div>
);

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/products" element={<GridProducts />} />
          <Route path="/PCBDesignForm" element={<PCBDesignForm />} />{" "}
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
