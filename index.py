from http.server import BaseHTTPRequestHandler, HTTPServer

class RedirectHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(302)
        self.send_header("Location", "http://localhost:5001/admin")
        self.end_headers()

HTTPServer(("0.0.0.0", 8080), RedirectHandler).serve_forever()
