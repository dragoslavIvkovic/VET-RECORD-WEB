import { NextResponse } from 'next/server';

import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const { name, email, subject, message, newsletter } = await request.json();

        // Validate required fields
        if (!name || !email || !message) {
            console.error('Validation failed:', { name, email, message });
            return NextResponse.json(
                { error: 'Please fill in all required fields (name, email, and message)' },
                { status: 400 }
            );
        }

        // Create Yandex SMTP transporter
        const transporter = nodemailer.createTransport({
            host: 'smtp.yandex.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.YANDEX_EMAIL,
                pass: process.env.YANDEX_PASSWORD
            }
        });

        // Verify SMTP connection
        try {
            await transporter.verify();
        } catch (error) {
            console.error('SMTP Connection Error:', error);
            return NextResponse.json(
                { error: 'Unable to connect to email server. Please try again later.' },
                { status: 500 }
            );
        }

        // Email content
        const mailOptions = {
            from: `"VET RECORD Contact Form" <${process.env.YANDEX_EMAIL}>`,
            to: process.env.ADMIN_EMAIL || 'ivkemilioner2@gmail.com',
            subject: `New message from contact form: ${subject || 'No Subject'}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #0891b2; border-bottom: 2px solid #0891b2; padding-bottom: 10px;">New message from contact form</h2>
                    
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Subject:</strong> ${subject || 'No Subject'}</p>
                        <p><strong>Message:</strong></p>
                        <p>${message.replace(/\n/g, '<br>')}</p>
                        ${newsletter ? '<p>User has subscribed to the newsletter.</p>' : ''}
                    </div>
                </div>
            `
        };

        // Confirmation to user (optional)
        const userConfirmation = {
            from: `"VET RECORD" <${process.env.YANDEX_EMAIL}>`,
            to: email,
            subject: 'Thank you for contacting VET RECORD',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #0891b2; border-bottom: 2px solid #0891b2; padding-bottom: 10px;">Thank You for Contacting VET RECORD</h2>
                    
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p>Dear ${name},</p>
                        <p>Thank you for reaching out to us. We have received your message and will get back to you shortly.</p>
                    </div>
                    
                    <p style="margin-top: 20px;">
                        Best regards,<br>
                        The VET RECORD Team
                    </p>
                </div>
            `
        };

        // Send email to admin
        try {
            await transporter.sendMail(mailOptions);
            console.log('Admin notification email sent');

            // Optionally send confirmation to user
            await transporter.sendMail(userConfirmation);
            console.log('Confirmation email sent to:', email);

            return NextResponse.json(
                {
                    message: 'Thank you! Your message has been sent successfully.'
                },
                { status: 200 }
            );
        } catch (error) {
            console.error('Email sending error:', error);
            return NextResponse.json(
                { error: 'Failed to send confirmation email. Please check your email address.' },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error('Server error:', error);
        return NextResponse.json({ error: 'Server error. Please try again later.' }, { status: 500 });
    }
}
