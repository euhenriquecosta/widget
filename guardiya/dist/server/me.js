import { verify } from "jsonwebtoken";
export async function meHandlerAppRouter(req, findUserById) {
    try {
        const cookieHeader = req.headers.get("cookie") || "";
        const match = cookieHeader.match(/auth_token=([^;]+)/);
        if (!match)
            throw new Error("No token");
        const token = match[1];
        const decoded = verify(token, process.env.JWT_SECRET || "");
        const user = await findUserById(decoded.id);
        if (!user)
            return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
        const { passwordHash, ...safeUser } = user;
        return new Response(JSON.stringify(safeUser), { status: 200 });
    }
    catch {
        return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }
}
