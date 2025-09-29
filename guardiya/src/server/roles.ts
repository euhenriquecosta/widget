import { verify } from "jsonwebtoken";

export type Role = "user" | "admin" | "editor";

export function requireRole(role: Role, handler: any) {
  return async (req: any, res: any) => {
    try {
      const token = req.cookies["auth_token"];
      if (!token) throw new Error("No token");

      const user: any = verify(token, process.env.JWT_SECRET || "");
      if (user.role !== role) throw new Error("Forbidden");

      req.user = user;
      return handler(req, res);
    } catch {
      res.status(403).json({ message: "Forbidden" });
    }
  };
}

export function hasRole(user: { role?: Role }, role: Role) {
  return user.role === role;
}
