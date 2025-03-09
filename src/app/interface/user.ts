export interface User {
    id: number;
    username: string;
    email: string;
    phone?: string;
    picture?: string;
    enabled: boolean;
    notLocked: boolean;
    usingMfa: boolean;
    role: string;
}