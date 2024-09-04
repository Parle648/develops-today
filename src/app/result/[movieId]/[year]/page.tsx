"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

async function getVehicles(makeId: string, year: string) {
    try {
        const res = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`);
        return res.data;
    } catch (error) {
        console.error("Error fetching vehicle data:", error);
        return null;
    }
}

export default function Filters() {
    const {movieId, year} = useParams();

    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        getVehicles(decodeURIComponent(movieId as string).replace(/[\[\]]/g, '') as string, decodeURIComponent(year as string).replace(/[\[\]]/g, '') as string).then(data => {
            if (data && data.Results) {
                setVehicles(data.Results);
            }
        });
    }, []);

    return (
        <main className="bg-gray-100 flex items-center justify-center min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehicles.length > 0 ? (
                    vehicles.map((vehicle: any) => (
                        <div key={vehicle.Model_ID} className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden">
                            <div className="p-6">
                                <h2 className="text-xl font-bold text-gray-800">{vehicle.Make_Name}</h2>
                                <p className="text-gray-600 mt-2">Make ID: <span className="font-semibold">{vehicle.Make_ID}</span></p>
                                <p className="text-gray-600 mt-1">Vehicle Type: <span className="font-semibold">{vehicle.Vehicle_Type}</span></p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600">No vehicles found.</p>
                )}
            </div>
        </main>
    );
}
