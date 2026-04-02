import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createFood } from "@/lib/services/create-food";
import { ChangeEvent, useState } from "react";
import { ImageUploader } from "./ImageUploader";

type AddFoodModalProps = {
  categoryName: string;
  categoryId: string;
  onCreated?: () => void;
};

type FoodInfo = {
  foodName: string;
  price: string;
  ingredients: string;
  category: string;
};

export const AddFoodModal = ({
  categoryName,
  categoryId,
  onCreated,
}: AddFoodModalProps) => {
  const [foodInfo, setFoodInfo] = useState<FoodInfo>({
    foodName: "",
    price: "",
    ingredients: "",
    category: categoryId,
  });
  const [imgFile, setImgFile] = useState<File | undefined>(undefined);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setFoodInfo((prevFoodInfo) => ({
      ...prevFoodInfo,
      [name]: value,
    }));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setImgFile(file);
  };

  const handleCreateFood = async () => {
    let imageBase64 = "";
    if (imgFile) {
      imageBase64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(imgFile);
      });
    }

    await createFood({
      ...foodInfo,
      price: parseFloat(foodInfo.price) || 0,
      image: imageBase64,
    });

    setFoodInfo({
      foodName: "",
      price: "",
      ingredients: "",
      category: categoryId,
    });
    setImgFile(undefined);
    onCreated?.();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="custom-dashed-border rounded-3xl bg-background h-[227px] flex flex-col gap-6 justify-center items-center m-1">
          <Button className="bg-red-500 rounded-full w-9 h-9">
            <Plus width={16} height={16} strokeWidth={1} />
          </Button>
          <p className="text-sm text-center w-36">
            Add new Dish to {categoryName}
          </p>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] flex flex-col gap-6">
        <div className="flex items-center justify-between mb-4">
          <DialogTitle>Add new Dish to {categoryName}</DialogTitle>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="rounded-full w-9 h-9"
            >
              <X strokeWidth={1} />
            </Button>
          </DialogClose>
        </div>
        <div className="flex w-full gap-6">
          <div className="flex flex-col w-1/2 gap-2">
            <Label htmlFor="foodName" className="ml-1 font-semibold">
              Food name
            </Label>
            <Input
              name="foodName"
              placeholder="Type food name..."
              value={foodInfo.foodName}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col w-1/2 gap-2">
            <Label htmlFor="price" className="font-semibold">
              Food price
            </Label>
            <Input
              name="price"
              type="number"
              placeholder="Enter price..."
              value={foodInfo.price}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="ingredients" className="font-semibold">
            Ingredients
          </Label>
          <Input
            name="ingredients"
            placeholder="List ingredients..."
            value={foodInfo.ingredients}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="font-semibold">Food image</Label>
          <ImageUploader imgFile={imgFile} onFileChange={handleFileChange} />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" className="mt-4" onClick={handleCreateFood}>
              Add Dish
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
