// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { checkUsername } from "../../../../db/scripts/auth.db"

export default async function handler(req, res) {
    const { username } = req.query;
    const checkUser = await checkUsername(username);
    return res.status(200).json(checkUser)
}
