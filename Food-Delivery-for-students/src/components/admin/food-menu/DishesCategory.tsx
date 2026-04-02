"use client";

import { fetchCategoriesWithCount } from "@/lib";
import { useEffect, useState } from "react";
import { DishesCategorySkeleton } from "./DishesCategorySkeleton";
import { AddCategoryModal } from "./AddCategoryModal";
import { Pencil, Trash2, Check, X } from "lucide-react";
import { updateCategory, deleteCategory } from "@/lib/services";
import { toast } from "sonner";

export type CategoryWithCount = {
  _id: string;
  categoryName: string;
  count: number;
};

export const DishesCategory = ({ onRefresh }: { onRefresh?: () => void }) => {
  const [categories, setCategories] = useState<CategoryWithCount[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const { data } = await fetchCategoriesWithCount();
    setCategories(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <DishesCategorySkeleton />;

  const allDishesCount = categories.reduce((acc, c) => acc + c.count, 0);

  const handleEditStart = (category: CategoryWithCount) => {
    setEditingId(category._id);
    setEditValue(category.categoryName);
  };

  const handleEditSave = async (id: string) => {
    if (!editValue.trim()) return;
    try {
      await updateCategory(id, editValue.trim());
      setCategories((prev) =>
        prev.map((c) => (c._id === id ? { ...c, categoryName: editValue.trim() } : c))
      );
      toast.success("Category updated.");
    } catch {
      toast.error("Failed to update category.");
    }
    setEditingId(null);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id);
      setCategories((prev) => prev.filter((c) => c._id !== id));
      toast.success("Category deleted.");
      onRefresh?.();
    } catch {
      toast.error("Failed to delete category.");
    }
  };

  return (
    <div className="flex flex-col gap-4 p-6 bg-background rounded-xl">
      <p className="text-xl font-semibold">Dishes category</p>
      <div className="flex flex-wrap gap-3">
        <div className="flex gap-2 px-4 py-2 border rounded-full">
          <p className="text-sm font-medium">All dishes</p>
          <p className="text-xs bg-black text-white rounded-full px-2 py-[2px] flex items-center font-semibold">
            {allDishesCount}
          </p>
        </div>

        {categories.map((category) => (
          <div key={category._id} className="flex items-center gap-1 px-3 py-1.5 border rounded-full group">
            {editingId === category._id ? (
              <>
                <input
                  className="text-sm font-medium outline-none w-24 bg-transparent"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleEditSave(category._id);
                    if (e.key === "Escape") setEditingId(null);
                  }}
                  autoFocus
                />
                <button onClick={() => handleEditSave(category._id)}>
                  <Check size={14} className="text-green-500" />
                </button>
                <button onClick={() => setEditingId(null)}>
                  <X size={14} className="text-gray-400" />
                </button>
              </>
            ) : (
              <>
                <p className="text-sm font-medium">{category.categoryName}</p>
                <p className="text-xs bg-black text-white rounded-full px-2 py-[2px] flex items-center font-semibold">
                  {category.count}
                </p>
                <button
                  onClick={() => handleEditStart(category)}
                  className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Pencil size={13} className="text-gray-400 hover:text-gray-600" />
                </button>
                <button
                  onClick={() => handleDelete(category._id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={13} className="text-gray-400 hover:text-red-500" />
                </button>
              </>
            )}
          </div>
        ))}

        <AddCategoryModal onCreated={fetchData} />
      </div>
    </div>
  );
};
