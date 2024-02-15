from ultralytics import YOLO

model = YOLO("model.pt")
path = "elephant.jpeg"
results = model(source=path, classes=20, conf=0.3, show=True, save=True)

    