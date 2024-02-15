import requests

url = "https://nigrani-backend.onrender.com/api/detectations"
data = {
  "cameraId": "65cde6f95d2f55b139721e16",
  "image": "https://th.bing.com/th/id/OIP.gzDp1O2vzOhsrX4SbFxuPgHaHa?rs=1&pid=ImgDetMain",
  "additionalInfo": "Prashant Test",
  "numberOfElephant": 1
}

response = requests.post(url, json=data)

if response.status_code == 200:
    print("Request successful!")
    print(response.json())
else:
    print("Request failed with status code:", response.status_code)