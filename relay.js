// relay.js
export default function handler(req, res) {
    if (req.method === 'POST') {
        const { content } = req.body;
        // Process the admin content as needed
        console.log('Admin content:', content);
        res.status(200).json({ success: true });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
