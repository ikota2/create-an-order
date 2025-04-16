import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order Summary',
  description: 'Review your order details',
};

// This is a server component that will utilize SSR
export default function OrderPage() {
  // In a real application, you would fetch order data from a database or API

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Order Confirmation
        </h1>

        <div className="mb-6">
          <p className="text-center text-green-600 mb-4">Success!</p>
          <p className="text-gray-700">
            Thank you for your order. We will contact you within an hour.
          </p>
        </div>

        <div className="text-center">
          <a
            href="/"
            className="inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Return to Home
          </a>
        </div>
      </div>
    </main>
  );
}
