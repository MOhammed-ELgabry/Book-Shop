import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Home, BookOpen } from "lucide-react";
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
    <div className="w-full min-h-screen flex flex-col justify-between bg-gradient-to-b from-slate-950 via-slate-900 to-black overflow-hidden relative text-white">
      <NavBar />

      {/* Decorative glowing background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[500px] h-[350px] md:h-[500px] bg-orange-500/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Falling background papers */}
      <motion.div
        initial={{ y: -200, opacity: 0, rotate: -15 }}
        animate={{ y: stage >= 1 ? 0 : -200, opacity: stage >= 1 ? 0.7 : 0, rotate: stage >= 1 ? -12 : -15 }}
        transition={{ duration: 0.8 }}
        className="absolute w-12 h-16 bg-white rounded-lg shadow-lg left-[10%] md:left-[22%] top-[25%] p-2 flex flex-col gap-1 pointer-events-none select-none z-0"
      >
        <div className="w-6 h-1.5 bg-orange-450 rounded-sm" />
        <div className="w-8 h-1 bg-slate-200 rounded-sm" />
        <div className="w-5 h-1 bg-slate-200 rounded-sm" />
        <div className="w-7 h-1 bg-slate-200 rounded-sm" />
      </motion.div>

      <motion.div
        initial={{ y: -200, opacity: 0, rotate: 15 }}
        animate={{ y: stage >= 1 ? 40 : -200, opacity: stage >= 1 ? 0.7 : 0, rotate: stage >= 1 ? 8 : 15 }}
        transition={{ duration: 1 }}
        className="absolute w-12 h-16 bg-white rounded-lg shadow-lg right-[10%] md:right-[22%] top-[30%] p-2 flex flex-col gap-1 pointer-events-none select-none z-0"
      >
        <div className="w-5 h-1.5 bg-orange-500 rounded-sm" />
        <div className="w-8 h-1 bg-slate-200 rounded-sm" />
        <div className="w-6 h-1 bg-slate-200 rounded-sm" />
        <div className="w-7 h-1 bg-slate-200 rounded-sm" />
      </motion.div>

      <motion.div
        initial={{ y: -200, opacity: 0, rotate: -30 }}
        animate={{ y: stage >= 1 ? 80 : -200, opacity: stage >= 1 ? 0.7 : 0, rotate: stage >= 1 ? -6 : -30 }}
        transition={{ duration: 1.2 }}
        className="absolute w-12 h-16 bg-white rounded-lg shadow-lg left-[15%] md:left-[28%] bottom-[25%] p-2 flex flex-col gap-1 pointer-events-none select-none z-0"
      >
        <div className="w-7 h-1.5 bg-slate-450 rounded-sm" />
        <div className="w-6 h-1 bg-slate-200 rounded-sm" />
        <div className="w-8 h-1 bg-slate-200 rounded-sm" />
        <div className="w-5 h-1 bg-slate-200 rounded-sm" />
      </motion.div> 

      {/* Centered Content Stack */}
      <div className="flex-grow flex flex-col items-center justify-center px-6 py-20 text-center relative z-10 max-w-2xl mx-auto w-full">
        {/* Beautiful book model representing the folded paper */}
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: stage >= 2 ? 1 : 0, rotate: stage >= 2 ? 0 : -10 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="relative w-28 h-28 md:w-32 md:h-32 mb-6 flex items-center justify-center select-none"
        >
          {/* Glowing book glow */}
          <div className="absolute inset-0 bg-orange-500/10 rounded-full filter blur-xl animate-pulse pointer-events-none" />

          {/* Book cover shadow layer */}
          <div className="absolute w-24 h-24 bg-orange-800 rounded-2xl shadow-2xl" />

          {/* Main Book Body Container */}
          <div className="relative w-24 h-20 bg-orange-600 rounded-xl shadow-lg border border-orange-500/30 flex p-[3px]">
            {/* Left Page Page Stack (curved effect) */}
            <div className="w-1/2 h-full bg-slate-100 rounded-l-lg border-r border-slate-200/50 flex flex-col justify-center px-2 gap-1 shadow-[inset_-2px_0_4px_rgba(0,0,0,0.05)]">
              <div className="w-full h-0.5 bg-slate-300 rounded-sm" />
              <div className="w-[80%] h-0.5 bg-slate-300 rounded-sm" />
              <div className="w-[90%] h-0.5 bg-slate-300 rounded-sm" />
            </div>

            {/* Right Page Page Stack */}
            <div className="w-1/2 h-full bg-white rounded-r-lg border-l border-slate-200/50 flex flex-col justify-center px-2 gap-1 shadow-[inset_2px_0_4px_rgba(0,0,0,0.05)]">
              <div className="w-full h-0.5 bg-slate-300 rounded-sm" />
              <div className="w-[70%] h-0.5 bg-slate-300 rounded-sm" />
              <div className="w-[85%] h-0.5 bg-slate-300 rounded-sm" />
            </div>

            {/* Spine Shadow / Depth overlay */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[4px] bg-gradient-to-r from-slate-300/40 via-slate-400/20 to-slate-300/40" />

            {/* Ribbon bookmark */}
            <div className="absolute left-[52%] -translate-x-1/2 top-0 h-[110%] w-2 bg-orange-500 rounded-b shadow-md z-10" />
          </div>

          {/* Question mark overlay floating above */}
          <div className="absolute z-20 bg-slate-900 border border-slate-800 text-orange-500 font-black text-2xl w-10 h-10 rounded-xl shadow-lg flex items-center justify-center -bottom-1 -right-1 transform rotate-6 animate-bounce">
            ?
          </div>
        </motion.div>

        {/* Text Details & Navigation Buttons */}
        <motion.div
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: stage >= 3 ? 0 : 90, opacity: stage >= 3 ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          {/* Badge */}
          <span className="px-3 py-1 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-full text-xs font-black uppercase tracking-widest mb-4">
            Error 404
          </span>

          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Page Not Found
          </h1>

          <p className="text-slate-400 text-base md:text-lg font-medium max-w-md mx-auto leading-relaxed mb-8">
            The page you are looking for doesn’t exist. Let's get you back to discovering great books!
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-sm sm:max-w-md mx-auto">
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold rounded-2xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/35 transition-all duration-300 text-base font-sans"
            >
              <Home size={18} />
              Back Home
            </Link>
            <Link
              to="/books"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/15 active:scale-95 text-white border border-white/10 hover:border-white/20 font-bold rounded-2xl shadow-lg transition-all duration-300 text-base font-sans"
            >
              <BookOpen size={18} />
              Browse Books
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Dummy footer space matching standard layout flow */}
      <div className="h-10 w-full pointer-events-none" />
    </div>
  );
}
