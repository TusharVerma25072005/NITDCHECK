'use client';

import { useState } from 'react';
import Login from './login';
import Button from './button';
import { Menu, X } from 'lucide-react'; 
import { signOut } from 'next-auth/react';

export default function Topbar({session} : {session: any}) {
  
  const [showLogin, setShowLogin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="text-2xl font-bold">NITDCHECK</div>

        <div className="hidden md:flex gap-6 items-center">
          <a href="#home" className="hover:text-blue-600">Home</a>
          <a href="#about" className="hover:text-blue-600">About</a>
          <a href="#calendar" className="hover:text-blue-600">Calendar</a>
          {!session && (
            <Button onClick={() => setShowLogin(true)} light={false}>
              Login
            </Button>
          )}
          {session && (
            <Button onClick={() => signOut()} light={false}>
              Logout
            </Button>
          )}
        </div>

        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4 bg-white shadow-md">
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#calendar" onClick={() => setMenuOpen(false)}>Calendar</a>
          <Button onClick={() => { setShowLogin(true); setMenuOpen(false); }} light={false}>
            Login
          </Button>
        </div>
      )}

      {showLogin && <Login setShowLogin={setShowLogin} />}
    </nav>
  );
}
