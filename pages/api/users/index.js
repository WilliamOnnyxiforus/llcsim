// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createUser, getUsers, deleteUser, getUserById, updateUser } from "../../../db/scripts/users.db";

export default async function handler(req, res) {

    const { method } = req;

    try {
        switch (method) {
            case 'GET':
                const { idUser } = req.query;
                if (idUser) {
                    const user = await getUserById(idUser);
                    return res.status(200).json(user);
                } else {
                    const users = await getUsers(req.query)

                    if (users.meta) {
                        return res.status(200).json(users);
                    } else {
                        return res.status(500).json(users.sqlMessage);
                    }
                }

            case 'POST':
                const messagePost = await createUser(req.body);

                if (messagePost === 'Success') {
                    return res.status(200).json("User has been created")
                }
                else {
                    return res.status(500).json(messagePost.sqlMessage);
                }
            case 'DELETE':
                const { id } = req.body;

                if (!id) {
                    return res.status(400).json('ID is required for deletion');
                }

                const messageDel = await deleteUser(id);

                if (messageDel === 'Success') {
                    return res.status(200).json("User has been deleted")
                }
                else if (Object.keys(messageDel).length === 0) {
                    return res.status(404).json("User not found")
                }
                else {
                    return res.status(500).json(messageDel);
                }
            case 'PUT':
                const user = await updateUser(req.body)

                if (user === "Success") {
                    return res.status(200).json("User has been updated!");
                } else {
                    return res.status(500).json(user.sqlMessage);
                }
            default:
                res.setHeader('Allow', ['GET', 'POST', 'DELETE', 'PUT']);
                return res.status(405).end(`Method ${method} Not Allowed`);
        }
    }
    catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}