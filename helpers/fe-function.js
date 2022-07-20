import { signIn } from "next-auth/react";

const feFunctions = {
    initializeLogin: async function (credentials) {
        try {
            await signIn("credentials", {
                email: credentials.email,
                password: credentials.password,
            });
        } catch (error) {
            console.log(error);
        }
    },
    newUser: async function (userBody) {
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
            }
        } catch (error) {
            console.log(error);
        }
    },
};

export default feFunctions;
