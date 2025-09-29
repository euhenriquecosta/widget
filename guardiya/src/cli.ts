#!/usr/bin/env node
import { program } from "commander";
import { exec, execSync } from "child_process";
import { mkdirSync, writeFileSync, existsSync, readFileSync, appendFileSync, rmdirSync, unlinkSync } from "fs";
import { join } from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import terminalImage from "terminal-image";
import { randomBytes } from "crypto";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Função para criar arquivos
function createFile(path: string, content: string) {
  if (existsSync(path)) {
    console.log(`⚠️  ${path} já existe, pulando...`);
    return;
  }
  mkdirSync(join(path, ".."), { recursive: true });
  writeFileSync(path, content, "utf8");
  console.log(`✅ Criado: ${path}`);
}



function deleteFile(path: string) {
  if (existsSync(path)) {
    unlinkSync(path);
    console.log(`🗑️  Deletado: ${path}`);
  } else {
    console.log(`⚠️  Arquivo não existe: ${path}`);
  }
}

function deleteFolder(path: string) {
  if (existsSync(path)) {
    rmdirSync(path, { recursive: true });
    console.log(`🗑️  Pasta deletada: ${path}`);
  } else {
    console.log(`⚠️  Pasta não existe: ${path}`);
  }
}
// Função para exibir a bandeira da Rússia no terminal
async function printRussianFlag() {
  try {
    const imagePath = join(__dirname, "../flags/ru.png");
    const image = fs.readFileSync(imagePath);
    console.log(await terminalImage.buffer(image));
  } catch (err) {
    console.error("❌ Não foi possível mostrar a bandeira da Rússia:", err);
  }
}

function ensureJwtSecret() {
  const envPath = join(process.cwd(), ".env");
  let envContent = "";

  if (existsSync(envPath)) {
    envContent = readFileSync(envPath, "utf-8");
  }

  // Verifica se já existe JWT_SECRET
  const hasJwt = envContent.match(/^JWT_SECRET\s*=/m);

  if (hasJwt) {
    console.log("⚠️  JWT_SECRET já existe no .env, pulando...");
    return;
  }

  // Gera JWT secret segura de até 350 caracteres
  const jwtSecret = randomBytes(175).toString("hex");

  // Se o arquivo já existe, adiciona no final; se não, cria do zero
  envContent += `\nJWT_SECRET=${jwtSecret}\n`;

  writeFileSync(envPath, envContent.trim(), "utf-8");
  console.log("✅ JWT_SECRET adicionado ao .env!");
}


// Função que gera o boilerplate
async function setupBoilerplate() {
  console.log("🚀 Criando boilerplate Guardiya...");
  createFile(
    join(process.cwd(), "app/api/logout/route.ts"), `
      import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  const { cookie } = await auth.logout();

  return new Response(JSON.stringify({ message: "Logged out" }), {
    status: 200,
    headers: {
      "Set-Cookie": cookie,
      "Content-Type": "application/json",
    },
  });
}
`)
//app/dashboard/page.tsx
createFile(
  join(process.cwd(), "app/dashboard/page.tsx"), `
  export default function Dashboard() {
    return (
      <div>
        <h1>Dashboard</h1>
      </div>
    );
  }
  `)
  //logout_button
  createFile(
    join(process.cwd(), "components/LogoutButton.tsx"), `
    // components/LogoutButton.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/logout", {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Erro ao deslogar");
        setLoading(false);
        return;
      }

      console.log(data.message); // "Logged out"
      router.push("/login"); // redireciona para login
    } catch (err: any) {
      setError(err.message || "Erro inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <button
        onClick={handleLogout}
        disabled={loading}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition disabled:opacity-50"
      >
        {loading ? "Saindo..." : "Logout"}
      </button>
    </div>
  );
}
`
  )
  //register/page.tsx
  createFile(
    join(process.cwd(), "app/register/page.tsx"), `
    // app/register/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Erro ao registrar");
        setLoading(false);
        return;
      }

      console.log("Usuário registrado:", data);
      router.push("/login"); // redireciona para login após registro
    } catch (err: any) {
      setError(err.message || "Erro inesperado");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-500">
      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Registrar</h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          


          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 transition disabled:opacity-50"
          >
            {loading ? "Registrando..." : "Registrar"}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-500">
          Já tem conta?{" "}
          <a href="/login" className="text-green-500 hover:underline">
            Entrar
          </a>
        </p>
      </div>
    </div>
  );
}
`);

  // login/page.tsx
  createFile(
    join(process.cwd(), "app/login/page.tsx"),
    `"use client";
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
}`
  );

  // lib/auth.ts
  createFile(
    join(process.cwd(), "lib/auth.ts"),
    `import { createAuth } from "guardiya/server";
import { prisma } from "@/lib/prisma";

export const auth = createAuth({
  findUserById: async (id: string | number) => {
    return prisma.user.findUnique({ where: { id: id as string } });
  },
  findUserByEmail: async (email: string) => {
    return prisma.user.findUnique({ where: { email } });
  },
});`
  );

  // app/dashboard/layout.tsx
  createFile(
    join(process.cwd(), "app/dashboard/layout.tsx"), `
    
          import {cookies} from "next/headers"
import {auth} from "@/lib/auth"
import { redirect } from "next/navigation";
export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies(); // ✅ await
  const token = cookieStore.get("auth_token")?.value ?? null;
  const { user, message } = await auth.getUserFromCookie(token);
  console.log(token)
  console.log("usuário: ", user, "mensagem: ", message)
  if (!user) return redirect("/login");

  return (
    <div>
      {children}
    </div>
        
 
  );
}



`)

//app/api/me/route.ts
createFile(join(process.cwd(), "app/api/me/route.ts"), `
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

`);

  //app/api/register/route.ts
  createFile(join(process.cwd(), "app/api/register/route.ts"), `
    import { prisma } from "../../../lib/prisma";
import argon2 from "argon2";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) throw new Error("Email já cadastrado");

    const passwordHash = await argon2.hash(password);

    const user = await prisma.user.create({
      data: { email, passwordHash: passwordHash, name, role: "user" },
    });

    const { passwordHash: _, ...safeUser } = user;

    return new Response(JSON.stringify(safeUser), { status: 201 });
  } catch (err: any) {
    console.error(err);
    return new Response(JSON.stringify({ message: err.message }), { status: 400 });
  }
}
`
  )

  // app/api/login/route.ts
  createFile(
    join(process.cwd(), "app/api/login/route.ts"),
    `import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const { cookie, user } = await auth.login(email, password);

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
}`
  );

  // lib/prisma.ts
  createFile(
    join(process.cwd(), "lib/prisma.ts"),
    `import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();`
  );

  console.log("✨ Boilerplate criado! Guardiya CLI > Giovane Dias");

  // Exibe a bandeira da Rússia
  await printRussianFlag();
}


async function revertBoilerplate() {
  console.log("↩️  Revertendo boilerplate Guardiya...");

  // Arquivos criados pelo setupBoilerplate
  const files = [
    "app/api/logout/route.ts",
    "components/LogoutButton.tsx",
    "app/register/page.tsx",
    "app/login/page.tsx",
    "lib/auth.ts",
    "app/dashboard/layout.tsx",
    "app/api/register/route.ts",
    "app/api/login/route.ts",
    "lib/prisma.ts",
  ];

  for (const file of files) {
    deleteFile(join(process.cwd(), file));
  }

  // Pastas possivelmente vazias que podem ser removidas
  const folders = [
    "app/api/logout",
    "app/api/register",
    "app/api/login",
    "components",
    "lib",
    "app/register",
    "app/login",
    "app/dashboard",
  ];

  for (const folder of folders) {
    deleteFolder(join(process.cwd(), folder));
  }

  console.log("✅ Boilerplate revertido com sucesso!");
}


function insertUserModel() {
  const prismaSchemaPath = join(process.cwd(), "prisma", "schema.prisma");

  if (!existsSync(prismaSchemaPath)) {
    console.error("❌ schema.prisma não encontrado. Rode primeiro 'npx prisma init'");
    return;
  }

  const fileContent = readFileSync(prismaSchemaPath, "utf-8");

  if (fileContent.includes("model User")) {
    console.log("⚠️  Model User já existe no schema.prisma, pulando...");
    return;
  }

  const userModel = `
model User {
  id           String     @id @default(cuid())
  email        String     @unique
  passwordHash String
  name         String?
  role         String?
  createdAt    DateTime   @default(now())
}
`;

  appendFileSync(prismaSchemaPath, userModel, "utf-8");
  execSync("npx prisma db push", { stdio: "inherit" });
  console.log("✅ Model User inserido no schema.prisma com sucesso!");
}

function setupPostgresDockerCompose() {
  createFile(
    join(process.cwd(), "docker-compose.yml"), `version: "3.9"

services:
  postgres:
    image: postgres:15
    container_name: my_postgres
    restart: always
    environment:
      POSTGRES_USER: myuser
      POSTGRES_PASSWORD: mypassword
      POSTGRES_DB: mydatabase
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
`)
  console.log("✨ Docker-compose criado postgresql! Guardiya CLI > Giovane Dias\nConfigure suas variaveis no arquivo do docker-compose.yml \n Depois para rodar digite: docker compose up -d");
}
// Função que instala e inicializa Prisma
function setupPrisma() {
  console.log("⚡ Configurando Prisma...");
  try {
    execSync("npm install @prisma/client prisma argon2", { stdio: "inherit" });
    execSync("npx prisma init", { stdio: "inherit" });
    console.log("✅ Prisma instalado e inicializado!");
  } catch (err) {
    console.error("❌ Erro ao configurar Prisma:", err);
  }
}


// Configuração do Commander
program
  .name("guardiya")
  .description("CLI do Guardiya - autenticação e utilidades para Next.js")
  .version("1.3.28");
program
  .command("postgres-docker-compose")
  .description("Instala e inicializa Postgres no docker compose..")
  .action(setupPostgresDockerCompose);

program
  .command("init")
  .description("Gera boilerplate de autenticação (pages, routes, lib)")
  .action(setupBoilerplate);
  

program
  .command("prisma")
  .description("Instala e inicializa Prisma automaticamente")
  .action(setupPrisma);
program
  .command("add-jwt-secret")
  .description("Adiciona JWT_SECRET no .env se não existir")
  .action(ensureJwtSecret);

program
  .command("revert")
  .description("Reverte tudo criado pelo Boilerplate")
  .action(revertBoilerplate);
program
  .command("add-user-model")
  .description("Insere o model User no schema.prisma se ainda não existir")
  .action(insertUserModel);

program.parse(process.argv);
