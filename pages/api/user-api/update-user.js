import { getSession } from "next-auth/react";
import fn from "../../../helpers/be-functions";
import { sendConfirmationEmail } from "../../../helpers/mailer";
// import { sendConfirmationEmail } from "../../middleware/mailer";

export default async function handler(req, res) {
    if (req.method !== "PATCH") {
        return res.status(400).json({ message: "Request method not allowed" });
    }
    const session = await getSession({ req });
    if (!session) {
        return res.status(400).json({ message: "User not logged in!" });
    }
    try {
        const update_user = await fn.update_user(session.user.email, req.body);
        return res.status(200).json({ message: "User details updated successfully" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Sign up failed" });
    }
}
