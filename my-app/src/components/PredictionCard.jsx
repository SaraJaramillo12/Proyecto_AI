import React, { useState } from "react";
import "../components/styles.css"; 

const PredictionCard = () => {
  const [input, setInput] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [flipped, setFlipped] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ features: [parseFloat(input)] }),
      });
      const data = await response.json();
      setPrediction(data.prediction);
      setFlipped(true); // Girar la tarjeta cuando se recibe la predicción
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Determinar el color de fondo según la predicción
  const getBackgroundColor = () => {
    if (prediction < 250) return "bg-blue-500"; // Bajo
    if (prediction < 500) return "bg-green-500"; // Medio
    if (prediction < 1000) return "bg-yellow-500"; // Alto
    return "bg-red-500"; // Muy alto
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative w-80 h-48 perspective-1000">
        {/* Contenedor principal con la clase flip-card */}
        <div
          className={`flip-card ${flipped ? "rotate-y-180" : ""}`}
        >
          {/* Cara frontal */}
          <div className="absolute w-full h-full backface-hidden bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">Predicción</h2>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ingresa un valor"
              className="border border-gray-300 rounded p-2 w-full mb-4"
            />
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Predecir
            </button>
          </div>

          {/* Cara trasera */}
          <div
            className={`absolute w-full h-full backface-hidden rounded-lg p-4 text-white transform rotate-y-180 ${getBackgroundColor()}`}
          >
            <h2 className="text-xl font-bold">Resultado</h2>
            {prediction !== null ? (
              <p className="text-2xl mt-4">Predicción: {prediction.toFixed(2)}</p>
            ) : (
              <p className="text-lg">Cargando...</p>
            )}
            <button
              onClick={() => setFlipped(false)}
              className="mt-4 bg-gray-800 px-4 py-2 rounded hover:bg-gray-700"
            >
              Volver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionCard;
