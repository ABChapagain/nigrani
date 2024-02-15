import cv2
import numpy as np
import onnxruntime as ort

# Load the ONNX model
session = ort.InferenceSession('y.onnx')
input_name = session.get_inputs()[0].name
output_name = session.get_outputs()[0].name
path = "elephant.jpeg"
# Capture the webcam feed using OpenCV
cap = cv2.VideoCapture(path)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Preprocess the image
    frame_resized = cv2.resize(frame, (224, 224))
    frame_normalized = frame_resized / 255.0
    frame_normalized = np.expand_dims(frame_normalized, axis=0)

    # Pass the preprocessed image to the ONNX model
    output = session.run([output_name], {input_name: frame_normalized})

    # Process the output data to obtain the detected objects
    # (This step depends on the specific object detection model you are using)

    cv2.imshow('Webcam Feed', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
