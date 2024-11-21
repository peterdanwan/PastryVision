import base64

import cv2
from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware

from app.object_detection import detect_objects
from app.pricing_model import prices

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

"""
  Health Check Route
"""


@app.get('/')
def read_root():
    return {'PastryVision Health Status': 'running'}


"""
Web Socket connection to connect to the frontend
"""


@app.websocket('/ws/video-stream')
async def video_stream(websocket: WebSocket):
    await websocket.accept()
    print('WebSocket connection established.')

    try:
        while True:
            frame_data = await websocket.receive_text()

            try:
                detections, annotated_image = detect_objects(frame_data)
                detected_items_with_prices = []

                for detection in detections.detections:
                    category_name = detection.categories[0].category_name

                    if category_name in prices:
                        detected_items_with_prices.append(
                            {
                                'item': category_name,
                                'price': prices[category_name],
                            }
                        )

                print(detected_items_with_prices)
                _, buffer = cv2.imencode('.jpg', annotated_image)
                encoded_image = base64.b64encode(buffer).decode('utf-8')

                response = {
                    'detections': detected_items_with_prices,
                    'annotated_image': encoded_image,
                }

                await websocket.send_json(response)

            except Exception as detection_error:
                error_response = {
                    'error': 'Object detection failed',
                    'details': str(detection_error),
                }
                print(f'Detection error: {detection_error}')
                await websocket.send_json(error_response)

    except Exception as e:
        print(f'WebSocket Error: {e}')
