import { DataState } from "../enum/datastate.enum";
import { Events } from "./event";
import { Role } from "./role";
import { User } from "./user";

export interface LoginState {
    dataState: DataState;
    loginSuccess?: boolean;
    error?: string;
    message?: string;
    isUsingMfa?: boolean;
    phone?: string;
}

export interface CustomHttpResponse<T> {
    timestamp: Date;
    statusCode: number;
    status: string;
    message: string;
    reason?: string;
    developerMessage?: string;
    data?: T;
}

export interface Profile {
    user: User;
    events?: Events[];
    role?: Role;
    access_token?: string;
    refresh_token?: string;
}

export interface Page {
    content: User[];
    totalPages: number;
    totalElements: number;
    numberOfElements: number;
    size: number;
    number: number;
}

export interface RegisterState {
    dataState: DataState;
    registerSuccess?: boolean;
    error?: string;
    message?: string;
}

export type AccountType = 'account' | 'password';

export interface VerifySate {
    dataState: DataState;
    verifySuccess?: boolean;
    error?: string;
    message?: string;
    title?: string;
    type?: AccountType;
}