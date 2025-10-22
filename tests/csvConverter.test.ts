// tests/csvConverter.test.ts
import { describe, it, expect } from "vitest";
import { CsvConverter } from "../src/services/csvConverter";

describe("CsvConverter", () => {
  it("should convert a simple HTML table to a CSV string", () => {
    document.body.innerHTML = `
      <table>
        <tr>
          <th>Name</th>
          <th>Email</th>
        </tr>
        <tr>
          <td>John Doe</td>
          <td>john.doe@example.com</td>
        </tr>
      </table>
    `;
    const table = document.querySelector("table");
    const csv = CsvConverter.convert(table!.outerHTML);
    const expectedCsv = `"Name","Email"\n"John Doe","john.doe@example.com"`;
    expect(csv).toBe(expectedCsv);
  });

  it("should handle colspan and rowspan correctly", () => {
    document.body.innerHTML = `
      <table>
        <tr>
          <th rowspan="2">Name</th>
          <th colspan="2">Contact</th>
        </tr>
        <tr>
          <th>Email</th>
          <th>Phone</th>
        </tr>
        <tr>
          <td>John Doe</td>
          <td>john.doe@example.com</td>
          <td>123-456-7890</td>
        </tr>
      </table>
    `;
    const table = document.querySelector("table");
    const csv = CsvConverter.convert(table!.outerHTML);
    const expectedCsv = `"Name","Contact","Contact"\n"Name","Email","Phone"\n"John Doe","john.doe@example.com","123-456-7890"`;
    expect(csv).toBe(expectedCsv);
  });
});
