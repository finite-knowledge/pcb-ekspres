import React, { useState } from "react";
import { Upload, Check } from "lucide-react";

const PCBDesignForm = () => {
  const [isHobby, setIsHobby] = useState(true);
  const [boardCount, setBoardCount] = useState(1);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [layers, setLayers] = useState("1");
  const [thickness, setThickness] = useState("0.8");
  const [material, setMaterial] = useState("FR4");
  const [file, setFile] = useState(null);
  const [showQuote, setShowQuote] = useState(false);
  const [quoteAmount, setQuoteAmount] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    const amount = calculateQuote();
    setQuoteAmount(amount);
    setShowQuote(true);
    setShowCheckout(true);
  };

  const calculateQuote = () => {
    // Simple mock calculation for demonstration
    const basePrice = isHobby ? 1000 : 2000;
    const layerMultiplier = parseInt(layers) * 1.2;
    const sizeMultiplier = (parseFloat(width) * parseFloat(height)) / 1000;
    const materialMultiplier =
      material === "aluminum" ? 1.5 : material === "flexible" ? 1.8 : 1;

    return Math.floor(
      basePrice * layerMultiplier * materialMultiplier * (1 + sizeMultiplier),
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = calculateQuote();
    setQuoteAmount(amount);
    setShowQuote(true);
  };

  const isFormComplete = () => {
    return file && width && height && boardCount > 0;
  };

  return (
    <div className="bg-white p-6 rounded-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Прикачи дизајн</h2>

      {/* File Upload Section */}
      <div className="mb-6 p-4 border-2 border-dashed rounded-lg text-center">
        <input
          type="file"
          id="pcbFile"
          accept=".gbr,.ger,.zip"
          onChange={handleFileChange}
          className="hidden"
        />
        <label
          htmlFor="pcbFile"
          className="cursor-pointer flex flex-col items-center space-y-2"
        >
          <Upload className="w-8 h-8 text-blue-500" />
          <span className="text-sm font-medium">
            {file ? file.name : "Кликни за прикачување на фајл"}
          </span>
          <span className="text-xs text-gray-500">
            Поддржани формати: .gbr, .ger, .zip
          </span>
        </label>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Existing form fields */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Тип на нарачка</label>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="hobby"
                name="orderType"
                checked={isHobby}
                onChange={() => setIsHobby(true)}
                className="mr-2"
              />
              <label htmlFor="hobby">Хоби</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="professional"
                name="orderType"
                checked={!isHobby}
                onChange={() => setIsHobby(false)}
                className="mr-2"
              />
              <label htmlFor="professional">Професионално</label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="boardCount" className="block text-sm font-medium">
            Број на плочи
          </label>
          <input
            type="number"
            id="boardCount"
            min={1}
            max={isHobby ? 100 : undefined}
            value={boardCount}
            onChange={(e) => setBoardCount(parseInt(e.target.value))}
            className="w-full p-2 border rounded-md"
          />
          {isHobby && (
            <p className="text-sm text-gray-500">
              За хоби нарачки, максималниот број на плочи е 100
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="width" className="block text-sm font-medium">
              Ширина (мм)
            </label>
            <input
              type="number"
              id="width"
              min={0}
              step={0.1}
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="height" className="block text-sm font-medium">
              Должина (мм)
            </label>
            <input
              type="number"
              id="height"
              min={0}
              step={0.1}
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="layers" className="block text-sm font-medium">
            Број на слоеви
          </label>
          <select
            id="layers"
            value={layers}
            onChange={(e) => setLayers(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="1">1 слој</option>
            <option value="2">2 слоја</option>
            <option value="4">4 слоја</option>
            <option value="6">6 слоја</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="thickness" className="block text-sm font-medium">
            Дебелина (мм)
          </label>
          <select
            id="thickness"
            value={thickness}
            onChange={(e) => setThickness(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="0.8">0.8 мм</option>
            <option value="1.0">1.0 мм</option>
            <option value="1.2">1.2 мм</option>
            <option value="1.6">1.6 мм</option>
            <option value="2.0">2.0 мм</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="material" className="block text-sm font-medium">
            Материјал
          </label>
          <select
            id="material"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="FR4">FR4</option>
            <option value="aluminum">Алуминиум</option>
            <option value="flexible">Флексибилен</option>
          </select>
        </div>

        {/* Quote Preview */}
        {showQuote && isFormComplete() && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span>Проценета цена за вашата нарачка:</span>
              </div>
              <span className="font-bold">{quoteAmount} денари</span>
            </div>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setShowCheckout(false)}
                className="flex-1 py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Затвори
              </button>
              <button
                type="button"
                onClick={() => setShowCheckout(true)}
                className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Продолжи кон нарачка
              </button>
            </div>
          </div>
        )}

        {showCheckout && (
          <Checkout
            orderDetails={{
              isHobby,
              boardCount,
              width,
              height,
              layers,
              thickness,
              material,
              quoteAmount,
            }}
            onClose={() => setShowCheckout(false)}
          />
        )}

        <button
          type="submit"
          disabled={!isFormComplete()}
          className={`w-full py-2 px-4 rounded-md ${
            isFormComplete()
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={handleQuoteSubmit}
        >
          Пресметај цена
        </button>
      </form>
    </div>
  );
};

export default PCBDesignForm;
