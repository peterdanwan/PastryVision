# backend/app/object_detection.py

import base64

import cv2
import mediapipe as mp
import numpy as np
from mediapipe.tasks import python
from mediapipe.tasks.python import vision

MARGIN = 10 
ROW_SIZE = 10  
FONT_SIZE = 1
FONT_THICKNESS = 1
TEXT_COLOR = (255, 0, 0)  


def base64_to_image(base64_string):
    """
      Convert base64 string to MediaPipe Image object.
    """
    
    if ',' in base64_string:
        base64_string = base64_string.split(',')[1]

    image_bytes = base64.b64decode(base64_string)

    nparr = np.frombuffer(image_bytes, np.uint8)

    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    return mp.Image(image_format=mp.ImageFormat.SRGB, data=image)


def visualize(image, detections) -> np.ndarray:
    """
    Draws bounding boxes on the input image and return it.
      Args:
        image: The input RGB image.
        detection_result: The list of all "Detection" entities to be visualize.
      Returns:
        Image with bounding boxes.
    """
    
    for detection in detections:
        bbox = detection.bounding_box
        start_point = bbox.origin_x, bbox.origin_y
        end_point = bbox.origin_x + bbox.width, bbox.origin_y + bbox.height
        cv2.rectangle(image, start_point, end_point, TEXT_COLOR, 3)

        category = detection.categories[0]
        category_name = category.category_name
        probability = round(category.score, 2)
        result_text = category_name + ' (' + str(probability) + ')'
        text_location = (
            MARGIN + bbox.origin_x,
            MARGIN + ROW_SIZE + bbox.origin_y,
        )
        
        cv2.putText(
            image,
            result_text,
            text_location,
            cv2.FONT_HERSHEY_PLAIN,
            FONT_SIZE,
            TEXT_COLOR,
            FONT_THICKNESS,
        )

    return image

def detect_objects(frame, model_path='../ml/models/model.tflite'):
    try:
        base_options = python.BaseOptions(model_asset_path=model_path)
        options = vision.ObjectDetectorOptions(base_options=base_options, score_threshold=0.5)
        detector = vision.ObjectDetector.create_from_options(options)
    except Exception as e:
        print(f"Error loading model: {e}")
        return [], None

    rgb_image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    
    mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb_image)

    try:
        detection_result = detector.detect(mp_image)
    except Exception as e:
        print(f"Error during detection: {e}")
        return [], None
    
    valid_detections = []
    
    if detection_result.detections:  
        for detection in detection_result.detections:
            if detection.categories[0].score > 0.80:
                valid_detections.append(detection)

    if not valid_detections:
        return [], None
    try:
      image_copy = np.copy(frame)  
      annotated_image = visualize(image_copy, valid_detections) 
    except:
      print("valid_detections exception") 
    
    return valid_detections, annotated_image
  