'use client';

import {useEffect, useState} from "react";
import Link from "next/link";
import Image from "next/image";

import {HiOutlineUserCircle} from "react-icons/hi";
import {BsCartFill} from "react-icons/bs";
import {MdOutlineAddToPhotos} from "react-icons/md";
import {GrLogin} from "react-icons/gr";

import {useDispatch} from "react-redux";
import {logout} from "@/redux/slices/user";
import {RootState} from "@/redux";
import {homeLinks} from "@/constant";
import {useAppSelector} from "@/redux/Hook";

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [isClient, setIsClient] = useState(false);

    const dispatch = useDispatch();


    const user = useAppSelector((state: RootState) => state.user.user);
    const token = useAppSelector((state: RootState) => state.user.token);
    const cartItems = useAppSelector((state: RootState) => state.product.cartItem);

    const handleShowMenu = () => setShowMenu(prev => !prev);
    const handleLogout = () => dispatch(logout());

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <header className="fixed shadow-md w-full h-16 md:h-20 z-40 bg-white">
            <div className="container flex items-center h-full justify-between">
                {/* لوگو و منو */}
                <div className="flex items-center gap-x-5">
                    <Link href="/">
                        <Image
                            alt="logo"
                            src="/Logo.png"
                            width={40}
                            height={40}
                            className="h-full w-full object-cover"
                        />
                    </Link>

                    <nav className="gap-4 md:gap-5 text-base md:text-lg hidden md:flex">
                        {homeLinks.map((link) => (
                            <Link href={link.href} key={link.id}>
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Icons */}
                <div className="flex items-center gap-4 md:gap-5 relative">
                    {/* basket */}
                    <Link href="/cart" className="text-3xl text-slate-600 relative">
                        <BsCartFill/>
                        <span
                            className="absolute -top-1 pt-0.5 -right-1 text-white bg-red-500 h-4 w-4 rounded-full text-xs flex items-center justify-center"
                        >
                                {cartItems?.length || 0}
                        </span>
                    </Link>

                    <div onClick={handleShowMenu} className="text-slate-600 cursor-pointer relative">
                        <div className="text-4xl rounded-full overflow-hidden drop-shadow-md py-2">
                            {isClient && user?.image ? (
                                <img
                                    alt="user"
                                    src={user.image}
                                    className="h-10 w-10 rounded-full object-cover"
                                />
                            ) : (
                                <HiOutlineUserCircle/>
                            )}
                        </div>

                        {showMenu && (
                            <div
                                className="absolute left-0 top-16 bg-white p-2 shadow-md rounded-md flex flex-col min-w-[140px] z-50">
                                {token && (
                                    <Link
                                        href="/new-product"
                                        className="flex items-center gap-x-2 p-2 border-b hover:text-red-700 transition-colors"
                                    >
                                        <MdOutlineAddToPhotos/>
                                        افزودن محصول
                                    </Link>
                                )}

                                {user ? (
                                    <button
                                        onClick={handleLogout}
                                        className="text-white bg-red-500 p-2 mt-1 rounded text-sm hover:bg-red-600"
                                    >
                                        خروج ({user.firstName})
                                    </button>
                                ) : (
                                    <Link
                                        href="/auth/login"
                                        className="flex items-center gap-x-2 p-2 hover:text-red-700 transition-colors"
                                    >
                                        <GrLogin/>
                                        ورود
                                    </Link>
                                )}

                                {/* mobile menu */}
                                <div className="flex flex-col md:hidden border-t pt-2 mt-2">
                                    {homeLinks.map((link) => (
                                        <Link href={link.href} key={link.id}>
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
