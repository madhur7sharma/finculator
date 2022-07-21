import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Alert from "../components/alerts";
import React, { useRef } from "react";
import SiteContext from "../helpers/context";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    const toastRef = useRef();
    const addToast = (type, msg) => {
        toastRef.current.addMessage({ type: type, message: msg });
    };
    return (
        <SessionProvider session={session}>
            <SiteContext.Provider value={addToast}>
                <Component {...pageProps} />
                <Alert ref={toastRef} autoClose={true} />
            </SiteContext.Provider>
        </SessionProvider>
    );
}

export default MyApp;
