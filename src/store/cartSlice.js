import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

//reducer

const slice = createSlice(
    {
        name: 'cart',
        initialState: {
            products: [],
            quantity: 0,
            total: 0,
        },
        reducers: {


            productAdded: (cart, action) => {
                const { price, productId, quantity } = action.payload;
                const item = cart.products.find((prod) => prod.productId === productId);

                if (item) {
                    const index = cart.products.findIndex((p) => p.productId === item.productId);
                    cart.products[index].quantity += quantity;
                } else {
                    cart.products.push(action.payload);
                };

                cart.quantity += quantity;
                cart.total += price * quantity;
            },

            productUpdated: (cart, action) => {
                const { productId, quantity, price } = action.payload;
                const index = cart.products.findIndex((p) => p.productId === productId);
                cart.products[index].quantity += quantity;

                if (cart.products[index].quantity < 1 && quantity === -1) {
                    const item = cart.products.find((product) => product.productId === productId);
                    cart.total -= 1 * item.price;
                    cart.quantity -= 1;
                    cart.products = cart.products.filter((product) => product.productId !== productId);

                }
                else if (cart.products[index].quantity >= 0 && quantity === -1) {
                    cart.total -= price;
                    cart.quantity -= 1;
                }

                else {
                    cart.total += price;
                    cart.quantity += 1;
                }

                return cart;

            },

            productRemoved: (cart, action) => {
                const item = cart.products.find((product) => product.productId === action.payload.productId);
                cart.total -= item.quantity * item.price;
                cart.quantity -= item.quantity;
                cart.products = cart.products.filter((product) => product.productId !== action.payload.productId);
                return cart;
            },

            colorUpdated: (cart, action) => {
                const { productId, newId } = action.payload;
                const newProduct = cart.products.find((prod) => prod.productId === newId);
                if (newProduct) toast.info("Access denied! same product in cart");
                const product = cart.products.find((prod) => prod.productId === productId);

                if (!newProduct && product) {
                    const index = cart.products.findIndex((p) => p.productId === product.productId);
                    cart.products[index].productId = newId;
                }

                return cart;

            },

            sizeUpdated: (cart, action) => {
                const { price, productId, size } = action.payload;
                const item = cart.products.find((prod) => prod.productId === productId);

                if (item) {
                    cart.total -= item.price * item.quantity;
                    const index = cart.products.findIndex((p) => p.productId === item.productId);
                    cart.products[index].size = size;
                    cart.products[index].price = price;
                }

                cart.total += price * item.quantity;
            },

            cartCleared: (cart, action) => {
                if (!action.payload.clearCart) return cart;
                cart.products = [];
                cart.total = 0;
                cart.quantity = 0;
                return cart;
            },


        }
    },
);
export const { productAdded, productUpdated, productRemoved, sizeUpdated, colorUpdated, cartCleared } = slice.actions;
export default slice.reducer;




