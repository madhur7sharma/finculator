import Head from "next/head";
import Button from "../components/button";
import Input from "../components/input";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useState } from "react";
import CustLink from "../components/link";
import PageWrapper from "../components/pagewrapper";
// import Link from "next/link";

export default function Home() {
    // const { data: session, status } = useSession();
    return (
        <PageWrapper>
            <div className="flex flex-col items-center gap-4">
                {/* <img className="" src="/logo.png" alt="logo" /> */}
            </div>
        </PageWrapper>
    );
}
