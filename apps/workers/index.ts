import {Worker } from 'bullmq'
import { redis } from '@repo/queue/queue'
import prisma from '@repo/database/client'
import fs from 'fs';
import { spawn } from 'child_process';
import path from 'path';
import { transporter } from './mailer';
import dotenv from 'dotenv';

dotenv.config();

const worker = new Worker('image-processing', async job => {

    const imagePath = job.data.filePath;
    const TId = job.data.TId;
    const branch = job.data.branch;
    const year = job.data.year;
    const date = job.data.date;
    const name = job.data.name;

    console.log("Processing job data:", job.data);
    console.log(`Processing image at path: ${imagePath}`);


    if (!fs.existsSync(imagePath)) {
        throw new Error(`Image file not found: ${imagePath}`);
    }
    const absentees = []

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const scriptPath = path.join(__dirname, 'attendance_automation_server', 'main.py');

    if (!fs.existsSync(scriptPath)) {
      throw new Error(`Python script not found: ${scriptPath}`);
    }

    const pyArgs = [
      scriptPath,
      '--year', String(year) + "_year",
      '--branch', String(branch),
      '--class-id', String(TId),
      '--teacher-id', String(TId),
      '--image-path', String(imagePath),
    ];

    console.log('Launching Python model with args:', pyArgs.join(' '));

    const pyProc = spawn('python', pyArgs, { cwd: path.join(__dirname, 'attendance_automation_server') });

    pyProc.stdout.on('data', chunk => fs.writeFileSync(path.join(__dirname, 'model_logs.txt' ), chunk.toString(), { flag: 'a' }));
    pyProc.stderr.on('data', chunk => fs.writeFileSync(path.join(__dirname, 'model_errors.txt' ), chunk.toString(), { flag: 'a' }));

    const exitCode = await new Promise<number>((resolve, reject) => {
      pyProc.on('close', code => resolve(typeof code === 'number' ? code : 0));
      pyProc.on('error', err => reject(err));
    });

    if (exitCode !== 0) {
      fs.writeFileSync(path.join(__dirname, 'model_errors.txt' ), `Python script exited with code ${exitCode}\n`, { flag: 'a' });
      throw new Error(`Python script exited with code ${exitCode}`);
    }

    const outputFilePath = path.join(__dirname, 'attendance_automation_server', 'attendance_logs' , `${TId}_${new Date().toISOString().split('T')[0]}.json`);
    if (!fs.existsSync(outputFilePath)) {
      throw new Error(`Output JSON file not found: ${outputFilePath}`);
    }

    const outputData = fs.readFileSync(outputFilePath, 'utf-8');
    const attendanceRecord = JSON.parse(outputData);
    for (const studentId of attendanceRecord.absent_students) {
      absentees.push({ enrollment_no: studentId  , date: new Date(date) , teaches_id: TId})
    }
    await prisma.absentees.createMany({
      data: absentees,
      skipDuplicates: true,
    });
    try {
      for (const absentee of absentees) {
        
        transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: `${absentee.enrollment_no}@nitdelhi.ac.in`,
          subject: `Attendance Alert for ${name} on ${date}`,
          text: `Dear Student,\n\nYou were marked absent for the class ${name} on ${date}. Please contact your teacher if you believe this is an error.\n\nBest regards,\nNITD Attendance System`,
        })
      }
    }catch (error) {
      console.error('Error sending email:', error);
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