import { createDonationType, updateDonationType, deleteDonationType, getDonationTypes, getDonationTypeById } from "../../../db/scripts/donationTypes.db";

export default async function handler(req, res) {
    const { method } = req;

    try {
        switch (method) {
            case 'GET':
                const { idDonationType } = req.query;
                if (idDonationType) {
                    const donationType = await getDonationTypeById(idDonationType);
                    return res.status(200).json(donationType);
                } else {
                    const donationTypes = await getDonationTypes(req.query)

                    if (donationTypes.meta) {
                        return res.status(200).json(donationTypes);
                    } else {
                        return res.status(500).json(donationTypes.sqlMessage);
                    }
                }

            case 'POST':
                const messagePost = await createDonationType(req.body);

                if (messagePost === 'Success') {
                    return res.status(200).json("Donation Type has been created")
                }
                else {
                    return res.status(500).json(messagePost.sqlMessage);
                }
            case 'DELETE':
                const { id } = req.body;

                if (!id) {
                    return res.status(400).json('ID is required for deletion');
                }

                const messageDel = await deleteDonationType(id);

                if (messageDel === 'Success') {
                    return res.status(200).json("Donation type has been deleted")
                }
                else if (Object.keys(messageDel).length === 0) {
                    return res.status(404).json("Donation type not found")
                }
                else {
                    return res.status(500).json(messageDel);
                }
            case 'PUT':
                const donationType = await updateDonationType(req.body)

                if (donationType === "Success") {
                    return res.status(200).json("Donation type has been updated!");
                } else {
                    return res.status(500).json(donationType.sqlMessage);
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