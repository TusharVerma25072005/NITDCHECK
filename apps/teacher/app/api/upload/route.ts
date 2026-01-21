import {writeFile, mkdir} from "fs/promises"
import {imageQueue} from '@repo/queue/queue'
import path from 'path';

export async function POST(req : Request){
    const data = await req.formData();
    const file = data.get('file') as File;
    const teachesId = data.get('teachesId') as string;
    const branch = data.get('dept') as string;
    const year = data.get('year') as string;
    const name = data.get('name') as string;
    console.log(name)
    if(!file || !teachesId || !branch || !year){
        return new Response('Missing parameters ', {status: 400});
    }
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const byteData = await file.arrayBuffer();
    const buffer = Buffer.from(byteData);

    const imagesDir = path.join(
        'D:',
        'Projects',
        'NITDCheck',
        'apps',
        'workers',
        'attendance_automation_server',
        'attendance_logs',
        'images'
    );
    await mkdir(imagesDir, { recursive: true });
    const filename = `${teachesId}-${todayStr}.png`;
    const currPath = path.join(imagesDir, filename);
    await writeFile(currPath, buffer);
    

    // await imageQueue.add('image-processing', {
    //     TId : teachesId,
    //     branch  : branch,
    //     year : year,
    //     date: todayStr,
    //     filePath: currPath,
    //     name : name
    // });

    // console.log(`Enqueued image processing job for teachesId: ${teachesId} on date: ${todayStr}`);
    return new Response('File uploaded successfully', {status: 200});
}