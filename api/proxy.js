// api/proxy.js
const axios = require('axios');

module.exports = async (req, res) => {
    try {
        const response = await axios.get('http://127.0.0.1:5000/admin', {
            headers: {
                'Host': 'localhost',
            }
        });
        res.send(response.data);
    } catch (error) {
        res.status(500).send('Error fetching admin content.');
    }
};
