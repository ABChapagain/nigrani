from ultralytics import YOLO
import cv2
import torch
import pygame
import time
import os

model = YOLO("model.pt")

pygame.mixer.init()
elephant_sound = pygame.mixer.Sound("siran.mp3")
cap = cv2.VideoCapture(1)

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

    results = model(frame)

    for r in results:
        for confidence, class_idx, *box in zip(r.boxes.conf, r.boxes.cls, r.boxes.xyxy):
            class_name = model.names[int(class_idx)]
            if class_name == "elephant":
                print(f"Class: {class_name}, Confidence: {confidence}")

            if class_name == "elephant" and confidence > 0.4 and not sound_played:
                print("Elephant detected!")
                elephant_sound.play()
                sound_played = True
                start_time = time.time()

                # Save the image to the 'detected' folder
                image_filename = os.path.join(detected_folder, f"elephant_detected_{int(time.time())}.jpg")
                cv2.imwrite(image_filename, frame)

    if sound_played and time.time() - start_time > 10:
        print("Stopping sound.")
        elephant_sound.stop()
        sound_played = False

    cv2.imshow('Elephant detection', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
