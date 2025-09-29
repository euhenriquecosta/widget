export declare function useAuth(): {
    login: (email: string, password: string) => Promise<any>;
    logout: () => Promise<Response>;
};
