import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Footer from "../component/Footer";
import NavBar from "../component/NavBar";

export default function NotFound() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 600);
    const t2 = setTimeout(() => setStage(2), 1400);
    const t3 = setTimeout(() => setStage(3), 2200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black overflow-hidden relative">
        <NavBar />
      {/* falling papers */}
      <motion.div
        initial={{ y: -200, opacity: 0 }}
        animate={{ y: stage >= 1 ? 0 : -200, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute w-10 h-14 bg-white rounded shadow-md left-[40%]"
      />

      <motion.div
        initial={{ y: -200, opacity: 0 }}
        animate={{ y: stage >= 1 ? 50 : -200, opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute w-10 h-14 bg-white rounded shadow-md left-[50%]"
      />

      <motion.div
        initial={{ y: -200, opacity: 0 }}
        animate={{ y: stage >= 1 ? 100 : -200, opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute w-10 h-14 bg-white rounded shadow-md left-[60%]"
      />

      {/* folded paper */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: stage >= 2 ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        className="absolute w-24 h-24 bg-gray-200 rounded-md shadow-xl"
      />

      {/* opening effect */}
      <motion.div
        initial={{ rotateY: 90, opacity: 0 }}
        animate={{ rotateY: stage >= 3 ? 0 : 90, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute text-center"
      >
        <h1 className="text-4xl font-bold text-white mb-2">
          Page Not Found
        </h1>
        <p className="text-gray-300">
          The page you are looking for doesn’t exist
        </p>
      </motion.div>
      <Footer />
    </div>
  );
}