import Link from "next/link";
import {FaInstagram, FaTelegramPlane, FaWhatsapp} from "react-icons/fa";
import Image from "next/image";
import {homeLinks} from "@/constant";

export default function Footer() {
    return (
        <footer className="px-4 md:px-8 py-10 shadow-md bg-white border-t border-gray-300">
            <div className="container grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-right">
                {/* Logo & About */}
                <div className="flex flex-col items-center md:items-start">
                    <Image
                        src="/Logo.png"
                        alt="Logo"
                        width={40}
                        height={40}
                        className="mb-4"
                    />
                    <p className="leading-6 max-w-xs">
                        سایت ما با هدف ارائه بهترین غذاها و خدمات به مشتریان طراحی شده. از انتخاب شما سپاسگزاریم.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="flex flex-col items-center">
                    <h3 className="text-lg font-semibold mb-4">لینک‌های سریع</h3>
                    <ul className="space-y-2">
                        {homeLinks.map((link) => (
                            <li key={link.id}>
                                <Link href={link.href} className="hover:underline">
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Social & Contact */}
                <div className="flex flex-col items-center">
                    <h3 className="text-lg font-semibold mb-4">ارتباط با ما</h3>
                    <div className="flex space-x-6 justify-center md:justify-start text-xl">
                        <a href="https://instagram.com" target="_blank" rel="noreferrer">
                            <FaInstagram className="hover:text-pink-500 transition-colors duration-200"/>
                        </a>
                        <a href="https://t.me" target="_blank" rel="noreferrer">
                            <FaTelegramPlane className="hover:text-blue-400 transition-colors duration-200"/>
                        </a>
                        <a href="https://wa.me/your-number" target="_blank" rel="noreferrer">
                            <FaWhatsapp className="hover:text-green-400 transition-colors duration-200"/>
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-200 mt-10 pt-4 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} تمام حقوق محفوظ است. | طراحی توسط امیرحاتمی ✌️
            </div>
        </footer>
    );
};
