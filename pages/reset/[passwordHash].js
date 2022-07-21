import { useState } from "react";
import Button from "../../components/button";
import Input from "../../components/input";
import fn from "../../helpers/be-functions";
import PageWrapper from "../../components/pagewrapper";

export default function ResetPassword(props) {
    const { user } = props;
    const [newPass, setNewPass] = useState(null);
    const [conPass, setConPass] = useState(null);
    const [message, setMessage] = useState(null);
    async function resetPassword() {
        try {
            await fetch("/api/reset_password", {
                method: "POST",
                body: JSON.stringify({ email: user.email, newPassword: newPass }),
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
                <h2>Login to continue</h2>
                <Input placeholder="New password" onChange={(e) => setNewPass(e.target.value)} />
                <Input placeholder="Confirm password" />
                <Button onClick={resetPassword}>Reset Password</Button>
                <p>{message}</p>
            </div>
        </PageWrapper>
    );
}

export async function getServerSideProps(context) {
    const { passwordHash } = context.query;
    const verifyHash = await fn.verify_accessHash(passwordHash);
    if (verifyHash) {
        const jsonData = JSON.stringify(verifyHash);
        const data = JSON.parse(jsonData);
        return {
            props: {
                user: data,
            },
        };
    }
    return {
        notFound: true,
    };
}
