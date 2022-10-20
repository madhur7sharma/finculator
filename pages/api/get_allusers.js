import fn from "../../helpers/be-functions";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(400).json({ message: "Request method not allowed" });
    }
    try {
        const users = await fn.get_allusers();
        if (users) {
            return res.status(200).json({ users: users });
        } else {
            return res.status(404).json({ message: "No users found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Something went wrong" });
    }
}
