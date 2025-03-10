const crypto = require('crypto');
const express = require('express');
const app = express();
const port = 3000;

// Middleware to generate nonce
app.use((req, res, next) => {
    res.locals.nonce = crypto.randomBytes(16).toString('base64');
    next();
});

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Route to serve the index.html with nonce
app.get('/', (req, res) => {
    const nonce = res.locals.nonce;
    res.setHeader('Content-Security-Policy', `script-src 'self' 'nonce-${nonce}'`);
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
