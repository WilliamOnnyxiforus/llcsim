import { createClassType, updateClassType, deleteClassType, getClassTypes, getClassTypeById } from "../../../db/scripts/classTypes.db";

export default async function handler(req, res) {
    const { method } = req;

    try {
        switch (method) {
            case 'GET':
                const { idClassType } = req.query;
                if (idClassType) {
                    const classType = await getClassTypeById(idClassType);
                    return res.status(200).json(classType);
                } else {
                    const classTypes = await getClassTypes(req.query)

                    if (classTypes.meta) {
                        return res.status(200).json(classTypes);
                    } else {
                        return res.status(500).json(classTypes.sqlMessage);
                    }
                }

            case 'POST':
                const messagePost = await createClassType(req.body);

                if (messagePost === 'Success') {
                    return res.status(200).json("Class Type has been created")
                }
                else {
                    return res.status(500).json(messagePost.sqlMessage);
                }
            case 'DELETE':
                const { id } = req.body;

                if (!id) {
                    return res.status(400).json('ID is required for deletion');
                }

                const messageDel = await deleteClassType(id);

                if (messageDel === 'Success') {
                    return res.status(200).json("Class type has been deleted")
                }
                else if (Object.keys(messageDel).length === 0) {
                    return res.status(404).json("Class type not found")
                }
                else {
                    return res.status(500).json(messageDel);
                }
            case 'PUT':
                const classType = await updateClassType(req.body)

                if (classType === "Success") {
                    return res.status(200).json("Class type has been updated!");
                } else {
                    return res.status(500).json(classType.sqlMessage);
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