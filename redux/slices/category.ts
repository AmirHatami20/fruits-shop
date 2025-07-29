import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";
import {API_PATHS} from "@/utils/apiPaths";
import {CategoryType} from "@/types";

interface CategoryState {
    categoryList: CategoryType[];
    loading: boolean;
}

// async thunk categories
export const fetchCategories = createAsyncThunk<CategoryType[]>(
    'categories/fetchCategories',
    async () => {
        const res = await axiosInstance.get(API_PATHS.CATEGORY.GET_ALL_CATEGORY)
        return res.data;
    }
)

const initialState: CategoryState = {
    categoryList: [],
    loading: true
};

export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        setDataCategory: (state, action: PayloadAction<CategoryType[]>) => {
            state.categoryList = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchCategories.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchCategories.fulfilled, (state, action: PayloadAction<CategoryType[]>) => {
            state.loading = false
            state.categoryList = action.payload;
        })
    }
})

export const {setDataCategory} = categorySlice.actions;
export default categorySlice.reducer;