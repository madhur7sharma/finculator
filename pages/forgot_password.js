import { useState } from "react";
import Button from "../components/button";
import Input from "../components/input";
import PageWrapper from "../helpers/pagewrapper";

export default function ForgotPassword(props) {
    const [email, setEmail] = useState(null);
    const [message, setMessage] = useState(null);
    async function resetPassword() {
        try {
            await fetch("/api/send_resetLink", {
                method: "POST",
                body: JSON.stringify({ email: email }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setMessage(data.message);
                });
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <PageWrapper>
            <div className="h-48 bg-red-300 flex flex-col items-center gap-4">
                <h2 className="text-center">Forgot Password</h2>
                <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
                <Button onClick={resetPassword}>Send Password Reset Link</Button>
                <p>{message}</p>
            </div>
        </PageWrapper>
    );
}
