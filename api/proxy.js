// api/proxy.js
const axios = require('axios');

module.exports = async (req, res) => {
    try {
        const response = await axios.get('https://0h5hijrk0andvtwj.dyn.acsc.land/admin', {
            headers: {
                'Host': 'fasttravel',
                'X-Forwarded-For': '127.0.0.1',
                'X-Real-IP': '127.0.0.1'
            }
        });
        res.send(response.data);
    } catch (error) {
        res.status(500).send('Error fetching admin content.');
    }
};
