export async function loadCsv(path, separator = ",") {

  const text = await fetch(path)
    .then(r => r.text());

  const rows = text
    .trim()
    .split("\n")
    .map(r => r.split(separator));

  const headers = rows[0];

  return rows.slice(1).map(row => {

    const obj = {};

    headers.forEach((header, i) => {
      obj[header.trim()] = row[i]?.trim();
    });

    return obj;
  });
}