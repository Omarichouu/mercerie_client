"use client";

import { useCart } from "contexts/CartContext";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { ShoppingCart } from "lucide-react";
import { Link, usePathname } from "i18n/navigation";

export const FloatingCart = () => {
  const { cartCount } = useCart();
  const router = useRouter();
  const locale = useLocale();

  return (
    <div>
      {cartCount > 0 && (
        <Link
          href={"/cart"}
          className="fixed bottom-25 right-6 z-40  w-16 h-16 bg-or_color_cart hover:bg-or_color_cart rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label="Shopping Cart"
        >
            <div className="relative">
              <ShoppingCart className="w-6 h-6 text-white" />
            
              {/* <span className="absolute -top-5 -right-5 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                {cartCount}
              </span> */}

                <span className="absolute -top-5 -right-5 h-6 w-6 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg animate-pulse">
                      {cartCount}
                    </span>
            </div>
        </Link>
      )}

      {/* <div> */}
          
      {/* </div> */}
    </div>
  );
};
