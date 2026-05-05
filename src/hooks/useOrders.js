// src/hooks/useOrders.js
import { supabase } from "../lib/supabase";
import { useUser } from "./useUser";

export const useOrders = () => {
  const { user } = useUser();

  const createOrder = async (items, total) => {
    if (!user) return { success: false, error: "Не авторизован" };

    const { data, error } = await supabase
      .from("orders")
      .insert([
        {
          user_id: user.id,
          items: items.map((i) => ({
            id: i.id,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
            image: i.image,
          })),
          total,
        },
      ])
      .select()
      .single();

    if (error) return { success: false, error: error.message };
    return { success: true, data };
  };

  const getOrders = async () => {
    if (!user) return [];

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) return [];
    return data;
  };

  return { createOrder, getOrders };
};
