import fn from "../../helpers/be-functions";
import { sendConfirmationEmail } from "../../helpers/mailer";
// import { sendConfirmationEmail } from "../../middleware/mailer";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return;
    }
    try {
        const new_user = await fn.new_user(req.body);
        if (new_user === 409) {
            res.status(409).json({ message: "Email already exist" });
            return;
        }
        if (new_user === 408) {
            res.status(408).json({ message: "Username already taken" });
            return;
        }
        // await sendConfirmationEmail({
        //     toUser: {
        //         email: "email",
        //         id: "new_user._id",
        //     },
        // });
        return res.status(200).json({ message: "success" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Sign up failed" });
    }
}
