from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware

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
  Web Socket connection for the frontend to connect with the backend
"""


# Ref Doc: https://fastapi.tiangolo.com/reference/websockets/?h=websoc
@app.websocket('/ws/video-stream')
async def video_stream(websocket: WebSocket):
    await websocket.accept()
    await websocket.send_text('Hello World')  # Sending "Hello World"
    await websocket.close()
