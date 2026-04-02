import { Badge } from "@/components/ui/badge";
import { Map, Soup, Timer } from "lucide-react";
import { UserOrder } from "@/lib/services/get-user-orders";
import { useContext } from "react";
import { UserContext } from "../../context";
import { formatMoney } from "@/lib";

const STATUS_LABEL: Record<string, { label: string; color: string }> = {
  PENDING: { label: "Preparing", color: "border-red-500 text-red-500" },
  DELIVERED: { label: "Delivered", color: "border-green-500 text-green-600" },
  CANCELED: { label: "Canceled", color: "border-gray-400 text-gray-500" },
};

export const OrderSheetOrderItem = ({ order }: { order: UserOrder }) => {
  const { user } = useContext(UserContext);
  const status = STATUS_LABEL[order.status] ?? STATUS_LABEL.PENDING;
  const date = new Date(order.createdAt).toLocaleDateString("en-US");

  return (
    <div className="space-y-3 border-b pb-4 last:border-b-0">
      <div className="flex items-center justify-between">
        <h4 className="font-bold">{formatMoney(order.totalPrice)}₮</h4>
        <Badge variant="outline" className={`${status.color} rounded-full`}>
          {status.label}
        </Badge>
      </div>

      {order.foodOrderItems.map((item, i) => (
        <div key={i} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Soup strokeWidth={1} size={16} />
            <p className="text-muted-foreground text-xs">{item.food?.foodName}</p>
          </div>
          <p className="text-muted-foreground text-xs">x {item.quantity}</p>
        </div>
      ))}

      <div className="flex items-center gap-2">
        <Timer strokeWidth={1} size={16} />
        <p className="text-muted-foreground text-xs">{date}</p>
      </div>

      {user?.address && (
        <div className="flex items-center gap-2">
          <Map strokeWidth={1} size={16} />
          <p className="text-muted-foreground text-xs truncate w-11/12">
            {user.address}
          </p>
        </div>
      )}
    </div>
  );
};
