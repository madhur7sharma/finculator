import Head from "next/head";
import Button from "../components/button";
import Input from "../components/input";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import PageWrapper from "../components/pagewrapper";
import feFunctions from "../helpers/fe-function";
import CustLink from "../components/link";
import { useRouter } from "next/router";
import SiteContext from "../helpers/context";

export default function Login() {
    const { data: session, status } = useSession();
    const toast = useContext(SiteContext);
    // console.log("session", session);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    async function login(e) {
        e.preventDefault();
        try {
            await signIn("credentials", { redirect: false, email: email, password: password }).then(({ ok, error }) => {
                if (ok) {
                    toast("success", "Login successfull!");
                    router.push("/user-profile");
                } else {
                    toast("error", error);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <PageWrapper>
            <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg dark:bg-gray-800 shadow-sm shadow-gray-600 mt-8 border border-gray-600">
                <div className="px-6 py-8">
                    <h2 className="text-3xl font-bold text-center text-gray-700 dark:text-white">Finculator</h2>

                    <h3 className="mt-1 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Welcome Back</h3>

                    <p className="mt-1 text-center text-gray-500 dark:text-gray-400">Login or create account</p>

                    <form onSubmit={(e) => login(e)} className="pt-6">
                        <div className="w-full mt-4">
                            <Input required type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" aria-label="Email Address" />
                        </div>

                        <div className="w-full mt-4">
                            <Input
                                required
                                type="password"
                                id="password"
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                aria-label="Password"
                            />
                        </div>

                        <div className="flex items-center justify-between mt-4">
                            <CustLink href={`/forgot_password`} className="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500">
                                Forget Password?
                            </CustLink>

                            <Button type="submit">Login</Button>
                        </div>
                    </form>
                </div>

                <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
                    <span className="text-sm text-gray-600 dark:text-gray-200">Don't have an account? </span>

                    <CustLink href={`/signup`} className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline">
                        Register
                    </CustLink>
                </div>
            </div>
        </PageWrapper>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (session) {
        return {
            redirect: {
                permanent: false,
                destination: `/user-profile`,
            },
        };
    }
    return {
        props: {},
    };
}
