import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
  address: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: {
      reducer: (state, action) => {
        const itemToUpdate = state.items.find((item) => {
          if (item) {
            return item.id === action.payload.id;
          } else {
            return false;
          }
        });

        const indexToUpdate = state.items.findIndex((item) => {
          if (itemToUpdate) {
            return item.id === itemToUpdate.id;
          } else {
            return false;
          }
        });
        const itemsWithoutItemToUpdate = state.items.filter((item) => {
          if (item) {
            return item.id !== action.payload.id;
          } else {
            return false;
          }
        });
        const updatedItems = [
          ...itemsWithoutItemToUpdate.slice(0, indexToUpdate),
          itemToUpdate,
          ...itemsWithoutItemToUpdate.slice(indexToUpdate),
        ];
        if (itemToUpdate) {
          itemToUpdate.quantity = itemToUpdate.quantity + 1;
          if (itemToUpdate.quantity <= itemToUpdate.stock) {
            state.items = updatedItems;
            state.totalPrice = Number(state.totalPrice) + Number(action.payload.price);
          } else {
            itemToUpdate.quantity = itemToUpdate.quantity - 1;
            return state;
          }
        } else {
          state.items.push(action.payload);
          state.totalPrice = Number(state.totalPrice) + Number(action.payload.price);
        }
      },
      prepare: (product) => {
        if (product.quantity) {
          return { payload: { ...product } };
        } else {
          return { payload: { ...product, quantity: 1 } };
        }
      },
    },
    removeItemFromCart: {
      reducer: (state, action) => {
        const itemToUpdate = state.items.find((item) => item.id === action.payload.id);
        const indexToUpdate = state.items.findIndex((item) => item.id === itemToUpdate.id);
        itemToUpdate.quantity = itemToUpdate.quantity - 1;
        const itemsWithoutItemToUpdate = state.items.filter(
          (item) => item.id !== action.payload.id,
        );
        const updatedItems = [
          ...itemsWithoutItemToUpdate.slice(0, indexToUpdate),
          itemToUpdate,
          ...itemsWithoutItemToUpdate.slice(indexToUpdate),
        ];
        if (state.items[indexToUpdate].quantity >= 1) {
          state.items = updatedItems;
        } else {
          state.items = itemsWithoutItemToUpdate;
        }
        state.totalPrice = Number(state.totalPrice) - Number(action.payload.price);
      },
    },
    clearCart: {
      reducer: (state, action) => {
        state.items = [];
        state.totalPrice = 0;
        state.address = {};
      },
    },
    addAddressToCart: {
      reducer: (state, action) => {
        state.address = action.payload;
      },
    },
  },
});

export const { addItemToCart, removeItemFromCart, clearCart, addAddressToCart } = cartSlice.actions;
export default cartSlice.reducer;
