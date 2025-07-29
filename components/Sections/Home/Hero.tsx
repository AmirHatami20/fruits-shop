import {ProductType} from "@/types";
import Link from "next/link";
import {toPersianNumber} from "@/utils/helper";
import React from "react";


export default function Hero({productList}: { productList: ProductType[] }) {
    return (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-x-12 gap-y-4">
            <div className="flex flex-col space-y-3">
                <h2 className="md:text-7xl text-5xl leading-14 md:leading-28 font-bold">
                    سریع‌ترین تحویل درب {" "}
                    <span className="text-red-600">منزل شما</span>
                </h2>
                <p className="xl:text-xl text-lg leading-8 md:leading-9 mt-3">
                    ما با سرعتی باورنکردنی، محصولات تازه و باکیفیت رو مستقیم به درب منزلتون می‌رسونیم.
                    هر لحظه که بخوای، ما آماده‌ایم تا نیازت رو سریع، راحت و مطمئن برطرف کنیم.
                    تجربه‌ی یک خرید هوشمند، آسون و لذت‌بخش با ما آغاز میشه!
                </p>
                <button className="xl:text-lg font-bold bg-red-500 text-white px-4 py-2 rounded-md w-max">
                    ثبت سفارش
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-5 justify-center md:mt-0 mt-5">
                {productList.map((product) => (
                    <HeroCart
                        key={product._id}
                        {...product}
                    />
                ))}
            </div>
        </div>
    );
}

const HeroCart = (props: ProductType) => {
    return (
        <div
            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col justify-between"
        >
            <Link
                href={`/product/${props._id}`}
                onClick={() => window.scrollTo({top: 0, behavior: "smooth"})}
                className="flex flex-col items-center space-y-2"
            >
                <div className="w-full h-36 bg-gray-100 border border-gray-200 rounded-lg overflow-hidden">
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
        </div>
    )
}