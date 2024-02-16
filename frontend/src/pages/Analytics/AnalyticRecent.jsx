import React from 'react';

function AnalyticRecent() {
  return (
    <div className="w-full mt-6">
      <h2
        className="
                text-2xl
                font-bold
                text-gray-700
                p-4
                border-b
                border-gray-200
            "
      >
        Recent Attack
      </h2>
      <div className="flex flex-col">
        {/* image */}
        <div className="flex items-center justify-between p-4 bg-white rounded mt-4">
          <div className="flex items-center">
            <img src="https://i.ibb.co/bWTZqmm/elephant-detected-1708097523.jpg" alt="elephant-attack" className="h-16 w-16 rounded" />
            <div className="flex flex-col gap-2">
              <div className="ml-4 flex gap-2 items-center">
                <span className="text-lg font-bold">Number Of Elephants:</span>
                <span className="text-gray-500">1 (approx)</span>
              </div>
              <div className="ml-4 flex gap-2 items-center">
                <span className="text-lg font-bold">Location:</span>
                <span className="text-gray-500">Bhadrapur Municipality 01</span>
              </div>
            </div>
          </div>
          <button className="bg-red-500 text-white px-4 py-2 rounded">View</button>
        </div>
      </div>
    </div>
  );
}

export default AnalyticRecent;
