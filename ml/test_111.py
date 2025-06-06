import joblib
import numpy as np
from tensorflow.keras.preprocessing import image
import sys

# Check if the image path is provided as an argument
if len(sys.argv) != 2:
    print("Usage: python test.py <image_path>")
    sys.exit(1)

# Get the image path from the command line argument
img_path = sys.argv[1]

# Load the trained RandomForest model
clf = joblib.load('road_classifier.pkl')

# Load and preprocess the image
img = image.load_img(img_path, target_size=(64, 64))  # Match the image size from training
img_array = image.img_to_array(img)
img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
img_array = img_array / 255.0  # Normalize if you did this during training

# Flatten the image
img_flat = img_array.reshape(img_array.shape[0], -1)

# Predict the class
prediction = clf.predict(img_flat)

# Convert prediction to integer
predicted_class = int(prediction[0])

# Print the result
class_names = ['non-road', 'road']  # Replace with your class labels
print(f"Prediction: {class_names[predicted_class]}")

