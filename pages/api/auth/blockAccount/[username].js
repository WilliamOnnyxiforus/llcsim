// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { blockAccount } from "../../../../db/scripts/auth.db"
require('dotenv').config();

export default async function handler(req, res) {
    const { username } = req.query;
    if(username !== process.env.ADMIN_NAME){
        await blockAccount(username);
    }
    return res.status(200).json('Data has been blocked')
}
