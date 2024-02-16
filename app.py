from ultralytics import YOLO
import cv2
import torch
import pygame
import time
import os
import requests
import json

def send_data_to_server(detection_data, headers=None):
    # Define the API endpoint to send the data in server
    api_endpoint = "https://nigrani-backend.onrender.com/api/detectations"

    # Convert the data to JSON
    json_payload = json.dumps(detection_data)

    # Send the POST request to the server with the JSON payload
    headers = {'Content-Type': 'application/json'}

    response = requests.post(api_endpoint, data=json_payload, headers=headers)

    # Check the server's response
    if response.status_code == 201:
        print("Data sent successfully!")
        return True
    else:
        print("Data upload failed.")
        return False

def upload_image_to_imgbb(image_path, number_of_elephants):
    imgbb_url = "https://api.imgbb.com/1/upload"
    # imgbb_api = "f1f15419345a27917e10724914c88b6c"
    imgbb_api = "acc8674b08d65821a1cfdc995c344204"

    with open(image_path, 'rb') as file:
        files = {
            'image': file
        }
        response = requests.post(imgbb_url, params={'key': imgbb_api}, files=files)
        if(response.status_code == 200):
            data = response.json()
            imageurl = data.get("data", {}).get("url")
            send_data_to_server({
                "cameraId": "65cde6165d2f55b139721e0e",
                "image": imageurl,
                "numberOfElephant": number_of_elephants
            })

        else:
            print("Error:", response.status_code)

# Initialize YOLO model
model = YOLO("models.pt")

# Initialize Pygame for sound
pygame.mixer.init()
elephant_sound = pygame.mixer.Sound("siran.mp3")

# Open the video capture device
cap = cv2.VideoCapture(0)
# cap = cv2.VideoCapture(1)
# cap = cv2.VideoCapture("elephant.mp4")

if not cap.isOpened():
    print("Error: Could not open webcam.")
    exit()

sound_played = False
start_time = 0

# Create the 'detected' folder if it doesn't exist
detected_folder = "detected"
os.makedirs(detected_folder, exist_ok=True)

while True:
    ret, frame = cap.read()

    if not ret:
        print("Error: Could not read frame.")
        break

    results = model(frame, classes=20, conf=0.6)

    for r in results:
        for confidence, class_idx, *box in zip(r.boxes.conf, r.boxes.cls, r.boxes.xyxy):
            print("box", box)
            
            class_name = model.names[int(class_idx)]
            # if class_name == "elephant" and confidence > 0.5:
            #     print(f"Class: {class_name}, Confidence: {confidence}")
                
                

            if class_name == "elephant" and confidence > 0.6 and not sound_played:
                
                # Extract box coordinates
                x1, y1, x2, y2 = map(int, box[0])
                
                # Draw bounding box
                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
                
                # Add text label
                cv2.putText(frame, f"{class_name} {confidence:.2f}", (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

                elephant_sound.play()
                sound_played = True
                start_time = time.time()

                # Save the image to the 'detected' folder
                image_filename = os.path.join(detected_folder, f"elephant_detected_{int(time.time())}.jpg")
                cv2.imwrite(image_filename, frame)
                number_of_elephants = len(r)
                print("Number of elephants detected:", number_of_elephants)
                upload_image_to_imgbb(image_filename, number_of_elephants)

    if sound_played and time.time() - start_time > 10:
        print("Stopping sound.")
        elephant_sound.stop()
        sound_played = False

    cv2.imshow('Elephant detection', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
