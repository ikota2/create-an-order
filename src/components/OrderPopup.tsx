'use client';

import { useState } from 'react';
import AddressForm from './AddressForm';
import { FormData, AddressData } from '@/types';

interface OrderPopupProps {
  formData: FormData;
  onClose: () => void;
}

const OrderPopup = ({ formData, onClose }: OrderPopupProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (addressData: AddressData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          ...addressData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(errorData.error || 'Failed to submit the order');
      }

      setTimeout(() => {
        onClose();
      }, 500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Complete Your Order</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-2">Order Summary</h3>
            <p className="text-gray-700">Room Count: {formData.roomCount}</p>
            {/* Display other form data */}
          </div>

          <AddressForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />

          {error && <div className="mt-4 text-red-600 text-sm">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default OrderPopup;
