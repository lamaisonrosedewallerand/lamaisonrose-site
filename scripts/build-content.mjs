import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const collections = [
  {
    name: "stages",
    sourceDir: path.join(rootDir, "content/stages"),
    outputFile: path.join(rootDir, "assets/data/stages.json")
  },
  {
    name: "evenements",
    sourceDir: path.join(rootDir, "content/evenements"),
    outputFile: path.join(rootDir, "assets/data/evenements.json")
  }
];

async function main() {
  for (const collection of collections) {
    const items = await loadCollection(collection.sourceDir);
    const payload = {
      generatedAt: new Date().toISOString(),
      count: items.length,
      items
    };

    await mkdir(path.dirname(collection.outputFile), { recursive: true });
    await writeFile(collection.outputFile, `${JSON.stringify(payload, null, 2)}\n`);
    console.log(`Built ${collection.name}: ${items.length} item(s)`);
  }
}

async function loadCollection(sourceDir) {
  const entries = await readdir(sourceDir, { withFileTypes: true });
  const markdownFiles = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right));

  const items = await Promise.all(
    markdownFiles.map(async (fileName) => {
      const filePath = path.join(sourceDir, fileName);
      const raw = await readFile(filePath, "utf8");
      return parseMarkdownDocument(fileName, raw);
    })
  );

  return items;
}

function parseMarkdownDocument(fileName, rawDocument) {
  const match = rawDocument.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  const frontMatterBlock = match ? match[1] : "";
  const body = match ? match[2].trim() : rawDocument.trim();
  const frontMatter = parseFrontMatter(frontMatterBlock);
  const slug = fileName.replace(/\.md$/i, "");

  return {
    slug,
    ...frontMatter,
    image: frontMatter.image || "",
    body,
    descriptionText: markdownToPlainText(body),
    descriptionHtml: renderMarkdown(body)
  };
}

function parseFrontMatter(frontMatterBlock) {
  return frontMatterBlock.split(/\r?\n/).reduce((data, line) => {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      return data;
    }

    const separatorIndex = line.indexOf(":");

    if (separatorIndex === -1) {
      return data;
    }

    const key = line.slice(0, separatorIndex).trim();
    const rawValue = line.slice(separatorIndex + 1).trim();
    data[key] = parseScalar(rawValue);
    return data;
  }, {});
}

function parseScalar(rawValue) {
  if (!rawValue) {
    return "";
  }

  if (
    (rawValue.startsWith('"') && rawValue.endsWith('"')) ||
    (rawValue.startsWith("'") && rawValue.endsWith("'"))
  ) {
    return rawValue.slice(1, -1);
  }

  if (rawValue === "true") {
    return true;
  }

  if (rawValue === "false") {
    return false;
  }

  if (rawValue === "null") {
    return null;
  }

  if (/^-?\d+(\.\d+)?$/.test(rawValue)) {
    return Number(rawValue);
  }

  return rawValue;
}

function markdownToPlainText(markdown) {
  return markdown
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/[*_`>#-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function renderMarkdown(markdown) {
  if (!markdown.trim()) {
    return "";
  }

  const lines = markdown.split(/\r?\n/);
  const html = [];
  let paragraphLines = [];
  let inList = false;

  function flushParagraph() {
    if (!paragraphLines.length) {
      return;
    }

    html.push(`<p>${renderInline(paragraphLines.join(" "))}</p>`);
    paragraphLines = [];
  }

  function closeList() {
    if (!inList) {
      return;
    }

    html.push("</ul>");
    inList = false;
  }

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      closeList();
      continue;
    }

    if (/^###\s+/.test(trimmed)) {
      flushParagraph();
      closeList();
      html.push(`<h3>${renderInline(trimmed.replace(/^###\s+/, ""))}</h3>`);
      continue;
    }

    if (/^##\s+/.test(trimmed)) {
      flushParagraph();
      closeList();
      html.push(`<h2>${renderInline(trimmed.replace(/^##\s+/, ""))}</h2>`);
      continue;
    }

    if (/^#\s+/.test(trimmed)) {
      flushParagraph();
      closeList();
      html.push(`<h1>${renderInline(trimmed.replace(/^#\s+/, ""))}</h1>`);
      continue;
    }

    if (/^- /.test(trimmed)) {
      flushParagraph();

      if (!inList) {
        html.push("<ul>");
        inList = true;
      }

      html.push(`<li>${renderInline(trimmed.replace(/^- /, ""))}</li>`);
      continue;
    }

    closeList();
    paragraphLines.push(trimmed);
  }

  flushParagraph();
  closeList();
  return html.join("\n");
}

function renderInline(text) {
  let html = escapeHtml(text);

  html = html.replace(
    /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g,
    '<a href="$2" target="_blank" rel="noreferrer">$1</a>'
  );
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

  return html;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
