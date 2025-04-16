'use client';

import { useState } from 'react';
import AboutSection from '@/components/AboutSection';
import MainForm from '@/components/MainForm';
import OrderPopup from '@/components/OrderPopup';
import { FormData } from '@/types';

function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    roomCount: 1,
    // Add other form fields as needed
  });

  const handleSubmit = (data: FormData) => {
    setFormData(data);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <AboutSection />
        <MainForm onSubmit={handleSubmit} />
      </div>

      {isPopupOpen && <OrderPopup formData={formData} onClose={closePopup} />}
    </main>
  );
}

export default Home;
