const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const url = 'http://127.0.0.1:5001/admin';  // Internal server endpoint
  
  // Set up the headers if you want to simulate a real request (e.g., the 'Host' header)
  const headers = {
    'Host': 'localhost:5001', // Simulate the host header here
    // Add any other headers you may need
  };

  try {
    // Fetch the response from your internal server
    const response = await fetch(url, {
      method: 'GET',
      headers: headers
    });

    // Send the response back to the client
    res.status(response.status);
    const body = await response.text();
    res.send(body);  // Forward the content back to the user
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
