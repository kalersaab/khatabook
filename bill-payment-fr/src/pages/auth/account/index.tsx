import { useState } from 'react';
import { motion } from 'framer-motion';
import { JSX } from 'react/jsx-runtime';

export default function AuthForm(): JSX.Element {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  return (
    <div className="relative w-96 mx-auto mt-10">
      <motion.div
        initial={{ rotateY: 0 }}
        animate={{ rotateY: isLogin ? 0 : 180 }}
        transition={{ duration: 0.5 }}
        className="relative preserve-3d"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="absolute w-full backface-hidden" style={{ backfaceVisibility: 'hidden' }}>
          <div className="p-4 flex flex-col bg-white shadow-lg rounded-lg">
            <h2 className="text-center text-lg font-bold">Login</h2>
            <label>Username
              <input type="text" className="shadow-md rounded-2xl p-2 w-full mb-4" placeholder="Username" />
            </label>
            <label>Password
              <input type="password" className="shadow-md rounded-2xl p-2 w-full mb-4" placeholder="Password" />
            </label>
            <div className="flex justify-end p-2">
              <span className="hover:text-amber-500 cursor-pointer text-sm">Forget password?</span>
            </div>
            <button className="shadow-md rounded-2xl p-2 w-full bg-amber-400 hover:bg-amber-500">Login</button>
            <div className="flex justify-center p-2">
              <span className="hover:text-amber-500 cursor-pointer text-sm" onClick={() => setIsLogin(false)}>Don't have an account? <span className="text-blue-500">Register</span></span>
            </div>
          </div>
        </div>
        
        <div className="absolute w-full backface-hidden" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
          <div className="p-4 flex flex-col bg-white shadow-lg rounded-lg">
            <h2 className="text-center text-lg font-bold">Register</h2>
            <label>Email
              <input type="email" className="shadow-md rounded-2xl p-2 w-full mb-4" placeholder="Email" />
            </label>
            <label>Username
              <input type="text" className="shadow-md rounded-2xl p-2 w-full mb-4" placeholder="Username" />
            </label>
            <label>Password
              <input type="password" className="shadow-md rounded-2xl p-2 w-full mb-4" placeholder="Password" />
            </label>
            <button className="shadow-md rounded-2xl p-2 w-full bg-green-400 hover:bg-green-500">Register</button>
            <div className="flex justify-center p-2">
              <span className="hover:text-green-500 cursor-pointer text-sm" onClick={() => setIsLogin(true)}>Already have an account? <span className="text-blue-500">Login</span></span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
