"use client";

import { Suspense } from "react";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import axios from "axios";
import { useParams } from "next/navigation";

const queryClient = new QueryClient();

async function fetchVehicles(makeId: string, year: string) {
  try {
    const res = await axios.get(
      `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching vehicle data:", error);
    throw new Error('Failed to fetch vehicles');
  }
}

function VehiclesList() {
  const { movieId, year } = useParams();

  const makeId = decodeURIComponent(movieId as string).replace(/[\[\]]/g, "") as string;
  const modelYear = decodeURIComponent(year as string).replace(/[\[\]]/g, "") as string;

  const { data: vehicles, error } = useQuery(
    ["vehicles", makeId, modelYear],
    () => fetchVehicles(makeId, modelYear),
    { suspense: true }
  );

  if (error) {
    return <p>Error loading vehicles: {`${error}`}</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vehicles?.Results.length > 0 ? (
        vehicles.Results.map((vehicle: any) => (
          <div key={vehicle.Model_ID} className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800">{vehicle.Make_Id}</h2>
              <p className="text-gray-600 mt-2">
                Make Name: <span className="font-semibold">{vehicle.Make_Name}</span>
              </p>
              <p className="text-gray-600 mt-1">
                Model Name: <span className="font-semibold">{vehicle.Model_Name}</span>
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No vehicles found.</p>
      )}
    </div>
  );
}

export default function Filters() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="bg-gray-100 flex items-center justify-center min-h-screen">
        <Suspense fallback={<p>Loading vehicles...</p>}>
          <VehiclesList />
        </Suspense>
      </main>
    </QueryClientProvider>
  );
}
