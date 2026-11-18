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

Which file: set INDEXNOW_KEY in the workflow. public/ also holds the GitHub
Pages domain-verification token, whose name matches the same <32 hex>.txt
pattern — so "scan for any 32 hex .txt" silently picks whichever sorts first,
which for this repo was the Pages token instead of the IndexNow key. When
INDEXNOW_KEY is unset and more than one candidate exists, this refuses to guess
and says so, rather than submitting under the wrong key.

Failure here must never fail the build: the site is already published by the
time this runs, and a rejected submission only means the crawler comes the slow
way.
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
KEY_FILE_RE = re.compile(r"[0-9a-f]{32}\.txt")
USER_AGENT = "tenmay-indexnow/1.0 (+https://tenmaypcba.com)"


def _read(path):
    with open(path, encoding="utf-8") as fh:
        return fh.read().strip()


def _candidates():
    public = os.path.join(ROOT, "public")
    names = [n for n in sorted(os.listdir(public)) if KEY_FILE_RE.fullmatch(n)]
    return [(n[:-4], os.path.join(public, n)) for n in names]


def find_key():
    """Return (key, source, problem). Never guesses between candidates."""
    public = os.path.join(ROOT, "public")
    wanted = os.environ.get("INDEXNOW_KEY", "").strip()
    if wanted.endswith(".txt"):
        wanted = wanted[:-4]

    if wanted:
        path = os.path.join(public, wanted + ".txt")
        if not os.path.isfile(path):
            return None, None, f"INDEXNOW_KEY={wanted} but public/{wanted}.txt is missing"
        contents = _read(path)
        if contents != wanted:
            return None, None, (
                f"public/{wanted}.txt does not contain its own name "
                f"(got {contents!r}); IndexNow requires them to match"
            )
        return wanted, "INDEXNOW_KEY", None

    found = _candidates()
    if not found:
        return None, None, "no <32 hex>.txt key file in public/, skipping"
    if len(found) > 1:
        listing = ", ".join(k for k, _ in found)
        return None, None, (
            f"{len(found)} candidate key files and INDEXNOW_KEY is unset, "
            f"refusing to guess which is the IndexNow key: {listing}"
        )

    key, path = found[0]
    contents = _read(path)
    if contents != key:
        return None, None, f"public/{key}.txt does not contain its own name, skipping"
    return key, "scanned (only candidate)", None


def key_is_reachable(key):
    """IndexNow fetches this URL itself; a dead key file means a silent 403.

    Cloudflare rejects Python's default `Python-urllib/x.y` user agent outright
    (error 1010), so the probe must identify itself or every build reports the
    key as unreachable while it is actually fine.
    """
    url = f"https://{HOST}/{key}.txt"
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    try:
        with urllib.request.urlopen(request, timeout=20) as response:
            body = response.read().decode("utf-8", "replace").strip()
            return response.status == 200 and body == key, f"HTTP {response.status}"
    except urllib.error.HTTPError as exc:
        return False, f"HTTP {exc.code} {exc.reason}"
    except Exception as exc:  # noqa: BLE001 - diagnostic only
        return False, str(exc)


def sitemap_urls():
    path = os.path.join(ROOT, "dist", "sitemap.xml")
    with open(path, encoding="utf-8") as fh:
        return [u.strip() for u in re.findall(r"<loc>([^<]+)</loc>", fh.read())]


def main():
    dry_run = "--dry-run" in sys.argv[1:]

    key, source, problem = find_key()
    if not key:
        print(f"IndexNow: {problem}")
        return 0
    print(f"IndexNow: using key {key} (source: {source})")

    urls = sitemap_urls()
    if not urls:
        print("IndexNow: sitemap has no <loc> entries, skipping.")
        return 0

    reachable, detail = key_is_reachable(key)
    if not reachable:
        # Not fatal: submitting anyway costs nothing, and a transient probe
        # failure should not stop a submission that would have worked.
        print(f"IndexNow: WARNING key file not reachable at https://{HOST}/{key}.txt ({detail})")

    payload = {
        "host": HOST,
        "key": key,
        "keyLocation": f"https://{HOST}/{key}.txt",
        "urlList": urls[:MAX_URLS],
    }

    if dry_run:
        print(f"IndexNow: dry run, would submit {len(payload['urlList'])} URLs to {ENDPOINT}")
        print(f"IndexNow: keyLocation {payload['keyLocation']}")
        print(f"IndexNow: first 3 URLs {payload['urlList'][:3]}")
        return 0

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
