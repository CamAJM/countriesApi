// AI-Generated

import tableColumns from "./tableCols.js";

const escapeHtml = (s) =>
    s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#39;");

const isObject = (v) =>
    v !== null && typeof v === "object" && !Array.isArray(v);

// render a single table cell using column definition and country data
const renderCell = (country, col) => {
    let value = country[col.key];

    // apply optional formatter (with safe fallback)
    if (col.format) {
        try {
            value = col.format(value);
        } catch {
            value = "";
        }
    } else if (Array.isArray(value)) {
        value = value.join(", ");
    } else if (isObject(value)) {
        value = Object.values(value).join(", ");
    }

    const text = String(value);
    return `<td>${col.htmlOnly ? text : escapeHtml(text)}</td>`;
};

const renderRow = (country) => {
    const cells = tableColumns.map((col) => renderCell(country, col)).join("");
    return `<tr>${cells}</tr>`;
};

const renderHeader = () => {
    const headers = tableColumns
        .map((col) => `<th>${escapeHtml(col.displayName)}</th>`)
        .join("");
    return `<tr>${headers}</tr>`;
};

export const createTable = (countries) => {
    const thead = `<thead>${renderHeader()}</thead>`;
    const tbody = `<tbody>${countries.map(renderRow).join("")}</tbody>`;
    const table = `<table>\n${thead}\n${tbody}\n</table>`;

    const timestamp = new Date().toLocaleString();
    const heading = `<h1>European Countries</h1>`;
    const timestampText = `<p><em>Generated on ${escapeHtml(timestamp)}</em></p>`;

    return `<!DOCTYPE html>\n<html>\n<head>\n<title>European Countries</title>\n<meta charset="UTF-8">\n<style>\nbody { font-family: 'Segoe UI', Tahoma, Geneva, sans-serif; margin: 40px; background-color: #f5f5f5; color: #333; }\nh1 { color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px; }\np { color: #7f8c8d; font-size: 14px; }\ntable { border-collapse: collapse; width: 100%; background-color: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }\nthead { background-color: #3498db; color: white; }\nth { padding: 14px 16px; text-align: left; font-weight: 600; }\ntd { padding: 12px 16px; border-bottom: 1px solid #e0e0e0; }\ntbody tr { transition: background-color 0.2s; }\ntbody tr:hover { background-color: #e8f4f8; }\ntbody tr:nth-child(odd) { background-color: #fafafa; }\ntbody tr:nth-child(even) { background-color: #ffffff; }\n</style>\n</head>\n<body>\n${heading}\n${timestampText}\n${table}\n</body>\n</html>`;
};
