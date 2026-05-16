import { Link } from "i18n/navigation";
import { LogOut, Moon, ShoppingBag, Sun, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const HeaderActions = ({ t, status, cartCount, onOpenCart, onLogout, onThemeChange }) => (
  <div className="flex items-center gap-3">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-12 w-12 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 dark:bg-gray-800/50 dark:hover:bg-gray-700/50 border border-white/20 dark:border-gray-700/50 transition-all duration-300 hover:scale-105"
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-or_color" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-or_color2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-white/95 backdrop-blur-sm dark:bg-gray-800/95 border-white/20 dark:border-gray-700/50"
      >
        <DropdownMenuItem onClick={() => onThemeChange("light")}>
          <Sun className="mr-2 h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onThemeChange("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onThemeChange("system")}>
          <div className="mr-2 h-4 w-4 rounded-full bg-gradient-to-r from-orange-400 to-blue-600"></div>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <button
      onClick={onOpenCart}
      className="relative h-12 w-12 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 dark:bg-gray-800/50 dark:hover:bg-gray-700/50 border border-white/20 dark:border-gray-700/50 transition-all duration-300 hover:scale-105 flex items-center justify-center group"
    >
      <ShoppingBag className="h-5 w-5 text-or_color group-hover:text-or_color2 transition-colors duration-200" />
      {cartCount > 0 ? (
        <span className="absolute -top-2 -right-2 h-6 w-6 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg animate-pulse">
          {cartCount}
        </span>
      ) : null}
    </button>

    {status === "authenticated" ? (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 px-4 py-2 h-12 rounded-xl bg-gradient-to-r from-or_color to-or_color2 text-black hover:from-or_color2 hover:to-or_color transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">{t("Profile")}</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-white/95 backdrop-blur-sm dark:bg-gray-800/95 border-white/20 dark:border-gray-700/50"
        >
          <DropdownMenuItem onClick={onLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            {t("logout")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ) : (
      <Link
        href="/login"
        className="flex items-center gap-2 px-4 py-2 h-12 rounded-xl bg-gradient-to-r from-or_color to-or_color2 text-black hover:from-or_color2 hover:to-or_color transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
      >
        <User className="h-4 w-4" />
        <span className="hidden sm:inline">{t("login")}</span>
      </Link>
    )}
  </div>
);

export default HeaderActions;
