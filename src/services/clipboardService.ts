// src/services/clipboardService.ts

export class ClipboardService {
  static copy(text: string): void {
    navigator.clipboard.writeText(text).then(
      () => {
        console.log("CSV copied to clipboard");
        // You can add a notification here
      },
      (err) => {
        console.error("Failed to copy CSV: ", err);
      }
    );
  }
}
