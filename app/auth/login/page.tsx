'use client';

import React, {useState} from 'react';
import Image from "next/image";
import {useAppDispatch, useAppSelector} from "@/redux/Hook";
import {loginUser} from "@/redux/slices/user";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import {RootState} from "@/redux";
import {BiHide, BiShow} from "react-icons/bi";

export default function LoginPage() {
    const [form, setForm] = useState({email: '', password: ''});
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();
    const dispatch = useAppDispatch();

    const {
        loading: {login: loginLoading},
        error: {login: loginError}
    } = useAppSelector((state: RootState) => state.user);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await dispatch(loginUser(form)).unwrap()
            router.push("/")
        } catch {
            toast.error(loginError)
        }
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative">
                <Image
                    alt="auth-logo"
                    src="/login-animation.gif"
                    width={80}
                    height={80}
                    priority
                    className="mx-auto"
                />
            </div>
            <h2 className="text-xl font-bold mt-2 text-center">ورود به سایت</h2>

            <label htmlFor="email" className="flex flex-col">
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="auth-input"
                    placeholder="ایمیل ..."
                    value={form.email}
                    onChange={handleChange}
                    required
                />
            </label>

            <label htmlFor="password" className="flex flex-col">
                <div className="relative">
                    <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="رمز عبور ..."
                        className="auth-input"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                    <span
                        className="text-xl cursor-pointer absolute bottom-1.5 left-2 select-none"
                        onClick={() => setShowPassword(prev => !prev)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        role="button"
                        tabIndex={0}
                    >
                 {showPassword ? <BiShow/> : <BiHide/>}
              </span>
                </div>
            </label>

            <button type="submit" className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600">
                {loginLoading ? 'در حال ورود...' : 'ورود'}
            </button>

            <p className="text-sm text-center">
                حساب ندارید؟{' '}
                <a href="/auth/register" className="text-blue-500 underline">
                    ثبت‌ نام
                </a>
            </p>
        </form>
    );
}
