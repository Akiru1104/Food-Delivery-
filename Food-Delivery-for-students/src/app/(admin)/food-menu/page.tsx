"use client";

import { AdminFoodsSection } from "@/components/admin/food-menu/AdminFoodsSection";
import { DishesCategory } from "@/components/admin/food-menu/DishesCategory";
import { useState } from "react";

export default function AdminFoodMenu() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => setRefreshKey((prev) => prev + 1);

  return (
    <div className="w-full bg-secondary flex flex-col gap-5 h-full p-6">
      <DishesCategory key={refreshKey} onRefresh={handleRefresh} />
      <AdminFoodsSection key={`foods-${refreshKey}`} onRefresh={handleRefresh} />
    </div>
  );
}
