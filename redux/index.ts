import {configureStore} from '@reduxjs/toolkit';
import productReducer from '@/redux/slices/product';
import categoryReducer from '@/redux/slices/category';
import userReducer from '@/redux/slices/user';

export const store = configureStore({
    reducer: {
        product: productReducer,
        category: categoryReducer,
        user: userReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
