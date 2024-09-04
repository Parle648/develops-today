'use client';

import { useEffect, useState } from 'react';
import { options, years } from './db';

export default function Home() {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [selects, setSelects] = useState<[string, string]>(['', '']);

  const changeSelects = (event: any) => {
    setSelects(() => {
      if (event.target.parentNode.id === 'makeId') {
        return [event.target.value, selects[1]];
      }
      if (event.target.parentNode.id === 'year') {
        return [selects[0], event.target.value];
      }

      return ['', ''];
    });
  };

  useEffect(() => {
    if (selects.some((item: string) => item === '')) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [selects]);

  return (
    <main className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Select Vehicle Type & Model Year</h1>

        <div className="mb-4">
          <label className="block text-gray-700">Vehicle Type</label>
          <select id="makeId" className="w-full mt-2 p-2 border border-gray-300 rounded">
            <option value="" onClick={changeSelects}>
              Select Vehicle Type
            </option>
            {options.map((option) => (
              <option key={option.id} value={`${option.id}`} onClick={changeSelects}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700">Model Year</label>
          <select id="year" className="w-full mt-2 p-2 border border-gray-300 rounded">
            <option value="" onClick={changeSelects}>
              Select Model Year
            </option>
            {years.map((year: number) => (
              <option key={year} value={`${year}`} onClick={changeSelects}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <a
          className={`${isVisible ? '' : 'hidden'} w-full bg-blue-500 text-white py-2 rounded disabled:opacity-50 p-6`}
          id="nextButton"
          href={`./result/[${selects[0]}]/[${selects[1]}]`}
        >
          Next
        </a>
      </div>
    </main>
  );
}
