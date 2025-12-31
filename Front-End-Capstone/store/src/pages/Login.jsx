import React, { useState } from "react";

function Login() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#FAF9F6] text-[#0B4A8C]">
      <div className="p-10 bg-white shadow-xl rounded-lg border-t-4 border-[#C5A059] text-center">
        <h1 className="text-4xl font-serif mb-4">Prince & Princess Store</h1>
        <p className="text-gray-600 mb-6">If you can see this, the React Router is working!</p>
        
        <div className="space-y-4">
          <button 
            onClick={() => setCount(count + 1)}
            className="px-6 py-2 bg-[#0B4A8C] text-white rounded-full hover:bg-opacity-90 transition-all"
          >
            Test State: {count}
          </button>
          
          <div className="flex flex-col gap-2 text-sm">
            <p className="text-green-600 font-bold">✓ Vite Build Successful</p>
            <p className="text-green-600 font-bold">✓ Layout Wrapper Active</p>
            <p className="text-amber-600">Next Step: Reconnect Auth Store</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;