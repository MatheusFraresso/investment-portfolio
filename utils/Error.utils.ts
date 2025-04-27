import fs from "fs/promises";
import path from "path";

const errorQueue: string[] = [];
let isProcessing = false;

async function processErrorQueue() {
  if (isProcessing || errorQueue.length === 0) return;

  isProcessing = true;

  try {
    const logsDir = path.join(process.cwd(), "logs");
    await fs.mkdir(logsDir, { recursive: true });

    const logFile = path.join(logsDir, "error.log");
    const batch = errorQueue.splice(0, errorQueue.length);
    await fs.appendFile(logFile, batch.join(""));
  } catch (error) {
    console.error("Failed to write error log:", error);
  } finally {
    isProcessing = false;
    if (errorQueue.length > 0) {
      processErrorQueue();
    }
  }
}

async function recordError(error: any) {
  const timestamp = new Date().toISOString();

  const errorLog = `\n[${timestamp}] Error: ${
    error.message || "Unknown error"
  }\nStack: ${error.stack || "No stack trace"}\n\n`;

  errorQueue.push(errorLog);

  processErrorQueue();
}

process.on("beforeExit", async () => {
  if (errorQueue.length > 0) {
    await processErrorQueue();
  }
});

process.on("uncaughtException", async () => {
  const timestamp = new Date().toISOString();

  errorQueue.push(`[${timestamp}]  Uncaught exception \n\n`);

  await processErrorQueue();
});

export { recordError };
