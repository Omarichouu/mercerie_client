"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSession } from "next-auth/react";
import { parseCartResponse } from "lib/cart-schemas";
import { getOrCreateUniqueId } from "lib/cart-utils";

const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [isCartLoading, setIsCartLoading] = useState(false);
  const [isCartLoaded, setIsCartLoaded] = useState(false);
  const [cartError, setCartError] = useState(null);
  const [userId, setUserId] = useState("");
  const { data: session, status } = useSession();

  const requestCart = useCallback(async (id) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_MY_URL}/api/get_cart_client`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_user: id }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch cart");
    }

    const payload = await response.json();
    const parsed = parseCartResponse(payload);

    if (!parsed.success) {
      throw new Error("Invalid cart response");
    }

    return parsed.data;
  }, []);

  const fetchCart = useCallback(
    async (id = userId) => {
      if (!id) return [];
      setIsCartLoading(true);
      setCartError(null);

      try {
        const items = await requestCart(id);
        setCartItems(items);
        setCartCount(items.length);
        setIsCartLoaded(true);
        return items;
      } catch (error) {
        setCartError(error);
        return [];
      } finally {
        setIsCartLoading(false);
      }
    },
    [requestCart, userId]
  );

  const syncCartCount = useCallback(
    async (id = userId) => {
      const items = await fetchCart(id);
      return items.length;
    },
    [fetchCart, userId]
  );

  const deleteCartItem = useCallback(
    async (itemId, id = userId) => {
      if (!itemId) {
        throw new Error("Cart item id is required");
      }

      setIsCartLoading(true);
      setCartError(null);

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_MY_URL}/api/delete_item_cart`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id_item: itemId }),
        });

        if (!response.ok) {
          throw new Error("Failed to delete cart item");
        }

        const items = await fetchCart(id);
        return items;
      } catch (error) {
        setCartError(error);
        return [];
      } finally {
        setIsCartLoading(false);
      }
    },
    [fetchCart, userId]
  );

  const clearCart = useCallback(
    async (id = userId) => {
      if (!id || cartItems.length === 0) return true;

      setIsCartLoading(true);
      setCartError(null);

      try {
        await Promise.all(
          cartItems.map((item) =>
            fetch(`${process.env.NEXT_PUBLIC_MY_URL}/api/delete_cart_client`, {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id_item: item._id }),
            })
          )
        );

        setCartItems([]);
        setCartCount(0);
        return true;
      } catch (error) {
        setCartError(error);
        return false;
      } finally {
        setIsCartLoading(false);
      }
    },
    [cartItems, userId]
  );

  const incrementCartCount = useCallback((amount = 1) => {
    setCartCount((currentCount) => Math.max(0, currentCount + amount));
  }, []);

  useEffect(() => {
    if (status === "loading") return;

    const resolvedId =
      status === "authenticated"
        ? session?.user?._id
        : getOrCreateUniqueId();

    if (!resolvedId) return;
    if (resolvedId !== userId) {
      setUserId(resolvedId);
      setIsCartLoaded(false);
    }
  }, [session, status, userId]);

  useEffect(() => {
    if (!userId) return;
    fetchCart(userId);
  }, [fetchCart, userId]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cartCount", cartCount.toString());
    }
  }, [cartCount]);

  const value = useMemo(
    () => ({
      cartItems,
      cartCount,
      isCartLoading,
      isCartLoaded,
      cartError,
      userId,
      fetchCart,
      syncCartCount,
      deleteCartItem,
      clearCart,
      incrementCartCount,
    }),
    [
      cartItems,
      cartCount,
      isCartLoading,
      isCartLoaded,
      cartError,
      userId,
      fetchCart,
      syncCartCount,
      deleteCartItem,
      clearCart,
      incrementCartCount,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
