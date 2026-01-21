import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@repo/database/client";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                ID: { label: "ID", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                console.log("Authorize called with credentials: ", credentials);
                if (!credentials?.ID || !credentials?.password) {
                    return null;
                }
                try {
                    const teacher = await prisma.teacher.findFirst({
                        where: {
                            id: credentials.ID,
                            password: credentials.password,
                        },
                    });
                    if (teacher) {
                        return {
                            id: teacher.id,
                            name: teacher.name,
                            email: teacher.email,
                            dept: teacher.dept,
                        };
                    }
                    return null;
                } catch (error) {
                    return null;
                }
            },
        }),
    ],
    pages:{
        error: process.env.NEXTAUTH_URL
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET,
    callbacks: {

        async jwt({token , user} : any){
            if(user){
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.dept = user.dept;
            }
            return token;
        },
        async session({session , token} : any){
            if(session.user){
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.dept = token.dept;

            }
            return session;
        },
        


    }
};
