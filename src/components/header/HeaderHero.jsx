import Image from "next/image";
import { Link } from "i18n/navigation";

const HeaderHero = ({ children }) => (
  <div className="bg-gradient-to-br from-black via-gray-900 to-black dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
    <div className="absolute inset-0 bg-[url(/images/sidebar_img.webp)] bg-cover bg-right bg-fixed bg-no-repeat opacity-20"></div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

    <div className="relative z-10 py-8">
      <div className="flex items-center justify-center mb-8">
        <div className="flex-grow h-px bg-gradient-to-r from-transparent via-or_color to-transparent max-w-xs"></div>
        <Link href="/" className="mx-8">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-or_color to-or_color2 rounded-full blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            <Image
              className="relative transform transition-all duration-300 hover:scale-110 hover:rotate-3 drop-shadow-2xl"
              src="/img_logo/logo-crystal-annaba-removebg-preview.webp"
              width={120}
              height={120}
              loading="lazy"
              alt="Crystal Annaba Logo"
            />
          </div>
        </Link>
        <div className="flex-grow h-px bg-gradient-to-l from-transparent via-or_color2 to-transparent max-w-xs"></div>
      </div>

      <div className="px-4 max-w-7xl mx-auto">{children}</div>
    </div>
  </div>
);

export default HeaderHero;
