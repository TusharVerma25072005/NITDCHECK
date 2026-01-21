import db from "@repo/database/client"
import CredentialsProvider from "next-auth/providers/credentials"
import { NextAuthOptions } from "next-auth"
import jwt from "jsonwebtoken"

export const authOptions : NextAuthOptions = {
    providers : [
        CredentialsProvider({
            name : "Credentials",
            credentials : {
                id : { label: "Enrollment No", type: "text" },
                password : { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if(!credentials?.id || !credentials?.password){
                    return null;
                }
                const password = credentials.password;
                const enrollmentNo = credentials.id;
                try{
                    const student = await db.student.findUnique({
                        where: {
                            enrollment_no : enrollmentNo
                        }
                    })
                    if(!student){
                        return null;
                    }
                    if(student.password !== password){
                        return null;
                    }
                    return {
                        id: student.enrollment_no,
                        name: student.name,
                        dept: student.dept,
                        email : student.email,
                        semester: student.semester,
                        course: student.course
                    };
                }catch(error){
                    return null;
                }
            }
        })
    ],
    session : {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET,
    callbacks:{
        async jwt({ token ,  user } : any){
            if (user){
                token.id = user.id;

                token.enrollmentNo = user.id;
                token.name = user.name;
                token.dept = user.dept;
                token.semester = user.semester;
                token.course = user.course;
                token.accessToken = jwt.sign(
                    { id: user.id }, process.env.JWT_SECRET || ' ', { expiresIn: "30d" }
                );
            }
            return token;
        },
        async session({ session , token } : any){
            if(session.user){
                session.user.id = token.id;
                session.user.enrollmentNo = token.enrollmentNo;
                session.user.name = token.name;
                session.user.dept = token.dept;
                session.user.semester = token.semester;
                session.user.course = token.course;
            }
            return session;
        }

    }
}
