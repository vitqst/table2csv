// src/popup/index.ts
import { CsvConverter } from "../services/csvConverter";
import { ClipboardService } from "../services/clipboardService";
import { ExportService } from "../services/exportService";

document.addEventListener("DOMContentLoaded", () => {
  const tableList = document.getElementById("table-list");

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0] && tabs[0].id) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { message: "get_tables" },
        (response) => {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
            return;
          }
          if (tableList) {
            if (response && response.length > 0) {
              response.forEach((table: { id: string; html: string }) => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `
                  <div class="table-preview">${table.html}</div>
                  <button data-table-id="${table.id}" class="copy-csv">Copy CSV</button>
                  <button data-table-id="${table.id}" class="export-csv">Export CSV</button>
                `;
                tableList.appendChild(listItem);
              });
            } else {
              tableList.innerHTML = "<li>No tables found on this page.</li>";
            }
          }
        }
      );
    }
  });

  if (tableList) {
    tableList.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      const tableId = target.dataset.tableId;

      if (tableId) {
        const tablePreview = document.querySelector(`[data-table-id="${tableId}"]`)?.previousElementSibling;
        if (tablePreview) {
          const tableHtml = tablePreview.innerHTML;
          const csv = CsvConverter.convert(tableHtml);
          if (target.classList.contains("copy-csv")) {
            ClipboardService.copy(csv);
          } else if (target.classList.contains("export-csv")) {
            ExportService.export(csv, `table-${tableId}.csv`);
          }
        }
      }
    });
  }
});
