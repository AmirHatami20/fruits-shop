// --- Product ---
export interface ProductType {
    _id: string;
    name: string;
    category: CategoryType;
    image: string;
    price: number;
    description: string;
}

export interface CartItemType extends ProductType {
    qty: number;
    total: number;
}

// --- Category ---
export interface CategoryType {
    _id?: string;
    title: string;
    name: string;
}

// --- User ---
export interface UserType {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    image?: string;
}

export interface UserRegisterInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    image?: string;
}

export interface UserLoginInput {
    email: string;
    password: string;
}

export interface UserCreateInput extends UserRegisterInput {
    passwordConfirm: string;
}

export interface JwtPayload {
    _id: string;
    email: string;
    name: string;
}

// --- Error ---
export interface ErrorResponse {
    response?: {
        data?: {
            message?: string;
        };
    };
}