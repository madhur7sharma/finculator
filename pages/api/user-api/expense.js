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
        if (req.method === "POST") {
            const expense = await fn.expense(session.user.email, req.body);
            if (expense) {
                return res.status(200).json({ message: "expense updated successfully", data: expense });
            }
            return res.status(500).json({ message: "expense added failed" });
        } else if (req.method === "PATCH") {
            const expense = await fn.update_expense(session.user.email, req.body);
            if (expense) {
                return res.status(200).json({ message: "expense updated successfully", data: expense });
            }
            return res.status(500).json({ message: "expense updation failed" });
        } else if (req.method === "DELETE") {
            const expense = await fn.delete_expense(session.user.email, req.body);
            if (expense) {
                return res.status(200).json({ message: "expense deleted successfully", data: expense });
            }
            return res.status(500).json({ message: "expense updation failed" });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "expense updation failed" });
    }
}
