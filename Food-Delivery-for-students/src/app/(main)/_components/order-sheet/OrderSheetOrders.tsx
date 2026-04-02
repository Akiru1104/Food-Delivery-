"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderSheetOrderItem } from ".";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context";
import { fetchUserOrders, UserOrder } from "@/lib/services/get-user-orders";

export const OrderSheetOrders = () => {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState<UserOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?._id) {
      setLoading(false);
      return;
    }
    fetchUserOrders(user._id).then((data) => {
      setOrders(data);
      setLoading(false);
    });
  }, [user?._id]);

  return (
    <Card className="h-[87%]">
      <CardHeader className="p-4">
        <CardTitle>Order history</CardTitle>
      </CardHeader>

      <CardContent className="p-4 overflow-y-auto h-[calc(100%-60px)] space-y-4">
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : orders.length === 0 ? (
          <p className="text-sm text-muted-foreground">No orders yet.</p>
        ) : (
          orders.map((order) => (
            <OrderSheetOrderItem key={order._id} order={order} />
          ))
        )}
      </CardContent>
    </Card>
  );
};
