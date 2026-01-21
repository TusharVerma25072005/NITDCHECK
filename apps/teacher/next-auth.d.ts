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
            name: string;
            email: string;
            dept?: Department;
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        name: string;
        email: string;
        dept?: string;
    }
}
