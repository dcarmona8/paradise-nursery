import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [], // Lista de productos en el carrito
    totalQuantity: 0, // Cantidad total de productos en el carrito
    totalPrice: 0, // Precio total del carrito
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Acción para añadir un producto al carrito
        addToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.items.find((i) => i.id === item.id);

            if (existingItem) {
                // Incrementa la cantidad si el producto ya existe
                existingItem.quantity += 1;
            } else {
                // Agrega el producto si no existe
                state.items.push({ ...item, quantity: 1 });
            }

            // Actualiza la cantidad total y el precio total
            state.totalQuantity += 1;
            state.totalPrice += item.price;
        },

        // Acción para eliminar un producto del carrito
        removeFromCart: (state, action) => {
            const { id, quantity } = action.payload;
            const itemIndex = state.items.findIndex((i) => i.id === id);
            if (itemIndex !== -1) {
                const item = state.items[itemIndex];
                if (item.quantity > quantity) {
                    item.quantity -= quantity;
                    state.totalQuantity -= quantity;
                    state.totalPrice -= item.price * quantity;
                } else {
                    state.totalQuantity -= item.quantity;
                    state.totalPrice -= item.price * item.quantity;
                    state.items.splice(itemIndex, 1); // Remove the item completely
                }
            }
        },

        // Acción para vaciar todo el carrito
        clearCart: (state) => {
            state.items = []; // Vacía la lista de productos
            state.totalQuantity = 0; // Reinicia la cantidad total
            state.totalPrice = 0; // Reinicia el precio total
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
