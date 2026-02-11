import { createContext, useContext, useState } from "react";

type ThemeContextType = {
  isdark: boolean;
  setIsdark: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);


export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isdark, setIsdark] = useState(false);

  return (
    <ThemeContext.Provider value={{ isdark, setIsdark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return ctx;
};
