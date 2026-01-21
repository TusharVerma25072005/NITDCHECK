import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const WORKER_COUNT =  Number(process.env.NUM_WORKERS) || 4;
//change as needed

for (let i = 0; i < WORKER_COUNT; i++) {
  const worker = spawn(
    "tsx watch index.ts",
    {
      shell: true, 
      // stdio: "inherit",
      env: {
        ...process.env,
        WORKER_ID: String(i),
      },
      stdio: ["ignore", "pipe", "pipe"],
    }
  );

  worker.stdout.on("data", (data) => {
    // process.stdout.write(`[worker-${i}] ${data}`);
    fs.writeFileSync(path.join(__dirname, 'worker_logs.txt' ), `[worker-${i}] ${data}`, { flag: 'a' });
  });
  
  worker.stderr.on("data", (data) => {
    // process.stderr.write(`[worker-${i} ERROR] ${data}`);
    fs.writeFileSync(path.join(__dirname, 'worker_errors.txt' ), `[worker-${i} ERROR] ${data}`, { flag: 'a' });
  });
  
  worker.on("error", (err) => {
    // console.error(`Worker ${i} failed`, err);
    fs.writeFileSync(path.join(__dirname, 'worker_errors.txt' ), `Worker ${i} failed: ${err}\n`, { flag: 'a' });
  });

  worker.on("exit", (code) => {
    console.log(`Worker ${i} exited with code ${code}`);
  });
}
