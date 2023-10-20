import { StateCreator } from "zustand";

export interface CartSlice {
  cartProducts: { id: string; quantity: number; price: string }[];
  addToCart: (id: string, price: string) => void;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  getQuantityById: (id: string) => number | undefined; // New method
  getTotalAmount: () => number; // New method
  emptyCart: () => void;
}

export const createCartSlice: StateCreator<CartSlice> = (set, get) => ({
  cartProducts: [],
  addToCart: (id: string, price: string) => {
    set((state) => {
      // Check if the product is already in the cart
      const existingProduct = state.cartProducts.find(
        (product) => product.id === id
      );

      if (existingProduct) {
        // If it's already in the cart, increase its quantity by 1
        existingProduct.quantity += 1;
      } else {
        // If it's not in the cart, add it with a quantity of 1
        state.cartProducts.push({ id, quantity: 1, price });
      }

      return { cartProducts: [...state.cartProducts] };
    });
  },
  removeFromCart: (id: string) => {
    set((state) => {
      // Find the index of the product to remove
      const productIndex = state.cartProducts.findIndex(
        (product) => product.id === id
      );

      if (productIndex !== -1) {
        // Remove the product from the cart
        state.cartProducts.splice(productIndex, 1);
      }

      return { cartProducts: [...state.cartProducts] };
    });
  },
  increaseQuantity: (id: string) => {
    set((state) => {
      // Find the product in the cart
      const product = state.cartProducts.find((product) => product.id === id);

      if (product) {
        // Increase its quantity by 1
        product.quantity += 1;
      }

      return { cartProducts: [...state.cartProducts] };
    });
  },
  decreaseQuantity: (id: string) => {
    set((state) => {
      // Find the product in the cart
      const product = state.cartProducts.find((product) => product.id === id);

      if (product && product.quantity > 1) {
        // Decrease its quantity by 1, but ensure it doesn't go below 1
        product.quantity -= 1;
      }

      return { cartProducts: [...state.cartProducts] };
    });
  },
  getQuantityById: (id: string) => {
    // Find the product in the cart
    const product = get().cartProducts.find((product) => product.id === id);

    // If the product is found, return its quantity; otherwise, return undefined
    return product ? product.quantity : undefined;
  },
  getTotalAmount: () => {
    const { cartProducts } = get();
    console.log({ cartProducts });
    // Calculate the total amount by summing the quantity * price of each product (replace 'price' with the actual price property)
    const totalAmount = cartProducts.reduce((total, product) => {
      // You need to replace 'price' with the actual price property of your products
      const productPrice = parseInt(product.price); // Replace with the actual price of the product
      return total + product.quantity * productPrice;
    }, 0);

    console.log({ totalAmount });

    return totalAmount;
  },
  emptyCart: () => set({ cartProducts: [] }),
});
