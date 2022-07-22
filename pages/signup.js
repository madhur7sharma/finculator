import Head from "next/head";
import Button from "../components/button";
import Input from "../components/Input";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import PageWrapper from "../components/pagewrapper";
import feFunctions from "../helpers/fe-function";
import CustLink from "../components/link";
import SiteContext from "../helpers/context";

export default function Signup() {
    const { data: session, status } = useSession();
    const toast = useContext(SiteContext);
    // console.log("session", session);
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [conPassword, setConPassword] = useState(null);
    const [message, setMessage] = useState(null);
    const [regex, setRegex] = useState(false);
    async function newUser(e) {
        e.preventDefault();
        const userBody = {
            name: name,
            email: email,
            password: password,
        };
        try {
            const resp = await fetch("/api/new_user", {
                method: "POST",
                body: JSON.stringify(userBody),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (resp) {
                if (resp.status === 200) {
                    await signIn("credentials", {
                        email: userBody.email,
                        password: userBody.password,
                    });
                }
                const data = await resp.json();
                toast("error", data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (password && conPassword) {
            if (password === conPassword) {
                setRegex(false);
            } else {
                setRegex(true);
            }
        }
    }, [password, conPassword]);
    return (
        <PageWrapper>
            <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg dark:bg-gray-800 shadow-sm shadow-gray-600 mt-8 border border-gray-600">
                <div className="px-6 py-8">
                    <h2 className="text-3xl font-bold text-center text-gray-700 dark:text-white">Finculator</h2>

                    <h3 className="mt-1 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Welcome Back</h3>

                    <p className="mt-1 text-center text-gray-500 dark:text-gray-400">Login or create account</p>

                    <form onSubmit={(e) => newUser(e)} className="pt-6">
                        <div className="w-full mt-4">
                            <Input required id="name" name="name" onChange={(e) => setName(e.target.value)} placeholder="Name" />
                        </div>

                        <div className="w-full mt-4">
                            <Input required type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                        </div>
                        <div className="w-full mt-4">
                            <Input
                                required
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                                type="password"
                                id="password"
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                            />
                        </div>
                        <div className="w-full mt-4">
                            <Input required type="password" id="conpassword" name="conpassword" onChange={(e) => setConPassword(e.target.value)} placeholder="Confirm Password" />
                        </div>
                        {regex && <p className="text-red-500">Password Didn&apos;t Match!</p>}

                        <div className="flex items-center justify-between mt-4">
                            <Button type="submit">Sign Up</Button>
                        </div>
                    </form>
                </div>

                <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
                    <span className="text-sm text-gray-600 dark:text-gray-200">Already have an account? </span>

                    <CustLink href={`/login`} className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline">
                        Login
                    </CustLink>
                </div>
            </div>
        </PageWrapper>
    );
}
