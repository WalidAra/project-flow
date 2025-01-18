import { DropdownMenuItem } from "../ui/dropdown-menu";
import { LuMoonStar } from "react-icons/lu";
import { Switch } from "../ui/switch";
import { useTheme } from "@/providers/theme-provider";
import { useCallback } from "react";

const DarkMode = () => {
  const { setTheme, theme } = useTheme();

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  }, [setTheme, theme]);

  const handleSwitchChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    toggleTheme();
  };

  return (
    <DropdownMenuItem className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <LuMoonStar className="size-4" />
        Dark mode
      </div>

      <Switch checked={theme === "dark"} onChange={handleSwitchChange} />
    </DropdownMenuItem>
  );
};

export default DarkMode;
