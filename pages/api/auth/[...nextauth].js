import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import fn from "../../../helpers/be-functions";
import { verifyPassword } from "../../../helpers/encrypt-password";

export default NextAuth({
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                const user = await fn.find_user(credentials.email);
                if (user) {
                    const decryptedPassword = await verifyPassword(credentials.password, user.password);
                    // const user_auth = await fn.verify_password(credentials.email, credentials.password);
                    if (decryptedPassword) {
                        return {
                            email: credentials.email,
                        };
                    } else {
                        throw new Error("Wrong Credentials");
                    }
                } else {
                    throw new Error("User not found!");
                }
            },
        }),
    ],
    callbacks: {
        jwt: ({ token, user }) => {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        session: ({ session, token }) => {
            if (token) {
                session.id = token.id;
            }
            return session;
        },
    },
    secret: process.env.SECRET,
    jwt: {
        secret: "test",
        encryption: true,
    },
    // pages: {
    //     signIn: "/login?status=failed",
    //     error: "/login?status=wentwrong",
    // },
});
