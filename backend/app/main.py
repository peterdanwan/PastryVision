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


@app.get('/')
def read_root():
    return {'PastryVision Health Status': 'running'}


@app.websocket('/ws/video-stream')
async def video_stream(websocket: WebSocket):
    await websocket.accept()
    print('WebSocket connection established.')

    # try:
    #     while True:
    #         frame_data = await websocket.receive_text()

    #         print(f'Received frame: {frame_data[:30]}...')

    # except Exception as e:
    #     print(f'Error: {e}')

    # finally:
    # await websocket.send_text('Hello World')
    await websocket.close()
    print('WebSocket connection closed.')
