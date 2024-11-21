import { useEffect, useRef, useState } from 'react';

const BakeryPOS = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const socketRef = useRef(null);

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

  useEffect(() => {
    if (isStreaming) {
      socketRef.current = new WebSocket('ws://localhost:8000/ws/video-stream');
      socketRef.current.onopen = () => {
        console.log('Connected to WebSocket');
        startSendingFrames();
      };

      socketRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.annotated_image && data.detections) {
          const byteCharacters = atob(data.annotated_image);
          const byteArrays = [];

          for (let offset = 0; offset < byteCharacters.length; offset += 512) {
            const slice = byteCharacters.slice(offset, offset + 512);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
            }
            byteArrays.push(new Uint8Array(byteNumbers));
          }

          const blob = new Blob(byteArrays, { type: 'image/jpeg' });
          const imageUrl = URL.createObjectURL(blob);

          setAnnotatedImage(imageUrl);

          setItems(data.detections);
          const newSubtotal = data.detections.reduce(
            (sum, item) => sum + item.price,
            0
          );
          setSubtotal(newSubtotal);

          socketRef.current.close();
        }
      };

      socketRef.current.onclose = () => {
        console.log('Disconnected from WebSocket');
      };

      socketRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    }
  }, [isStreaming]);

  const startSendingFrames = () => {
    const intervalId = setInterval(() => {
      if (
        videoRef.current &&
        socketRef.current?.readyState === WebSocket.OPEN
      ) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;

        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        const imageData = canvas.toDataURL('image/jpeg');
        socketRef.current.send(imageData);
      }
    }, 5000);

    return () => clearInterval(intervalId);
  };

  const tax = subtotal * 0.13;
  const total = subtotal + tax;

  return (
    <div className='flex h-screen'>
      <div className='flex-1 p-4 bg-gray-50 h-[85vh]'>
        <div className='border p-4 mb-4 bg-white shadow-md'>
          <h1 className='text-xl font-bold text-center'>
            Mom & Pop Shop Bakery
          </h1>
        </div>
        <div className='h-full rounded shadow-md flex items-center justify-center mb-20'>
          {annotatedImage ? (
            <img
              src={annotatedImage}
              alt='Annotated Detection'
              className='w-full h-full object-cover rounded'
            />
          ) : (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className='w-full h-full object-cover rounded'
            />
          )}
        </div>
      </div>
      <div className='w-80 border-l bg-white shadow-md'>
        <div className='p-4 border-b'>
          <h2 className='text-lg font-semibold'>Items</h2>
        </div>
        <div className='p-4'>
          {items.length > 0 ? (
            items.map((item, index) => (
              <div key={index} className='mb-4 p-3 border rounded bg-gray-50'>
                <div className='flex items-center'>
                  <div className='w-20 h-20 bg-gray-300 mr-3 rounded'></div>
                  <span className='text-gray-700'>
                    {item.item} - ${item.price.toFixed(2)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className='text-gray-500'>No items detected.</p>
          )}
          <div className='mt-8 border-t pt-4'>
            <div className='flex justify-between mb-2 text-gray-700'>
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className='flex justify-between mb-2 text-gray-700'>
              <span>Tax (13%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className='flex justify-between font-bold text-gray-900'>
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <button className='w-full mt-8 p-3 bg-blue-500 text-white rounded hover:bg-blue-600'>
            Pay
          </button>
        </div>
      </div>

      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default BakeryPOS;
