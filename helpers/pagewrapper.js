import CustLink from "../components/link";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
export default function PageWrapper(props) {
    const { data: session, status } = useSession();
    return (
        <>
            <nav className="flex items-center gap-4">
                {status === "unauthenticated" ? (
                    <>
                        <CustLink href={`/`}>Home</CustLink>
                        <CustLink href={`/login`}>Login</CustLink>
                        <CustLink href={`/signup`}>Sign Up</CustLink>
                    </>
                ) : (
                    <>
                        <CustLink href={`/`}>Home</CustLink>
                        <CustLink href={`/login`}>Profile</CustLink>
                        <a className="custLink" onClick={signOut}>
                            Sign Out
                        </a>
                    </>
                )}
            </nav>
            <main>{props.children}</main>
            <footer>
                <p>FOOTER</p>
            </footer>
        </>
    );
}
