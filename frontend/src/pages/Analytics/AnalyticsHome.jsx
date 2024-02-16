import React from 'react';

function AnalyticsHome() {
  return (
    <div className="flex flex-col p-5">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 w-full max-w-6xl">
        <div className="flex items-center p-4 bg-white rounded">
          <div className="flex flex-shrink-0 items-center justify-center bg-green-200 h-16 w-16 rounded">
            <svg className="w-6 h-6 fill-current text-green-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-grow flex flex-col ml-4">
            <span className="text-xl font-bold">23</span>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Elephant Detected in Last month</span>
              <span className="text-green-500 text-sm font-semibold ml-2">+12.6%</span>
            </div>
          </div>
        </div>
        <div className="flex items-center p-4 bg-white rounded">
          <div className="flex flex-shrink-0 items-center justify-center bg-red-200 h-16 w-16 rounded">
            <svg className="w-6 h-6 fill-current text-red-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex-grow flex flex-col ml-4">
            <span className="text-xl font-bold">211</span>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Camera Installed</span>
              <span className="text-red-500 text-sm font-semibold ml-2">-8.1%</span>
            </div>
          </div>
        </div>
        <div className="flex items-center p-4 bg-white rounded">
          <div className="flex flex-shrink-0 items-center justify-center bg-green-200 h-16 w-16 rounded">
            <svg className="w-6 h-6 fill-current text-green-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-grow flex flex-col ml-4">
            <span className="text-xl font-bold">08</span>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Elephant crossed the Area</span>
              <span className="text-green-500 text-sm font-semibold ml-2">+28.4%</span>
            </div>
          </div>
        </div>
      </div>

      {/* map */}
      <div className="w-full bg-white rounded mt-6 flex-col flex">
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
          Elephant Prone Area in Map
        </h2>

        <img src="https://i.ibb.co/sRHjnDj/image.png" alt="map" />
      </div>

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
    </div>
  );
}

export default AnalyticsHome;
