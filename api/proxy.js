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
        if (error.response) {
            // Server responded with a status code outside the 2xx range
            res.status(error.response.status).send(`Error fetching admin content: ${error.response.statusText}`);
        } else if (error.request) {
            // No response received after request was made
            res.status(500).send(`Error fetching admin content: No response received.`);
        } else {
            // Error occurred while setting up the request
            res.status(500).send(`Error fetching admin content: ${error.message}`);
        }
    }
};
