import {Metadata} from "next";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

export const metadata: Metadata = {
    title: 'My App with Redux',
    description: 'Redux + Next.js 15 setup',
};

export default function Layout({children}: { children: React.ReactNode }) {
    return (
        <section className="flex flex-col min-h-screen">
            <Header/>
            <div className="flex-1 mt-16 md:mt-20 pt-4 md:pt-8 container">
                {children}
            </div>
            <Footer/>
        </section>
    );
}
