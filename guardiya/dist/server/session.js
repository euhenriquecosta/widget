import { serialize } from "cookie";
export function setSessionCookie(res, token) {
    const cookie = serialize("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60, // 1 hora
        path: "/",
    });
    res.setHeader("Set-Cookie", cookie);
}
export function clearSessionCookie(res) {
    const cookie = serialize("auth_token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        expires: new Date(0),
        path: "/",
    });
    res.setHeader("Set-Cookie", cookie);
}
