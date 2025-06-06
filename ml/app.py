from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from tensorflow.keras.preprocessing import image
import joblib
import io
from PIL import Image

app = FastAPI()

# CORS middleware to allow requests from frontend (localhost:5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend URL, change if needed
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Load model and class names
clf = joblib.load("road_classifier.pkl")  # Make sure this model file is available
class_names = ['non-road', 'road']

@app.get("/")
def read_root():
    return {"message": "Welcome to the Road Image Classifier API. Use POST /predict with an image."}

@app.post("/predict")
async def predict_image(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        img = Image.open(io.BytesIO(contents)).convert("RGB")
        img = img.resize((64, 64))  # Resizing image for model input
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0) / 255.0
        img_flat = img_array.reshape(img_array.shape[0], -1)
        prediction = clf.predict(img_flat)
        predicted_class = int(prediction[0])
        result = class_names[predicted_class]
        return JSONResponse(content={"prediction": result})
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
