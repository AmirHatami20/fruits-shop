import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';
import axiosInstance from '@/utils/axiosInstance';
import {API_PATHS} from '@/utils/apiPaths';
import {CartItemType, ErrorResponse, ProductType} from '@/types';

interface ProductState {
    productList: ProductType[];
    selectedProduct: ProductType | null;
    cartItem: CartItemType[];
    loading: {
        fetch: boolean;
        fetchOne: boolean;
        create: boolean;
    };
    error: string | null;
}


// async thunk products
export const fetchProducts = createAsyncThunk<ProductType[]>(
    'product/fetchProducts',
    async () => {
        const response = await axiosInstance.get(API_PATHS.PRODUCT.GET_ALL_PRODUCT);
        return response.data;
    }
);

export const fetchProductById = createAsyncThunk<ProductType, string, { rejectValue: string }>(
    'product/fetchProductById',
    async (id, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.get(API_PATHS.PRODUCT.GET_BY_ID(id));
            return response.data;
        } catch (err: unknown) {
            const error = err as ErrorResponse;
            return rejectWithValue(error?.response?.data?.message || 'مشکلی پیش آمده است.');
        }
    }
)

export const createProduct = createAsyncThunk<ProductType, FormData, { rejectValue: string }>(
    'product/createProduct',
    async (formData, {rejectWithValue}) => {
        try {
            const res = await axiosInstance.post(API_PATHS.PRODUCT.CREATE_PRODUCT, formData, {
                headers: {'Content-Type': 'multipart/form-data'},
            });
            return res.data;
        } catch (err: unknown) {
            const error = err as ErrorResponse;
            return rejectWithValue(error?.response?.data?.message || 'خطا در ساخت محصول');
        }
    }
);


// Load cart from localStorage
const getStoredCart = (): CartItemType[] => {
    if (typeof window === 'undefined') return [];
    try {
        return JSON.parse(localStorage.getItem('cartItem') || '[]');
    } catch {
        return [];
    }
};

// add cart products to localStorage
const updateLocalStorage = (cartItem: CartItemType[]) => {
    localStorage.setItem('cartItem', JSON.stringify(cartItem));
};

// initial state
const initialState: ProductState = {
    productList: [],
    selectedProduct: null,
    cartItem: getStoredCart(),
    loading: {
        fetch: true,
        fetchOne: true,
        create: false,
    },
    error: null,
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setDataProduct: (state, action: PayloadAction<ProductType[]>) => {
            state.productList = action.payload;
        },
        addCartItem: (state, action: PayloadAction<ProductType>) => {
            const alreadyExists = state.cartItem.some(item => item._id === action.payload._id);
            if (alreadyExists) {
                toast.error('قبلاً به سبد اضافه شده');
                return;
            }

            const price = Number(action.payload.price);
            const newItem: CartItemType = {...action.payload, qty: 1, total: price};
            state.cartItem.push(newItem);
            updateLocalStorage(state.cartItem);
            toast.success('محصول با موفقیت اضافه شد');
        },
        deleteCartItem: (state, action: PayloadAction<string>) => {
            state.cartItem = state.cartItem.filter(item => item._id !== action.payload);
            updateLocalStorage(state.cartItem);
            toast.success('یک محصول حذف شد');
        },
        increaseQty: (state, action: PayloadAction<string>) => {
            const item = state.cartItem.find(p => p._id === action.payload);
            if (item) {
                item.qty += 1;
                item.total = item.qty * Number(item.price);
                updateLocalStorage(state.cartItem);
            }
        },
        decreaseQty: (state, action: PayloadAction<string>) => {
            const item = state.cartItem.find(p => p._id === action.payload);
            if (item) {
                if (item.qty > 1) {
                    item.qty -= 1;
                    item.total = item.qty * Number(item.price);
                    updateLocalStorage(state.cartItem);
                } else {
                    toast.warn('حداقل تعداد 1 است');
                }
            }
        },
        clearCart: (state) => {
            state.cartItem = [];
            updateLocalStorage([]);
            toast('سبد خرید پاک شد');
        },
    },
    extraReducers: (builder) => {
        // Fetch All
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading.fetch = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<ProductType[]>) => {
                state.loading.fetch = false;
                state.productList = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading.fetch = false;
                state.error = action.error.message || 'خطا در دریافت اطلاعات';
                toast.error(`خطا در دریافت محصولات: ${action.error.message}`);
            });
        // Fetch One
        builder
            .addCase(fetchProductById.pending, (state) => {
                state.loading.fetchOne = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<ProductType>) => {
                state.loading.fetchOne = false;
                state.selectedProduct = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading.create = false;
                state.error = action.payload as string;
                toast.error(state.error);
            });
        // Create
        builder
            .addCase(createProduct.pending, (state) => {
                state.loading.create = true;
                state.error = null;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading.create = false;
                toast.success('محصول با موفقیت اضافه شد!');
                state.productList.push(action.payload);
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading.create = false;
                state.error = action.payload as string;
                toast.error(state.error);
            });
    },
});

export const {
    setDataProduct,
    addCartItem,
    deleteCartItem,
    increaseQty,
    decreaseQty,
    clearCart,
} = productSlice.actions;

export default productSlice.reducer;
