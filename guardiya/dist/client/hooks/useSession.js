import useSWR from "swr";
const fetcher = (url) => fetch(url, { credentials: "include" }).then(res => res.json());
export function useSession() {
    const { data, error, mutate } = useSWR("/api/me", fetcher);
    return {
        user: data,
        loading: !data && !error,
        error,
        refresh: mutate,
    };
}
