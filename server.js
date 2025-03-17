const crypto = require('crypto');
const express = require('express');
const path = require('path'); // Pfad-Modul für saubere Datei-Referenzen
const app = express();
const port = 3000;

// Middleware für CSP Nonce
app.use((req, res, next) => {
    res.locals.nonce = crypto.randomBytes(16).toString('base64');
    next();
});

// Statische Dateien bereitstellen (inkl. CSS & HTML aus /public)
app.use(express.static(path.join(__dirname, 'public')));

// Route für index.html mit CSP-Header
app.get('/', (req, res) => {
    const nonce = res.locals.nonce;
    res.setHeader('Content-Security-Policy', `script-src 'self' 'nonce-${nonce}'; style-src 'self'; frame-src 'self'`);
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route für steal.html
app.get('/steal', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'steal.html');
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error(`Fehler beim Laden von steal.html: ${err.message}`);
            res.status(404).send("steal.html nicht gefunden");
        }
    });
});

// Route für evil.css
app.get('/evil.css', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'evil.css');
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error(`Fehler beim Laden von evil.css: ${err.message}`);
            res.status(404).send("evil.css nicht gefunden");
        }
    });
});

// Server starten
app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}/`);
});
