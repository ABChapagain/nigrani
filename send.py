# import os
# import time
# import shutil
# import requests

# # Directory where snapshots are saved
# snapshot_dir = "detected"
# # Directory where you want to copy the images
# api_dir = "api"
# # ImgBB API key
# api_key = "b365a152756e43c9de89801a5280a9ac"

# def copy_snapshot(snapshot_filename):
#     os.makedirs(api_dir, exist_ok=True)
#     # Copy the snapshot to the API directory
#     shutil.copy(snapshot_filename, os.path.join(api_dir, os.path.basename(snapshot_filename)))
#     print(f"Image copied to API directory: {snapshot_filename}")
    
#     with open(snapshot_filename, 'rb') as file:
#         files = {
#             'image': file
#         }
#         response = requests.post('https://api.imgbb.com/1/upload', params={'key': api_key}, files=files)
#         print(response.json())

# def listen_for_updates():
#     while True:
#         # Check for new files in the snapshot directory
#         for filename in os.listdir(snapshot_dir):
#             if filename.startswith("detected_") and filename.endswith(".jpg"):
#                 snapshot_filename = os.path.join(snapshot_dir, filename)
#                 # Process the snapshot
#                 copy_snapshot(snapshot_filename)           
#         # Add a delay to prevent continuous scanning
#         time.sleep(1)
# if __name__ == "__main__":
#     listen_for_updates()

import os
import time
import shutil
import requests

# Directory where snapshots are saved
snapshot_dir = "detected"
# Directory where you want to copy the images
api_dir = "api"
# ImgBB API key
api_key = "b365a152756e43c9de89801a5280a9ac"

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
        print(response.json())

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
