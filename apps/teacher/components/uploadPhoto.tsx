"use client";
import React, { useState } from "react";
import { Camera } from "lucide-react";

export default function UploadClassPhoto( {teachesId , date , dept , semester } : {teachesId: string , date?: string , dept?: string , semester : number  } ) {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0] ?? null);
    }
  };

  const handleFileUpload = () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("dept", dept || "");
    formData.append("year", (Math.ceil(semester/2)).toString() || "");
    formData.append("file", file);
    formData.append("teachesId", teachesId);
    async function upload() {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        console.error('Upload failed');
      }
    }
    upload();
    console.log("Uploading file:", file);
  }

  return (
    <div className="p-8 border rounded-lg bg-white w-3/4 mx-auto my-4">
      <h2 className="text-xl font-bold mb-4">Upload Class Photo</h2>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400">
        <Camera className="w-10 h-10 mx-auto text-gray-600" />
        <p className="mt-2 font-medium">Drop your class photo here</p>
        <p className="text-sm text-gray-500">or click to browse files</p>

        <label className="mt-4 inline-block">
          <input type="file" className="hidden" onChange={handleFileChange} />
          <span className="mx-2 px-4 py-2 bg-black text-white rounded-md cursor-pointer inline-block mt-2">
            Choose File
          </span>
        </label>
          {file &&
            <span className="mx-2 px-4 py-2 bg-black text-white rounded-md cursor-pointer inline-block mt-2" onClick={handleFileUpload}>
            Upload File
          </span>
          }

        {file && (
          <p className="mt-2 text-sm text-gray-600">Selected: {file.name}</p>
          
        )}
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mt-6">
        <h3 className="font-semibold mb-2">How it works:</h3>
        <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
          <li>Take a clear photo of your entire class</li>
          <li>Upload the photo using drag-and-drop or file browser</li>
          <li>Click "Process Attendance" to run face recognition</li>
          <li>Review and confirm the attendance results</li>
        </ol>
      </div>
    </div>
  );
}
