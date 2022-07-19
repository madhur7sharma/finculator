import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";  

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
                password: { label: "Passwrod", type: "password" },
            },
            authorize: async (credentials) => {
                if (credentials.email === "ms@gmail.com" && credentials.password === "msd") {
                    return {
                        name: credentials.email,
                        email: credentials.email,
                    };
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
