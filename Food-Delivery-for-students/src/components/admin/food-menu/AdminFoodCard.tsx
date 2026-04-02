import { Trash2 } from "lucide-react";
import { deleteFood } from "@/lib/services/delete-food";

type AdminFoodCardProps = {
  _id: string;
  image: string;
  foodName: string;
  ingredients: string;
  price: number;
  onDeleted?: () => void;
};

export const AdminFoodCard = ({
  _id,
  image,
  foodName,
  ingredients,
  price,
  onDeleted,
}: AdminFoodCardProps) => {
  const handleDelete = async () => {
    await deleteFood(_id);
    onDeleted?.();
  };

  return (
    <div className="border rounded-[20px] p-4 border-border bg-background bg-blue-30 flex flex-col gap-5 min-w-full">
      <div
        className="bg-cover bg-center w-full h-[129px] rounded-xl flex justify-end items-end p-5"
        style={{
          backgroundImage: `url(${image})`,
        }}
      />

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <p className="text-[#EF4444] text-sm font-medium">{foodName}</p>
          <div className="flex items-center gap-2">
            <p className="text-xs">₮{price}</p>
            <button onClick={handleDelete}>
              <Trash2 size={14} color="#EF4444" />
            </button>
          </div>
        </div>
        <p className="text-xs">{ingredients}</p>
      </div>
    </div>
  );
};
