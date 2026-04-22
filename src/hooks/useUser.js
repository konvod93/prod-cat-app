import { useContext } from "react";
import UserContext from "../components/context/UserContext";

// Хук для использования контекста пользователя
export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser должен использоваться внутри UserProvider");
  }

  return context;
};
