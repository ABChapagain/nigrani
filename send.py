import os
import time
import shutil
import requests
import json

# Directory where snapshots are saved
snapshot_dir = "detected"
# Directory where you want to copy the images
api_dir = "api"
# ImgBB API key
api_key = "b365a152756e43c9de89801a5280a9ac"
backend_url = 'https://nigrani-backend.onrender.com/api/detectations'

def copy_snapshot(snapshot_filename):
    os.makedirs(api_dir, exist_ok=True)
    # Copy the snapshot to the API directory
    shutil.copy(snapshot_filename, os.path.join(api_dir, os.path.basename(snapshot_filename)))
    print(f"Image copied to API directory: {snapshot_filename}")
    
    with open(snapshot_filename, 'rb') as file:
        files = {
            'image': file
        }
        response = requests.post('https://api.imgbb.com/1/upload', params={'key': api_key}, files=files)
        if response.status_code == 200:
            try:
                data = response.json()
                imageurl = data.get("data", {}).get("url")  # Use .get() method to handle potential missing keys
                if imageurl:
                    print("Image uploaded to ImgBB successfully:", imageurl)
                    new_data = {
                        "cameraId": "65cde6f95d2f55b139721e16",
                        "additionalInfo": "test_data",
                        "numberOfElephant": 4,
                        "image": imageurl
                    }
                    json_data = json.dumps(new_data)

                    # Define the URL where you want to post the JSON data

                    # Set headers
                    headers = {'Content-Type': 'application/json'}

                    # Send POST request with JSON data
                    response = requests.post(backend_url, data=json_data, headers=headers)

                    # Check the response
                    if response.status_code == 200:
                        print("JSON data posted successfully!")
                    else:
                        print("Failed to post JSON data. Status code:", response.status_code)
                else:
                    print("Error: Image URL not found in the response from ImgBB API.")
            except json.JSONDecodeError:
                print("Error: Failed to decode JSON response from ImgBB API.")
        else:
            print("Failed to upload image to ImgBB. Status code:", response.status_code)
     

def listen_for_updates():
    while True:
        # Check for new files in the snapshot directory
        for filename in os.listdir(snapshot_dir):
            if filename.startswith("elephant_detected_") and filename.endswith(".jpg"):
                snapshot_filename = os.path.join(snapshot_dir, filename)
                # Process the snapshot
                copy_snapshot(snapshot_filename)
                
        # Add a delay to prevent continuous scanning
        time.sleep(1)

if __name__ == "__main__":
    listen_for_updates()

