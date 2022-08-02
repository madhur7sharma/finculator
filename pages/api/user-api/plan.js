import { getSession } from "next-auth/react";
import fn from "../../../helpers/be-functions";
import { sendConfirmationEmail } from "../../../helpers/mailer";
// import { sendConfirmationEmail } from "../../middleware/mailer";

export default async function handler(req, res) {
    if (req.method !== "POST" && req.method !== "PATCH" && req.method !== "DELETE") {
        return res.status(400).json({ message: "Request method not allowed" });
    }
    const session = await getSession({ req });
    if (!session) {
        return res.status(400).json({ message: "User not logged in!" });
    }
    try {
        const { plannerName } = req.query;
        if (req.method === "POST") {
            const plan = await fn.plan(session.user.email, req.body, plannerName);
            if (plan) {
                return res.status(200).json({ message: "Plan updated successfully", data: plan });
            }
            return res.status(500).json({ message: "Plan added failed" });
        } else if (req.method === "PATCH") {
            const plan = await fn.update_plan(session.user.email, req.body);
            if (plan) {
                return res.status(200).json({ message: "Plan updated successfully", data: plan });
            }
            return res.status(500).json({ message: "Plan updation failed" });
        } else if (req.method === "DELETE") {
            const plan = await fn.delete_plan(session.user.email, req.body);
            if (plan) {
                return res.status(200).json({ message: "Plan deleted successfully", data: plan });
            }
            return res.status(500).json({ message: "Plan updation failed" });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Plan updation failed" });
    }
}
