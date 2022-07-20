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
        await sendConfirmationEmail(new_user);
        return res.status(200).json({ message: "success" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Sign up failed" });
    }
}

//Sendinblue-code:16a5af1ef7d6e19cfe11368af30f9107
//YhBqMJbQht4u
