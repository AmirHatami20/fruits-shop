import {Swiper, SwiperSlide} from "swiper/react";
import {Swiper as SwiperType} from 'swiper';
import {Navigation, Pagination} from "swiper/modules";
import {GrNext, GrPrevious} from "react-icons/gr";
import {useEffect, useRef} from "react";
import {ProductType} from "@/types";
import ProductCard from "@/components/Cards/ProductCard";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Props {
    title: string;
    items: ProductType[];
}

function SwiperWrapper({title, items}: Props) {
    const prevBtnRef = useRef<HTMLButtonElement>(null);
    const nextBtnRef = useRef<HTMLButtonElement>(null);
    const swiperRef = useRef<SwiperType | null>(null);

    useEffect(() => {
        if (
            swiperRef.current &&
            swiperRef.current.params &&
            typeof swiperRef.current.params.navigation === 'object' &&
            swiperRef.current.navigation &&
            prevBtnRef.current &&
            nextBtnRef.current
        ) {
            swiperRef.current.params.navigation.prevEl = prevBtnRef.current;
            swiperRef.current.params.navigation.nextEl = nextBtnRef.current;
            swiperRef.current.navigation.init();
            swiperRef.current.navigation.update();
        }
    }, []);

    return (
        <div className="md:my-8 my-4">
            <div className="flex justify-between items-center w-full">
                <h2 className="font-bold tracking-wide text-slate-800 xl:text-2xl text-lg">
                    {title}
                </h2>
                <div className="flex gap-3">
                    <button
                        ref={nextBtnRef}
                        className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded "
                    >
                        <GrNext/>
                    </button>
                    <button
                        ref={prevBtnRef}
                        className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"
                    >
                        <GrPrevious/>
                    </button>
                </div>
            </div>
            <div className="md:mt-5 mt-3">
                {items.length ? (
                    <Swiper
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                            },
                            480: {
                                slidesPerView: 2,
                            },
                            800: {
                                slidesPerView: 3,
                            },
                            1000: {
                                slidesPerView: 4,
                            },
                            1280: {
                                slidesPerView: 5,
                            },
                            1700: {
                                slidesPerView: 6,
                            },
                        }}
                        modules={[Pagination, Navigation]}
                        spaceBetween={15}
                    >
                        {items.map((product) => (
                            <SwiperSlide key={product._id}>
                                <ProductCard {...product} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div className="text-center text-red-500 my-10">
                        محصولی یافت نشد.
                    </div>
                )}
            </div>
        </div>
    );
}

export default SwiperWrapper;
