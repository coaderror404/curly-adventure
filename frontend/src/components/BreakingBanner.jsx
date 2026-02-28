import { motion } from 'framer-motion';

export const BreakingBanner = () => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-brandRed px-4 py-2 text-sm font-semibold text-white"
  >
    Breaking: Fed rate expectations shift risk appetite across global trading desks.
  </motion.div>
);
