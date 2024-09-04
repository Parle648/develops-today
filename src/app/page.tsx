export default function Home() {
  return (
    <main className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded shadow-lg w-96">
          <h1 className="text-2xl font-bold mb-4 text-center">Select Vehicle Type & Model Year</h1>

          <div className="mb-4">
              <label className="block text-gray-700">Vehicle Type</label>
              <select id="vehicleType" className="w-full mt-2 p-2 border border-gray-300 rounded">
                  <option value="">Select Vehicle Type</option>
              </select>
          </div>

          <div className="mb-6">
              <label className="block text-gray-700">Model Year</label>
              <select id="modelYear" className="w-full mt-2 p-2 border border-gray-300 rounded">
                  <option value="">Select Model Year</option>
              </select>
          </div>

          <button id="nextButton" disabled className="w-full bg-blue-500 text-white py-2 rounded disabled:opacity-50">Next</button>
      </div>
    </main>
  );
}
