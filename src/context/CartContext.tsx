"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export interface CartItem {
  id: string;
  label: string;
}

interface CartContextValue {
  items: CartItem[];
  /** Adds one or more labelled line items and shows a confirmation toast. */
  addItems: (labels: string[], message: string) => void;
  /** Removes a single line item by id (used on the /quote page). */
  removeItem: (id: string) => void;
  /** Clears every line item (used after a quote request is submitted). */
  clear: () => void;
  /** Current toast message, or "" when none is showing. */
  toast: string;
  /** Show a toast without touching the cart (e.g. nav demo links). */
  notify: (message: string) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const TOAST_VISIBLE_MS = 1900;
let idCounter = 0;
const nextId = () => `item-${Date.now()}-${idCounter++}`;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [toast, setToast] = useState("");

  const notify = useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), TOAST_VISIBLE_MS);
  }, []);

  const addItems = useCallback(
    (labels: string[], message: string) => {
      setItems((prev) => [...prev, ...labels.map((label) => ({ id: nextId(), label }))]);
      notify(message);
    },
    [notify]
  );

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({ items, addItems, removeItem, clear, toast, notify }),
    [items, addItems, removeItem, clear, toast, notify]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
