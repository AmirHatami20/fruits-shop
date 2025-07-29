'use client';

import {useEffect, useMemo, useState} from 'react';
import {useAppDispatch, useAppSelector} from '@/redux/Hook';

import {fetchProducts} from '@/redux/slices/product';
import {fetchCategories} from '@/redux/slices/category';

import Hero from '@/components/Sections/Home/Hero';
import FreshVegetable from '@/components/Sections/Home/FreshVegetable';
import AllProduct from '@/components/Sections/Home/AllProduct';
import Spinner from '@/components/Spinner';
import {RootState} from "@/redux";

export default function HomeClient() {
    const dispatch = useAppDispatch();

    const {productList, loading: {fetch: productLoading}} = useAppSelector((state: RootState) => state.product);
    const {categoryList, loading: categoryLoading} = useAppSelector((state: RootState) => state.category);

    const [selectedCategory, setSelectedCategory] = useState<string>('');

    useEffect(() => {
        if (productList.length === 0) {
            dispatch(fetchProducts());
        }
        if (categoryList.length === 0) {
            dispatch(fetchCategories());
        }
    }, [categoryList.length, dispatch, productList.length]);


    const filteredProducts = useMemo(() => {
        if (!selectedCategory) return productList;
        return productList.filter(p => p?.category?.name?.toLowerCase() === selectedCategory.toLowerCase());
    }, [selectedCategory, productList]);

    const handleFilterProduct = (category: string) => {
        setSelectedCategory(prev => (prev === category ? '' : category));
    };

    if (productLoading || categoryLoading) {
        return <Spinner/>;
    }

    const homeCardList = productList.slice(0, 4);
    const vegetableList = productList.filter(p => p?.category?.name?.toLowerCase() === 'vegetable');

    return (
        <>
            <Hero productList={homeCardList}/>
            <FreshVegetable productList={vegetableList}/>
            <AllProduct
                productList={filteredProducts}
                categoryList={categoryList}
                handleFilterProduct={handleFilterProduct}
                filterby={selectedCategory}
            />
        </>
    );
}
