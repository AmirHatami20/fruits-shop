export const API_PATHS = {
    AUTH: {
        SIGNUP: "/api/auth/register",
        LOGIN: "/api/auth/login",
        GET_USER_INFO: "/auth/me",
    },
    PRODUCT: {
        CREATE_PRODUCT: "/api/product",
        GET_ALL_PRODUCT: "/api/product",
        GET_BY_ID: (id: string) => `/api/product/${id}`
    },
    CATEGORY: {
        CREATE_CATEGORY: "/api/category",
        GET_ALL_CATEGORY: "/api/category",
    }
}