from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib  # O la librería que usaste para guardar tu modelo

app = Flask(__name__)
CORS(app)  # Permite peticiones desde React en desarrollo

# Cargar el modelo
model = joblib.load("path/to/your_model.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    features = data.get("features", [])
    prediction = model.predict([features])
    return jsonify({"prediction": prediction[0]})

if __name__ == "__main__":
    app.run(debug=True)
