import {Metadata} from "next";
import Header from "@/components/Layout/Header";

export const metadata: Metadata = {
    title: 'احراز هویت در سایت ما',
    description: 'Redux + Next.js 15 setup',
    icons:{
        icon:"/Logo.png"
    }
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header/>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
                    {children}
                </div>
            </div>
        </>
    );
}

