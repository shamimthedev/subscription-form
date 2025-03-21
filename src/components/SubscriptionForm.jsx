'use client';

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import QRCode from "react-qr-code"; // ✅ Updated import
import { isValidPhoneNumber } from 'libphonenumber-js';

export default function SubscriptionForm() {
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [qrCode, setQrCode] = useState('');

    const validatePhone = (phone) => {
        return isValidPhoneNumber(phone, 'BD'); // ✅ Change this to your preferred country
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (!validatePhone(phone)) {
            setError('Invalid phone number. Please enter a valid one.');
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setQrCode(`tel:${phone}`);
            setLoading(false);
        }, 2000);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md p-6 shadow-lg">
                <CardContent>
                    <h2 className="text-xl font-semibold mb-4 text-center">Subscribe with Phone</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            type="tel"
                            placeholder="Enter your phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full border p-2 rounded-md"
                            aria-label="Phone number"
                        />
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <Button type="submit" className="w-full cursor-pointer" disabled={loading}>
                            {loading ? <Loader2 className="animate-spin" /> : 'Get QR Code'}
                        </Button>
                    </form>
                    {qrCode && (
                        <div className="flex justify-center mt-4 bg-white p-2 rounded-md">
                            <QRCode value={qrCode} size={150} />
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
