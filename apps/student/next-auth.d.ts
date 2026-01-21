import NextAuth, { DefaultSession } from "next-auth";

enum Department {
  CSE,
  ECE,
  ME,
  CE,
  EE
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      dept?: Department;
      semester?: number;
      course?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    dept?: string;
    semester?: number;
    course?: string;
  }
}
