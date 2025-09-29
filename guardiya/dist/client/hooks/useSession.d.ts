export declare function useSession(): {
    user: any;
    loading: boolean;
    error: any;
    refresh: import("swr").KeyedMutator<any>;
};
