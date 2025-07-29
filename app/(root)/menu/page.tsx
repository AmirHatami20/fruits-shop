'use client'

import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "@/redux/Hook";
import {RootState} from "@/redux";
import Spinner from "@/components/Spinner";
import {fetchProducts} from "@/redux/slices/product";
import {fetchCategories} from "@/redux/slices/category";
import SwiperWrapper from "@/components/SwiperWrapper";

export default function Page() {
    const {productList, loading: {fetch: productLoading}} = useAppSelector((state: RootState) => state.product);
    const {categoryList, loading: categoryLoading} = useAppSelector((state: RootState) => state.category)
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (productList.length === 0) {
            dispatch(fetchProducts());
        }
        if (categoryList.length === 0) {
            dispatch(fetchCategories());
        }
    }, [categoryList.length, dispatch, productList.length]);

    if (productLoading || categoryLoading) return <Spinner/>

    return (
        <div>
            {categoryList.map((category) => {
                const relatedProduct = productList.filter((product) => product.category._id === category._id);
                return (
                    <SwiperWrapper
                        key={category._id}
                        title={category.title}
                        items={relatedProduct}
                    />
                )
            })}
        </div>
    );
}
