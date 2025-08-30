import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const LinkedIn = "www.linkedin.com/in/ramon-adedotun-b20479305";
    return (
      <footer className="bg-blue-800 text-white text-center p-4 mt-10">
        <p>&copy; {new Date().getFullYear()} Ramon Adedotun &nbsp;  
          <Link to={LinkedIn}>LinkedIn</Link>  &nbsp;
          08109189239
        </p>
      </footer>
    );
  }
  