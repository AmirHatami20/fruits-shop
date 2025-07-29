'use client';

import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import {toast} from 'react-toastify';
import {IoCloudUploadOutline} from "react-icons/io5";
import {useAppDispatch, useAppSelector} from "@/redux/Hook";
import {registerUser} from "@/redux/slices/user";
import {RootState} from "@/redux";

export default function RegisterPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const {
        loading: {register: registerLoading},
        error: {register: registerError}
    } = useAppSelector((state: RootState) => state.user);

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        image: null as File | null,
        imagePreview: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setForm(prev => ({
                ...prev,
                image: file,
                imagePreview: URL.createObjectURL(file),
            }))
        }

    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.firstName || !form.email || !form.password || !form.confirmPassword) {
            toast.error('لطفاً همه فیلدها را پر کنید');
            return;
        }

        if (form.password !== form.confirmPassword) {
            toast.error('رمز عبور یکسان نیست');
            return;
        }

        const formData = new FormData();

        formData.append('firstName', form.firstName);
        formData.append('lastName', form.lastName);
        formData.append('email', form.email);
        formData.append('password', form.password);
        if (form.image) formData.append('image', form.image);

        try {
            await dispatch(registerUser(formData)).unwrap();
            router.push('/auth/login');
        } catch {
            toast.error(registerError)
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="w-20 h-20 overflow-hidden  rounded-full drop-shadow-md shadow-md m-auto relative">
                <label
                    htmlFor="profileImage"
                    className="flex items-center justify-center w-full h-full cursor-pointer"
                    title="آپلود عکس پروفایل"
                >
                    <input
                        type="file"
                        id="profileImage"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImage}
                    />
                    {form.imagePreview ? (
                        <img
                            alt="login-gif"
                            src={form?.imagePreview}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <>
                            <IoCloudUploadOutline className="text-4xl text-gray-700"/>
                            <div
                                className="h-[30%] pt-1 absolute bottom-0 w-full bg-gray-500 text-white text-center text-xs">
                                عکس
                            </div>
                        </>
                    )}

                </label>
            </div>
            <h2 className="text-xl text-center mt-2 font-bold">ثبت‌نام در سایت</h2>

            <input
                type="text"
                name="firstName"
                placeholder="نام"
                className="auth-input"
                value={form.firstName}
                onChange={handleChange}
            />
            <input
                type="text"
                name="lastName"
                placeholder="نام خانوادگی"
                className="auth-input"
                value={form.lastName}
                onChange={handleChange}
            />
            <input
                type="email"
                name="email"
                placeholder="ایمیل"
                className="auth-input"
                value={form.email}
                onChange={handleChange}
            />
            <input
                type="password"
                name="password"
                placeholder="رمز عبور"
                className="auth-input"
                value={form.password}
                onChange={handleChange}
            />
            <input
                type="password"
                name="confirmPassword"
                placeholder="تکرار رمز عبور"
                className="auth-input"
                value={form.confirmPassword}
                onChange={handleChange}
            />

            <button type="submit" className="w-full bg-red-500 text-white py-2 rounded">
                {registerLoading ? "در حال ثبت نام..." : "ثبت ‌نام"}
            </button>

            <p className="text-sm text-center">
                قبلاً ثبت‌نام کرده‌اید؟{' '}
                <a href="/auth/login" className="text-blue-600 underline">
                    ورود
                </a>
            </p>
        </form>
    );
}
