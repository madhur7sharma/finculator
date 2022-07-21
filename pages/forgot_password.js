import { useContext, useState } from "react";
import Button from "../components/button";
import Input from "../components/input";
import PageWrapper from "../components/pagewrapper";
import SiteContext from "../helpers/context";

export default function ForgotPassword(props) {
    const toast = useContext(SiteContext);
    const [email, setEmail] = useState(null);
    async function resetPassword(e) {
        e.preventDefault();
        let status = null;
        try {
            const resp = await fetch("/api/send_resetLink", {
                method: "POST",
                body: JSON.stringify({ email: email }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (resp) {
                const data = await resp.json();
                if (resp.status === 200) {
                    toast("success", data.message);
                } else if (resp.status === 422) {
                    toast("warning", data.message);
                } else {
                    toast("error", data.message);
                }
            }
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

                    <form onSubmit={(e) => resetPassword(e)} className="pt-6">
                        <div className="w-full mt-4">
                            <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="flex items-center justify-between mt-4">
                            <Button type="submit">Send Password Reset Link</Button>
                        </div>
                    </form>
                </div>
            </div>
        </PageWrapper>
    );
}
