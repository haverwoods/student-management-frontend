import { motion } from "framer-motion";

const StatCard = ({
  name,
  icon: Icon,
  icon2: Icon2,
  value,
  color,
  color2,
  bgcolor,
}) => {
  return (
    <motion.div
      className="bg-[#222222] bg-opacity-50 backdrop-blur-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all rounded-2xl border border-[#2A2A2A]"
      whileHover={{ y: -5 }}
    >
      <div className="p-6">
        <span className="flex items-center text-sm font-medium text-[#B0B0B0]">
          <Icon size={30} className="mr-2" style={{ color2 }} />
          {name}
        </span>
        <div className="flex items-center justify-between mt-4">
          <p className="mt-2 text-2xl font-bold text-[#FFFFFF]">{value}</p>
          {/* <Icon2 size={37} className=' mr-2  ' style={{ color }} /> */}
          <div style={{backgroundColor: bgcolor}} className=" p-2  rounded-xl">
            <Icon2 size={37} style={{ color }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
