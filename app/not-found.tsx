'use client';

import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
            <h1 className="text-4xl font-bold text-red-500 mb-4">404 - صفحه پیدا نشد</h1>
            <p className="text-gray-600 mb-6">متأسفیم، صفحه‌ای که دنبال آن هستید وجود ندارد.</p>
            <Link
                href="/"
                className="bg-red-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition"
            >
                بازگشت به خانه
            </Link>
        </div>
    );
}
