import { Plus, Minus } from "lucide-react";

const Counter = ({
  //productId,
  quantity,
  onChange,
  onEditCart,
}: {
  productId: string;
  quantity: number;
  onChange: (newQuantity: number) => void;
  onEditCart?: (operation: 1 | -1) => void;
}) => {
  const increment = () => {
    if (quantity < 5) {
      onChange(quantity + 1);
      onEditCart?(1):"";
    }
  };

  const decrement = () => {
    if (quantity > 0) {
      onChange(quantity - 1);
      onEditCart?(-1):"";
    }
  };

  return (
    <div className="flex justify-start   items-center space-x-3">
      <button
        onClick={decrement}
        className="w-8 h-8 flex items-center justify-center border rounded bg-background-300 hover:bg-background-400"
      >
        <Minus size={16} />
      </button>
      <span className="text-lg text-text-900 font-medium">{quantity}</span>
      <button
        onClick={increment}
        className="w-8 h-8 flex items-center justify-center border rounded bg-background-300 hover:bg-background-400"
      >
        <Plus size={16} />
      </button>
    </div>
  );
};

export default Counter;
