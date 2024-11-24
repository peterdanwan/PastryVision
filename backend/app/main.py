# backend/app/main.py

import base64
from http.client import HTTPException
import numpy as np
import cv2
from fastapi import FastAPI,  File, UploadFile
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

@app.get('/')
def read_root():
    """
      Health Check Route
    """
    return {'PastryVision Health Status': 'running'}

@app.post('/api/analyze-image')
async def upload_file(file: UploadFile = File(...)):        
    """
      HTTP POST Route for image analysis
    """

    contents = await file.read()
    
    nparr = np.frombuffer(contents, np.uint8)
    frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
    if frame is None:
        raise HTTPException(status_code=400, detail="Invalid image format")
        
    detections, annotated_image = detect_objects(frame)
    detected_items_with_prices = []
    
    if not detections:
      return None

    for detection in detections:
        category_name = detection.categories[0].category_name
        
        if category_name in prices:
            detected_items_with_prices.append(
                {
                    'item': category_name,
                    'price': prices[category_name],
                }
            )

    _, buffer = cv2.imencode('.jpg', annotated_image)
    encoded_image = base64.b64encode(buffer).decode('utf-8')

    response = {
        'detections': detected_items_with_prices,
        'annotated_image': encoded_image,
    }

    return response
