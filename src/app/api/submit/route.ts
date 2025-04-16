import { NextResponse } from 'next/server';
import { sendTelegramNotification } from '@/lib/telegram';
import { OrderData } from '@/types';

export async function POST(request: Request) {
  try {
    const orderData: OrderData = await request.json();

    if (
      !orderData.name ||
      !orderData.email ||
      !orderData.phone ||
      !orderData.address
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send notification to Telegram
    await sendTelegramNotification(orderData);

    // Here you could also save the order to a database if needed

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Order submission error:', error);
    return NextResponse.json(
      { error: 'Failed to process the order' },
      { status: 500 }
    );
  }
}
