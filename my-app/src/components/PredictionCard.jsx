import React, { useState, useEffect, useRef} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
// import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import * as Yup from "yup";
import "../components/styles.css";

const PredictionCard = () => {
  const [prediction, setPrediction] = useState(null);
  const [flipped, setFlipped] = useState(false);

  // Referencia para la cara trasera
  const backSideRef = useRef(null);

   // Asegurar que la cara trasera inicie en el tope del scroll
   useEffect(() => {
    if (flipped && backSideRef.current) {
      // Usar scrollIntoView para hacer scroll al inicio
      backSideRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [flipped]);

  const initialValues = {
    Region: "",
    Crop_Type: "",
    Average_Temperature_C: "",
    Total_Precipitation_mm: "",
    CO2_Emissions_MT: "",
    Crop_Yield_MT_per_HA: "",
    Extreme_Weather_Events: "",
    Irrigation_Access_Perc: "",
    Pesticide_Use_KG_per_HA: "",
    Fertilizer_Use_KG_per_HA: "",
  };

  const validationSchema = Yup.object().shape({
    Region: Yup.string().required("Este campo es obligatorio"),
    Crop_Type: Yup.string().required("Este campo es obligatorio"),
    Average_Temperature_C: Yup.number().required("Este campo es obligatorio"),
    Total_Precipitation_mm: Yup.number().required("Este campo es obligatorio"),
    CO2_Emissions_MT: Yup.number().required("Este campo es obligatorio"),
    Crop_Yield_MT_per_HA: Yup.number().required("Este campo es obligatorio"),
    Extreme_Weather_Events: Yup.number().required("Este campo es obligatorio"),
    Irrigation_Access_Perc: Yup.number().required("Este campo es obligatorio"),
    Pesticide_Use_KG_per_HA: Yup.number().required("Este campo es obligatorio"),
    Fertilizer_Use_KG_per_HA: Yup.number().required(
      "Este campo es obligatorio"
    ),
  });

  const handleSubmit = async (values) => {
    // Lista de campos requeridos en el orden correcto
    const requiredFields = [
      "Region",
      "Crop_Type",
      "Average_Temperature_C",
      "Total_Precipitation_mm",
      "CO2_Emissions_MT",
      "Crop_Yield_MT_per_HA",
      "Extreme_Weather_Events",
      "Irrigation_Access_Perc",
      "Pesticide_Use_KG_per_HA",
      "Fertilizer_Use_KG_per_HA",
    ];

    // Reordenar los valores para que coincidan con el orden de requiredFields
    const formattedValues = requiredFields.reduce((acc, field) => {
      acc[field] = values[field]; // Insertar cada campo en el orden correcto
      return acc;
    }, {});

    // Mostrar los datos que se van a enviar a la API
    console.log("Datos enviados a la API:", formattedValues);

    try {
      // Enviar los datos a la API
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedValues), // Enviar los datos en el orden correcto
      });
      console.log(response);
      // Verificar la respuesta de la API
      const data = await response.json();
      if (data.prediction) {
        setPrediction(data.prediction);
        setFlipped(true);
      } else {
        console.error("No prediction data received", data);
        alert("Error al recibir datos de predicción");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al hacer la solicitud");
    }
  };

   
  

  const getBackgroundColor = () => {
    if (prediction < 250) return "bg-blue-500"; // Bajo
    if (prediction < 500) return "bg-green-500"; // Medio
    if (prediction < 1000) return "bg-yellow-500"; // Alto
    return "bg-red-500"; // Muy alto
  };

  return (
    <div className="flex justify-center items-center min-h-screen font-sans">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl flex overflow-hidden">
        {/* Imagen al lado izquierdo con altura fija */}
        <div className="w-1/3 h-96 flex justify-center items-center">
          <iframe
            src="https://lottie.host/embed/6564afd5-84db-46d5-a99d-2b7daad797ae/CAH32pqZiX.lottie"
            width="320"
            height="320"
            style={{ border: "none" }}
            title="Lottie Animation"
          />
        </div>

        {/* Formulario al lado derecho */}
        <div className="w-2/3 p-6 h-96 overflow-y-auto">
          <h1 className="text-3xl font-heading mb-8 text-center mt-4 text-primary-green font-semibold">
            Sistema de Predicción de Datos
          </h1>

          <div className="relative w-full h-auto perspective-1000">
            <div className={`flip-card ${flipped ? "rotate-y-180" : ""}`}>
              {/* Front side */}
              <div className="absolute w-full h-auto overflow-y-auto backface-hidden bg-white shadow-lg rounded-lg p-4 mb-14">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {() => (
                    <Form>
                      {/* Campo Región */}
                      <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2 capitalize text-primary-green">
                          Región
                        </label>
                        <Field
                          as="select"
                          name="Region"
                          className="border-2 border-gray-300 rounded p-2 w-full focus:outline-none focus:border-lightGreen transition-colors"
                        >
                          <option value="">Selecciona una región</option>
                          <option value="Prairies">Prairies</option>
                          <option value="Ontario">Ontario</option>
                          <option value="Punjab">Punjab</option>
                          {/* Agregar otras opciones según sea necesario */}
                        </Field>
                        <ErrorMessage
                          name="Region"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      {/* Campo Tipo de Cultivo */}
                      <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2 capitalize text-primary-green">
                          Tipo de Cultivo
                        </label>
                        <Field
                          as="select"
                          name="Crop_Type"
                          className="border-2 border-gray-300 rounded p-2 w-full focus:outline-none focus:border-lightGreen transition-colors"
                        >
                          <option value="">Selecciona un cultivo</option>
                          <option value="Corn">Corn</option>
                          <option value="Rice">Rice</option>
                          <option value="Wheat">Wheat</option>
                          {/* Agregar otras opciones según sea necesario */}
                        </Field>
                        <ErrorMessage
                          name="Crop_Type"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      {/* Resto de los campos numéricos */}
                      {Object.keys(initialValues).map((field, index) => {
                        if (field !== "Region" && field !== "Crop_Type") {
                          return (
                            <div key={index} className="mb-4">
                              <label className="block text-sm font-semibold mb-2 capitalize text-primary-green">
                                {field.replace(/_/g, " ")}
                              </label>
                              <Field
                                type="text"
                                name={field}
                                placeholder={`Ingresa ${field.replace(
                                  /_/g,
                                  " "
                                )}`}
                                className="border-2 border-gray-300 rounded p-2 w-full focus:outline-none focus:border-lightGreen transition-colors"
                              />
                              <ErrorMessage
                                name={field}
                                component="div"
                                className="text-red-500 text-sm"
                              />
                            </div>
                          );
                        }
                        return null;
                      })}

                      <button
                        type="submit"
                        className="bg-primary-green text-white px-4 py-2 rounded hover:bg-lightGreen w-full"
                      >
                        Predecir
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>

              {/* Back side */}
              <div ref={backSideRef} 
                className={`absolute w-full h-50 backface-hidden rounded-lg p-4 text-white transform rotate-y-180 overflow-y-auto ${getBackgroundColor()}`}
              >
                <h2 className="text-xl font-bold">Resultado</h2>
                {prediction !== null && !isNaN(prediction) ? (
                  <p className="text-2xl mt-4">
                    Predicción: {prediction.toFixed(2)} USD
                  </p>
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
      </div>
    </div>
  );
};

export default PredictionCard;
