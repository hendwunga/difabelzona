import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { amount, fullName, email, program } = await req.json();

    // Buat Auth Header (Base64 Encode Server Key)
    const secret = process.env.MIDTRANS_SERVER_KEY + ":";
    const encodedSecret = Buffer.from(secret).toString("base64");

    const payload = {
      transaction_details: {
        order_id: `DONASI-${Date.now()}`, // ID unik setiap transaksi
        gross_amount: Number(amount),
      },
      customer_details: {
        first_name: fullName,
        email: email,
      },
      item_details: [
        {
          id: "item1",
          price: Number(amount),
          quantity: 1,
          name: program,
        },
      ],
      // Aktifkan metode yang diinginkan
      enabled_payments: ["credit_card", "qris", "shopeepay", "gopay", "bank_transfer"],
    };

    const response = await fetch("https://app.midtrans.com/snap/v1/transactions", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Basic ${encodedSecret}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Midtrans Error:", error);
    return NextResponse.json({ error: "Gagal membuat transaksi" }, { status: 500 });
  }
}