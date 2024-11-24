import { createSubject, updateSubject, deleteSubject, getSubjects, getSubjectById } from "../../../db/scripts/subjects.db";

export default async function handler(req, res) {
    const { method } = req;

    try {
        switch (method) {
            case 'GET':
                const { idSubject } = req.query;
                if (idSubject) {
                    const subject = await getSubjectById(idSubject);
                    return res.status(200).json(subject);
                } else {
                    const subjects = await getSubjects(req.query)

                    if (subjects.meta) {
                        return res.status(200).json(subjects);
                    } else {
                        return res.status(500).json(subjects.sqlMessage);
                    }
                }
            case 'POST':
                const messagePost = await createSubject(req.body);

                if (messagePost === 'Success') {
                    return res.status(200).json("Subject has been created")
                }
                else {
                    return res.status(500).json(messagePost.sqlMessage);
                }
            case 'DELETE':
                const { id } = req.body;

                if (!id) {
                    return res.status(400).json('ID is required for deletion');
                }

                const messageDel = await deleteSubject(id);

                if (messageDel === 'Success') {
                    return res.status(200).json("Subject has been deleted")
                }
                else if (Object.keys(messageDel).length === 0) {
                    return res.status(404).json("Subject not found")
                }
                else {
                    return res.status(500).json(messageDel);
                }
            case 'PUT':
                const subject = await updateSubject(req.body)

                if (subject === "Success") {
                    return res.status(200).json("Subject has been updated!");
                } else {
                    return res.status(500).json(subject.sqlMessage);
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