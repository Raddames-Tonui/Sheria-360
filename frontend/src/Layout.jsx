import React from 'react';
import Navbar from './components/NavBar';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="h-screen overflow-y-scroll no-scrollbar">
         <Navbar />
     
      {/* Toaster below the Navbar */}
      <Toaster
        position="top-right"
        reverseOrder={true}
        containerStyle={{ top: '10vh' }}  
        toastOptions={{
          style: {
            zIndex: 100,
            background: '#fff',
            color: '#333',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '10px',
          },
          success: {
            duration: 4000,
            style: {
              background: '#d4edda',
              color: '#155724',
            },
          },
          error: {
            duration: 4000,
            style: {
              background: '#f8d7da',
              color: '#721c24',
            },
          },
        }}
      />
        <Outlet />
 
      
    </div>
  );
}

export default Layout;
