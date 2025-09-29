A Guardiya é uma biblioteca Brasileira para simplicidade em gerenciar autenticação no Nextjs com credentials
usando o Prisma;

para implementar siga o passo a passo 

crie uma pasta lib na raiz do projeto Nextjs 15
se já houver crie um arquivo chamado auth.ts

// lib/auth.ts
import { createAuth } from "guardiya/server";
import { prisma } from "@/lib/prisma";
export const auth = createAuth({
  findUserById: async (id: string | number): Promise<any | null> => {
    const user = await prisma.user.findUnique({ where: { id: id as string} });
    return user;
  },
  findUserByEmail: async (email: string): Promise<any | null> => {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  },
});


Vale ressaltar que o prisma é uma dependência necessária para o consumo da biblioteca


lib/prisma.ts
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();


rota de registro no nextjs app/api/register/route.ts

import { prisma } from "../../../lib/prisma";
import argon2 from "argon2";

export async function POST(req: Request) {
  try {
    const { email, password, name, last } = await req.json();

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) throw new Error("Email já cadastrado");

    const passwordHash = await argon2.hash(password);

    const user = await prisma.user.create({
      data: { email, passwordHash: passwordHash, name, role: "user", last: last },
    });

    const { passwordHash: _, ...safeUser } = user;

    return new Response(JSON.stringify(safeUser), { status: 201 });
  } catch (err: any) {
    console.error(err);
    return new Response(JSON.stringify({ message: err.message }), { status: 400 });
  }
}

para as dependências: 
package.json
{
  "name": "teste-login",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build --turbopack",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "@prisma/client": "^6.16.2",
    "argon2": "^0.44.0",
    "cookie": "^1.0.2",
    "guardiya": "^1.3.11",
    "jsonwebtoken": "^9.0.2",
    "next": "15.5.4",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "swr": "^2.3.6"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "15.5.4",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}


crie a rota de login na api/login/route.ts

// app/api/auth/route.ts
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const { cookie, user } = await auth.login(email, password);
    
    console.log(user);
    return new Response(JSON.stringify(user), {
      status: 200,
      headers: {
        "Set-Cookie": cookie,
        "Content-Type": "application/json",
      },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ message: err.message }), { status: 401 });
  }
}


Explicação sobre o meHandlerAppRouter
Esse metódo serve para acessar dados personalizados do usuário em nível de client-side

exemplo de implementação: 

rota app/api/auth/route.ts

import { prisma } from "@/lib/prisma";
import { meHandlerAppRouter } from "guardiya/server";
export async function GET(req: Request) {
  // Passamos a função para buscar o usuário pelo ID
  return meHandlerAppRouter(req, async (id) =>
    prisma.user.findUnique({
      where: { id:id as string},
      select: { id: true, email:true, role: true, name: true, passwordHash: true },
    })
  );
}

forma de implementação client-side com o hook useSession
"use client"
import { useSession } from "guardiya/client";
export default function Dashboard() {
  const { user } = useSession();



  return <div>sdfsdf {user?.email}</div>;
}





TESTE 1
19:24 28/09/2025

22:09
00:31

TESTE 2 (Versão funcional)




Versão server-side sem delays melhor performance não precisa setar na route me que parametros deseja obter

Rota protegida server side
export default async function Dashboard() {
  const cookieStore = await cookies(); // ✅ await
  const token = cookieStore.get("auth_token")?.value ?? null;
  const { user, message } = await auth.getUserFromCookie(token);
  console.log(token)
  console.log("usuário: ", user, "mensagem: ", message)
  if (!user) return redirect("/login");

  return (
    <div>
      <h1>Bem-vindo, {user.email}</h1>
      {user.role && <p>Papel: {user.name}</p>}
      {children}    
    </div>
 );
}



Pagina de Login

"use client";
import { useAuth } from "guardiya/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4 max-w-sm mx-auto">
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
}


