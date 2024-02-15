from ultralytics import YOLO
import cv2
import torch
import pygame
import time
import os
import requests
import json


def send_data_to_server(detectation_Data, headers=None):

    # Define the API endpoint
    api_endpoint = "https://nigrani-backend.onrender.com/api/detectations"

    #Convert the data to JSON
    json_payload = json.dumps(detectation_Data)

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
    


def upload_image_to_imgbb(image_path):
    imgbb_url = "https://api.imgbb.com/1/upload"
    imgbb_api = "f1f15419345a27917e10724914c88b6c"

    with open(image_path, 'rb') as file:
        files = {
            'image': file
        }
        response = requests.post(imgbb_url, params={'key': imgbb_api}, files=files)
        if(response.status_code == 200):
            data = response.json()
            imageurl = data.get("data", {}).get("url")
            # print("Image uploaded to ImgBB successfully:", imageurl)
            send_data_to_server({
                "cameraId": "65cde6f95d2f55b139721e16",
                "image": imageurl,
                "additionalInfo": "A group of elephant detected in BPC hackfest 2024",
                "numberOfElephant": 8
            })

        else:
            print("Error:", response.status_code)


# upload_image_to_imgbb("api/elephant_detected_1708027921.jpg")

model = YOLO("model.pt")

pygame.mixer.init()
elephant_sound = pygame.mixer.Sound("siran.mp3")
cap = cv2.VideoCapture(0)

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

    results = model(frame, classes=20, conf=0.3)

    for r in results:
        for confidence, class_idx, *box in zip(r.boxes.conf, r.boxes.cls, r.boxes.xyxy):
            class_name = model.names[int(class_idx)]
            if class_name == "elephant":
                print(f"Class: {class_name}, Confidence: {confidence}")
                

            if class_name == "elephant" and confidence > 0.3 and not sound_played:
                print("Elephant detected!")

                elephant_sound.play()
                sound_played = True
                start_time = time.time()

                # Save the image to the 'detected' folder
                image_filename = os.path.join(detected_folder, f"elephant_detected_{int(time.time())}.jpg")
                cv2.imwrite(image_filename, frame)
                # send_image_to_api(image_filename)
                # print(f"Detected image:  {image_filename}")
                upload_image_to_imgbb(image_filename)

    if sound_played and time.time() - start_time > 10:
        print("Stopping sound.")
        elephant_sound.stop()
        sound_played = False

    cv2.imshow('Elephant detection', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
