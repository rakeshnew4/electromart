"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    const res = await fetch("/api/orders-all");
    const data = await res.json();
    console.log("All orders:", data);
    setOrders(data);
  }

  async function updateStatus(id: string, status: string) {
    await fetch("/api/admin/update-order-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: id, status }),
    });

    loadOrders();
  }

  return (
    <div className="p-6 space-y-10">
      <section>
        <h2 className="text-2xl font-bold mb-4">Orders</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-2 border">Order ID</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Phone</th>
                <th className="p-2 border">Total</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b">
                  <td className="p-2 border">{o.id}</td>
                  <td className="p-2 border">{o.customer_info?.name}</td>
                  <td className="p-2 border">{o.customer_info?.phone}</td>
                  <td className="p-2 border">₹{o.total_amount}</td>
                  <td className="p-2 border">{o.status}</td>
                  <td className="p-2 border flex gap-1">
                    {["pending", "processing", "shipped", "delivered", "cancelled"].map((s) => (
                      <button
                        key={s}
                        onClick={() => updateStatus(o.id, s)}
                        className={`px-2 py-1 rounded text-sm ${
                          o.status === s ? "bg-black text-white" : "bg-gray-200"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </section>
    </div>
  );
}
