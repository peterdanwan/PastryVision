import { useEffect, useRef, useState } from 'react';
import Billing from './components/Billing/Billing';

export default function BakeryPOS() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [isStreaming, setIsStreaming] = useState(false);
  const [annotatedImage, setAnnotatedImage] = useState(null);
  const [items, setItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const getCameraStream = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
          (device) => device.kind === 'videoinput'
        );

        if (videoDevices.length > 0) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { deviceId: { exact: videoDevices[0].deviceId } },
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            setIsStreaming(true);
          }
        } else {
          console.error('No video input devices found.');
        }
      } catch (error) {
        console.error('Error accessing the camera:', error);
      }
    };

    getCameraStream();

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const captureFrameAndSend = async () => {
    if (!videoRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      async (blob) => {
        if (!blob) return;

        try {
          const formData = new FormData();
          formData.append('file', blob, 'captured_frame.jpg');

          const response = await fetch(
            'http://localhost:8000/api/analyze-image',
            {
              method: 'POST',
              body: formData,
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();

          if (data.annotated_image && data.detections) {
            const imageUrl = `data:image/jpeg;base64,${data.annotated_image}`;
            setAnnotatedImage(imageUrl);
            setItems(data.detections);
            const newSubtotal = data.detections.reduce(
              (sum, item) => sum + item.price,
              0
            );
            setSubtotal(newSubtotal);
          } else {
            setAnnotatedImage(null);
            setItems([]);
            setSubtotal(0);
          }
        } catch (error) {
          console.error('Error sending image to backend:', error);
        }
      },
      'image/jpeg',
      0.95
    );
  };

  return (
    <div className='flex flex-col md:flex-row h-screen bg-gray-100'>
      <div className='flex-1 p-4 h-scree overflow-auto'>
        <div className='bg-white rounded-lg shadow-md overflow-hidden h-[calc(100vh-2rem)]'>
          <div className='p-4 bg-slate-700 text-white'>
            <h1 className='text-2xl font-bold text-center'>PastryVision</h1>
          </div>
          <div className='p-4 flex flex-col items-center space-y-4'>
            <div className='w-[95%] aspect-video bg-gray-200 rounded-lg overflow-hidden'>
              {annotatedImage ? (
                <img
                  src={annotatedImage}
                  alt='Annotated Detection'
                  className='w-full object-cover'
                />
              ) : (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className='w-full object-cover'
                />
              )}
            </div>
            <button
              onClick={captureFrameAndSend}
              className='w-full md:w-auto px-4 py-2 bg-slate-700 text-white rounded-md hover:bg-blue-600 transition-colors'
            >
              {isStreaming ? 'Capture Frame' : 'Camera Off'}
            </button>
          </div>
        </div>
      </div>
      <div className='w-full md:w-96 p-4'>
        <Billing subtotal={subtotal} items={items} />
      </div>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}
