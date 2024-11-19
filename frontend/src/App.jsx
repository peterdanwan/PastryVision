import React from 'react';

const BakeryPOS = () => {
  return (
    <div className="flex h-screen">
      {/* Left side */}
      <div className="flex-1 p-4 bg-gray-50">
        <div className="border p-4 mb-4 bg-white shadow-md">
          <h1 className="text-xl font-bold text-center">Mom & Pop Shop Bakery</h1>
        </div>
        <div className="h-full bg-gray-200 rounded shadow-md flex items-center justify-center">
          <p className="text-gray-600">Live feed or products will go here</p>
        </div>
      </div>

      {/* Right side */}
      <div className="w-80 border-l bg-white shadow-md">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Items</h2>
        </div>
        <div className="p-4">
          {['Croissants', 'Cookie', 'Cake'].map((item) => (
            <div key={item} className="mb-4 p-3 border rounded bg-gray-50">
              <div className="flex items-center">
                <div className="w-20 h-20 bg-gray-300 mr-3 rounded"></div>
                <span className="text-gray-700">2x {item}</span>
              </div>
            </div>
          ))}
          <div className="mt-8 border-t pt-4">
            <div className="flex justify-between mb-2 text-gray-700">
              <span>Subtotal:</span>
              <span>$xx.xx</span>
            </div>
            <div className="flex justify-between mb-2 text-gray-700">
              <span>Tax (13%):</span>
              <span>$xx.xx</span>
            </div>
            <div className="flex justify-between font-bold text-gray-900">
              <span>Total:</span>
              <span>$xx.xx</span>
            </div>
          </div>
          <button className="w-full mt-8 p-3 bg-blue-500 text-white rounded hover:bg-blue-600">
            Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default BakeryPOS;