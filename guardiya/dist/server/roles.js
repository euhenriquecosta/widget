import { verify } from "jsonwebtoken";
export function requireRole(role, handler) {
    return async (req, res) => {
        try {
            const token = req.cookies["auth_token"];
            if (!token)
                throw new Error("No token");
            const user = verify(token, process.env.JWT_SECRET || "");
            if (user.role !== role)
                throw new Error("Forbidden");
            req.user = user;
            return handler(req, res);
        }
        catch {
            res.status(403).json({ message: "Forbidden" });
        }
    };
}
export function hasRole(user, role) {
    return user.role === role;
}
