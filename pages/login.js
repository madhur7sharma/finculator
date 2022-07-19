import Head from "next/head";
import Button from "../components/button";
import Input from "../components/input";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useState } from "react";
import PageWrapper from "../helpers/pagewrapper";

export default function Login() {
    const { data: session, status } = useSession();
    // console.log("session", session);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    async function initializeLogin() {
        try {
            await signIn("credentials", {
                email: email,
                password: password,
            });
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <PageWrapper>
            <div className="h-48 bg-red-300 flex flex-col items-center gap-4">
                <h2>Login to continue</h2>
                <Input onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <Input onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <div className="flex items-center justify-center gap-4">
                    <Button onClick={initializeLogin}>Sign In</Button>
                    <Button onClick={signOut}>Sign Out</Button>
                </div>
            </div>
        </PageWrapper>
    );
}
