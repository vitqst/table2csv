// src/content/index.ts

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "get_tables") {
    const tables = document.querySelectorAll("table");
    const tableData = Array.from(tables).map((table, index) => {
      return {
        id: `table-${index}`,
        html: table.outerHTML,
      };
    });
    sendResponse(tableData);
  }
  return true; // Keep the message channel open for the asynchronous response
});
