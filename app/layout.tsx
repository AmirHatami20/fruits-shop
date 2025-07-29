import './globals.css';
import {ReduxProvider} from '@/provider/ReduxProvider';
import type {Metadata} from 'next';
import {ToastContainer} from "react-toastify";
import {Vazirmatn} from 'next/font/google';
import React from "react";

const vazirmatn = Vazirmatn({
    weight: ['400', '700'],
    subsets: ['arabic'],
    display: 'swap',
    fallback: ['system-ui', 'sans-serif'],
});

export const metadata: Metadata = {
    title: 'سایت فروش میوه جات',
    description: 'Redux + Next.js 15 setup',
    icons: {
        icon: "/Logo.ico"
    }
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body dir="rtl" className={vazirmatn.className}>
        <ReduxProvider>
            <ToastContainer position="top-center" toastClassName={`${vazirmatn.className} text-sm`} autoClose={2000}/>
            {children}
        </ReduxProvider>
        </body>
        </html>
    );
}
