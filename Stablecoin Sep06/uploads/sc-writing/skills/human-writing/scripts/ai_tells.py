#!/usr/bin/env python3
"""Flag machine-sounding writing in human-facing text.

Usage: ai_tells.py [--summary] FILE_OR_DIR ...
Scans .html .md .txt .js .jsx .ts .json .dc.html. For HTML/JS it tries to look only at
visible text: HTML text nodes, title/alt/aria-label/placeholder attributes, and quoted
string literals in scripts. Code identifiers are ignored as far as a regex can manage.
Exit code 1 when anything is found.
"""
import os, re, sys, html

WORDS = r"""delve|tapestry|realm|paradigm|synergy|synergies|harness(?:es|ed|ing)?|leverag(?:e|es|ed|ing)|utiliz(?:e|es|ed|ing)|facilitat(?:e|es|ed|ing)|endeavou?r|streamlin(?:e|es|ed|ing)|bolster(?:s|ed|ing)?|underscor(?:e|es|ed|ing)|showcas(?:e|es|ed|ing)|testament|pivotal|crucial|vital|robust|seamless(?:ly)?|intricate|intricacies|meticulous(?:ly)?|vibrant|profound(?:ly)?|myriad|nuanced|transformative|revolutioni[sz](?:e|es|ed|ing)|game-?changing|game-?changer|cutting-edge|groundbreaking|renowned|boasts?|nestled|in the heart of|diverse array|valuable insights|foster(?:s|ed|ing)?|cultivat(?:e|es|ed|ing)|garner(?:s|ed|ing)?|interplay|enduring|align(?:s|ed|ing)? with|resonat(?:e|es|ed|ing) with|navigat(?:e|es|ed|ing) the complexit|unlock(?:s|ed|ing)? the potential|embark(?:s|ed|ing)? on|deep dive|elevat(?:e|es|ed|ing) your|empower(?:s|ed|ing)?|holistic|impactful|ever-evolving|landscape of|world-class|best-in-class|state-of-the-art"""

OPENERS = r"""Additionally|Moreover|Furthermore|Importantly|Notably|Interestingly|Ultimately|In conclusion|To sum up|In summary|That being said|At its core|To put it simply|From a broader perspective|When it comes to|In the context of|In today's|It is worth noting|It's worth noting|It bears mentioning|Here's the thing|Here's the kicker|Here's where it gets|Here's why|Let's break (?:this|it) down|Let's dive in|Let's unpack|Let's explore|Imagine a world|Think of it as|A small point, but|The path is clear|A key takeaway|This underscores|Rest assured|Certainly|Of course!|Great question|You're absolutely right|I hope this helps|Let me know if"""

PATTERNS = [
    ("em dash", re.compile(r"—|&mdash;| -- ")),
    ("spaced dash as pivot", re.compile(r"\s—\s")),
    ("AI vocabulary", re.compile(r"\b(?:%s)\b" % WORDS, re.I)),
    ("canned opener", re.compile(r"(?:^|[.!?]\s+|>\s*)(?:%s)\b" % OPENERS)),
    ("negative parallelism", re.compile(r"\b(?:it'?s not (?:just|only|about)?|isn'?t (?:just|only|about)|not just|not only|not merely|no longer just)\b.{0,80}\b(?:but|it'?s|but also|rather)\b", re.I)),
    ("not X. just Y", re.compile(r"\bNo [a-z]+\. No [a-z]+\. Just\b")),
    ("rhetorical Q then answer", re.compile(r"\b(?:The|Your|Our|This) [a-z ]{2,30}\? [A-Z][a-z ]{2,40}\.")),
    ("participle tail", re.compile(r",\s(?:highlighting|underscoring|emphasi[sz]ing|ensuring|reflecting|symboli[sz]ing|contributing to|fostering|enhancing|showcasing|reinforcing|signaling|signalling|marking|cementing|solidifying)\b", re.I)),
    ("copula dodge", re.compile(r"\b(?:serves as|stands as|functions as|operates as|represents a|marks a|refers to|acts as a|is designed to)\b", re.I)),
    ("vague connection", re.compile(r"\b(?:in connection with|in association with|associated with)\b", re.I)),
    ("vague authority", re.compile(r"\b(?:experts (?:say|argue|agree)|observers (?:note|have)|industry reports|many users (?:find|say)|studies show)\b", re.I)),
    ("gravitas padding", re.compile(r"\b(?:truly|genuinely|incredibly|remarkably|fundamentally|quietly powerful|deeply)\b", re.I)),
    ("despite challenges formula", re.compile(r"\bDespite (?:its|these|the) [a-z ]*challenges\b", re.I)),
    ("journey / stakes inflation", re.compile(r"\b(?:your journey|the journey|a journey|step into|embrace the future|the future of (?:finance|giving|money))\b", re.I)),
    ("bold-first bullet", re.compile(r"^\s*(?:[-*•]|\d+\.)\s+\*\*[^*]{1,40}\*\*\s*[:—-]", re.M)),
    ("emoji decoration", re.compile(r"[\U0001F300-\U0001FAFF✨✅❌⚡⭐\U0001F680]")),
    ("unicode arrow in prose", re.compile(r"(?<![-=|])→(?![-=|])")),
    ("Title Case heading", re.compile(r"^#{1,6}\s+(?:[A-Z][a-z]+\s+(?:and|&|of|for|the|to|in|with)\s+[A-Z][a-z]+|(?:[A-Z][a-z]+\s+){2,}[A-Z][a-z]+)\s*$", re.M)),
    ("thematic break", re.compile(r"^\s*---+\s*$", re.M)),
    ("curly quote in UI string", re.compile(r"[“”‘’]")),
    ("chat leakage", re.compile(r"\b(?:as of my last (?:update|training)|knowledge cutoff|based on (?:the )?available information|while specific details are limited|delete this section before)\b", re.I)),
    ("Oops / apology stack", re.compile(r"\b(?:Oops|Uh-oh|Whoops|We're sorry, but)\b")),
    ("three adjectives", re.compile(r"\b[a-z]+, [a-z]+,? and [a-z]+\b(?= [a-z]+\b)", re.I)),
]

# Patterns that only make sense for prose documents, not UI strings
PROSE_ONLY = {"Title Case heading", "thematic break", "bold-first bullet", "three adjectives"}
# Patterns skipped for markdown (em dash count is advisory; curly quotes fine in docs)
MD_SKIP = {"curly quote in UI string"}

TEXT_EXT = {".md", ".txt"}
HTML_EXT = {".html", ".htm"}
CODE_EXT = {".js", ".jsx", ".ts", ".tsx", ".json"}

SCRIPT_RE = re.compile(r"<script\b[^>]*>(.*?)</script>", re.S | re.I)
STYLE_RE = re.compile(r"<style\b[^>]*>.*?</style>", re.S | re.I)
COMMENT_RE = re.compile(r"<!--.*?-->", re.S)
ATTR_RE = re.compile(r"\b(?:title|alt|aria-label|placeholder|data-label|data-title|data-sub|data-copy|content)=\"([^\"]*)\"", re.I)
TAG_RE = re.compile(r"<[^>]+>")
STR_RE = re.compile(r"(?:\"((?:[^\"\\]|\\.){4,})\"|'((?:[^'\\]|\\.){4,})'|`((?:[^`\\]|\\.){4,})`)")
CODEISH = re.compile(r"^[\w./#:\-\[\]{}()=;,%$@&|*+<>!?]+$|\b(?:function|return|const|var|let|=>|\{\{|\}\}|px|rem|rgba?\(|var\(--)|^[a-z]+([A-Z][a-z]+)+$|^[a-z]+(?:-[a-z]+)+$")

def visible_text_from_html(src: str) -> str:
    out = []
    scripts = SCRIPT_RE.findall(src)
    body = SCRIPT_RE.sub(" ", src)
    body = STYLE_RE.sub(" ", body)
    body = COMMENT_RE.sub(" ", body)
    out.extend(ATTR_RE.findall(body))
    body = re.sub(r"\sstyle=\"[^\"]*\"", " ", body)
    text = TAG_RE.sub("\n", body)
    out.append(html.unescape(text))
    for s in scripts:
        out.append(strings_from_code(s))
    return "\n".join(out)

def strings_from_code(src: str) -> str:
    out = []
    for m in STR_RE.finditer(src):
        s = next(g for g in m.groups() if g is not None)
        if CODEISH.search(s) and " " not in s.strip():
            continue
        if " " not in s.strip() and not re.search(r"[A-Z]", s):
            continue
        out.append(s)
    return "\n".join(out)

def scan_file(path: str):
    ext = os.path.splitext(path)[1].lower()
    if path.endswith(".dc.html") or ext in HTML_EXT:
        src = open(path, encoding="utf-8", errors="ignore").read()
        text = visible_text_from_html(src); kind = "html"
    elif ext in CODE_EXT:
        src = open(path, encoding="utf-8", errors="ignore").read()
        text = strings_from_code(src); kind = "code"
    elif ext in TEXT_EXT:
        text = open(path, encoding="utf-8", errors="ignore").read(); kind = "md"
    else:
        return []
    hits = []
    for name, rx in PATTERNS:
        if kind != "md" and name in PROSE_ONLY:
            continue
        if kind == "md" and name in MD_SKIP:
            continue
        for m in rx.finditer(text):
            line = text.count("\n", 0, m.start()) + 1
            ctx = text[max(0, m.start() - 50): m.end() + 50].replace("\n", " ")
            hits.append((name, line, ctx.strip()))
    return hits

def walk(paths):
    skip = {"node_modules", ".git", "_archive", "_backup_pre-FE-207", "_backup_pre-FE-208", "uploads", "screenshots", "_audit", "fonts", "_stage_tmp"}
    for p in paths:
        if os.path.isfile(p):
            yield p
        else:
            for root, dirs, files in os.walk(p):
                dirs[:] = [d for d in dirs if d not in skip]
                for f in files:
                    yield os.path.join(root, f)

def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    summary = "--summary" in sys.argv
    total = 0
    per_type = {}
    for f in walk(args):
        hits = scan_file(f)
        if not hits:
            continue
        total += len(hits)
        if summary:
            counts = {}
            for n, _, _ in hits:
                counts[n] = counts.get(n, 0) + 1
                per_type[n] = per_type.get(n, 0) + 1
            print(f"{len(hits):4d}  {f}  " + ", ".join(f"{k}={v}" for k, v in sorted(counts.items(), key=lambda x: -x[1])))
        else:
            print(f"== {f}")
            for n, line, ctx in hits:
                print(f"  [{n}] L{line}: {ctx}")
    if summary:
        print("-- by type:")
        for k, v in sorted(per_type.items(), key=lambda x: -x[1]):
            print(f"  {v:5d}  {k}")
    print(f"-- {total} hits")
    sys.exit(1 if total else 0)

if __name__ == "__main__":
    main()
