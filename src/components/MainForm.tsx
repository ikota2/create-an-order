'use client';

import React, { useState } from 'react';
import { FormData } from '@/types';

interface MainFormProps {
  onSubmit: (data: FormData) => void;
}

const MainForm = ({ onSubmit }: MainFormProps) => {
  const [roomCount, setRoomCount] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData: FormData = {
      roomCount,
      // Add other form fields as needed
    };

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Room Selection</h2>

      <div className="mb-4">
        <label
          htmlFor="room-count"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Room Count: {roomCount}
        </label>
        <input
          type="range"
          id="room-count"
          name="room-count"
          min="1"
          max="10"
          step="1"
          value={roomCount}
          onChange={(e) => setRoomCount(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>1</span>
          <span>10</span>
        </div>
      </div>

      {/* Add more form fields as needed */}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
      >
        Continue to Order
      </button>
    </form>
  );
};

export default MainForm;
