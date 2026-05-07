// src/hooks/useAddresses.js
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useUser } from "./useUser";

export const useAddresses = () => {
  const { user } = useUser();
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    setIsLoading(true);
    supabase
      .from("addresses")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        setAddresses(data || []);
        setIsLoading(false);
      });
  }, [user]);

  const addAddress = async (label, address) => {
    const { data, error } = await supabase
      .from("addresses")
      .insert([{ user_id: user.id, label, address }])
      .select()
      .single();

    if (error) return { success: false, error: error.message };
    setAddresses((prev) => [...prev, data]);
    return { success: true };
  };

  const deleteAddress = async (id) => {
    const { error } = await supabase.from("addresses").delete().eq("id", id);

    if (error) return { success: false, error: error.message };
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    return { success: true };
  };

  return { addresses, isLoading, addAddress, deleteAddress };
};
