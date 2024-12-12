import React, { useState } from "react";

const App = () => {
    const [input, setInput] = useState("");
    const [prediction, setPrediction] = useState(null);

    const handleSubmit = async () => {
        const response = await fetch("http://localhost:5000/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ features: [parseFloat(input)] }),
        });
        const data = await response.json();
        console.log(data);  // Verifica qué valor estás recibiendo del backend
        setPrediction(data.prediction); // Asegúrate de que 'prediction' sea lo que necesitas
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">Modelo de Predicción</h1>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ingresa un valor"
                className="border p-2"
            />
            <button 
                onClick={handleSubmit} 
                className="bg-blue-500 text-white p-2 ml-2"
            >
                Predecir
            </button>

            {/* Aseguramos que la predicción es válida antes de mostrarla */}
            {prediction !== null && (
                <p className="mt-4 text-lg font-semibold">
                    Predicción: {prediction.toFixed(2)} {/* Redondea la predicción a 2 decimales */}
                </p>
            )}
        </div>
    );
};

export default App;
