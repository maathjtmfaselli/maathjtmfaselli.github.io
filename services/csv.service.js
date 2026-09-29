export async function loadCsv(path, separator = ",") {
  const text = await fetch(path)
    .then(r => r.text());

  const rows = parseCsv(text, separator);

  const headers = rows[0];

  return rows.slice(1).map(row => {
    const obj = {};

    headers.forEach((header, i) => {
      obj[header.trim()] = row[i]?.trim();
    });

    return obj;
  });
}

function parseCsv(text, separator = ",") {
  const rows = [];
  let row = [];
  let field = "";
  let insideQuotes = false;
  let fieldStarted = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"' && !fieldStarted) {
      insideQuotes = true;
      fieldStarted = true;

    } else if (char === '"' && insideQuotes) {
      if (nextChar === '"') {
        field += '"';
        i++;
      } else {
        insideQuotes = false;
      }

    } else if (char === separator && !insideQuotes) {
      row.push(field);
      field = "";
      fieldStarted = false;

    } else if (
      (char === "\n" || char === "\r") &&
      !insideQuotes
    ) {
      if (char === "\r" && nextChar === "\n") {
        i++;
      }

      row.push(field);
      rows.push(row);

      row = [];
      field = "";
      fieldStarted = false;

    } else {
      field += char;
      fieldStarted = true;
    }
  }

  row.push(field);

  if (row.length > 1 || row[0] !== "") {
    rows.push(row);
  }

  return rows;
}
