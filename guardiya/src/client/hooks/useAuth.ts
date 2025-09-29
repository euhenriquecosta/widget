export function useAuth() {
  const login = async (email: string, password: string) =>
    fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    }).then(res => res.json());

  const logout = async () =>
    fetch("/api/logout", { method: "POST", credentials: "include" });

  return { login, logout };
}
