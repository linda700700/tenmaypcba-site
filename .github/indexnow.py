"""
Submit every URL in the built sitemap to IndexNow after a publish.

IndexNow is a free push protocol: instead of waiting for a crawler to come back,
the site tells the search engine which URLs changed. It is read by Bing, Yandex,
Seznam and Naver. Google does not participate, so this is not a substitute for
Search Console — it is the fast path into the Bing index, which is also the
index Copilot, DuckDuckGo and parts of ChatGPT retrieval read from.

The key is a plain file at public/<key>.txt containing the key itself; IndexNow
fetches it to prove the submitter controls the host. `keyLocation` must be the
public URL of that exact file, and the file name must be the key.

Failure here must never fail the build: the site is already published by the time
this runs, and a rejected submission only means the crawler comes the slow way.
"""

import json
import os
import re
import sys
import urllib.error
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HOST = "tenmaypcba.com"
ENDPOINT = "https://api.indexnow.org/indexnow"
MAX_URLS = 10000


def find_key():
    public = os.path.join(ROOT, "public")
    for name in sorted(os.listdir(public)):
        if re.fullmatch(r"[0-9a-f]{32}\.txt", name):
            with open(os.path.join(public, name), encoding="utf-8") as fh:
                return name[:-4], fh.read().strip()
    return None, None


def sitemap_urls():
    path = os.path.join(ROOT, "dist", "sitemap.xml")
    with open(path, encoding="utf-8") as fh:
        return [u.strip() for u in re.findall(r"<loc>([^<]+)</loc>", fh.read())]


def main():
    key, contents = find_key()
    if not key:
        print("IndexNow: no <32 hex>.txt key file in public/, skipping.")
        return 0
    if contents != key:
        print("IndexNow: key file contents do not match its file name, skipping.")
        return 0

    urls = sitemap_urls()
    if not urls:
        print("IndexNow: sitemap has no <loc> entries, skipping.")
        return 0

    payload = {
        "host": HOST,
        "key": key,
        "keyLocation": f"https://{HOST}/{key}.txt",
        "urlList": urls[:MAX_URLS],
    }
    body = json.dumps(payload).encode("utf-8")
    request = urllib.request.Request(
        ENDPOINT,
        data=body,
        headers={"Content-Type": "application/json; charset=utf-8"},
        method="POST",
    )

    print(f"IndexNow: submitting {len(payload['urlList'])} URLs for {HOST}")
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            print(f"IndexNow: HTTP {response.status} {response.reason}")
    except urllib.error.HTTPError as exc:
        # 200/202 = accepted. 422 = key or URL list rejected, which is a config
        # problem worth seeing in the log but not worth failing a publish over.
        print(f"IndexNow: HTTP {exc.code} {exc.reason} — {exc.read()[:300]!r}")
    except Exception as exc:  # noqa: BLE001 - never break the publish
        print(f"IndexNow: request failed — {exc}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
