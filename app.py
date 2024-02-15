import cv2
import threading
from datetime import datetime
from flask import Flask, render_template, Response
from ultralytics import YOLO
import os
import time
import requests
import json
import pygame

app = Flask(__name__)

# make a folder named snapshot to save the snap while the elephant is detected
snapshot_dir = "snapshots"
os.makedirs(snapshot_dir, exist_ok=True)

frame_count = 0  # Initialize frame_count outside of any function

model = YOLO("model.pt")
frame_skip = 1
pygame.mixer.init()
elephant_sound = pygame.mixer.Sound("siran.mp3")
cap = cv2.VideoCapture(0)


def annotate_frame(frame, custom_text):
    now = datetime.now()
    current_time = now.strftime("%Y-%m-%d %H:%M:%S")

    font = cv2.FONT_HERSHEY_SIMPLEX
    cv2.putText(frame, current_time, (10, 30), font, 1, (0, 0, 255), 2, cv2.LINE_AA)
    cv2.putText(frame, custom_text, (10, 60), font, 1, (0, 255, 0), 2, cv2.LINE_AA)

    results = model.predict(frame)
    # Track whether a snapshot has been taken
    snapshot_taken = False

    annotated_frame = results[0].plot()

    return annotated_frame

def generate_frames(video_path, custom_text):
    global frame_count
    cap = cv2.VideoCapture(video_path)
    frame_count = 0
    snapshot_taken = False
    sound_played = False  # Initialize sound_played

    while True:
        success, frame = cap.read()

        if not success:
            break
        frame_count += 1
        if frame_count % frame_skip == 0:
            # Detect "moderate-accident" and take a snapshot if not already taken
            results = model.predict(frame, classes=20)
            for r in results:
                for c in r.boxes.cls:
                    class_name = model.names[int(c)]

                    if ("elephant" in class_name) and not snapshot_taken:
                        print("Elephant detected:", class_name)
                        
                    if class_name == "elephant" and not sound_played:
                        print("Elephant detected!")
                        elephant_sound.play()
                        sound_played = True
                        start_time = time.time()
                        # generating the unique id
                       
                    current_time = datetime.now()

                    timestamp_with_microseconds = current_time.timestamp()
                    microseconds = int((timestamp_with_microseconds % 1) * 1e6)

                    unique_number = int(timestamp_with_microseconds * 1e6) + microseconds
                       
                    #snap shot is taken here
                    snapshot_filename = os.path.join(snapshot_dir, f"snapshot_{unique_number}.jpg")
                    cv2.imwrite(snapshot_filename, frame)
                    snapshot_taken = True

                    # if port 49 is not working then the new IP address will be
                    ipaddress=f"HTTP://127.0.0.1:5000/{custom_text}"
                        
                    # and comment this line 
                    ipaddress=f"http://127.0.0.1:49/{custom_text}"
                       
                    elephant_data={
                        "photos":f"snapshots/snapshot_{unique_number}.jpg",
                        "ipAddress":ipaddress
                    }
                       
                    print(elephant_data)
                       
                    # #send http post request to the server
                    (elephant_data)
                    if sound_played and time.time() - start_time > 10:
                        print("Stopping sound.")
                        elephant_sound.stop()
                        sound_played = False

                    break  # Exit the loop once the snapshot is taken

            annotated_frame = annotate_frame(frame, custom_text)

            _, buffer = cv2.imencode('.jpg', annotated_frame)
            frame_bytes = buffer.tobytes()

            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

    cap.release()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/test1')
def video1():
    video_path = "test1.mp4"  
    custom_text = "Haldibari"
    return Response(generate_frames(video_path, custom_text), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(port=49, debug=False)
