import { createDonation, updateDonation, deleteDonation, getDonations, getDonationById } from "../../../db/scripts/donations.db";

export default async function handler(req, res) {
    const { method } = req;

    try {
        switch (method) {
            case 'GET':
                const { idDonation } = req.query;
                if (idDonation) {
                    const data = await getDonationById(idDonation);
                    return res.status(200).json(data);
                } else {
                    const data = await getDonations(req.query)

                    if (data.meta) {
                        return res.status(200).json(data);
                    } else {
                        return res.status(500).json(data.sqlMessage);
                    }
                }
            case 'POST':
                const messagePost = await createDonation(req.body);

                if (messagePost === 'Success') {
                    return res.status(200).json("Donation has been created")
                }
                else {
                    return res.status(500).json(messagePost.sqlMessage);
                }
            case 'DELETE':
                const { id } = req.body;

                if (!id) {
                    return res.status(400).json('ID is required for deletion');
                }

                const messageDel = await deleteDonation(id);

                if (messageDel === 'Success') {
                    return res.status(200).json("Donation has been deleted")
                }
                else if (Object.keys(messageDel).length === 0) {
                    return res.status(404).json("Donation not found")
                }
                else {
                    return res.status(500).json(messageDel);
                }
            case 'PUT':
                const data = await updateDonation(req.body)

                if (data === "Success") {
                    return res.status(200).json("Donation has been updated!");
                } else {
                    return res.status(500).json(data.sqlMessage);
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