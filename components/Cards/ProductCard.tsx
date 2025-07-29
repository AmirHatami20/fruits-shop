import React from 'react';
import {useDispatch} from "react-redux";
import {addCartItem} from "@/redux/slices/product";
import {toPersianNumber} from "@/utils/helper";
import {ProductType} from "@/types";
import Link from "next/link";

function ProductCard(props: ProductType) {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        const product: ProductType = {
            _id: props._id,
            name: props.name,
            price: props.price,
            category: props.category,
            image: props.image,
            description: props.description,
        }
        dispatch(addCartItem(product));
    };

    return (
        <div
            className="bg-white m-0.5 shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col justify-between"
        >
            <Link
                href={`/product/${props._id}`}
                onClick={() => window.scrollTo({top: 0, behavior: "smooth"})}
                className="flex flex-col items-center space-y-2"
            >
                <div className="w-full h-48 bg-gray-100 border border-gray-200 rounded-lg overflow-hidden">
                    <img
                        src={props.image}
                        alt="product"
                        className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                    />
                </div>

                <div className="text-center mt-2">
                    <h3 className="font-semibold text-slate-700 text-base md:text-lg capitalize">
                        {props.name}
                    </h3>
                    <p className="text-slate-500 text-sm md:text-base">
                        {props.category.title}
                    </p>
                    <p className="font-bold text-slate-800 mt-1">
                        <span className="text-gray-500">کیلو: </span>
                         {toPersianNumber(props.price)}{" "}
                        <span className="text-red-500">تومان</span>
                    </p>
                </div>
            </Link>
            <button
                onClick={handleAddToCart}
                className="w-full bg-amber-400 hover:bg-amber-500 text-slate-800 font-semibold rounded-lg py-2 mt-4 transition-all duration-300"
            >
                افزودن به سبد خرید
            </button>
        </div>
    );
}

export default ProductCard;
