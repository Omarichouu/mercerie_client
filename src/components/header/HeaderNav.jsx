import { Link } from "i18n/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const HeaderNav = ({ t, pathname }) => (
  <div className="bg-gradient-to-r from-or_color to-or_color2 shadow-md dark:from-gray-800 dark:to-gray-700">
    <div className="container mx-auto px-4">
      <div className="flex flex-row justify-center items-center gap-4 md:gap-6 py-3">
        <Link
          href="/"
          className="text-sm text-[#3e3e3e] dark:text-white transform hover:scale-105 transition duration-200"
        >
          {t("home")}
        </Link>
        <Link
          href="/historique"
          className="text-sm text-[#3e3e3e] dark:text-white transform hover:scale-105 transition duration-200"
        >
          {t("history")}
        </Link>
        <Link
          href="/cart"
          className="text-sm text-[#3e3e3e] dark:text-white transform hover:scale-105 transition duration-200"
        >
          {t("cart")}
        </Link>
        <Link
          href="/profile"
          className="text-sm text-[#3e3e3e] dark:text-white transform hover:scale-105 transition duration-200"
        >
          {t("profile")}
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="text-sm flex rounded-md items-center text-[#3e3e3e] dark:text-white w-full transform hover:scale-105 transition duration-200"
              aria-haspopup="true"
            >
              {t("langue")}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="flex flex-col p-2 items-start gap-3">
              <Link
                locale="fr"
                href={pathname}
                className="text-sm text-[#3e3e3e] dark:text-white w-full"
              >
                français  fr
              </Link>

              <Link
                locale="ar"
                href={pathname}
                className="text-sm text-[#3e3e3e] dark:text-white w-full"
              >
                العربية ar
              </Link>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </div>
);

export default HeaderNav;
