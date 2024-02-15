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
    

send_data_to_server({
    "cameraId": "65cde6f95d2f55b139721e16",
    "image": "https://upload.wikimedia.org/wikipedia/commons/3/3c/Elephant-group-2.jpg",
    "additionalInfo": "A group of elephant detected in BPC hackfest 2024",
    "numberOfElephant": 8
})