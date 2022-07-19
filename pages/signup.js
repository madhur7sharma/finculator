import Head from "next/head";
import Button from "../components/button";
import Input from "../components/input";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useState } from "react";

export default function Signup() {
    const { data: session, status } = useSession();
    // console.log("session", session);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    async function newUser() {
        const userBody = {
            email: email,
            password: password,
        };
        console.log("userBody", userBody);
        try {
            const resp = await fetch("/api/new_user", {
                method: "POST",
                body: JSON.stringify(userBody),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (resp) {
                console.log("resp", resp);
                if (resp.status === 200) {
                    await signIn("credentials", {
                        email: userBody.email,
                        password: userBody.password,
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="h-48 bg-red-300 flex flex-col items-center gap-4">
            <h2>Enter details to Sign up</h2>
            <Input onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <Input onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <div className="flex items-center justify-center gap-4">
                <Button onClick={newUser}>Sign Up</Button>
            </div>
        </div>
    );
}
