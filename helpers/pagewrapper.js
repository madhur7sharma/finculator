import CustLink from "../components/link";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
export default function PageWrapper(props) {
    const { data: session, status } = useSession();
    const [slide, setSlide] = useState(false);
    return (
        <section className="dark">
            <nav className="bg-white dark:bg-gray-700 px-4 md:flex">
                <div className={`shadow h-20 flex items-center justify-between`}>
                    <CustLink style={{ fontSize: 32, fontWeight: 700, marginRight: 24 }} href={`/`}>
                        Finculator
                    </CustLink>
                    <button className="md:hidden">
                        <GiHamburgerMenu onClick={() => setSlide(!slide)} />
                    </button>
                </div>
                <div className={`${slide ? "h-36" : "md:h-20 h-0"} transition-height duration-500 overflow-hidden flex flex-col md:flex-row md:items-center gap-4`}>
                    {status !== "authenticated" ? (
                        <>
                            <CustLink href={`/login`}>Login</CustLink>
                            <CustLink href={`/signup`}>Sign Up</CustLink>
                        </>
                    ) : (
                        <>
                            <CustLink href={`/login`}>Profile</CustLink>
                            <a className="custLink" onClick={signOut}>
                                Sign Out
                            </a>
                        </>
                    )}
                    <CustLink href={`/calculators`}>Calculators</CustLink>
                </div>
            </nav>
            <main>{props.children}</main>
            <footer className="mt-10">
                <p>FOOTER</p>
            </footer>
        </section>
    );
}
