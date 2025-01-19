import { LuMoonStar } from "react-icons/lu";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/providers/theme-provider";
import { useCallback } from "react";

const DarkMode = () => {
  const { setTheme, theme } = useTheme();

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  }, [setTheme, theme]);

  return (
    <div className="flex w-full items-center justify-between py-2 px-4">
      <div className="flex items-center gap-2">
        <LuMoonStar className="h-4 w-4" />
        Dark mode
      </div>

      <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
    </div>
  );
};

export default DarkMode;
