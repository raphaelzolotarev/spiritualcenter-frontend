export interface User {
    id: number;
    username: string;
    email: string;
    phone?: string;
    imageUrl?: string;
    enabled: boolean;
    isNotLocked: boolean;
    usingMfa: boolean;
    role: string;
}