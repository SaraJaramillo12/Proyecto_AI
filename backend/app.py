from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib  # Librería para cargar el modelo
import numpy as np  # Para manejar las matrices de datos

app = Flask(__name__)
CORS(app)  # Permite peticiones desde React en desarrollo

# Cargar el modelo y el scaler
model = joblib.load("model/modelo.pkl")
scaler = joblib.load("model/scaler.pkl")  # Cargar el scaler utilizado en el entrenamiento

@app.route("/predict", methods=["POST"])
def predict():
    # Obtener las características del cuerpo de la solicitud
    data = request.json
    features = data.get("features", [])

    # Verificar si se recibieron las características correctamente
    if len(features) == 0:
        return jsonify({"error": "No se recibieron características"}), 400

    # Aplicar escalado a las características antes de la predicción
    try:
        scaled_features = scaler.transform([features])  # Asegúrate de que "features" esté en el formato adecuado
    except Exception as e:
        return jsonify({"error": f"Error al escalar las características: {str(e)}"}), 500

    # Hacer la predicción con el modelo escalado
    prediction = model.predict(scaled_features)

    # Retornar la predicción
    return jsonify({"prediction": prediction[0]})

if __name__ == "__main__":
    app.run(debug=True)
