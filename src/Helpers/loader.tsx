import { motion } from "framer-motion";

const TextLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-transparent">
      <motion.span
        className="text-3xl font-bold text-gray-700"
        animate={{
          opacity: [0.3, 1, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut",
        }}
      >
        8Cores...
      </motion.span>
    </div>
  );
};

export default TextLoader;
