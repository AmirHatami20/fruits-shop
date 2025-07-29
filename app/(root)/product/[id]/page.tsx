'use client'

import React, {useEffect, useMemo} from 'react';
import {useAppDispatch, useAppSelector} from "@/redux/Hook";
import {RootState} from "@/redux";
import {useParams, useRouter} from "next/navigation";
import Spinner from "@/components/Spinner";
import {addCartItem, fetchProductById, fetchProducts} from "@/redux/slices/product";
import SwiperWrapper from "@/components/SwiperWrapper";
import {toPersianNumber} from "@/utils/helper";

export default function ProductPage() {
    const {id} = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const router = useRouter();

    const {selectedProduct, productList, loading} = useAppSelector((state: RootState) => state.product);

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(id));
        }
        if (productList.length === 0) {
            dispatch(fetchProducts());
        }
    }, [dispatch, id, productList.length]);

    const relatedProducts = useMemo(() => {
        if (!selectedProduct) return [];
        return productList.filter(product => product.category._id === selectedProduct.category._id);
    }, [selectedProduct, productList]);

    const handlePurchase = () => {
        if (!selectedProduct) return;
        dispatch(addCartItem(selectedProduct));
        router.push("/cart");
    };

    const handleAddToCart = () => {
        if (!selectedProduct) return;
        dispatch(addCartItem(selectedProduct));
    };

    if (loading.fetchOne || loading.fetch) return <Spinner/>;

    if (!selectedProduct) {
        return <div className="text-center text-3xl text-red-500 mt-16">محصول پیدا نشد</div>;
    }

    return (
        <>
            <div className="bg-white mx-auto md:w-2/3 w-full">
                <div className="p-3 grid md:grid-cols-2 grid-cols-1 gap-x-6">
                    <div className="h-70 w-full bg-gray-100">
                        <img
                            className="w-full h-full hover:scale-105 transition-all object-contain"
                            src={selectedProduct.image}
                            alt={selectedProduct.name}
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <h3 className="font-semibold text-slate-600 capitalize text-2xl md:text-4xl">
                            {selectedProduct.name}
                        </h3>
                        <p className="text-slate-500 font-medium text-2xl">
                            {selectedProduct.category.title}
                        </p>
                        <p className="font-bold md:text-2xl">
                            <span className="text-gray-500">کیلو: </span>
                            <span>{toPersianNumber(selectedProduct.price)}{" "}</span>
                            <span className="text-red-500 ">تومان</span>
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={handlePurchase}
                                className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 px-3"
                            >
                                خرید
                            </button>
                            <button
                                onClick={handleAddToCart}
                                className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 px-3"
                            >
                                افزودن به سبد
                            </button>
                        </div>
                        <div>
                            <p className="text-slate-600 font-medium">توضیحات :</p>
                            <p className="line-clamp-3 mt-2">{selectedProduct.description}</p>
                        </div>
                    </div>
                </div>
            </div>

            <SwiperWrapper
                items={relatedProducts}
                title="محصولات مرتبط"
            />
        </>
    );
}
