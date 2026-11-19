import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const data = await req.json();
    const { name, phone, email, packageDetails, grandTotal } = data;

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: { user: 'info@shebatravelsbd.com', pass: 'your_email_password' },
    });

    await transporter.sendMail({
      from: '"Sheba Travels" <info@shebatravelsbd.com>',
      to: 'info@shebatravelsbd.com',
      subject: `New Umrah Booking Request from ${name}`,
      html: `<h2>New Booking</h2><p>Name: ${name}</p><p>Phone: ${phone}</p><p>Total: ৳${grandTotal}</p>`,
    });

    if (email) {
      await transporter.sendMail({
        from: '"Sheba Travels International" <info@shebatravelsbd.com>',
        to: email,
        subject: 'Your Custom Umrah Package Summary — Sheba Travels',
        html: `<h2>Thank you ${name}!</h2><p>We received your Umrah package request totaling ৳${grandTotal.toLocaleString()}.</p>`,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}