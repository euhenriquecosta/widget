export type UserType = {
    id: string | number;
    email: string;
    role?: string;
    passwordHash: string;
    [key: string]: any;
};
export type UserProvider = {
    findUserByEmail: (email: string) => Promise<UserType | null>;
    findUserById: (id: string | number) => Promise<UserType | null>;
};
export declare function createAuth(userProvider: UserProvider): {
    login: (email: string, password: string) => Promise<{
        cookie: string;
        user: Omit<UserType, "passwordHash">;
    }>;
    logout: () => Promise<{
        cookie: string;
        message: string;
    }>;
    getUserFromCookie: (token: string | null) => Promise<{
        user: Omit<UserType, "passwordHash"> | null;
        message: string;
    }>;
};
