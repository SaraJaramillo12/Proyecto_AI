from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib  # Para cargar el modelo y los encoders
import numpy as np  # Para manejar las matrices de datos

app = Flask(__name__)
CORS(app)  # Permite peticiones desde React en desarrollo

# Cargar el modelo de regresión lineal y el escalador con joblib
model = joblib.load("model/modelo_regresion_lineal.pkl")
scaler = joblib.load("model/escalador.pkl")

# Cargar los LabelEncoders para 'Region' y 'Crop_Type'
label_encoder_region = joblib.load("model/label_encoder_region.pkl")
label_encoder_crop = joblib.load("model/label_encoder_crop.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    # Obtener los datos numéricos del cuerpo de la solicitud
    data = request.json
    print(data)  # Para ver qué datos está recibiendo

    # Verificar si los datos requeridos están presentes
    required_features = [
        "Region", "Crop_Type", "Average_Temperature_C", "Total_Precipitation_mm",
        "CO2_Emissions_MT", "Crop_Yield_MT_per_HA", "Extreme_Weather_Events",
        "Irrigation_Access_Perc", "Pesticide_Use_KG_per_HA", "Fertilizer_Use_KG_per_HA"
    ]
    for feature in required_features:
        if feature not in data:
            print(feature)
    if not all(feature in data for feature in required_features):
        return jsonify({"error": "Faltan datos requeridos para la predicción"}), 400

    try:
        # Reorganizar los datos para que coincidan con el orden esperado por el modelo
        input_data_values = [
            data["Region"], data["Crop_Type"], data["Average_Temperature_C"],
            data["Total_Precipitation_mm"], data["CO2_Emissions_MT"],
            data["Crop_Yield_MT_per_HA"], data["Extreme_Weather_Events"],
            data["Irrigation_Access_Perc"], data["Pesticide_Use_KG_per_HA"],
            data["Fertilizer_Use_KG_per_HA"]
        ]

        # Codificar las columnas categóricas usando los LabelEncoders
        encoded_region = label_encoder_region.transform([input_data_values[0]])[0]
        encoded_crop = label_encoder_crop.transform([input_data_values[1]])[0]

        # Crear el array de características, asegurando que las columnas estén en el orden correcto
        input_data = np.array([[encoded_region, encoded_crop] + input_data_values[2:]])
        print('input data', input_data)
        # parse the input data into numbers
        input_data = np.array(input_data).astype(np.float64)
        print('after parse', input_data)
        # Escalar los datos de entrada
        input_data_scaled = scaler.transform(input_data)

        # Realizar la predicción
        prediction = model.predict(input_data_scaled)
        print('predicton', prediction)
        # Respuesta JSON para enviar al frontend
        return jsonify({"prediction": prediction[0]}), 200
        

    except Exception as e:
        return jsonify({"error": f"Error al procesar la predicción: {str(e)}"}), 500


if __name__ == "__main__":
    app.run(debug=True)
