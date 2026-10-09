import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      cart: [],

      addToCart: (product, quantity = 1) =>
        set((state) => {
          const existingProduct = state.cart.find(
            (item) => item._id === product._id,
          );

          const stock = Number(product.stock) || 0;

          if (existingProduct) {
            const newQuantity = Math.min(
              existingProduct.quantity + quantity,
              stock,
            );

            return {
              cart: state.cart.map((item) =>
                item._id === product._id
                  ? { ...item, quantity: newQuantity }
                  : item,
              ),
            };
          }

          const newQuantity = Math.min(quantity, stock);

          return {
            cart: [...state.cart, { ...product, quantity: newQuantity }],
          };
        }),

      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item._id !== productId),
        })),

      increaseQuantity: (productId) =>
        set((state) => ({
          cart: state.cart.map((item) => {
            const stock = Number(item.stock) || 0;

            if (item._id === productId && item.quantity < stock) {
              return {
                ...item,
                quantity: item.quantity + 1,
              };
            }

            return item;
          }),
        })),

      decreaseQuantity: (productId) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item._id === productId && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          ),
        })),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cent-dix-cart",
    },
  ),
);
