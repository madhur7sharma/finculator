import Head from "next/head";
import Button from "../components/button";
import Input from "../components/input";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useState } from "react";
import CustLink from "../components/link";
import PageWrapper from "../helpers/pagewrapper";
// import Link from "next/link";

export default function Home() {
    const { data: session, status } = useSession();
    console.log("status", status);
    console.log("session", session);
    return (
        <PageWrapper>
            <div className="h-48 bg-red-300 flex flex-col items-center gap-4">
                <h2 className="text-center">Finculator</h2>
                <CustLink href={`/login`}>Login</CustLink>
            </div>
        </PageWrapper>
    );
}
