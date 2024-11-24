// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { login } from "../../../db/scripts/auth.db"

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { username, password } = req.body;

        const user = await login(username, password);

        if (user.length !== 0) {
            return res.status(200).json(user)
        } else {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
    }
    //const checkUser = await login(username);
}