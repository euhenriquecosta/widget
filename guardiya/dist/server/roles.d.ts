export type Role = "user" | "admin" | "editor";
export declare function requireRole(role: Role, handler: any): (req: any, res: any) => Promise<any>;
export declare function hasRole(user: {
    role?: Role;
}, role: Role): boolean;
