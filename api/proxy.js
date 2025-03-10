// api/proxy.js
const axios = require('axios');

module.exports = async (req, res) => {
    try {
        const response = await axios.get('http://localhost:5000/admin', {
            headers: {
                'Host': 'localhost',
                'X-Forwarded-For': '127.0.0.1',
                'X-Real-IP': '127.0.0.1'
            }
        });
        res.send(response.data);
    } catch (error) {
        res.status(500).send('Error fetching admin content.');
    }
};
