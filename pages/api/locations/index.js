import { createLocation, updateLocation, deleteLocation, getLocations, getLocationById } from "../../../db/scripts/locations.db";

export default async function handler(req, res) {
    const { method } = req;

    try {
        switch (method) {
            case 'GET':
                const { idLocation } = req.query;
                if (idLocation) {
                    const location = await getLocationById(idLocation);
                    return res.status(200).json(location);
                } else {
                    const locations = await getLocations(req.query)

                    if (locations.meta) {
                        return res.status(200).json(locations);
                    } else {
                        return res.status(500).json(locations.sqlMessage);
                    }
                }
            case 'POST':
                const messagePost = await createLocation(req.body);

                if (messagePost === 'Success') {
                    return res.status(200).json("Location has been created")
                }
                else {
                    return res.status(500).json(messagePost.sqlMessage);
                }
            case 'DELETE':
                const { id } = req.body;

                if (!id) {
                    return res.status(400).json('ID is required for deletion');
                }

                const messageDel = await deleteLocation(id);

                if (messageDel === 'Success') {
                    return res.status(200).json("Location has been deleted")
                }
                else if (Object.keys(messageDel).length === 0) {
                    return res.status(404).json("Location not found")
                }
                else {
                    return res.status(500).json(messageDel);
                }
            case 'PUT':
                const location = await updateLocation(req.body)

                if (location === "Success") {
                    return res.status(200).json("Location has been updated!");
                } else {
                    return res.status(500).json(location.sqlMessage);
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