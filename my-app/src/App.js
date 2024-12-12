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
        setPrediction(data.prediction);
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
            <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 ml-2">
                Predecir
            </button>
            {prediction !== null && <p>Predicción: {prediction}</p>}
        </div>
    );
};

export default App;
