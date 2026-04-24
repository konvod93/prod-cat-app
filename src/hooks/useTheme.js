import { useContext } from "react";
import ThemeContext from "../components/context/ThemeContext";

// Хук для использования контекста темы
export const useTheme = () => {
  const context = useContext(ThemeContext);

  console.log("useTheme called, context:", context);

  if (!context) {
    console.error("useTheme должен использоваться внутри ThemeProvider");
    throw new Error("useTheme должен использоваться внутри ThemeProvider");
  }

  return context;
};
