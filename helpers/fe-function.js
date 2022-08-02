import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const feFunctions = {
    initializeLogin: async function (credentials) {
        try {
            // const router = useRouter();
            await signIn("credentials", { redirect: false, email: credentials.email, password: credentials.password }).then(({ ok, error }) => {
                if (ok) {
                    console.log("OKK- Redirect");
                    // router.push("/user-profile");
                } else {
                    console.log(error);
                    return error;
                }
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
    removeEmptyKeys: function (obj) {
        return Object.entries(obj)
            .filter(([_, v]) => v !== null && v !== undefined && v !== "")
            .reduce((acc, [k, v]) => ({ ...acc, [k]: v === Object(v) ? feFunctions.removeEmptyKeys(v) : v }), {});
    },
    
};

export default feFunctions;
