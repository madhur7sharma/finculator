import fn from "../../helpers/be-functions";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return;
    }
    try {
        const { email, newPassword } = req.body;
        const reset_password = await fn.reset_password(email, newPassword);
        if (reset_password) {
            return res.status(200).json({ message: "Password reset successfully!" });
        }
        return res.status(400).json({ message: "Something went wrong!" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Something went wrong!" });
    }
}
