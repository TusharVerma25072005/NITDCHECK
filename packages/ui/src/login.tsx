"use client"
import React, { useState } from "react";
import Button from "./button";
import { signIn } from "next-auth/react";

export default function Login({setShowLogin} : {setShowLogin: React.Dispatch<React.SetStateAction<boolean>>}) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="fixed inset-0 flex  items-center justify-center bg-gray-900 bg-opacity-50 z-50" onClick={() => setShowLogin(false)}>
      <div className="flex items-center justify-center  bg-gray-100 opacity-100 rounded-lg" onClick={(e) => e.stopPropagation()}>
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Login</h2>
            <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowLogin(false)}>&times;</button>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Enter your id and password to access your attendance records.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">ID</label>
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="Enter your ID"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border rounded-md px-3 py-2 bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex justify-center py-3">
              <Button onClick={() => { signIn("credentials", { id, password }); }} light={false}>
                Sign In
              </Button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}
