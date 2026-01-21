import {Worker } from 'bullmq'
import { redis } from '@repo/queue/queue'
import prisma from '@repo/database/client'
import fs from 'fs';
import { spawn } from 'child_process';
import path from 'path';



const worker = new Worker('image-processing', async job => {

    const imagePath = job.data.filePath;
    const TId = job.data.TId;
    const branch = job.data.branch;
    const year = job.data.year;
    const date = job.data.date;

    console.log("Processing job data:", job.data);
    console.log(`Processing image at path: ${imagePath}`);
    // Add your image processing logic here

  

    if (!fs.existsSync(imagePath)) {
        throw new Error(`Image file not found: ${imagePath}`);
    }
    const absentees = []

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    // Determine class id from job (support several possible field names)
    // Path to the Python script in the worker folder
    const scriptPath = path.join(__dirname, 'attendance_automation_server', 'main.py');

    // Ensure python script exists before spawning
    if (!fs.existsSync(scriptPath)) {
      throw new Error(`Python script not found: ${scriptPath}`);
    }

    // Build args for the Python script
    const pyArgs = [
      scriptPath,
      '--year', String(year) + "_year",
      '--branch', String(branch),
      '--class-id', String(TId),
      '--teacher-id', String(TId),
      '--image-path', String(imagePath),
    ];

    console.log('Launching Python model with args:', pyArgs.join(' '));

    // Spawn python process and wait for completion
    const pyProc = spawn('python', pyArgs, { cwd: path.join(__dirname, 'attendance_automation_server') });

    pyProc.stdout.on('data', chunk => console.log(`[python stdout] ${chunk.toString()}`));
    pyProc.stderr.on('data', chunk => console.error(`[python stderr] ${chunk.toString()}`));

    const exitCode = await new Promise<number>((resolve, reject) => {
      pyProc.on('close', code => resolve(typeof code === 'number' ? code : 0));
      pyProc.on('error', err => reject(err));
    });

    if (exitCode !== 0) {
      throw new Error(`Python script exited with code ${exitCode}`);
    }
},{
    connection: redis,
    concurrency: 4, 
  }
)

worker.on('completed', job => console.log(`Job ${job.id} completed`));
worker.on('failed', (job, err) =>
  console.error(`Job ${job?.id} failed:`, err)
);



console.log('Image processing worker started');