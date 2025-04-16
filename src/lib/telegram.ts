import { OrderData } from '@/types';

export async function sendTelegramNotification(orderData: OrderData) {
  // Replace with your Telegram bot token and chat ID
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error('Telegram configuration is missing');
    throw new Error('Telegram configuration is missing');
  }

  const message = formatOrderMessage(orderData);

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML',
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`Telegram API error: ${JSON.stringify(errorData)}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to send Telegram notification:', error);
    throw error;
  }
}

function formatOrderMessage(orderData: OrderData): string {
  return `
<b>🔔 New Order Notification!</b>

<b>Customer Information:</b>
- Name: ${orderData.name}
- Email: ${orderData.email}
- Phone: ${orderData.phone}

<b>Address:</b>
${orderData.address}
${orderData.city}, ${orderData.zipCode}

<b>Order Details:</b>
- Room Count: ${orderData.roomCount}

<b>Order Time:</b> ${new Date().toLocaleString()}
  `.trim();
}
