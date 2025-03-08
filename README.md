# Redirector

This is a simple redirector web app hosted on GitHub and deployed with Vercel. It uses an iframe to load a target URL dynamically, and bypasses restrictions using a proxy hosted on Vercel.

### How it works:

1. The app takes a `redirect` query parameter (e.g., `redirect=http://localhost:5001/admin`).
2. The target URL is dynamically loaded inside an iframe.
3. The app will forward the request to an internal service, bypassing any local restrictions, by using a proxy endpoint deployed on **Vercel**.

### Usage

To use the redirector, visit the following URL:

