import base64

import cv2
import mediapipe as mp
import numpy as np
from mediapipe.tasks import python
from mediapipe.tasks.python import vision

MARGIN = 10  # pixels
ROW_SIZE = 10  # pixels
FONT_SIZE = 1
FONT_THICKNESS = 1
TEXT_COLOR = (255, 0, 0)  # red


def base64_to_image(base64_string):
    """Convert base64 string to MediaPipe Image object."""
    # Remove the data URL prefix if present
    if ',' in base64_string:
        base64_string = base64_string.split(',')[1]

    # Decode base64 string to bytes
    image_bytes = base64.b64decode(base64_string)

    # Convert bytes to numpy array
    nparr = np.frombuffer(image_bytes, np.uint8)

    # Decode image
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # Convert to MediaPipe Image object
    return mp.Image(image_format=mp.ImageFormat.SRGB, data=image)


def visualize(image, detection_result) -> np.ndarray:
    """Draws bounding boxes on the input image and return it.
    Args:
      image: The input RGB image.
      detection_result: The list of all "Detection" entities to be visualize.
    Returns:
      Image with bounding boxes.
    """
    for detection in detection_result.detections:
        # Draw bounding_box
        bbox = detection.bounding_box
        start_point = bbox.origin_x, bbox.origin_y
        end_point = bbox.origin_x + bbox.width, bbox.origin_y + bbox.height
        cv2.rectangle(image, start_point, end_point, TEXT_COLOR, 3)

        # Draw label and score
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


def detect_objects(base64_image, model_path='app/models/efficientdet.tflite'):
    """Perform object detection on a base64 encoded image."""
    # Create detector
    base_options = python.BaseOptions(model_asset_path=model_path)
    options = vision.ObjectDetectorOptions(
        base_options=base_options, score_threshold=0.5
    )
    detector = vision.ObjectDetector.create_from_options(options)

    # Convert base64 to image
    image = base64_to_image(base64_image)

    # Detect objects
    detection_result = detector.detect(image)

    # Visualize results
    image_copy = np.copy(image.numpy_view())
    annotated_image = visualize(image_copy, detection_result)
    rgb_annotated_image = cv2.cvtColor(annotated_image, cv2.COLOR_BGR2RGB)

    return detection_result, rgb_annotated_image


# Example usage:
if __name__ == '__main__':
    BASE64_IMAGE = ''

    # Perform detection
    detections, annotated_image = detect_objects(BASE64_IMAGE)

    # Print detection results
    print(detections)

    # Display the annotated image
    cv2.imshow('Annotated Image', annotated_image)
    cv2.waitKey(0)
    cv2.destroyAllWindows()
