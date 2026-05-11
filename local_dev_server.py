from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.error import HTTPError
from urllib.request import Request, urlopen
import os
import sys


APPS_SCRIPT_URL = (
    "https://script.google.com/macros/s/AKfycbxlRsUc7xQxDBOC2qjZ-kom-0cuiCSBHckugOvkQNIT9f8d_aO4wLwWBrqQgo8WhXZu/exec"
)
HOST = "127.0.0.1"
PORT = 8000
ROOT = Path(__file__).resolve().parent


class LocalProxyHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_POST(self):
        if self.path != "/sheet-api":
            self.send_error(404, "Not found")
            return

        content_length = int(self.headers.get("Content-Length", "0"))
        body = self.rfile.read(content_length)
        request = Request(
            APPS_SCRIPT_URL,
            data=body,
            headers={"Content-Type": "text/plain;charset=utf-8"},
            method="POST",
        )

        try:
            with urlopen(request, timeout=30) as response:
                payload = response.read()
                self.send_response(response.status)
                self.send_header("Content-Type", response.headers.get_content_type() or "application/json")
                self.send_header("Cache-Control", "no-store")
                self.send_header("Content-Length", str(len(payload)))
                self.end_headers()
                self.wfile.write(payload)
        except HTTPError as error:
            payload = error.read()
            self.send_response(error.code)
            self.send_header("Content-Type", error.headers.get_content_type() or "application/json")
            self.send_header("Cache-Control", "no-store")
            self.send_header("Content-Length", str(len(payload)))
            self.end_headers()
            self.wfile.write(payload)
        except Exception as error:
            payload = ('{"ok":false,"error":"%s"}' % str(error).replace('"', "'")).encode("utf-8")
            self.send_response(502)
            self.send_header("Content-Type", "application/json")
            self.send_header("Cache-Control", "no-store")
            self.send_header("Content-Length", str(len(payload)))
            self.end_headers()
            self.wfile.write(payload)


def main():
    port = int(os.environ.get("PORT", PORT))
    server = ThreadingHTTPServer((HOST, port), LocalProxyHandler)
    print(f"Serving on http://{HOST}:{port}")
    server.serve_forever()


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        sys.exit(0)
