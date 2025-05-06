import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

interface CartIconProps {
  itemCount: number;
  onClick: () => void;
}

const CartIcon = ({ itemCount, onClick }: CartIconProps) => {
  return (
    <motion.div
      className="relative cursor-pointer  rounded-full  hover:text-primary-700"
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
    >
      <ShoppingCart size={24} className="text-accent-900 " />
      {itemCount > 0 && (
        <motion.span
          key={itemCount}
          className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          {itemCount}
        </motion.span>
      )}
    </motion.div>
  );
};
export default CartIcon;
