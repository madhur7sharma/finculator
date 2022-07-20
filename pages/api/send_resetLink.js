import fn from "../../helpers/be-functions";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return;
    }
    try {
        const { email } = req.body;
        const reset_password = await fn.send_reset_passwordLink(email);
        if (reset_password === 404) {
            return res.status(404).json({ message: "User not found!" });
        }
        if (reset_password === 422) {
            return res.status(422).json({ message: "Email already sent!" });
        }
        return res.status(200).json({ message: "Reset password link sent!", hashId: reset_password });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Something went wrong!" });
    }
}
