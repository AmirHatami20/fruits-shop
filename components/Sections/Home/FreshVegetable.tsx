import React from 'react';
import SwiperWrapper from "@/components/SwiperWrapper";
import {ProductType} from "@/types";

function FreshVegetable({productList}: { productList: ProductType[]}) {
    return (
        <SwiperWrapper
            items={productList}
            title="سبزیجات تازه"
        />
    );
}

export default FreshVegetable;