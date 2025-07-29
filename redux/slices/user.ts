import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axiosInstance from '@/utils/axiosInstance';
import {API_PATHS} from '@/utils/apiPaths';
import {UserLoginInput, UserType, ErrorResponse} from '@/types';
import {toast} from 'react-toastify';

// ==== User State ====
interface UserState {
    user: UserType | null;
    token: string | null;
    loading: {
        login: boolean;
        register: boolean;
    };
    error: {
        login: string;
        register: string;
    };
}

// Load from LocalStorage
const loadUserFromStorage = (): { user: UserType | null; token: string | null } => {
    if (typeof window === 'undefined') return {user: null, token: null};
    try {
        const user = JSON.parse(localStorage.getItem('user') || 'null');
        const token = localStorage.getItem('token');
        return {user, token};
    } catch {
        return {user: null, token: null};
    }
};

const stored = loadUserFromStorage();

const initialState: UserState = {
    user: stored.user,
    token: stored.token,
    loading: {
        login: false,
        register: false,
    },
    error: {
        login: '',
        register: '',
    },
};

// Login User
export const loginUser = createAsyncThunk<
    { user: UserType; token: string },
    UserLoginInput,
    { rejectValue: string }
>('user/login', async (payload, {rejectWithValue}) => {
    try {
        const res = await axiosInstance.post(API_PATHS.AUTH.LOGIN, payload);
        return res.data;
    } catch (err: unknown) {
        const error = err as ErrorResponse;
        const message = error.response?.data?.message || 'خطای ورود';
        return rejectWithValue(message);
    }
});

// Register User
export const registerUser = createAsyncThunk<
    void,
    FormData,
    { rejectValue: string }
>('user/register', async (formData, {rejectWithValue}) => {
    try {
        await axiosInstance.post(API_PATHS.AUTH.SIGNUP, formData, {
            headers: {'Content-Type': 'multipart/form-data'},
        });
    } catch (err: unknown) {
        const error = err as ErrorResponse;
        const message = error.response?.data?.message || 'خطای ثبت‌نام';
        return rejectWithValue(message);
    }
});

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserFromStorage: (state, action: PayloadAction<UserType>) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.error = {login: '', register: ''};
            if (typeof window !== 'undefined') {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            }
            toast.info('از حساب خارج شدید');
        },
        clearUserErrors: (state) => {
            state.error = {login: '', register: ''};
        }
    },
    extraReducers: (builder) => {
        // === Login ===
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading.login = true;
                state.error.login = '';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading.login = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                if (typeof window !== 'undefined') {
                    localStorage.setItem('user', JSON.stringify(state.user));
                    localStorage.setItem('token', state.token);
                }
                toast.success('ورود با موفقیت انجام شد');
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading.login = false;
                state.error.login = action.payload || 'خطای ورود';
            });

        // === Register ===
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading.register = true;
                state.error.register = '';
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.loading.register = false;
                toast.success('ثبت‌نام با موفقیت انجام شد');
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading.register = false;
                state.error.register = action.payload || 'خطای ثبت‌نام';
            });
    },
});

export const {logout, setUserFromStorage, clearUserErrors} = userSlice.actions;
export default userSlice.reducer;
