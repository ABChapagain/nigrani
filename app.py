from ultralytics import YOLO

model = YOLO("nigrani.pt")

results = model(source=0, classes=20, show=True, save=True)