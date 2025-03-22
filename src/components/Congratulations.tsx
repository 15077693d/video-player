import { motion } from 'framer-motion';

interface CongratulationsProps {
  onBack: () => void;
}

export function Congratulations({ onBack }: CongratulationsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 flex items-center justify-center bg-black/80"
    >
      <div className="text-center">
        <motion.h2
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="text-4xl font-bold text-white mb-8"
        >
          🎉 Congratulations! 🎉
        </motion.h2>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-white/80 mb-8"
        >
          You've completed the timer session!
        </motion.p>

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 rounded-lg text-lg font-medium hover:from-purple-600 hover:to-blue-600"
          onClick={onBack}
        >
          Back to Start
        </motion.button>
      </div>
    </motion.div>
  );
}