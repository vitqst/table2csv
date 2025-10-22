// src/services/csvConverter.ts
export class CsvConverter {
  static convert(tableHtml: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(tableHtml, "text/html");
    const table = doc.querySelector("table");
    if (!table) {
      return "";
    }

    const grid: (string | null)[][] = [];
    const rows = Array.from(table.querySelectorAll("tr"));

    rows.forEach((row, rowIndex) => {
      let gridColIndex = 0;
      const cells = Array.from(row.querySelectorAll("th, td"));
      cells.forEach((cell) => {
        if (!grid[rowIndex]) {
          grid[rowIndex] = [];
        }
        while (grid[rowIndex][gridColIndex]) {
          gridColIndex++;
        }

        const colspan = parseInt(cell.getAttribute("colspan") || "1", 10);
        const rowspan = parseInt(cell.getAttribute("rowspan") || "1", 10);
        let cellText = cell.textContent || "";
        cellText = cellText.replace(/"/g, '""'); // Escape double quotes
        cellText = `"${cellText.trim()}"`;

        for (let i = 0; i < rowspan; i++) {
          for (let j = 0; j < colspan; j++) {
            const R = rowIndex + i;
            const C = gridColIndex + j;
            if (!grid[R]) {
              grid[R] = [];
            }
            grid[R][C] = cellText;
          }
        }
        gridColIndex += colspan;
      });
    });

    return grid
      .map((row) =>
        row
          .filter((cell) => cell !== null)
          .join(",")
      )
      .join("\n");
  }
}
