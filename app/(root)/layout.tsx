import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

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
