import argon2 from "argon2";
import { sign, verify } from "jsonwebtoken";
import { serialize, parse } from "cookie";

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

// Helpers para cookies
function setSessionCookie(token: string) {
  return serialize("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60, // 1 hora
    path: "/",
  });
}

function clearSessionCookie() {
  return serialize("auth_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0),
    path: "/",
  });
}

export function createAuth(userProvider: UserProvider) {
  return {
    // login agora retorna cookie + user
    login: async (email: string, password: string): Promise<{ cookie: string; user: Omit<UserType, "passwordHash"> }> => {
      const user = await userProvider.findUserByEmail(email);
      if (!user) throw new Error("Invalid credentials");

      const valid = await argon2.verify(user.passwordHash, password);
      if (!valid) throw new Error("Invalid credentials");

      const token = sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: "15m" }
      );

      const cookie = setSessionCookie(token);
      const { passwordHash, ...safeUser } = user;

      return { cookie, user: safeUser };
    },

  

    // logout retorna cookie pronto para setar
    logout: async (): Promise<{ cookie: string; message: string }> => {
      const cookie = clearSessionCookie();
      return { cookie, message: "Logged out" };
    },
    getUserFromCookie: async (
      token: string | null
    ): Promise<{ user: Omit<UserType, "passwordHash"> | null; message: string }> => {
      if (!token) return { user: null, message: "No cookie provided" };

      const JWT_SECRET = process.env.JWT_SECRET;
      if (!JWT_SECRET) throw new Error("JWT_SECRET not defined");

      try {
        // decodifica o token que veio do cookie
        const decoded = verify(token, JWT_SECRET) as { id: string; role?: string };

        // busca usuário pelo ID do token
        const user = await userProvider.findUserById(decoded.id);
        if (!user) return { user: null, message: "User not found" };

        const { passwordHash, ...safeUser } = user;
        return { user: safeUser, message: "User retrieved successfully" };
      } catch (err) {
        return { user: null, message: "Invalid token" };
      }
    }
    


  };



}


