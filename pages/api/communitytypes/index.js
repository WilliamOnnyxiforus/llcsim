import { createCommunityType, updateCommunityType, deleteCommunityType, getCommunityTypes, getCommunityTypeById } from "../../../db/scripts/communityTypes.db";

export default async function handler(req, res) {
    const { method } = req;

    try {
        switch (method) {
            case 'GET':
                const { idCommunityType } = req.query;
                if (idCommunityType) {
                    const communityType = await getCommunityTypeById(idCommunityType);
                    return res.status(200).json(communityType);
                } else {
                    const communityTypes = await getCommunityTypes(req.query)

                    if (communityTypes.meta) {
                        return res.status(200).json(communityTypes);
                    } else {
                        return res.status(500).json(communityTypes.sqlMessage);
                    }
                }
            case 'POST':
                const messagePost = await createCommunityType(req.body);

                if (messagePost === 'Success') {
                    return res.status(200).json("Community Type has been created")
                }
                else {
                    return res.status(500).json(messagePost.sqlMessage);
                }
            case 'DELETE':
                const { id } = req.body;

                if (!id) {
                    return res.status(400).json('ID is required for deletion');
                }

                const messageDel = await deleteCommunityType(id);

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
                const communityType = await updateCommunityType(req.body)

                if (communityType === "Success") {
                    return res.status(200).json("Community type has been updated!");
                } else {
                    return res.status(500).json(communityType.sqlMessage);
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