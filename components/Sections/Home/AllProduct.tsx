import React from 'react';
import ProductCard from "@/components/Cards/ProductCard";
import FilterProduct from "@/components/FilterProduct";
import {CategoryType, ProductType} from "@/types";

interface Props {
    categoryList: CategoryType[];
    productList: ProductType[];
    handleFilterProduct: (categoryName: string) => void;
    filterby: string;
}

function AllProduct({categoryList, productList, handleFilterProduct, filterby}: Props) {
    return (
        <div className="md:my-12 my-6">
            <h2 className="font-bold tracking-wide text-slate-800 xl:text-2xl text-lg">
                تمام محصولات
            </h2>

            {/* فیلتر دسته‌بندی */}
            <div className="flex flex-wrap justify-center gap-5 mt-4">
                {categoryList.length ? (
                    categoryList.map((category) => (
                        <FilterProduct
                            key={category._id}
                            category={category.title}
                            onClick={() =>
                                handleFilterProduct(category.name?.toLowerCase() || "")
                            }
                            isActive={
                                (category.name || "").toLowerCase() ===
                                (filterby || "").toLowerCase()
                            }
                        />
                    ))
                ) : (
                    <div className="text-lg w-full min-h-40 flex items-center justify-center">
                        در حال بارگذاری دسته‌بندی‌ها...
                    </div>
                )}
            </div>

            {/* لیست محصولات */}
            {productList.length ? (
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:mt-8 mt-5">
                    {productList.map((product) => (
                        <ProductCard key={product._id} {...product} />
                    ))}
                </div>
            ) : (
                <div className="text-center text-red-500 mt-5">
                    محصولی یافت نشد.
                </div>
            )}
        </div>
    );
}

export default AllProduct;
